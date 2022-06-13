<template>
	<view class="shopLists">
		<view class="lit-ul">
			<view class="header" @click="goToShopHome">
			        <text class="lit-txt">全部宝贝</text>
			        <image src="@/static/images/common/btn-right.png"></image>
			</view>
			<u-collapse class="shoplevel-coll">
				<u-collapse-item v-if="outers.level == 0" v-for ="(outers,index) in shopLevel" :key="outers.id"class="shoplevel-item">
					<view slot="title" class="first">
						<text class="shoplevel1-name">{{outers.class_name}}</text>
						<image src="@/static/images/common/btn-right.png" class="shoplevel1-img" @click="goToLevel(outers.id,outers.class_name)"></image>
					</view>					
					<view class="second" v-if="cores.level==1 && cores.f_id == outers.id" v-for="(cores) in shopLevel" :key="cores.id" @click="goToLevelTwo(cores.id,cores.class_name)">
						<text class="shoplevel2-name">{{cores.class_name}}</text>
						<image src="@/static/images/common/btn-right.png" class="shoplevel2-img"></image>
					</view>
					<view class="third" v-if="core.level==2 && core.f_id == cores.id" v-for="(core) in shopLevel" :key="core.id" @click="goToLevelThree(core.id,core.class_name)">
						<text class="shoplevel3-name">{{core.class_name}}</text>
						<image src="@/static/images/common/btn-right.png" class="shoplevel3-img"></image>
					</view>	
				</u-collapse-item>
			</u-collapse>
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
				shopLevel:[],
				index:['0'],
			}
		},
		methods:{
			goToShopHome(){
				let routeId = uni.getStorageSync("routeId");
				uni.navigateTo({
					url: '/modules/common/pages/shopCon/shopHome?id='+routeId+'&index='+1,
				})
			},
			levelStoreClass(){
				let routeId = uni.getStorageSync("routeId");
				let _this = this;
				let url = api.levelStoreClass+
					'?store_id='+routeId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.shopLevel = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			goToLevel(id,name){
				let routeId = uni.getStorageSync("routeId");
				uni.navigateTo({
					url: '/modules/common/pages/shopCon/shopLevel?id='+routeId+'&class_name='+name+'&level_one='+id+'&level_two='+''+'&level_three='+'',
					fail(e) {
						console.log(e)
					}
				})
			},
			goToLevelTwo(id,name){
				let routeId = uni.getStorageSync("routeId");
				uni.navigateTo({
					url: '/modules/common/pages/shopCon/shopLevel?id='+routeId+'&class_name='+name+'&level_one='+''+'&level_two='+id+'&level_three='+'',
					fail(e) {
						console.log(e)
					}
				})
			},
			goToLevelThree(id,name){
				let routeId = uni.getStorageSync("routeId");
				uni.navigateTo({
					url: '/modules/common/pages/shopCon/shopLevel?id='+routeId+'&class_name='+name+'&level_one='+''+'&level_two='+''+'&level_three='+id,
					fail(e) {
						console.log(e)
					}
				})
			},
		},
		mounted() {
			this.levelStoreClass();
		}
		
	}
</script>

<style lang="scss">
	.shopLists{
		background-color: #f1f1f1;
		.lit-ul{
			overflow: hidden;
			.header{
				margin:20rpx 0;
				border:1rpx solid #EEEEEE;
				padding: 0 25rpx;
				height: 90rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				.lit-txt{
					font-size: 28rpx;
				}
				image{
					width: 15rpx;
					height: 25rpx;
				}
			}
			u-icon{
				display: none;
			}
			.u-collapse-head{
				border-top:2rpx solid #f1f1f1;
				line-height: 2;
				padding: 0;	
			}
			.shoplevel-coll{
				background-color: #fff;
				
			}
			.shoplevel-item{
				border-bottom:2rpx solid #EEEEEE;
				
			}
			.first{
				padding: 25rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				width:100%;
				.shoplevel1-name{
					font-size: 28rpx;
				}
				.shoplevel1-img{
					width: 15rpx;
					height: 25rpx;
					margin: 0 0 0 auto;
				} 
			}
			.second{
					padding: 25rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					background-color: #fff;
				.shoplevel2-name{
					font-size: 28rpx;
					padding: 0 0 0 50rpx;
				}
				.shoplevel2-img{
					width: 15rpx;
					height: 25rpx;
				}
			}
			.third{
				padding: 25rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				background-color: #fff;
				.shoplevel3-name{
					font-size: 28rpx;
					padding: 0 0 0 100rpx;
				}
				.shoplevel3-img{
					width: 15rpx;
					height: 25rpx;
				}
			}
		}	
	}
</style>
