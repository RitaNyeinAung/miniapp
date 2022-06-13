<template>
	<view>
    <view class="logoin-main">
        <view class="from">
            <view class="input-main phone-number">
                <text class="icon"></text>
                <u-input type="tel" maxlength="11" placeholder="请输入验证手机号码" v-model="mobile" class="poinput"></u-input>
            </view>
            <view class="input-main message">
                <text class="icon"></text>
                <u-input type="text" placeholder="请输入短信验证码" v-model="message" class="poinput"></u-input>
                <view class="btn-ver" :class="{active:isActive}" @click="obtain">{{btnText}}</view>
            </view>
            <view class="input-main passWord">
                <text class="icon"></text>
                <u-input type="password" placeholder="请输入密码...." v-model="password" class="poinput"></u-input>
            </view>
            <view class="input-main passWord">
                <text class="icon"></text>
                <u-input type="password" placeholder="请再次输入密码...." v-model="re_password" class="poinput"></u-input>
            </view>
            <view class="btn-in" @click="logoIn">确定</view>
        </view>
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
                password:'',
                re_password:'',
                isActive:false,
                message:'',
                btnText:'获取验证码',
                mobile:''
			}
		},
		methods:{
            logoIn(){
                if(!(/^1[34578]\d{9}$/.test(this.mobile))){ 
					uni.showToast({
						title:'手机号码有误,请重新输入'
					 });
                    return false; 
                };
                 if(isNaN(this.message.length)){ 
					uni.showToast({
						title:'请输入您的验证码'
					 });
                    return false; 
                };
                if(this.password.length<6 || this.password.length>16){
					uni.showToast({
						title:'请输入6-16位的密码'
					 });
                    return false; 
                }
                 if(this.re_password != this.password){
					uni.showToast({
						title:'两次输入的密码不同'
					 });
                    return false; 
                }
				let url = api.backPwd+
					'?mobile='+this.mobile+
					'&verify='+this.message+
					'&password='+this.password+
					'&re_password='+this.re_password+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
                    if(res.data.status == 1){
						uni.showToast({
							title:'修改密码成功'
						 });
                        sessionStorage.clear();
                        // this.$router.push('/LogIn');
                    }else{
						uni.showToast({
							title:res.data.message
						 });
                    }
					},
					fail: (err)=>{
						
					}
				});
            },
			obtain(){
				if(!(/^1[345789]\d{9}$/.test(this.mobile))){ 
					uni.showToast({
						title:'手机号码有误,请重新输入'
					 });
					return false; 
				};
				if(this.isActive == true)return;
				this.isActive = true;
				var N = 60,
					_this = this,
					clear = null;
					let url = api.backPwdSendSms+
						'?mobile='+this.mobile+
						'&token='+uni.getStorageSync('token');
					uni.request({
						url : url,
						success: (res) => {
							if(res.data.status == 1){
									uni.showToast({
										title:res.data.message
									 });
									_this.isActive = true;
									_this.btnText = '请'+ N +'秒后重试';
									_this.isActive = true;
									clear = setInterval(function(){
										_this.btnText = '请'+ N-- +'秒后重试';
										if(N < 0){
											clearInterval(clear);
											_this.btnText = '再次获取验证码';
											_this.isActive = false;
										}
									},1000);
							}else{
								uni.showToast({
									title:res.data.message
								 });
							}; 
						},
						fail: (err)=>{
							console.info('FailtrueErr', err);
						}
					});
			},
		},
		mounted() {
			
		},
		
	}
</script>

<style lang="scss">
    .logoin-main{
        padding:0 60rpx;
        background:#fff;
		border-top: 1rpx solid #f1f1f1;
        .from{
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
                .poinput{
                    width:100%;
                    // height:100%;
                    border:none;
                    background:#f5f5f5;
                    margin: 20rpx 0 0 110rpx;
                    border-radius:10rpx;
                    font-size:28rpx;
					line-height: 100%;
                }
            }
            .passWord{
                .icon{
                    background:url(@/static/images/common/password.png) no-repeat center;
                    background-size:44rpx 51rpx;
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
                    background:#ccc;
                    color:#333;
                }
                .btn-ver.active{
                    background:#ccc;
                    color:#333;
                }
            }
        }
        .btn-in{
            width:100%;
            height:110rpx;
            border:none;
            border-radius:40rpx;
            outline:none;
            margin-top:30rpx;
            background: #d02629;
            font-size:36rpx;
            color:#fff;
			text-align: center;
			line-height: 110rpx;
        }
    }
</style>
