<template>
	<view>
		<view class="wrap">
			<view class="input-main passWord">
				<text class="icon"></text>
				<u-input type="password" placeholder="请输入原密码...." v-model="pass" class="rinput"></u-input>
			</view>
			 <view class="input-main passWord">
				<text class="icon"></text>
				<u-input type="password" placeholder="请输入新密码...." v-model="password" class="rinput"></u-input>
			</view>
			<view class="input-main passWord">
				<text class="icon"></text>
				<u-input type="password" placeholder="请再次输入新密码...." v-model="re_password" class="rinput"></u-input>
			</view>
			
			<view class="btn-in" @click="register">确定</view>
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
                pass:''
			}
		},
		methods:{
            register(){
                if(this.password.length<6&&this.password.length>12){
					uni.showToast({
						title:'请输入密码'
					 });
                    return false;
                }
                 if(this.re_password !=this.password){
					uni.showToast({
						title:'再次输入的密码不一致'
					 });
                    return false;
                }
                 if(this.password.length<6 ||this.re_password.length<6){
					uni.showToast({
						title:'请至少输入6位'
					 });
                 	return false;
                 }
				 let url = api.resetPassword+
				 	'?password='+this.pass+
				 	'&new_password1='+this.password+
					'&new_password2='+this.re_password+
					'&token='+uni.getStorageSync('token');
				 let _this = this;
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
            }
		},
		mounted() {
			
		},
		
	}
</script>

<style lang="scss">
	.wrap{
		padding:0 60rpx;
		background:#fff;
		border-top: 1rpx solid #f1f1f1;
		.input-main{
			height:110rpx;
			margin-top:30rpx;
			position:relative;
			display: flex;
			background:#f5f5f5;
			.icon{
				width:110rpx;
				height:100%;
				position:absolute;
				left:0;
				top:0;
			}
			.rinput{
				width:100%;
				// height:100%;
				border:none;
				background:#f5f5f5;
				// text-indent:110rpx;
				border-radius:10rpx;
				font-size:28rpx;
				line-height:100%;
				margin: 20rpx 0 0 110rpx;
			}
		}
		.passWord{
			.icon{
				background:url(@/static/images/common/password.png) no-repeat center;
				background-size:44rpx 51rpx;
			}
		}
		.btn-in{
			width:100%;
			height:110rpx;
			border:none;
			border-radius:110rpx;
			outline:none;
			margin-top:30rpx;
			background:#d02629;
			font-size:36rpx;
			color:#fff;
			margin-bottom:50rpx;
			text-align: center;
			line-height: 110rpx;
		}
		.btn-in:active{
			box-shadow: 0 10rpx 10rpx #ccc;
		}
	}  
</style>
