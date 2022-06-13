<template>
	<view class="product-carousel">
		<u-swiper  class="u-skeleton u-skeleton-rect" border-radius="20" height="320"  :list="list" bg-color="#fdfdfd"></u-swiper>
		<u-skeleton v-if="list.length<=0" border-radius="20" :loading="true" :animation="true" bg-color="#ffffff" ></u-skeleton>
	
	</view>
	
</template>

<script>
	import config from '@/config'
	export default {
		props:[
			'banner'
		],
		data(){
			return {

			}
		},
		computed:{
			list(){
				//add image property to banner list from server
				return this.banner.map((b)=>{
					b.image = config.image_url+b.pic_url;
					return b;
				})
			}
		}
	}
</script>

<style lang="scss">
	
	.product-carousel{
		z-index: 1000;
		padding:0px 20rpx;
		margin-top:-100rpx;
		// border-radius: 20px;
		background-color: #f2f2f2;
	}
	
</style>
