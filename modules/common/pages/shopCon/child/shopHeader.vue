<template>
	<view class="search">
		<view class="search_header">
			<u-search height="60" disabled="true" :show-action="false" placeholder="搜索店内宝贝..." @click="searchGoods" class="search"></u-search>
			<view class="shopclass" @click="shopclass">
				<image src="@/static/images/common/shop_class.png"></image>
				<view class="img-txt">分类</view>
			</view>
<!-- 			<view class="btn-ng" @click="addClass">
				<text class="fl"></text>
				<text class="fl"></text>
				<text class="fl"></text>
			</view>	 -->		
		</view>
	</view>	
</template>
<script>
	import api from '@/api.js';
	export default {
		data(){
			return {
				
			}
		},

		methods:{
			searchGoods(){
				let routeId = uni.getStorageSync("routeId");
				uni.navigateTo({
					url: `/modules/common/pages/search/SearchStoreGoods?id=${routeId}`
				})
			},
			shopclass(){
				let routeId = uni.getStorageSync("routeId");
				uni.navigateTo({
					url: '/modules/common/pages/shopCon/shopList?id='+routeId
				})
			},
		},
		
	}
	
</script>

<style lang="scss">
	.search{
		position:fixed;
		width: 100vw;
		z-index: 100;
	}
	.search_header{	
		width: 100%;
		height: 62rpx;
		// background: #003d34;
		padding: 16rpx 0;
		text-align:center;
		position:relative;
		color:#fff;
		font-size:36rpx;
		font-weight:bold;
		line-height:62rpx;
		position:fixed;
		top:0;
		left:0;
		z-index:1;
		display: flex;
        .btnGo{
            position:absolute;
            left:20rpx;
            top:50%;
            margin-top:-5rpx;
            width:46rpx;
            height:46rpx;
            background-size:100% 100%;
        }
		.search{
			width:475rpx;
			margin-left:100rpx;
			background:none;
		}
		.shopclass{
			width:50rpx;
			margin:-15rpx 20rpx 0 20rpx;
			position:absolute;
			right:85rpx;
			height:90rpx;
		    image{  
		        width: 45rpx;
		        height: 25rpx;
		    }
		    .img-txt{
		        font-size: 18rpx;
				line-height: 23rpx;
		    }
		}
        .btn-ng{
            position:absolute;
            top:0;
            right:20rpx;
            height: 100%;
			display: flex;
            .fl{
                display:block;
                width:12rpx;
                height:12rpx;
                border:6rpx solid #fff;
                border-radius:50%;
                box-sizing:border-box;
                margin-left:10rpx;
                margin-top:44rpx;
            }
        }
		
	}

</style>
