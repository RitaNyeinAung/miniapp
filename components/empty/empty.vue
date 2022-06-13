<template>
	<view class="empty">
		<view class="logo">
			<image src="@/static/images/common/empty-search.png"></image>
		</view>
		<view class="title">亲 没有商品哦~</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.empty{
		height: 100%;
		margin-top: 100px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		.logo{
			margin-bottom: 0px;
			image{
				width: 200px;
				height: 120px;
			}
			
		}
		
		.title{
			color:$font-color-light;
		}
	}
</style>
