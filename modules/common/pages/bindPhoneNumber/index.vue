<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">绑定手机号</view>
			<u-input class="input" type="number" v-model="tel" placeholder="请输入手机号" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">获取短信验证码</button>
			<view class="alternative">
				<view class="password"></view>
				<view class="issue">遇到问题</view>
			</view>
		</view>
	</view>
</template>

<script>
import api from '@/api'	
export default {
	data() {
		return {
			tel: '',
			token:''
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if(this.tel) {
				style.color = "#fff";
				style.backgroundColor = '#d02629';
			}
			return style;
		}
	},
	onLoad(options) {
		
		this.token = options.token;
	},
	methods: {
		submit() {
			if(this.$u.test.mobile(this.tel)) {
				uni.showLoading({
					title:"获取验证码中"
				})
				let _this = this;
				uni.request({
					url:api.getCodeByBindAccount,
					method:'POST',
					data:{
						mobile:this.tel,
						token:this.token
					},
					success(result) {
						uni.hideLoading()					
						if(result.data.status==1){
							uni.navigateTo({
								url:"modules/common/pages/bindVerificationCode/index?token="+_this.token+"&mobile="+_this.tel
							})
						}
						if(result.data.status==0){
							uni.showToast({
								title:"此手机号以绑定，请使用其他手机号",
								icon:"none"
							})
						}
					},
					fail(e) {
						uni.hideLoading()
						console.log(e);
					}
				})
		
			}else{
				uni.showToast({
					title:"请输入正确的手机号",
					icon:"none"
				})
			}
		}
	}
};
</script>

<style lang="scss">
.wrap {
	font-size: 28rpx;
	.content {
		margin: 80rpx 50rpx;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}
		input {
			text-align: left;
			padding: 15rpx;
		}

		.getCaptcha {
			background-color: rgba($color: $main-color, $alpha: 0.3);
			color: $u-tips-color;
			border: none;
			font-size: 30rpx;
			margin-top:50px;
			
			&::after {
				border: none;
			}
		}
		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}
	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content:space-between;
			
			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}
		
		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;
			
			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
