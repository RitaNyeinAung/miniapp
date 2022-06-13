<template>
	<view>
		<div class="paper-container">
			<view class="h4">{{mainNameLocal}}商城网点经营者营业执照信息</view>
			<view class="paper-p">企业名称：
				<text class="paper-span">{{shopInfo.company_name}}</text>
			</view>
			<view class="paper-p">营业执照注册号：
				<text class="paper-span">{{shopInfo.license_number}}</text>
			</view>
			<view class="paper-p">法定代表人电话：
				<text class="paper-span">{{shopInfo.mobile}}</text>
			</view>
			<view class="paper-p">企业注册资金：
				<text class="paper-span">{{shopInfo.registered_capital}}</text>
			</view>
			<view class="paper-p">营业执照有效期：
				<text class="paper-span">{{shopInfo.validity_start}}-{{shopInfo.validity_end}}</text>
			</view>
			<view class="paper-p">营业执照经营范围：
				<text class="paper-span">{{shopInfo.scope_of_operation}}</text>
			</view>
			<view class="h6">注：以上营业执照信息，根据国家工商总局《网络交易管理办法》要求对入驻商家营业执照信息进行公示，除企业名称通过认证之外， 其余信息由卖家自行申报填写。 如需要进一步核实， 请联系当地工商行政管理部门。</view>
		</div>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				shopInfo:'',
				mainNameLocal:','
			}
		},

		methods:{
			shopLicense(){
				let routeId = uni.getStorageSync("routeId");
				let _this = this;
				let url = api.shopLicense+
					'?id='+routeId+
					'&token='+uni.getStorageSync('token');				
				uni.request({
					url : url,
					success: (res) => {
						_this.shopInfo = res.data.data;

					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			aboutEtcetera(){
				let _this = this;
				uni.request({
					url:api.aboutEtcetera,
					success(result) {
						_this.mainNameLocal = result.data.data.intnet_title;
					},
					fail(e) {
						console.log(e);
					}
				})
			},
		},
		mounted() {
			this.shopLicense();
			this.aboutEtcetera();
		}
		
	}
</script>

<style lang="scss">
	.paper-container{
	    background-color: #fff;
	}
	    .h4{
	        font-size:32rpx;
	        text-align: center;
	        margin: 1.5rpx 0;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        white-space: nowrap;
	        padding: 30rpx 20rpx;
	        border-bottom: 1rpx solid #D1D1D1;
	        line-height: 50rpx;
	    }
	    .paper-p{
	        font-size: 28rpx;
	        padding: 30rpx 20rpx;
	        line-height: 50rpx;
	        border-bottom: 1rpx solid #D1D1D1;
	        .paper-span{
	        	font-size: 28rpx;
	        	line-height: 50rpx;
	        }
	    }
	    .h6{
	        font-size: 28rpx;
	        color: red;
	        padding: 30rpx 20rpx;
	        line-height: 50rpx;
	    }
</style>
