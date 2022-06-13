<template>
		<view>
			<u-popup :value="showLoginPopup" mode="center" z-index="10000000" width="60%" border-radius="10" @close="close">
				<view class="login-popup" v-if="type=='popup'">
					<view class="icon">
						<image src="/static/images/common/login-popup.png" ></image>
						<text>您还没有登录哦！</text>
					</view>
					<view class="login">
						<button v-if="canUseGetUserProfile" @tap="getUserInfo" ref="getUser" :loading="loading">{{loading?"获取数据中":"微信一键登录"}}</button>
						<button v-else open-type="getUserInfo" @getuserinfo="getUserInfo" :loading="loading">{{loading?"获取数据中":"微信一键登录"}}</button>
					</view>
				</view>
			</u-popup>
			<view class="login" v-if="type=='btn'" >
				<button style="" v-if="canUseGetUserProfile" @tap="getUserInfo" ref="getUser" :loading="loading">{{loading?"获取数据中":"微信一键登录"}}</button>
				<button style="" v-else open-type="getUserInfo" @getuserinfo="getUserInfo" :loading="loading">{{loading?"获取数据中":"微信一键登录"}}</button>
			</view>
		</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex';
	import api from '@/api';
	export default {
		data(){
			return {
				loading:false,
				userInfo:null,
			}
		},
		computed:{
			...mapState(['showLoginPopup'])
		},
		props:[
			'type'
		],
		methods:{
			...mapMutations(['closeLoginPopup','setHasLogin']),
			close(){
				this.closeLoginPopup();
			},
			getUserInfo(e) {
				let code = '';
				this.loading=true;
				var that = this;
				uni.login({
					provider:'weixin',
					success(res) {
						if(res.code){
							that.code = res.code
							if(!that.canUseGetUserProfile){
								//么有的话调用微信低版本 getUserInfo
								uni.getUserInfo({
								  provider: 'weixin',
								  success: function (res) {
									that.userInfo = res;//用户信息
									that.loading = false;
									
									that.login();//获取 用户openid 等信息
								  },
								  fail(e){
									that.loading=false; 
								  	that.errorToast('获取信息失败')	
								  }
								});
							}
							uni.hideLoading();
						}
						else{
							that.loading=false;
							that.errorToast('获取信息失败')
						}
					},
					fail(err){
						uni.hideLoading();
						that.loading=false;
						that.errorToast('获取信息失败')
					}
				});
				if(!this.canUseGetUserProfile){
					return;
				}
				uni.getUserProfile({
					desc: '登录',
					success(res){
						that.userInfo = res;//用户信息
						that.login();//获取 用户openid 等信息
						that.loading = false;
						
						// that.getToken(code,res);
					},
					fail(e){
						that.loading=false;
						that.errorToast('获取信息失败')	
					}
				})
			
				
			},
			login(){
				uni.showLoading({
					title:'登录中'
				})
				var _this = this;
				uni.request({
					url: api.getOpenId,
					method: "POST",
					data: {
						code: _this.code,
						rawData:_this.userInfo.rawData,
						signature:_this.userInfo.signature,
						iv:_this.userInfo.iv,
						encryptedData:_this.userInfo.encryptedData,
						userInfo:JSON.stringify(_this.userInfo.userInfo)
					},
					timeout:10000,
					success(res) {									
						if(res.data.data&&res.data.data.token){
							if(res.data.data.bindAccount==1){
								//需要绑定手机号
								uni.navigateTo({
									url:"/modules/common/pages/bindPhoneNumber/index?token="+res.data.data.token
								})
							}else{
								uni.setStorageSync('token',res.data.data.token);
								
								uni.request({
									url:api.userinfo,
									method:"GET",
									data:{
										token:res.data.data.token
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
								
								uni.showToast({
									title:'登录成功'
								})	
							}
							uni.hideLoading();
							
							_this.closeLoginPopup();
							
						}else{
              uni.hideLoading();
              _this.errorToast('登录失败')
						}
						
						
					},
					fail(error) {
						console.log(error)						
						_this.errorToast('登录失败')
					}
				})
			},
			errorToast(text){
				uni.showToast({
					title:text,
					icon:'none',
					duration:2000,
					image : '/static/images/common/fail.svg'
				})
			}
		},
		onLoad(){
			if (uni.getUserProfile) {
				 //微信 8.0.2以上才有这个function
				this.canUseGetUserProfile= true		 
			}
		}
	}
</script>

<style lang="scss">
	.login-popup{
		.icon{
			width:100%;
			image{
				width:80px;
				height:80px;
			}
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			padding:30rpx 0rpx;
			text{
				font-size: 10px;
				padding-top:10rpx;
			}
		}
		
	}
	.login{
		padding:20rpx 30rpx 20rpx 30rpx;
		button{
			background-color: $main-color;
			color:white;
			border-radius: 25px;
			font-size: 13px;
		}
	}
</style>
