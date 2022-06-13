<template>
	<view class="search">
		<view :class="['search-page']">
			<view class="search-page-header">
				<u-search height="60" :focus="true" placeholder="搜索宝贝,店铺..." action-text="取消" @click="remove"></u-search>
			</view>
			<view class="hot-search">
				<text class="content">
					
				</text>
			</view>
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
			// remove() {
			//   this.$router.go(-1);
			// }
		},		
	}
	
</script>

<style lang="scss">
	.search{
		position:fixed;
		width: 100vw;
		z-index: 100000;
	}	
	.search-page{
		background-color: white;
		position: absolute;
		height: 100rpx;
		top:0;
		width: 100vw;
		min-height:100vh;
		z-index: 1000;
		.search-page-header{
			height: 80rpx;
			padding:10rpx 30rpx;
	
		}
	}

</style>
