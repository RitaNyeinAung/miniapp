<template>
	<view class="Notice">
		<view class="blank"></view>
		<view class="content-wrap" v-for="item in announcement" :key="item.id" @click="hit(item.id)">
			<image class="img" src="@/static/images/common/gg.png"></image>
			<view class="title">{{item.title}}</view>
			<view class="create">{{item.create_time}}</view>
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
			}
		},
		onLoad(){
			this.aboutEtcetera();
			uni.setNavigationBarTitle({
				title:decodeURIComponent(uni.getStorageSync('mainNameLocal')+'公告')
			})
		},
		methods:{
			getHomeData(){
				let _this = this;
				uni.request({
					url:api.getHome,
					success(result) {
						_this.announcement = result.data.data.announcement;
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			aboutEtcetera(){
				let _this = this;
				uni.request({
					url:api.aboutEtcetera,
					success(result) {
						uni.setStorageSync('mainNameLocal',result.data.data.intnet_title);
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			hit(id){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/noticeChild?id='+id,
					fail(e) {
						console.log(e)
					}
				})
			}
		},
		mounted() {
			this.getHomeData();
		}
		
	}
</script>

<style lang="scss">
	.Notice{
		background-color: #f1f1f1;
		height: 100%;
		.blank{
			background-color: #f1f1f1;
			border-top: 2rpx solid #f1f1f1;
		}
		.content-wrap{
			display: flex;
			background: #fff;
			padding: 25rpx 20rpx;
			margin: 20rpx;
			border-radius: 10rpx;
			.title{
				font-size: 32rpx;
				width:310rpx;
				padding:0 0rpx 0 20rpx;
				overflow:hidden;
				text-overflow:ellipsis;
				display:-webkit-box;
				-webkit-line-clamp:1;
				-webkit-box-orient:vertical;
				line-height: 50rpx;
			}
			.img{
				width: 53rpx;
				height: 53rpx;
			}
			.create{
				font-size: 32rpx;
				line-height: 50rpx;
			}
		}
	}
</style>
