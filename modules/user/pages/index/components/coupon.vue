<template>
	<view class="couponDiv">
		<view class="mainDiv">
			<view class="clearfix Navigation text-center">
				<view class="li fl" :class="{active:status == 3}" @click="nav(3)">未使用({{countTotal.not_used}})</view>
				<view class="li fl" :class="{active:status == 1}" @click="nav(1)">已使用({{countTotal.used}})</view>
				<view class="li fl" :class="{active:status == 2}" @click="nav(2)">已过期({{countTotal.expired}})</view>
			</view>
			<view class="content-wrap" id="content">
				<view class="conli clearfix" v-for="item in data" :class="{green:status == 3 &&item.money >= 150 ,yellow:status == 3 &&item.money <= 50,origin:status == 3 &&item.money > 50 &&item.money <150,gray:status == 1 || status == 2}">
					<view class="fl item-pull-left">
						<view class="h2">{{item.name}}</view>
						<view class="status">(不包含运费)</view>
						<view class="term">使用期限</view>
						<view class="timer">{{item.use_start_time|formatDate}} -- {{item.use_end_time|formatDate}}</view>
					</view>
					<view class="fl item-pull-right text-right">
						<view class="price">￥<text class="pm">{{item.money}}</text></view>
						<view v-if="status == 3" type="button" @click="useFun" class="button">立即使用</view>
						<view v-else type="button" class="buttom">无法使用</view>
					</view>
				</view>
			</view>
			<view class="text-center data-status" v-if="!data">暂无优惠券！</view>			
		</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				countTotal:'',
				page:1,
				status:3,
				data:[],
				loadingType: 'more',
				status: "search",
			}
		},
		onReachBottom(){
			this.myCouponLists(uni.getStorageSync('Tstatus'));
		},
		onLoad(){
			uni.setNavigationBarTitle({
				title:decodeURIComponent('优惠券('+uni.getStorageSync('TCount')+')')
			})
		},
		filters: {
			formatDate(value) {
			let date = new Date(Number(value) * 1000);
			let y = date.getFullYear();
			let MM = date.getMonth() + 1;
			MM = MM < 10 ? "0" + MM : MM;
			let d = date.getDate();
			d = d < 10 ? "0" + d : d;
			return y + "-" + MM + "-" + d;
			}
		},
		methods:{
			nav(index){
				 uni.setStorageSync('Tstatus',index);
				 this.page = 1;
				 this.data= [];
				 this.myCouponLists(index);
			},
			useFun() {
        uni.navigateTo({
          url:'modules/common/pages/list/index?type=2'
        })
			},
			myCouponLists(index){
				 this.status = index;
				 uni.showLoading({
				 	title:"获取数据中"
				 })
				let url = api.myCouponLists+
					'?status='+this.status+
					'&page='+this.page+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
                        var list = res.data.data.records.list;
                        for(var i in list){
                            _this.data.push(list[i]);
                        }
                            _this.countTotal = res.data.data.countTotal;
							uni.setStorageSync('TCount',res.data.data.countTotal.count);
							this.page++;
							uni.hideLoading()
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
		},
		mounted() {
			this.nav(3);
		}	
	}
</script>

<style lang="scss">
	.couponDiv{
		background-color: #f1f1f1;
		height: 100%;
		width: 100%;
	}
	.mainDiv{
		background-color: #f1f1f1;
	}
	.text-center{
		text-align: center;
	}
	.fl{
		float: left;
	}
	.text-right{
		text-align: right;
	}
	.fr{
		float: right;
	}
	.data-status{
		line-height: 100rpx;
		font-size:40rpx;
		color:#999;
	}
	.Navigation{
		height: 90rpx;
		width: 100%;
		box-sizing: border-box;
		padding:20rpx 0;
		border-bottom:2rpx solid #f5f5f5;
		border-top:2rpx solid #f5f5f5;
		background:#fff;
		display: flex;
		text-align: center;
		.li{
			width: 33.33333%;
			border-right:2rpx solid #ccc;
			box-sizing: border-box;
			line-height: 50rpx;
			font-size:26rpx;
			color:#666;
		}
		.li:last-child{
			border:none;
		}
		.li.active{
			color:#d02629;
		}
	}
	.content-wrap{
		padding:32rpx 20rpx;
		.conli{
			width: 100%;
			height: 220rpx;
			padding-left:27rpx;
			box-sizing: border-box;
			margin-bottom:20rpx;
			.item-pull-left{
				width: 400rpx;
			}
			.item-pull-right{
				width: 283rpx;
				padding-right:25rpx;
				box-sizing: border-box;
				padding-top:42rpx;
				.price{
					color:#fff;
					font-size:24rpx;
					.pm{
						font-size:50rpx;
						font-family: 'Aparajita';
					}
				}
			}
			.button{
				width: 126rpx;
				height: 55rpx;
				border-radius:10rpx;
				border:none;
				background:none;
				color:#fff;
				font-size:24rpx;
				text-align:center;
				line-height:55rpx;
				float:right;
			}
			   .status{
				font-size:24rpx;
				color:#E02828;
				padding-bottom:10rpx;
			}
			.h2{
				font-size:36rpx;
				padding-top:20rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.term{
				font-size:22rpx;
				color:#a5a5a5;
				padding-top:10rpx;
			}
			.timer{
				padding-top:10rpx;
				font-size: 25rpx;
				color:#757575;
			}
		}
		.conli.origin{
			background:url(@/static/images/common/coupon2.png) no-repeat;
			background-size:100% 100%;
			.h2{
				color:#E18752;
			}
			.button{
				background:#e02828;
				box-shadow: 8rpx 8rpx 0 #da8a12;
			}
		}
		 .conli.green{
			background:url(@/static/images/common/coupon3.png) no-repeat;
			background-size:100% 100%;
			.h2{
				color:#86B766;
			}
		  
			.button{
				background:#438524;
				box-shadow: 8rpx 8rpx 0 #68A24B;
			}
		}
		.conli.yellow{
			background:url(@/static/images/common/coupon1.png) no-repeat;
			background-size:100% 100%;
			.h2{
				color:#D3B881;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
			.status{
				font-size:24rpx;
				color:#E02828;
				padding-bottom:10rpx;
			}
			.button{
				background:#E02828;
				box-shadow: 8rpx 8rpx 0 #da8a12;
			}
		}
		.conli.gray{
			background:url(@/static/images/common/gray.png) no-repeat;
			background-size:100% 100%;
			.h2{
				color:#666;
			}
			.button{
				background:#aaa9a9;
				box-shadow: 8rpx 8rpx 0 #b8b8b8;
			}
		}

	}
</style>
