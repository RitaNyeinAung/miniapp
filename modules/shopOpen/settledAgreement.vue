<template>
	<view class="box">
		<view class="blank"></view>
		<view class="boxChild">
			<h4 class="h4">《诚信经营承诺书》</h4>
			<text class="title-header">{{agreementContent1}}</text>
		</view> 
		<header>
			<image v-if="promise" class="okPng" @click="promiseClick" :src="xuanzhong" alt=""></image>
			<view v-if="!promise"  class="noPng" @click="promiseClick"></view>
		  <view @click="detailFun('诚信经营承诺书')">查看详情
		  <image class="rightImg" :src="rightImgs" alt=""></image>
		  </view>
		</header>
		<view class="boxChild">
			<h4 class="h4">《入驻协议》</h4>
			<text class="title-header">{{agreementContent2}}</text>
		</view>
		<header>
			<image v-if="settled" class="okPng" @click="settledClick" :src="xuanzhong" alt=""></image>
			<view v-if="!settled" @click="settledClick"  class="noPng"></view>
			<view @click="detailFun('入驻协议')">查看详情
			<image class="rightImg" :src="rightImgs" alt=""></image>
			</view>
		</header>
		<view class="btnOk" @click="admission('q')">企业入驻</view>
		<view class="btnNo" @click="admission('g')">个人入驻</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		 
		data(){
			return {
				config,
				rightImgs:require('@/static/images/common/right-icon.png'),
				xuanzhong:require('@/static/images/common/XIEYI.png'),
				promise:false,
				settled:false,
				agreementContent1:'',
				agreementContent2:'',
			}
		},
		methods:{
			detailFun(title){
				this.$store.state.agreenmentName = title;
				uni.navigateTo({
					url: '/modules/user/pages/index/components/agreementDetial?title='+title,
					fail(e) {
						console.log(e)
					}
				})
			},
			settledClick:function(){
				this.settled = !this.settled;
				  
			},
			promiseClick: function(){
				this.promise = !this.promise;
			},
			agreementFun(title){
			  let url = api.StoreHelp+
			  	'?title='+title+
			  	'&token='+uni.getStorageSync('token');
			  let _this = this;
			  uni.request({
			  	url : url,
			  	success: (res) => {
			  	  if(res.data.status == 10001){

			  	  }else if(res.data.status == 1){
              if(title == '诚信经营承诺书'){
                _this.agreementContent1 = res.data.data.info;
              }else{
                _this.agreementContent2 = res.data.data.info;
              }
            }
			  	},
			  	fail: (res)=>{
			  		console.log(res);
			  	}
			  })
			},
			admission(n){
				uni.removeStorage({key: 'admissionInfo' })
				uni.removeStorage({key: 'kd_address' })
				uni.removeStorage({key: 'kd_time' })
				if(!this.promise){
					uni.showToast({
						title:'请同意承诺书',
						icon:'none'
					})	
					return;
				}
				if(!this.settled){
					uni.showToast({
						title:'请同意协议',
						icon:'none'
					})	
					return;
				}
				let url = api.isCheckIn+
				'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
				url : url,
				success: (res) => {
				if(res.data.status == 1) {
					if(n == 'q'){
						uni.navigateTo({
							url: '/modules/shopOpen/companyShop/addInformation',
							fail(e) {
								console.log(e)
							}
						})
					}else{
						uni.navigateTo({
							url: '/modules/shopOpen/perShop/addInformation',
							fail(e) {
								console.log(e)
							}
						})
					}
				}else{
					uni.showToast({
						title:res.data.message,
						icon:'none'
					})
				}
				},
				fail: (res)=>{
					console.log(res);
				}
				})
			}
		},
		mounted() {
		  this.agreementFun('诚信经营承诺书');
		  this.agreementFun('入驻协议');
		}
		
	}
</script>

<style lang="scss">
	.box{
		.blank{
			background-color: #f1f1f1;
			border-top: 2rpx solid #f1f1f1;
		}
	    .boxChild{
	        padding: 10rpx 25rpx;
	        background-color: #fff;
	        .h4{
	            font-size: 34rpx;
	            padding: 20rpx 10rpx;
	        }
	        .title-header{
	            font-size: 30rpx;
	            line-height: 120%;
	            color: #545454;
	            display: -webkit-box;
	            overflow: hidden;
	            white-space: normal!important;
	            text-overflow: ellipsis;
	            word-wrap: break-word;
	            -webkit-line-clamp: 3;
	            -webkit-box-orient: vertical;
	        }
	    }
	}
	 .rightImg{
	    width: 20rpx;
	    height: 27rpx;
	    margin: 0 10rpx;
	}
	header{
	    background-color: #F8F8F8;
	    height: 90rpx;
	    display: flex;
	    padding: 0 30rpx;
	    justify-content: space-between;
	    align-items: center;
	    color: #999;
	    view{
	        font-size: 36rpx;
	    }
	}
	.okPng{
	    width: 50rpx;
	    height: 50rpx;
	}
	.noPng{
	    width: 46rpx;
	    height: 46rpx;
	    border-radius: 50%;
	    border:1px solid #CDCDCD;
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
