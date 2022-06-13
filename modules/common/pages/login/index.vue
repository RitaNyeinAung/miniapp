<template>
	<view class="container">
		<!-- <view class="left-bottom-sign"></view> -->
		<image class="login_back" src="@/static/images/common/login_background.png"></image>
			
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<!-- <view class="wrapper" > -->
			<!-- <view class="left-top-sign">LOGIN</view> -->
			<!-- <view class="welcome" >
				用户登录
			</view> -->
			
			<!-- <button class="confirm-btn" @click="toLogin" >微信授权登录</button> -->
			<!-- <view class="forget-section">
				Forget password?
			</view> -->
		<!-- </view> -->
		<!-- <view class="register-section">
			Doesn't has an account?
			<text @click="toRegist">Create one</text>
		</view> -->
		
		<view class="login_place">
			<view class="login_data">
				<view class="data_top">
					<image class="finger_print" src="@/static/images/common/fingerPrint.png"></image>
					<view class="login_text">
						<view class="user_login">用户登录</view>
						<view class="development_system">城创云.开发体系</view>
					</view>
				</view>
				<view class="login_button">
					<button class="btn_data">微信授权登录</button>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import api from '@/api.js';
	import {  
        mapMutations  
    } from 'vuex';
	
	export default{
		data(){
			return {
			
			}
		},
		onLoad(){
			
		},
		methods: {
			
			storeUserInfo(data){
				this.$store.commit('login',data);
				uni.navigateBack();
			},
			toLogin(){
				
			}
		},
		watch:{
			
		}
	}
</script>

<style lang='scss'>
	page{
		background: #fff;
	}
	.container{
		/* padding-top: 115px; */
		position:relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}
	.login_back {
		width: 100%;
		height: 100%;
	}
	.login_place {
		margin-top: -1000rpx;
		.login_data {
			padding: 20rpx;
			.data_top {
				display: flex;
				justify-content: center;
				padding:40rpx;
				.finger_print {
					width: 66rpx;
					height: 90rpx;
				}
				.login_text {
					padding:0 20rpx;
					line-height:50rpx;
					.user_login {
						font-size:40rpx;
						color:#fff;
					}
					.development_system {
						font-size: 24rpx;
						color:#fff;
					}
				}
			}
			.login_button {
				justify-content: center;
				.btn_data {
					background-color:#ebd3bd;
					color:#fff;
					width:285rpx;
					border-radius:50rpx;
					font-size:28rpx;
					border:1rpx solid #fff;
					height:60rpx;
					line-height:52rpx
				}
			}
		}
	}
	.wrapper{
		position:relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}
	
	
	.welcome{
		position:relative;
		top: -90upx;	
		text-align: center;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0,0,0,.3);
	}
	

	.confirm-btn{
		width: 630upx;
		height: 90upx;
		
		margin-top: 70upx;
		
		background: $main-color;
		color: #fff;
		font-size: $font-lg;
		&:after{
			border-radius: 100px;
		}
	}
	
</style>
