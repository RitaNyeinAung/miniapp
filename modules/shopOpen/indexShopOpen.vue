<template>
	<view class="open">
		<view class="icon">
			<image src="@/static/images/common/zy.png" alt=""></image>
		</view>
		<view class="btn" @click="initAgreement">填写资料，马上开店</view>
		<view @click="must" class="button">开店须知/入驻进度查询</view>
	</view>
</template>
<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		data(){
			return {
				config,
			}
		},
		methods:{
			initAgreement() {
				uni.navigateTo({
					url: '/shopOpen/pages/settledAgreement',
					fail(e) {
						console.log(e)
					}
				})
			},
			must() {
				uni.navigateTo({
					url: '/modules/user/pages/index/components/description',
					fail(e) {
						console.log(e)
					}
				})
			},
		},
	}
</script>
<style lang='scss'>
	.open{
		border-top: 2rpx solid #f1f1f1;
	}
	.icon{
		height: 440rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		image{
			width: 260rpx;
			height: 260rpx;
		}
	}
	.button{
		width: 710rpx;
		margin: 0 20rpx;
		height: 90rpx;
		background-color:#BABABA;
		border-radius: 90rpx;
		border:0;
		margin-top: 20rpx;
		color: #fff;
		font-size: 28rpx;
		line-height:90rpx;
		text-align:center;
	}
	.btn{
		background-color:  #d02629;
		width: 710rpx;
		margin: 0 20rpx;
		height: 90rpx;
		border-radius: 90rpx;
		border:0;
		margin-top: 20rpx;
		color: #fff;
		font-size: 28rpx;
		line-height:90rpx;
		text-align:center;
	}
</style>