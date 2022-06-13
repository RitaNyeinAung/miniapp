<template>
	<view class="settled">
	  <view class="box">
		<image class="agreementSuc" :src="img" alt=""></image>
		<h4>您的开店申请已成功提交</h4>
		<view class="p">	  
		  我们将在3个工作日内（不包括国家法定假期）,完成审核并短信或邮件的方式通知您 <br/> 
		  您也可以登录<text class="shopIn">商家入驻中心</text> 及时查看审核状态；<br/>
		  店铺使用费及保证金需线下缴费，     请您联系400-168-1698进行确认打垮事宜。 <br/>
		  如有疑问请联系网站客服。
		</view>
		<view class="btnOk btn1" @click="reback">撤销申请</view>
		<view class="btnNo btn2" @click="toProgress">查看进度</view>
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
				img:require('@/static/images/common/agreementSuc.jpg')
			}
		},
		methods:{
			toProgress(){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/description',
					fail(e) {
						console.log(e)
					}
				})
			},
			reback(){
				uni.navigateTo({
					url: '/modules/shopOpen/indexShopOpen',
					fail(e) {
						console.log(e)
					}
				})
			}	
		},
		
	}
</script>

<style lang="scss">
	.settled{
		background:#f1f1f1;
		height:100%;
	}
	.box{
	  display: flex;
	  flex-direction: column;
	  justify-content: space-between;
	  align-items: center;
	  .agreementSuc{
	    width:142rpx;
	    height:142rpx;
	    margin-top: 50rpx;
	  }
	  h4{
	      color:#333333;
	      font-size: 36rpx;
	      margin: 25rpx 0 40rpx;
	      font-weight: 600;
	  }
	  .p{
	      color:#989898;
	      font-size:28rpx;
	      padding:0 30rpx;
	      line-height: 36rpx;
	  }
	  .btn1{
	      margin-top: 245rpx;
	  }
	  .btn2{
	      margin-top: 20rpx;
	  }
	}
	.shopIn{
	    color:#0479C6;
	    font-size: 28rpx;
	    padding:10rpx;
	}
	.btnOk{
	    margin-top: 80rpx;
		margin-left:auto;
		margin-right:auto;
		background-color: #d02629;
		color: #fff;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		width: 710rpx;
		height: 90rpx;
		border: 0;
		border-radius: 90rpx;
		text-align: center;
	}
	.btnNo{
	    margin-top: 80rpx;
		margin-left:auto;
		margin-right:auto;
		background-color: #B6B4B5;
		color: #fff;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		-webkit-justify-content: center;
		align-items: center;
		width: 710rpx;
		height: 90rpx;
		border: 0;
		border-radius: 90rpx;
		text-align: center;
	}
</style>
