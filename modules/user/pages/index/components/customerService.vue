<template>
	<view class="customer">
		<view class="notice-wrap">
			<text class="title">公告</text>
			<view class="bar">
				<u-notice-bar mode="horizontal" :is-circular="false" :list="announcement" type="error" :more-icon="false"></u-notice-bar>
			</view>
			<text @click="Notice" class="link">更多</text>
		</view>	
		<view class="service">
			<view class="dt">在线客服</view>
			<view class="dd">
				<view class="img-wrap">
					<image src="@/static/images/common/qq.png" class="img1"></image>
				</view>
				<view class="p">qq咨询</view>
			</view>
			<view class="dd" @click="phoneMsg">
				<view class="img-wrap">
					<image src="@/static/images/common/telephone.png" class="img2"></image>
				</view>
				<view class="p">电话咨询</view>
			</view>
			<view @click="message" class="dd">
				<view class="img-wrap">
					<image src="@/static/images/common/mes.png" class="img3"></image>
				</view>
				<view class="p">在线留言</view>
			</view>
		</view>
		<view class="problem">
			<view class="title">问题查询</view>
			<view class="item-wrap">
				<view class="item-main" v-for="item in data_con" :key="item.id">
					<view class="dt">{{item.name}}</view>
					<view class="dd">
						<text class="span" v-for="items in item.typeTwo" :key="items.id" @click="tolink(items)">{{items.name}}</text>
					</view>
				</view>
			</view>
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
				announcement:[],
				data_con:''
			}
		},
		methods:{
			getHomeData(){
				let _this = this;
				uni.request({
          method: "POST",
          url: api.getHome,
          data: {token:uni.getStorageSync("token")},
					success(result) {
						_this.announcement = result.data.data.announcement.map((a)=>{
							return a.title;
						});
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			helpClass(){
				let _this = this;
				uni.request({
          method: "POST",
					url:api.helpClass,
          data: {token:uni.getStorageSync("token")},
					success(result) {
						_this.data_con = result.data.data;
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			Notice(){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/Notice',
					fail(e) {
						console.log(e)
					}
				})
			},
			message(){
        uni.showModal({
          title: '在线留言',
          content: '功能正在开发中....',
        })
				// uni.navigateTo({
				// 	url: '/modules/user/pages/index/components/message',
				// 	fail(e) {
				// 		console.log(e)
				// 	}
				// })
			}
		},
		mounted() {
			this.getHomeData();
			this.helpClass();
		}
		
	}
</script>

<style lang="scss">
	.customer{
		background-color: #f1f1f1;
		height: 100%;
	}
	.notice-wrap {
		height: 90rpx;
		padding: 10rpx 0;
		background: #fff;
		line-height: 60rpx;
		display: flex;
		border-top: 2rpx dotted #f1f1f1;
		border-bottom: 2rpx dotted #f1f1f1;
		.title {
			width: 150rpx;
			font-size: 32rpx;
			color: #111;
			box-sizing: border-box;
			text-align: center;
		}
		.bar {
			width: 480rpx;
			line-height: 60rpx;
		}
		.link {
			width: 150rpx;
			box-sizing: border-box;
			font-size: 28rpx;
			color: #333;
			text-align: center;
		}
	}
	.service {
		.dt {
			width: 710rpx;
			height: 90rpx;
			line-height: 90rpx;
			padding: 0 20rpx;
			font-size: 26rpx;
			color: #555;
			float: left;
		}
		.dd {
			background: #fff;
			height: 230rpx;
			width: 33.3333333333%;
			box-sizing: border-box;
			border-right: 2rpx solid #dfdfdf;
			border-bottom: 2rpx solid #dfdfdf;
			float: left;
			text-align: center;
			.img-wrap {
				padding-top: 70rpx;
				height: 70rpx;
			}
			.p {
				font-size: 28rpx;
				color: #555;
				line-height: 170rpx;
			}
		}
		.dd:last-child {
			border-right: 0;
		}
		.img1 {
			width: 56rpx;
			height: 60rpx;
		}
		.img2 {
			width: 65rpx;
			height: 55rpx;
		}
		.img3 {
			width: 68rpx;
			height: 54rpx;
		}
	}
	.problem {
		.title {
			// width: 710rpx;
			// height: 90rpx;
			line-height: 90rpx;
			padding: 0 20rpx;
			font-size: 26rpx;
			color: #555;
		}
		.item-wrap {
			padding-top: 30rpx;
			background: #fff;
			// overflow: hidden;
			.item-main {
				width: 710rpx;
				height: 160rpx;
				padding: 0 20rpx 0;
				margin-bottom: 20rpx;
				.dt {
					// width: 160rpx;
					// height: 160rpx;
					box-sizing: border-box;
					padding: 40rpx 45rpx;
					float: left;
					background: #fde7e8;
					color: #ba4c52;
					font-size: 32rpx;
				}
				.dd {
					width: 540rpx;
					height: 160rpx;
					float: left;
					text-align: center;
					.span {
						width: 50%;
						height: 50%;
						line-height: 80rpx;
						background: #fafafa;
						font-size: 26rpx;
						color: #555;
						float: left;
					}
				}
			}
			.item-main:nth-child(2n) {
				.dt {
					background: #fdf8e7;
					color: #b38835;
					float: left;
				}
			}
			.item-main:nth-child(3n) {
				.dt {
					background: #e8faff;
					color: #3b7d8f;
					float: left;
				}
			}
		}
	}
</style>
