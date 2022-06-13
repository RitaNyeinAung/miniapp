<template>
	<view>
		<view class="order-wrap">
				<view class="order-list" v-for="(item,index) in order" :key="item.id">
					<view class="hd clearfix">
						<text class="title fl">{{items.store_name}}</text>
						<text class="status fr">{{order_status[Number(item.order_status)+1]}}</text>
					</view>
					<view class="describe clearfix">
            <image class="fl" v-if="item.pic_url" :src="config.image_url+item.pic_url" @click="toDetails(item)"></image>
            <image class="fl" v-else src="@/static/images/common/img_bad.jpeg" @click="toDetails(item)"></image>
						<view class="fl words" @click="toDetails(item)">
							<view class="text">{{item.title}}</view>
						</view>
						<view class="btn" @click="comment(item)" v-if="item.order_status == 4 || item.comment_status == -1">马上评论
						</view>
					</view>
					<view class="commod clearfix">
						<text class="fl total">共{{item.goods_num}}件商品</text>
						<text class="fl actual">积分兑换&nbsp;:&nbsp;<text>￥{{item.integral}}</text></text>
						<text class="icon" v-if="item.order_status == 4 || item.order_status == -1"
							  @click="deletOrder(item,index)"></text>
					</view>
					<view class="operation clearfix">
						<text class="timer fl">兑换时间：{{item.create_time}}</text>
						<view class="btn fr" @click="payment(item)" v-if="item.order_status == 0">马上兑换
						</view>
						<view class="btn fr" @click="checkOrder(item)" v-if="item.order_status == 1">查看订单
						</view>
						<view class="btn fr" @click="logistics(item)" v-if="item.order_status == 3">查看物流
						</view>
						<view class="btn fr repeat" @click="buyAgain(item)" v-if="item.order_status == 4 || item.order_status == -1">
							再次兑换
						</view>
					</view>
				</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				page: 1,
				order: [],
				loadingType: 'more',
				order_status:['取消订单','未支付','已支付','发货中','已发货','已收货','退货审核中','审核失败','审核成功','退款中','退款成功'],
			}
		},
		components:{
			uniLoadMore,
		},
		onReachBottom(){
			this.getList();
		},
		methods:{
      getList(type='add', loading) {
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				let _this = this;
					uni.request({
            method: "POST",
            url: api.myConfirm,
            data: {page:_this.page,token:uni.getStorageSync("token")},
						success: (res) => {
							if(res.data.data){
								for (let index = 0; index < res.data.data.data.length; index++) {
									_this.order.push(res.data.data.data[index]);
								}
								this.page++;
								this.loadingType = "more"
							} else{
								this.loadingType = "nomore"
							}
						},
						fail: (res)=>{
							console.log(res);
						}
					})
      },
			deletOrder(item,index){
        let _this = this;
        uni.showModal({
          title: '温馨提示!',
          content: '确定删除订单吗?',
          success: function (res) {
            if (res.confirm) {
              uni.request({
                method: "POST",
                url: api.delOrder,
                data: {id:item.id,token:uni.getStorageSync("token")},
                success: (res) => {
                  if(res.data.status==1){
                    _this.order.splice(index,1);
                    uni.showToast({title:res.data.message});
                  }else{
                    uni.showToast({title:res.data.message});
                  }
                },
                fail: (res)=>{
                  console.log(res);
                }
              })
            }
          }
        })
			},
      toDetails(item) {
        uni.navigateTo({
          url: '/modules/service/pages/integral/integralDetail?id='+item.goods_id,
          fail(e) {
            console.log(e)
          }
        })
      },
      payment(item){
        uni.navigateTo({
          url: '/modules/order/pages/integral/integralOrderDetails?id='+item.id,
          fail(e) {
            console.log(e)
          }
        })
      },
      checkOrder(item){
        uni.navigateTo({
          url: '/modules/order/pages/integral/integralOrderDetails?id='+item.id,
          fail(e) {
            console.log(e)
          }
        })
      },
      logistics(item){

      },
      comment(item){

      },
      buyAgain(item){
        uni.navigateTo({
          url: `modules/common/pages/productIntegralDetail/confirmIntegralOrder?goods_id=`+item.goods_id+'&num='+item.goods_num
        })
      },
    },
		mounted() {
			this.getList();
		}
		
	}
</script>

<style lang="scss">
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.nav-wrap {
		width: 100%;
		overflow-x: auto;
		background: #fff;

		.nav {
			width: 1239rpx;
			height: 94rpx;
			border-bottom: 2rpx solid #dfdfdd;

			.li {
				width: 177rpx;
				height: 100%;
				text-align: center;
				overflow: hidden;
				box-sizing: border-box;
				float: left;
				.span {
					display: block;
					color: #676767;
					font-size: 30rpx;
					line-height: 54rpx;
					height: 54rpx;
					margin: 20rpx 0;
					border-right: 2rpx solid #dfdfdd;
				}
			}

			.li:last-child .span {
				border-right: 0;
			}

			.active {
				border-bottom: 6rpx solid #fd4f4b;

				.span {
					color: #ff781a;
				}
			}
		}
	}
	.order-list {
		background: #fff;
		line-height: 70rpx;
		margin-bottom: 20rpx;

		.hd {
			margin: 0 20rpx;
			border-bottom: 2rpx solid #dfdfdd;
			height: 70rpx;

			.title {
				font-size: 29rpx;
				color: #333;
			}

			.status {
				font-size: 30rpx;
				color: #d02629;
			}

			.status.light {
				color: #adadad;
			}

			.status.ash {
				color: #333;
			}
		}

		.describe {
			margin: 0 20rpx;
			// height: 1.46rem;
			padding: 13rpx 0;
			border-bottom: 2rpx solid #dfdfdd;
			position: relative;

			.btn {
				position: absolute;
				right: 0;
				bottom: 10rpx;
				width: 150rpx;
				height: 50rpx;
				border: 2rpx solid #ff881e;
				background: #fff;
				border-radius: 40rpx;
				color: #ff881e;
			}

			image {
				width: 146rpx;
				height: 146rpx;
			}

			.words {
				width: 524rpx;
				
				.number {
					font-size: 22rpx;
					color: #fd5149;
				}
				.price {
					font-size: 28rpx;
					color: #333;
					line-height: 62rpx;
				}
				.add{
					font-size:25rpx;
					margin:63rpx 0 0 0;
					line-height:30rpx;
				}
				.text {
					padding: 0 20rpx;
					font-size: 32rpx;
					color: #333;
					line-height: 45rpx;
					overflow: hidden;
					display: -webkit-box;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}
			}
		}

		.commod {
			padding: 0 20rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 2rpx solid #dfdfdd;
			position: relative;

			.total {
				font-size: 30rpx;
				color: #333;
			}

			.actual {
				padding-left: 70rpx;
				font-size: 30rpx;
				color: #CD0C11;
			}

			.icon {
				font-size: 30rpx;
				color: #333;
				position: absolute;
				right: 35rpx;
				top: 50%;
				width: 38rpx;
				height: 47rpx;
				background: url(@/static/images/common/trash.png);
				background-size: 100% 100%;
				margin-top: -23.5rpx;
			}
		}

		.operation {
			height: 90rpx;
			padding: 10rpx 20rpx;
			line-height: 70rpx;

			.timer {
				font-size: 25rpx;
				color: #757575;
			}

			.butn {
				width: 150rpx;
				height: 70rpx;
				margin-right: 10rpx;
				background: #fff;
				border: 2rpx solid #d02629;
				font-size: 27rpx;
				color: #d02629;
				border-radius: 10rpx;
				outline: none;
			}

			.btn {
				width: 150rpx;
				height: 70rpx;
				background: #fff;
				border: 2rpx solid #d02629;
				font-size: 27rpx;
				color: #d02629;
				border-radius: 10rpx;
				outline: none;
				line-height: 70rpx;
				text-align: center;
			}

			.repeat {
				width: 130rpx;
				height: 70rpx;
				background: #fff;
				border: 2rpx solid #d02629;
				font-size: 27rpx;
				color: #d02629;
				margin: 0 10rpx;
				border-radius: 10rpx;
				outline: none;
			}
		}
	}
	    .whole-wrap {
	        background: #f1f1f1;
	    }
	
	    .order-wrap {
	        padding-top: 10rpx;
			background-color: #f1f1f1;
	        .comm-null {
	            padding-top: 50rpx;
	
	            .p {
	                font-size: 28rpx;
	                color: #666;
	                padding-top: 20rpx;
	            }
	        }
	    }	
	.up-warp {
		height: 50rpx;
		padding: 30rpx 0;
		text-align: center;

		.rotate {
			display: inline-block;
			vertical-align: middle;
			width: 32rpx;
			height: 32rpx;
			border-radius: 50%;
			border: 2rpx solid gray;
			margin-right: 12rpx;
			border-bottom-color: transparent;
		}

		.rotate {
			-webkit-animation: rotate .6s linear infinite;
			animation: rotate .6s linear infinite
		}

		@-webkit-keyframes rotate {
			0% {
				-webkit-transform: rotate(0deg)
			}
			100% {
				-webkit-transform: rotate(360deg)
			}
		}
		@keyframes rotate {
			0% {
				transform: rotate(0deg)
			}
			100% {
				transform: rotate(360deg)
			}
		}

		.load-title {
			font-size: 24rpx;
			color: gray;
			display: inline-block;
			vertical-align: middle;
		}
	}

	.no-data {
		background-color: #fff;
		height: 50rpx;
		padding: 30rpx 0;
		text-align: center;
		font-size: 24rpx;
		color: gray;
	}
</style>
