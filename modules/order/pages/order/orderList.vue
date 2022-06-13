<template>
	<view>
		
		<u-sticky bgColor="#fff">
		    <u-tabs :list="datas.name" :active-color="config.main_color" :current="currentTab"  @change="changeTab"></u-tabs>
		</u-sticky>
		<view class="order-wrap">
			<view>
				<view class="order-list" v-for="(item,index) in order" :key="item.id">
					<view class="hd clearfix">
						<text class="title fl">{{item.shop_name}}</text>
						<text class="status fr">{{order_status[Number(item.order_status)+1]}}</text>
					</view>
					<view class="describe clearfix" v-for="text in item.goods">
            <image class="fl" v-if="text.pic_url" :src="config.image_url+text.pic_url" @click="toDetails(text)"></image>
            <image class="fl" v-else src="@/static/images/common/img_bad.jpeg" @click="toDetails(text)"></image>
						<view class="fl words" @click="checkOrder(item)">
							<view class="text">{{text.title}}</view>
							<text v-if="text.goods_price !== '0.00'" style="padding: 0 20rpx;" class="fl price">￥{{text.goods_price}}</text>
							<text v-else style="padding: 0 20rpx;">x1 赠品</text>
						</view>
						<view class="btn" @click="comment(item)" v-if="item.order_state == 1">马上评论
						</view>
					</view>
					<view class="commod clearfix">
						<text class="fl total">共{{item.count}}件商品</text>
						<text class="fl actual">实付款&nbsp;:&nbsp;<text>￥{{item.price_sum.toFixed(2)}}</text></text>
						<text class="icon" v-if="item.order_status == 4 || item.order_status == -1"
							  @click="deletOrder(item,index)"></text>
					</view>
					<view class="operation clearfix">
						<text class="timer fl">下单时间：{{item.create_time}}</text>
						<view class="btn fr" @click="payment(item)" v-if="item.order_status == 0">马上付款
						</view>
						<view class="btn fr" @click="checkOrder(item)" v-if="item.order_status == 1">查看订单
						</view>
						<view class="btn fr" @click="logistics(item)" v-if="item.order_status == 3">查看物流
						</view>
						<view class="butn fr" @click="conReceipt(item)" v-if="item.order_status == 3">确认收货</view>
						<view class="btn fr repeat" @click="checkOrder(item)"
								v-if="item.order_status == 4 || item.order_status == -1">
							再次购买
						</view>
						<view class="btn fr repeat" @click="comment(item)"
								v-if="item.comment_status == 0&&item.order_status==4">去评论
						</view>
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
                datas: {
                    name: [
						{
							name:'全部'
						},
						{
							name:'待付款'
						},
						{
							name:'待发货'
						},
						{
							name:'待收货'
						},
						{
							name: '已完成'
						},
						{
							name: '已取消'
						},
						{
							name: '待评论'
						}
					]
                },
				isactive: '',
				page: 1,
				order: [],
				loadingType: 'more',
				order_status: ['取消订单', '未支付', '已支付', '发货中', '已发货', '已收货', '退货审核中', '审核失败', '审核成功', '退款中', '退款成功'],
				currentTab:0
			}
		},
		components:{
			uniLoadMore,
		},
		onLoad(options){
			this.cateId = options.id;
			this.currentTab = this.cateId;
			uni.setStorageSync('ClickID',this.cateId);
      this.addClass(parseInt(this.cateId));
		},
		onReachBottom(){
			this.addClass(uni.getStorageSync("ClickID"));
		},
		methods:{
      conReceipt(item) {
        let _this = this;
        uni.showModal({
          title: '温馨提示!',
          content: '确定订单已收货吗?',
          success: function (res) {
            if (res.confirm) {
              uni.request({
                method: "POST",
                url: api.confirmGet,
                data: {id:item.id,token:uni.getStorageSync("token")},
                success: (res) => {
                  if(res.data.status==1){
                    uni.showToast({
                      title:res.data.message
                    });
                    uni.navigateTo({
                      url: 'modules/order/pages/order/orderList'
                    })
                  }else{
                    uni.showToast({
                      title:res.data.message
                    })

                  }
                },
                fail: (res)=>{
                  uni.showToast({title:res.data.message})
                }
              })
            }
          }
        })
      },
      addClass(index,type='add', loading) {
        this.isactive = index;
				uni.setStorageSync('ClickID',index);
        let url = api.orderListAll;
        switch(index){
          case 0 : url = api.orderListAll;break; //默认	销量从高到低
          case 1 : url = api.pendingPayment;break;
          case 2 : url = api.pendingDelivery;break;
          case 3 : url = api.goodsToBeReceived;break;
          case 4 : url = api.completed;break;
          case 5 : url = api.haveBeenCancelled;break;
          case 6 : url = api.toBeEvaluated;break;
        }
					if(type === 'add'){
						this.loadingType = 'loading';
					}else{
						this.loadingType = 'more'
					}
                    // this.$store.state.order_title = '全部订单';
						let _this = this;
					uni.request({
            method: "POST",
            url: url,
            data: {page:_this.page,token:uni.getStorageSync("token")},
						success: (res) => {
							if(res.data.data){
								for (let index = 0; index < res.data.data.list.length; index++) {
									_this.order.push(res.data.data.list[index]);
								}
								this.page++;
								this.loadingType = "more"
							}
							else{
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
                url: api.orderDel,
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
			changeTab(index){
        let _this = this;
        _this.page = 1;
        _this.order = [];
        _this.isactive = index;
        uni.setStorageSync('ClickID',index);
				this.currentTab = index
				this.addClass(this.currentTab);
			},
      toDetails(item) {
        uni.navigateTo({
          url: '/modules/common/pages/productDetail/index?id='+item.goods_id,
          fail(e) {
            console.log(e)
          }
        })
      },
      payment(item){
        uni.navigateTo({
          url: '/modules/order/pages/order/orderDetails?id='+item.id,
          fail(e) {
            console.log(e)
          }
        })
      },
      checkOrder(item){
        uni.navigateTo({
          url: '/modules/order/pages/order/orderDetails?id='+item.id,
          fail(e) {
            console.log(e)
          }
        })
      },
      logistics(item){
        uni.navigateTo({
          url: '/modules/order/pages/order/logistics?id='+item.id+'&order_status='+item.order_status+'&express_id='+item.express_id+'&exp_id='+item.exp_id,
          fail(e) {
            console.log(e)
          }
        })
      },
      comment(item){
        uni.navigateTo({
          url: '/modules/order/pages/order/comment?id='+item.id,
          fail(e) {
            console.log(e)
          }
        })
      },
      buyAgain(item){
        uni.navigateTo({
          url: `modules/common/pages/productDetail/confirmOrder?goods_id=`+item.goods_id+'&num='+item.goods_num
        })
      }
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
	.order-wrap{
		padding-top:1rpx !important;
	}
	.order-list {
		background: #fff;
		line-height: 70rpx;
		margin: 20rpx;
		border-radius:5px;
		&:first-of-type{
			margin-top: 20rpx;
		}
		.hd {
			margin: 0 20rpx;
			border-bottom: 1px solid rgba($color: #000000, $alpha: 0.05);
			height: 70rpx;

			.title {
				font-size: 10px;
				color: $font-color-light;
			}

			.status {
				font-size: 10px;
				color: $main-color;
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
			border-bottom: 1px solid rgba($color: #000000, $alpha: 0.05);
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
				border-radius: 5px;
				background-color: $light-grey;
			}

			.words {
				width: 524rpx;
				
				.number {
					font-size: 22rpx;
					color: #fd5149;
				}
				.price {
					font-size: 12px;
					color: $font-color-dark;
					line-height: 62rpx;
					font-weight: bold;
				}
				.add{
					font-size:25rpx;
					margin:63rpx 0 0 0;
					line-height:30rpx;
				}
				.text {
					padding: 0 20rpx;
					font-size: 12px;
					color: $font-color-dark;
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
			border-bottom: 1px solid rgba($color: #000000, $alpha: 0.05);
			position: relative;

			.total {
				font-size: 12px;
				color: $font-color-light;
			}

			.actual {
				padding-left: 70rpx;
				font-size: 12px;
				color: $main-color;
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
				font-size: 12px;
				color: $font-color-light;
			}

			.butn {
				height: 70rpx;
				margin-right: 10rpx;
				background: #fff;
				border: 2rpx solid #f9781e;
				font-size: 27rpx;
				color: #f9781e;
				border-radius: 10rpx;
				outline: none;
			}

			.btn {
				height: 70rpx;
				background: #fff;
				border: 2rpx solid #f9781e;
				font-size: 27rpx;
				color: #f9781e;
				border-radius: 10rpx;
				outline: none;
				line-height: 70rpx;
				text-align: center;
			}

			.repeat {
				height: 70rpx;
				background: #fff;
				border: 2rpx solid #f9781e;
				font-size: 27rpx;
				color: #f9781e;
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
