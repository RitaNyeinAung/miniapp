<template>
	<view>
		<view class="rech-amount">
			<text class="title">充值金额</text>
			<u-input type="number" v-model="name" class="input" placeholder="建议充值100元以上金额"/>
		</view>
		<view v-for="item in paymentType" :key="item.id" class="paymentDiv" @click="paymentMethod(item.id)">
			<image :src="config.image_url+item.logo" class="paylogo"></image>
			<text class="paytitle">{{item.type_name}}</text>
			<image src="@/static/images/common/btn-right.png" class="paybtn"></image>
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
				name:'',
				paymentType:''
			}
		},
		methods:{
			getPaymentType(){
				let _this = this;
				uni.request({
					url:api.rechargeType,
					success(result) {
						_this.paymentType = result.data.data;
					},
					fail(e) {
						console.log(e);
					}
				})
			},
		},
		mounted() {
			this.getPaymentType();
		},
		
	}
</script>

<style lang="scss">
    .rech-amount{
        border-bottom:2rpx solid #dfdfdd;
		border-top:2rpx solid #dfdfdd;
        padding:30rpx 20rpx;
        background:#fff;
		display: flex;
        .title{
            font-size: 32rpx;
            color:#333;
			width: 200rpx;
			line-height: 70rpx;
        }
        .input{
            width: 510rpx;
            border:none;
            text-indent: 40rpx;
            font-size: 32rpx;
            outline: none;
        }
    }
	.paymentDiv{
		display: flex;
		padding: 30rpx 20rpx;
		border-bottom:2rpx solid #dfdfdd;
		.paylogo{
			width: 83rpx;
			height: 83rpx;
		}
		.paytitle{
			font-size: 32rpx;
			color: #333;
			padding:20rpx 0 0 30rpx;
			width:600rpx;
		}
		.paybtn{
			width: 25rpx;
			height: 30rpx;
			margin:23rpx 0 0 0;
		}
	}
</style>
