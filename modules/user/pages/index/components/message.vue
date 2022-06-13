<template>
	<view>
		<view class="ordinary">
			<view class="li">
				<view class="span">在线留言:</view>
				<u-input type="textarea" v-model="con" class="input"/>
				<view class="Logo">{{text}}/140</view>
			</view>
			
		</view>
		<view class=" protect" @click="protact">确认提交</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		data(){
			return {
				config,
				con:'',
				text:0
			}
		},
		watch: {
			con:function(){
				this.text = this.con.length;
			}
		},
		methods:{
			protact(){
				if(this.con==''){
					uni.showToast({title:'留言不能为空'});
					return;
				}
				let url = api.onlineMessage+
					'?question='+this.con+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.status == 1){
							// uni.navigateTo({
							// 	url: '/modules/IntegralMall/document',
							// 	fail(e) {
							// 		console.log(e)
							// 	}	
							// })
							uni.showToast({title:res.data.message});
						}
						else{
							uni.showToast({title:res.data.message});
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
		},
	}
</script>

<style lang="scss">
	.ordinary{
		width: 100%;
		height: 90%;
		border-top: 2rpx solid #f1f1f1;
	    .li{
	        background-color: #fff;
	        padding: 20rpx 25rpx;
	        .span{
	            color: #727272;
	            font-size: 28rpx;
				padding:5rpx 0 15rpx 0;
	        }
	        .input{
				height: 500rpx;
	        	border: 0;
	        	font-size: 25rpx;
	        }
	    }
	}
	.protect{
		width: 100%;
		height: 100rpx;
		font-size: 25rpx;
		text-align: center;
		line-height: 100rpx;
		background: #d02629;
		color: #ffffff;
		position: absolute;
		bottom: 0;
	}
</style>
