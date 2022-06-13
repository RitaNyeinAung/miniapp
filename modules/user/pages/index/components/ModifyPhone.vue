<template>
	<view>
		<view class="from">
			<view class="input-main phone-number">
				<text class="icon"></text>
				<u-input type="text" maxlength="11" placeholder="请输入验证手机号码" v-model="mobile" class="uinput"></u-input>
			</view>
			<view class="input-main message">
				<text class="icon"></text>
				<u-input type="text" maxlength="4" placeholder="请输入短信验证码" v-model="message" class="uinput"></u-input>
				<view class="btn-ver" :class="{active:isActive}" @click="obtain">{{btnText}}</view>
			</view>
			<view class="btn-in" @click="changes">确认修改</view>
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
				message:'',
				btnText:'获取验证码',
				isActive:false,
				mobile:'',
			}
		},
		methods:{
			changes:function(){
				if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
					uni.showToast({
					 	title:"手机号码有误，请重填"
					 });
					return false; 
				};
				if(this.message.length !=4){ 
					 uni.showToast({
					  	title:"手机验证码有误，请重填"
					  });
					return false; 
				};
				let url = api.editMobile+
					'?mobile='+this.mobile+
					'&verify='+this.message+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.status==10001){
							// this.$router.push('/LogIn');
						}else{
						uni.showToast({
							title:res.data.message
						 });
						 if(res.data.status == 1){
							uni.navigateTo({
								url: '/modules/user/pages/index/components/settingPage',
								fail(e) {
									console.log(e)
								}
							})
						} 
					  }
					},
					fail: (err)=>{
						console.info('FailtrueErr', err);
					}
				});
			},
            obtain : function(){
                if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
					uni.showToast({
					 	title:"手机号码有误，请重填"
					 });
                    return false; 
                };
                var _this = this;
                if(this.isActive == true)return;
                this.isActive = true;
                var N = 60,
                    _this = this,
                    clear = null;
                this.btnText = '请'+ N +'秒后重试';
                this.isActive = true;
				let url = api.editMobileSendSms+
					'?mobile='+this.mobile+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.status==10001){
							// this.$router.push('/LogIn');
						}else{
						  uni.showToast({
						   	title:res.data.message
						   });
						  if(res.data.message=="该手机号已绑定其他账号!"){
								clearTimeout(clear)
								_this.isActive = false;
								  _this.btnText = '获取验证码';
								  _this.mobile = '';
						  }else if(res.data.status == 1){
						  }
						}
					},
					fail: (err)=>{
						console.info('FailtrueErr', err);
					}
				});
                clear = setInterval(function(){
                    _this.btnText = '请'+ N-- +'秒后重试';
                    if(N < 0){
                        clearInterval(clear);
                         _this.btnText = '再次获取验证码';
                         _this.isActive = false;
                    }
                },1000);
            }
		},
		mounted() {
			
		},
		
	}
</script>

<style lang="scss">
	.from{
		background:#fff;
		padding:0 20rpx;
		overflow:hidden;
		border-top: 1rpx solid #f1f1f1;
		.input-main{
			height:110rpx;
			margin-top:30rpx;
			position:relative;
			background:#f5f5f5;
			display:flex;
			line-height:110rpx;
			text-align:center;
			.icon{
				width:110rpx;
				height:100%;
				position:absolute;
				left:0;
				top:0;
			}
			.uinput{
				width:100%;
				border:none;
				background:#f5f5f5;
				border-radius:10rpx;
				font-size:28rpx;
				line-height:100%;
				margin:10px 0 0 70px;
			}
		}
		.phone-number{
			.icon{
				background:url(@/static/images/common/mobild.png) no-repeat center;
				background-size:36rpx 50rpx;
			}
		}
		.message{
			.icon{
				background:url(@/static/images/common/code.png) no-repeat center;
				background-size:41rpx 33rpx;
			}
			.btn-ver{
				width:188rpx;
				height:104rpx;
				position:absolute;
				right:4rpx;
				top:50%;
				margin-top:-52rpx;
				border:none;
				background:#fff;
				font-size:26rpx;
				color:#333;
				border-radius:10rpx;
				outline:none;
			}
			.btn-ver:active{
				background:#f9781e;
				color:#fff;
			}
			.btn-ver.active{
				background:#f9781e;
				color:#fff;
			}
		}
		.btn-in{
			width:100%;
			height:110rpx;
			line-height: 110rpx;
			border:none;
			border-radius:110rpx;
			outline:none;
			margin-top:30rpx;
			background:#d02629;
			font-size:36rpx;
			color:#fff;
			text-align: center;
		}
	}
</style>
