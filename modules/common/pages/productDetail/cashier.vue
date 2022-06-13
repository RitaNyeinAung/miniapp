<template>
	<view>
		
		<view class="cashier">
			<view class="cashier-view">
				<view class="title fl">订单号</view>
				<view class="num fr">{{id}}</view>
			</view>
			<view class="cashier-view">
				<view class="title fl">订单金额</view>
				<view class="pri fr">￥{{total}}</view>
			</view>
		</view>
		<view class="black"></view>
		<view class="payment">
			<view class="paytit">其他支付方式</view>
			<view class="paytype">
				<u-radio-group v-model="selectedType" @change="radioGroupChange">
					<u-radio 
						
						v-for="(item, index) in paymentType" :key="index" 
						:name="item.id"
						:wrap="true"
					>
						<view class="payment-view" >
							<image :src="config.image_url+item.logo"></image>
							<view class="ptitle">{{item.type_name}}</view>
							<view class="bal" v-if="item.type_name == '余额支付'">当前余额：￥{{balance}}</view>
					
						</view>
					</u-radio>
				</u-radio-group>
			</view>
			
			<view class="okbtn" @click="paymentMethod">立即支付</view>
		</view>
		<best-payment-password ref="paymentPassword" :forget="false" :show="popupVisible" :value="inpass" digits="6" @submit="confirmVerifyBtn" @cancel="cancelArea"></best-payment-password>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	import bestPaymentPassword from '@/components/sanshui-payment-password/index'
	export default {
		
		data(){
			return {
				config,
				total:0,
				id:'',
				paymentType: '',
				balance: '',
				value:'',
				popupVisible: false,
				payId: '',
				balancePassID: '',
				verifyMessage: '',
				verifyID: '',
				inpass:'',
				payData:'',
					payType:[
						'wechatPay',
						'banlancePay'
					],
					payMethodId:null,
					selectedType:1
			}
		},
		onLoad(options){
			this.id = options.order_sn_id;
			this.total = options.total;
		},
		components:{
            bestPaymentPassword      
		},
		methods:{
			getPaymentType() {
				let url = api.paymentType+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					if(res.data.status == 10001) {
					} else {
						_this.paymentType = res.data.data;
					}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getBanlance() {
				let url = api.getBalance+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					if(res.data.status == 1) {
						_this.balance = res.data.data;
					}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			paymentMethod() {
					if(this.selectedType == 4) {
						this.popupVisible = true;
						this.$refs.paymentPassword.modalFun('show')
					}
					if(this.selectedType == 1){

						this.wechatPay();
					}
			},
			cancelArea(){
				this.popupVisible = false;
			},
			confirmVerifyBtn() {
				
				
				let _this = this;
				uni.request({
					url:api.verifyPassword,
					method:"POST",
					data:{
						balance_password:this.$refs.paymentPassword.paymentPwd,
						code:this.$refs.paymentPassword.paymentPwd,
						token:uni.getStorageSync('token')
					},
					success(res) {
						if(res.data.status == 1) {
							_this.popupVisible = false;
							
							uni.showLoading({
								title:'支付中'
							});
							//调用余额支付接口  
							uni.request({
								url:api.initiatePayment,
								method:"POST",
								data:{
									"pay_type_id":4,
									token:uni.getStorageSync('token')
								},
								success(res) {
									if(res.data.status==1){
										//支付回调
										uni.request({
											url:res.data.data,
											method:"POST",
											data:{
												token:uni.getStorageSync('token')
											},
											success(res) {
												if(res.data.status==1){
													uni.navigateBack({
														
													})
													uni.showToast({
														title:"支付成功"
													})
												}else{
													uni.showToast({
														title:"支付失败 或 余额不足",
														icon:"none"
													})
												}
											},
											fail(err) {
												uni.showToast({
													title:"支付失败 或 余额不足",
													icon:"none"
												})
											}
										})
									}else{
										uni.showToast({
											title:res.data.message,
											icon:"none"
										})
									}
									uni.hideLoading()
								},
								fail(err) {
									uni.showToast({
										title:err.data.message,
										icon:"none"
									})
								}
							})
							
							uni.hideLoading();
						}
						else{
							
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
						}
						
					},
					fail(err) {
						uni.showToast({
							title:err.data.message,
							icon:'none'
						})
					}
				})
			},
			callInitiate() {
				
			},

			wechatPay(){
				uni.showLoading({
					title:"前往支付中"
				})
				uni.request({
					url:api.initiatePayment,
					data:{
            "pay_type_id":1,
						token:uni.getStorageSync("token")
					},
					method:"POST",
					success(res) {
						uni.hideLoading();
						if(res.data.data){
							let orderInfo = res.data.data;
							uni.requestPayment({
							    provider: 'wxpay',
								timeStamp:orderInfo.timeStamp,
								// appId : this.orderInfo.appId,
							    
								nonceStr : orderInfo.nonceStr,
								package: orderInfo.package,
								signType: 'MD5',
								
								paySign:orderInfo.paySign,
							    success: (e) => {
							        console.log("success", e);
							        uni.showToast({
							            title: "感谢您的赞助!"
							        })
							    },
							    fail: (e) => {
							        console.log("fail", e);
							        uni.showModal({
							            content: "支付失败,原因为: " + e.errMsg,
							            showCancel: false
							        })
							    },
							    complete: () => {
							        this.providerList[index].loading = false;
							    }
							})
						}else{
							uni.showToast({
								title:res.data.message,
								icon:"none"
							})
						}
					},
					fail(e) {
						uni.hideLoading();
						uni.showToast({
							title:e.data.message,
							icon:"none"
						})
						console.log(e);
					}
				})
				
			},
			radioGroupChange(id){
				console.log("id "+id)
				this.selectedType = id;
			}
		},
		mounted() {
			this.getPaymentType();
			this.getBanlance();
		},	
	}
</script>

<style lang="scss">
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.black{
		background-color: #f1f1f1;
		padding: 20rpx;
	}
	.cashier{
		background-color: #fff;
		border-top: 1rpx solid #f1f1f1;
		.cashier-view{
			padding: 0 20rpx;
			border-bottom: 1rpx solid #f1f1f1;
			height: 100rpx;
			line-height: 100rpx;
			.title{
				font-size: 30rpx;
				color: #333;
			}
			.num{
				font-size: 28rpx;
				color: #999;
			}
			.pri{
				font-size: 28rpx;
				color: #f23030;
			}
		}
	}
	.payment{
		background-color: #fff;
		.paytit{
			padding: 0 20rpx;
			font-size: 30rpx;
			color: #333;
			height: 70rpx;
			line-height: 70rpx;
			border-bottom: 1rpx solid #f1f1f1;
		}
		.paytype{
			padding: 0 20rpx;
		}
		.payment-view{
			padding: 20rpx 20rpx 20rpx 0rpx;
			margin:0px 10px 0px 5px;
			border-radius: 5px;
			border-bottom: 1rpx solid #f1f1f1;
			height: 120rpx;
			line-height: 100rpx;
			image{
				width: 83rpx;
				height: 83rpx;
				float: left;
			}
			.ptitle{
				font-size: 30rpx;
				color: #333;
				padding-left: 30rpx;
				float: left;
				line-height: 80rpx;
			}
			.bal{
				font-size: 28rpx;
				color: #999;
				padding-left: 30rpx;
				float: left;
				line-height: 80rpx;
			}
			.check{
				font-size: 28rpx;
				float: right;
				margin-top: 20rpx;
			}
		}
	}
	.okbtn{
		width: 80%;
		margin:10px auto;
		height: 100rpx;
		transform: translateX(-50%);
		left:50%;
		font-size: 25rpx;
		text-align: center;
		line-height: 100rpx;
		background: $main-color;
		color: #ffffff;
		position: absolute;
		border-radius: 50px;
		bottom: 10px;
	}
	.popup_div {
	  position: fixed;
	  top: 0;
	  left: 0;
	  width: 100%;
	  height: 100%;
	  background: rgba(0, 0, 0, 0.5);
	  z-index: 1;
	  .popup_box {
		position: absolute;
		height: 400rpx;
		width: 700rpx;
		margin-left: 25rpx;
		top:410rpx;
		left: 0;
		bottom: 0;
		background: #fff;
		border-radius: 20rpx;
		.box_cross {
			position: absolute;
			right: 3%;
			top: 15rpx;
			width: 40rpx;
			line-height: 34rpx;
			height: 40rpx;
			border: 2rpx solid #bfbfbf;
			text-align: center;
			font-size: 40rpx;
			color: #bfbfbf;
			border-radius: 100%;
			cursor: pointer;
		}
		.password_div {
			padding: 90rpx 35rpx 10rpx 35rpx;
			display: flex;
			.password_text {
				padding-top: 30rpx;
				font-size: 30rpx;
				width: 160rpx;
			}
			.input_box {
				float: right;
				margin-top: 13rpx;
				.in{
					// width: 20rpx;
				}
			}
		}
		.time_message {
			margin: 40rpx 0 0 200rpx;
			color: red;
		}
		.next_button {
			cursor: pointer;
			border-radius: 10rpx;
			width: 230rpx;
			height: 80rpx;
			background: #67C23A;
			text-align: center;
			line-height: 80rpx;
			color: #fff;
			font-size: 30rpx;
			margin: 30rpx 0 0 194rpx;
			border: none;
		}
	  }
	}
</style>
