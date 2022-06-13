<template>
	<view>
		<view class="hd1 clearfix">
			<view class="title fl">{{text}}
				<text class="colorr" v-if="prompt">{{prompt}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			text: null,
			prompt: ''
		},
		methods: {}
	}
</script>

<style lang="scss">
	.hd1 {
		padding: 20rpx;
		background-color:#f1f1f1;
		.title {
			border-left: 6rpx solid #d02629;
			padding-left: 20rpx;
			font-size: 32rpx;
			color: #111111;
		}
		.colorr {
			font-size: 18rpx;
			color: #989898;
		}
	}
</style>
