<template>
	<view class="wallet-wrap">
		<view class="balance-wrap">
			<view class="hd clearfix">
				<image :src="config.image_url+headerIMG" class="hd-port fl"></image>
				<view class="amount fl">
					<view class="title">账户余额</view>
					<view class="number text-single-hidden">
						{{money}}
					</view>
				</view>
			</view>
			<view class="btn-wrap clearfix text-center">
				<view class="li fl" @click="toRecharge()">我要充值</view>
			</view>
		</view>
		<view class="content">
			<view>
				<view class="header">使用明细</view>
				<view class="integral-wrap">
					<view @click="routeDet(detail.id)" v-for="(detail,index) in my_wallet" :key="index" class="inli">
						<view class="conFl">
							<image :src="imgs[detail.type]"></image>
							<view>
								<view class="h4">{{detail.description}}</view>
								<view class="h6">{{detail.recharge_time | temp2time}}</view>
							</view>
						</view>
						<view>
							<view class="h4">{{detail.changes_balance}}</view>
							<view class="span">完成</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
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
				loadingType: 'more',
				my_wallet:[],
				money: "",
				headerIMG:'',
				imgs: [
					require("@/static/images/common/default.png"),
					require("@/static/images/common/Recharge.png"),
					require("@/static/images/common/withdraw.png"),
					require("@/static/images/common/Refund.png")
				],
			}
		},
		components:{
			uniLoadMore,
		},
		onReachBottom(){
			this.loadData();
		},
		filters:{
			temp2time:function(value){
				if (!value) {
					return "";
				}
				var time = new Date(Number(value) * 1000);
				var Y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var H = time.getHours();
				var mi = time.getMinutes();
				var s = time.getSeconds();
				if (m < 10) {
					m = '0' + m;
				}
				if (d < 10) {
					d = '0' + d;
				}
				if (H < 10) {
					H = "0" + H;
				}
				if (mi < 10) {
					mi = '0' + mi;
				}
				if (s < 10) {
					s = "0" + s;
				}
				return (Y + "-" + m + "-" + d + " " + H + ":" + mi + ":" + s);
			}
		},
		methods:{
			async loadData(type='add', loading){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}

				let url = api.my_wallet+
					'?page='+this.page+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.status == 1){
							_this.money = res.data.data.balance;
							_this.headerIMG = res.data.data.header_img;
							for (let index = 0; index < res.data.data.balance_detail.length; index++) {
								_this.my_wallet.push(res.data.data.balance_detail[index]);
							}
							this.page++;
							this.loadingType = "more"
						}
						else if(res.data.status == 0){
							this.loadingType = "nomore"
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
				
			},
			routeDet(id) {
				uni.navigateTo({
					url: '/modules/user/pages/index/components/billingDetails?wallet_id='+id,
					fail(e) {
						console.log(e)
					}
				})
			},
			toRecharge() {
				// uni.navigateTo({
				// 	url: '/modules/user/pages/index/components/recharge',
				// 	fail(e) {
				// 		console.log(e)
				// 	}
				// })
			},
		},
		mounted() {
			this.loadData();
		},
		
	}
</script>

<style lang="scss">
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.wallet-wrap {
		background: #f1f1f1;
		.balance-wrap {
			background: linear-gradient(to right, #d02629, #EFB83A);
			.hd {
				padding: 60rpx 20rpx 73rpx;
				height: 112rpx;
				.hd-port {
					width: 112rpx;
					height: 112rpx;
					border-radius: 100%;
					box-sizing: border-box;
				}
				.amount {
					padding-left: 20rpx;
					.title {
						font-size: 24rpx;
						color: #fff;
						padding-bottom: 20rpx;
					}
					.number {
						font-size: 80rpx;
						color: #fff;
						line-height: 100%;
						font-family: 'Arial';
						width: 570rpx;
						height: 70rpx;
					}
				}
			}
			.btn-wrap {
				display: flex;
				justify-content: flex-end;
				padding: 0 20rpx;
				.li {
					padding: 0 60rpx;
					height: 80rpx;
					display: flex;
					align-items: center;
					font-size: 28rpx;
					margin-left: 30rpx;
					border-radius: 4rpx;
					&:first-child {
						background-color: #fff;
						color: #d02629;
					}
					&:last-child {
						background-color: #d02629;
						color: #fff;
					}
				}
				height: 110rpx;
			}
		}
		.content {
			.header {
				height: 70rpx;
				padding: 0 30rpx;
				line-height: 70rpx;
				font-size: 28rpx;
				font-weight: 500;
				border-top: 1rpx solid #E5E5E5;
				border-bottom: 1rpx solid #E5E5E5;
			}
			.integral-wrap {
				.inli {
					height: 150rpx;
					background-color: #fff;
					border-bottom: 1rpx solid #E5E5E5;
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding: 0 30rpx;
					.conFl {
						display: flex;
						align-items: center;
					}
					image {
						width: 90rpx;
						height: 90rpx;
						margin-right: 35rpx;
					}
					.h4 {
						font-size: 32rpx;
						font-weight: 500;
					}
					.h6 {
						font-size: 24rpx;
						color: #CACACA;
					}
					.span {
						font-size: 24rpx;
						color: #C2AC32;
					}
				}
			}
		}
	}
</style>
