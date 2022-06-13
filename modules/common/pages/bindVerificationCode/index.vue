<template>
	<view class="wrap">
		<view class="key-input">
			<view class="title">输入验证码</view>
			<view class="tips">验证码已发送至 {{mobile}}</view>
			<u-message-input :focus="true" :value="value" @change="change" @finish="finish" mode="bottomLine" :maxlength="maxlength"></u-message-input>
			<text :class="{ error: error }">验证码错误，请重新输入</text>
			<view class="captcha">
				<text :class="{ noCaptcha: show }" @tap="noCaptcha">收不到验证码点这里</text>
				<text :class="{ regain: !show }">{{ second }}秒后重新获取验证码</text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {mapMutations} from 'vuex';
export default {
	data() {
		return {
			maxlength: 6,
			value: '',
			second: 60,
			show: false,
			error: false,
			token:'',
			mobile:null
		};
	},
	computed: {},
	onLoad(options) {
		
		this.token = options.token;
		this.mobile = options.mobile;

		// this.getCaptcha()
		let interval = setInterval(() => {
			this.second--;
			if (this.second <= 0) {
				this.show = true;
				// if (this.value.lenth != 4) {
				// 	this.error = true;
				// }
				clearInterval(interval);
			}
		}, 1000);
	},
	methods: {
		...mapMutations([
			'setHasLogin'
		]),
		
		// 收不到验证码选择时的选择
		noCaptcha() {
			let _this = this;
			uni.showActionSheet({
				itemList: ['重新获取验证码'],
				success: function(res) {
					uni.request({
						url:api.getCodeByBindAccount,
						method:'POST',
						data:{
							mobile:_this.mobile,
							token:_this.token
						},
						success(result) {
							uni.hideLoading()					
							uni.showToast({
								title:"已重新获取",
								icon:"none"
							})
							_this.second = 60;
							_this.show = false;
							let interval = setInterval(() => {
								_this.second--;
								if (_this.second <= 0) {
									_this.show = true;
									// if (this.value.lenth != 4) {
									// 	this.error = true;
									// }
									clearInterval(interval);
								}
							}, 1000);
						},
						fail(e) {
							uni.hideLoading()
							console.log(e);
						}
					})
				},
				fail: function(res) {
					
				}
			});
		},
		// change事件侦听
		change(value) {
			// console.log('change', value);
			let _this = this;
			if(value.length==6){
				uni.showLoading({
					title:"验证中"
				})
				uni.request({
					url:api.submitVerificationCode,
					method:"POST",
					data:{
						mobile:_this.mobile,
						verify:value,
						token:_this.token
					},
					success(result) {
						uni.hideLoading()
						if(result.data.status==1){
							uni.showToast({
								title:"手机号绑定成功",
								icon:"none"
							})
							uni.setStorageSync('token',result.data.data.token);
							uni.request({
								url:api.userinfo,
								data:{
									token:result.data.data.token
								},
								success(result) {
									uni.request({
										url:api.getUserAddress,
										data:{
											token:uni.getStorageSync("token")||"-"
										},
										method:"POST",
										success(res) {
											if(res.data.data){														
												uni.setStorageSync("addressList",JSON.stringify(res.data.data));
											}
										},
										fail(e) {
											console.log(e);
										}
									});
									uni.setStorageSync('userInfo',result.data.data);
								},
								fail() {
									uni.showToast({
										title:"获取用户数据失败",
										icon:'none'
									})
								}
							})
							_this.setHasLogin(true);
							_this.$emit("logged");
							uni.navigateBack({
								delta:2
							})
						}else{
							uni.showToast({
								title:result.data.message,
								icon:"none"
							})
						}
						console.log(result)
					},
					fail(e) {
						uni.hideLoading()
						uni.showToast({
							title:"验证码错误",
							icon:"none"
						})
						console.log(e);
					}
				})
			}
		},
		// 输入完验证码最后一位执行
		finish(value) {
			// console.log('finish', value);
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	padding: 80rpx 50rpx;
}

.box {
	margin: 30rpx 0;
	font-size: 30rpx;
	color: 555;
}

.key-input {
	padding: 30rpx 0;
	text {
		display: none;
	}
	.error {
		display: block;
		color: red;
		font-size: 30rpx;
		margin: 20rpx 0;
	}
}

.title {
	font-size: 50rpx;
	color: #333;
	text-align: center;
}

.key-input .tips {
	font-size: 30rpx;
	color: #333;
	margin-top: 20rpx;
	margin-bottom: 60rpx;
	text-align: center;
}
.captcha {
	color: $u-type-warning;
	font-size: 30rpx;
	margin-top: 40rpx;
	text-align: center;
	.noCaptcha {
		display: block;
	}
	.regain {
		display: block;
	}
}
</style>
