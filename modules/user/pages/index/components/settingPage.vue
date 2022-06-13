<template>
	<view>
		<view class="content-wrap">
			<view class="dt clearfix" @click="toRouter()">
				<image class="fl" v-if="hdimg" :src="hdimg" ></image>
				<image class="fl" v-else src="@/static/images/common/my_user_pic.png"></image>
				<view class="user fl">
					<view class="userId">{{userInfo.nick_name}}</view>
					<view class="userName">用户名：{{userInfo.user_name}}</view>
				</view>
				<image class="icon-btn" src="@/static/images/common/btn-right.png"></image>
			</view>
			 <view @click="toggleAddress" class="dd">
					 我的收货地址
				<image class="icon-btn" src="@/static/images/common/btn-right.png"></image>
			</view>
			<view @click="tophone()" class="dd">
					 绑定手机号码
				<image class="icon-btn" src="@/static/images/common/btn-right.png"></image>
			</view>
			<view  class="toPass"></view>
			<view @click="changePassword" class="dd">
					修改密码
				<image class="icon-btn" src="@/static/images/common/btn-right.png"></image>
			</view>
		</view>
		<view class="footer" @click="signOut">退出当前账户</view>
		<u-popup v-model="popupVisible" mode="bottom">
			<view class="password-wrap">
				<view v-for="(item,index) in type" :key="item.id" @click="toChange(index)" class="li">{{item.t}}</view>
				<view @click="cancel" class="li">取消</view>
			</view>
		</u-popup>
		
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	import {mapState} from'vuex'
	export default {
		
		data(){
			return {
				config,
				data:'',
				popupVisible:false,
				type:[{t:'通过旧密码方式',r:'reset'},{t:'通过手机验证方式',r:'phoneVerify'}],
				hdimg: "",
				addressClass: 'none',
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods:{
			
			userinfo(){
				var pattern = /^((http|https|ftp):\/\/)/;
				if(!pattern.test(this.userInfo.user_header)) {
					this.hdimg = config.image_url+this.userInfo.user_header
				}else{
					this.hdimg = this.userInfo.user_header;
				}
			},
			signOut(){
				let url = api.logOut+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
            console.log(res);
						if(res.data.status == 1){
              uni.showToast({
                title:res.data.message
              })
              uni.navigateTo({
                url:"/modules/home/pages/index/index"
              })
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			toRouter(){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/personalData',
					fail(e) {
						console.log(e)
					}
				})
			},
			tophone(){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/ModifyPhone',
					fail(e) {
						console.log(e)
					}
				})
			},
			toChange(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/reset',
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/phoneVerify',
							fail(e) {
								console.log(e)
							}
						})
						break;
				}
			},
			changePassword(){
				this.popupVisible = true;
			},
			cancel(){
				this.popupVisible = false;
			},
			toggleAddress(){
				uni.navigateTo({
					url:"modules/user/pages/index/components/addressList",
				})
			}
		},
		mounted() {
			this.userinfo();
		}	
	}
</script>

<style lang="scss">
	.fl{
		float: left;
	}
	.content-wrap{
		background:#fff;
		.dt{
			padding:20rpx;
			// height:114rpx;
			position:relative;
			border-bottom:1rpx solid rgba($color: #000000, $alpha: 0.05);
			
			image{
				width:114rpx;
				height:114rpx;
				border-radius:100%;
				box-sizing:border-box;
			}
			.user{
				padding-left:30rpx;
				.userId{
					font-size:32rpx;
					color:#333;
					padding-top:10rpx;
				}
				.userName{
					padding-top:20rpx;
					font-size:26rpx;
					color:#999;
				}
			}
			.icon-btn{
				position:absolute;
				top:50%;
				right:20rpx;
				margin-top:-12rpx;
				width:14rpx;
				height:24rpx;
				background-size:100% 100%;
			}
		}
		.dd{
			height:90rpx;
			border-bottom:1rpx solid rgba($color: #000000, $alpha: 0.05);
			position:relative;
			font-size:28rpx;
			color:#3d4245;
			line-height:90rpx;
			padding:0 20rpx;
			.icon-btn{
				position:absolute;
				top:50%;
				right:20rpx;
				margin-top:-12rpx;
				width:14rpx;
				height:24rpx;
				background-size:100% 100%;
			}
		   
		}
		.toPass{
			height:15rpx;
			background-color: #f1f1f1;
			border: 0;
		}
	}
	.footer{
		height:90rpx;
		position:fixed;
		left:0;
		bottom:0;
		text-align:center;
		line-height:90rpx;
		background:#d02629;
		color:#fff;
		width:100%;
		font-size:32rpx;
	}
	.footer:active{
		box-shadow: 0 -10rpx 10rpx #ccc;
	}
	.mint-popup {
	font-size: 28rpx;
	background: none;
  }
	.password-wrap {
		width: 750rpx;
		text-align: center;
		.li {
			height: 80rpx;
			line-height: 80rpx;
			border-top: 2rpx solid #ccc;
			box-sizing: border-box;
			color: #26a2ff;
			font-size: 30rpx;
			background: #fff;
		}
		.li:nth-child(3) {
			margin-top: 20rpx;
		}
	}
</style>
