<template>
	<view class="shopDetails">
		<view class="description">
			<view class="des-p">
				 <text class="des-span">商品描述</text> 
				 <text class="des-span1">{{shopData.desccredit}}分</text>
				 <text class="des-span2">{{shopData.desccredit_discraption}}</text>
			</view>
			<view class="des-p">
				<text class="des-span">服务态度</text> 
				<text class="des-span1">{{shopData.servicecredit}}分</text>
				<text class="des-span2">{{shopData.servicecredit_discraption}}</text>
			</view>
			<view class="des-p">
				<text class="des-span">发货速度</text> 
				<text class="des-span1">{{shopData.deliverycredit}}分</text>
				<text class="des-span2">{{shopData.deliverycredit_discraption}}</text>
			</view>
		</view>
		<view class="aboutShop">
			<view class="aboutShop-li">
				<text class="aboutShop-p">联系卖家</text>
			</view>
			<view class="aboutShop-li" @click="phoneMsg">
				<text class="aboutShop-p">商家电话
					<text class="aboutShop-span">{{shopData.mobile}}</text>
				</text>
			</view>
			<view class="aboutShop-li" @click="codeMsg">
				<text class="aboutShop-p">店铺二维码</text>
			</view>
<!--      <view class="aboutShop-li" v-show="qrcodeStatus">-->
<!--        <ayQrcode ref="qrcode" qrcode_id="qrcode" :modal="modal_qr" :url="url" @hideQrcode="hideQrcode" :height="150" :width="150"-->
<!--                  themeColor="#33CCCC"/>-->
<!--      </view>-->
			<view class="aboutShop-li" @click="paperwork">
				<text class="aboutShop-p">证照信息</text>
			</view>
		</view>
		<view class="aboutShop">
			<view class="aboutShop-li">
				<view class="aboutShop-p">店铺简介
					<text class="aboutShop-span">{{shopData.shop_long}}</text>
				</view>
		   </view>
			<view class="aboutShop-li">
				<view class="aboutShop-p">所在地区
					<text class="aboutShop-span">{{newAddress}}</text>
				</view>
			</view>
	
			<view class="aboutShop-li">
				<view class="aboutShop-p">开店时间
				<text class="aboutShop-span">{{shopData.open_time}}年</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tabHeader from '@/modules/common/pages/shopCon/child/tabHeader.vue';
	import config from '@/config.js'
	import api from '@/api.js'
  import ayQrcode from "@/components/ay-qrcode/ay-qrcode.vue";
	export default {
		
		data(){
			return {
				config,
				shopData:[],
				atten: 0,
				newAddress:'',
				folStatus:'',
				folMess:'',
				sortData: ['店铺首页', '全部宝贝', '店铺动态'],
        modal_qr: false,
        url: 'https://pixabay.com/images/search/?order=ec', // 要生成的二维码值
        qrcodeStatus: false, // 要生成的二维码值
			}
		},
		components:{
			tabHeader,
      ayQrcode
		},
		methods:{
			shopDetails(){
				let routeId = uni.getStorageSync("routeId");
				let _this = this;
				let url = api.shopDetails+
					'?id='+routeId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
					  if(res.data.status == 1){
              _this.shopData = res.data.data;
              _this.newAddress = res.data.data.address;
            }
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			attenAjax(index){
				if(index==1){
					this.atten = index;
					let routeId = uni.getStorageSync("routeId");
					let _this = this;
					let url = api.attenStore+
						'?store_id='+routeId+
						'&token='+uni.getStorageSync('token');
					uni.request({
						url : url,
						success: (res) => {
						if(res.data.status == 10001){
							_this.folStatus = res.data.status;
							_this.folMess = res.data.message;
						}
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				}
				else{
					this.atten = index;
					let routeId = uni.getStorageSync("routeId");
					let _this = this;
					let url = api.cancelAttenStore+
						'?store_id='+routeId+
						'&token='+uni.getStorageSync('token');
					uni.request({
						url : url,
						success: (res) => {
						if(res.data.status == 10001){
							_this.folStatus = res.data.status;
							_this.folMess = res.data.message;
						}
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				}
			
			},
			phoneMsg() {
				uni.showModal({
					title: 'mobile',
					content: this.shopData.mobile,
				})
			},
			codeMsg() {
        // let _this = this;
        // this.modal_qr = true;
        // // uni.showLoading()
        // setTimeout(function() {
        //   // uni.hideLoading()
        //   _this.$refs.qrcode.crtQrCode()
        // }, 50)
				uni.showModal({
					title: this.shopData.shop_name,
					content: "",
				})
			},
			paperwork(){
				let routeId = uni.getStorageSync("routeId");
				let _this = this;
				let url = api.shopLicense+
					'?id='+routeId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.status==1){
							uni.navigateTo({
								url: '/modules/common/pages/shopCon/paperwork?id='+routeId
							})
						}
						else{
							uni.showToast({
								title:res.data.message														
							})
					
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
      sortindex(data, id) {
        let routeId = uni.getStorageSync("routeId");
        uni.navigateTo({
          url: `/modules/common/pages/shopCon/shopHome?id=${routeId}&index=${data}`
        })
      },
		},
		mounted() {
			this.shopDetails();
		}
		
	}
</script>

<style lang="scss">
	.shopDetails{
		background-color: #f1f1f1;
	    .shopTitle {
	        overflow: hidden;
	        padding: 20rpx;
	        height: 125rpx;
	        background-color: #fff;
	        display: flex;
	        justify-content: space-between;
	        .shopData-div {
	            display: flex;
	            align-items: center;
	        }
	        image {
	            width: 80rpx;
	            height: 80rpx;
	            margin-right: 20rpx;
	        }
	        .shop-display{
	            font-size: 28rpx;
	            padding: 0 15rpx 0 0;
	            width: 250rpx;
	        }
	        .shop-gradename{
	            font-size: 25rpx;
	            background: #de2d35;
	            color: white;
	            border-radius: 5rpx;
	            padding: 5rpx 10rpx;
	            text-align: center;
	        }
	        .p {
	            font-size: 28rpx;
	        }
	        .span {
	            font-size: 20rpx;
	        }
	        .btn {
	            margin-left: 15rpx;
	            width: 130rpx;
	            height: 50rpx;
	            border-radius: 50rpx;
	            display: flex;
	            justify-content: center;
	            align-items: center;
	            color: #fff;
	            background-color: #d02629;
	        }
	    }
		.description {
			background-color: #fff;
			padding: 10rpx 20rpx;
			.des-p {
				line-height: 55rpx;
				.des-span {
					font-size: 28rpx;
					margin-right: 70rpx;
				}
				.des-span1 {
					font-size: 28rpx;
					color: #CF7171;
					margin-right: 35rpx;
				}
				.des-span2 {
					font-size: 28rpx;
					color: #CF7171;
				}
			}
		}
		.aboutShop {
			border-top: 1rpx solid #D1D1D1;
			margin-top: 20rpx;
			background-color: #fff;
			.aboutShop-li {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 20rpx;
				border-bottom: 1rpx solid #D1D1D1;
				height: 110rpx;
				.aboutShop-p {
					float: left;
					font-size: 28rpx;
				}
				.aboutShop-span {
					font-size: 28rpx;
					margin-left: 25rpx;
					color: #686868;
				}
			}
		}
	}
</style>
