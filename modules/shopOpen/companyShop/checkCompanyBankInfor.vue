<template>
	<view class="bankInfo">
		<view class="hd">
			<view class="title fl">结算（银行卡）账户信息 </view>
		</view>
		<ul class="per-center">
			<li>
				<text> 账户开户名:</text><u-input type="text" placeholder="请输入银行开户名..." v-model="account_name"></u-input>
			</li>
			<li>
				<text> 公司银行账户:</text><u-input type="text" placeholder="请输入公司银行账户..." v-model="company_account"></u-input>
			</li>
			<li>
				<text> 开户支行:</text><u-input type="text" placeholder="请输入开户支行..." v-model="branch_bank"></u-input>
			</li>
		</ul>
		<view class="hd">
			<view class="title fl">结算账户信息 </view>
		</view>
		<ul class="per-center">
			<li>
				<text> 账户开户名:</text><u-input type="text" placeholder="请输入银行开户名..." v-model="settle_name"></u-input>
			</li>
			<li>
				<text> 公司银行账户:</text><u-input type="text" placeholder="请输入公司银行账户..." v-model="settle_account"></u-input>
			</li>
			<li>
				<text> 开户支行:</text><u-input type="text" placeholder="请输入开户支行..." v-model="settle_number"></u-input>
			</li>
		</ul>
		<view class="hd">
			<view class="title fl">打款帐号 </view>
		</view>
		<ul class="per-center">
			<li>
				<text>微信:</text><u-input type="text" placeholder="请输入微信号码" v-model="wechatNum"></u-input>
			</li>
			<li>
				<text> 支付宝:</text><u-input type="text" placeholder="请输入支付宝号码" v-model="alipayNum"></u-input>
			</li>
		</ul>
		<view class="hd">
			<view class="title fl">税务登记证 </view>
		</view>
		<ul class="per-center">
			<li>
				<text> 税务登记证号:</text><u-input type="text" placeholder="请输入税务登记证号..." v-model="certificate_number"></u-input>
			</li>
		</ul>
		<view class="idPhotos">
			<h4>税务登记证号电子版:</h4>
      <view class="first-upload">
        <view class="sec-upload" v-show="registration_electronic">
          <image :src="config.image_url+registration_electronic" class="images"></image>
        </view>
        <view class="input-btn fl" >
          <image src="@/static/images/common/img-btn.jpg" class="frame" v-model="images" @click="chooseAvatar"></image>
        </view>
      </view>
		</view>
		<view @click="nextinfor" class="button">提交以上信息，并填写下一页</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				account_name: '',
				company_account: '',
				branch_bank: "",
				settle_name: '',
				settle_account: '',
				settle_number: '',
				certificate_number: '',
				registration_electronic: '',
				iphoneImg: '',
				wechatNum: '', // 微信帐号
				alipayNum: '', // 支付宝帐号
				loading: false,
			}
		},
		methods:{
			double() {
				this.registration_electronic = false;
			},
      chooseAvatar(){
        let _this = this;
        uni.chooseImage({
          count:1,
          sizeType:['original'],
          sourceType:['album'],
          async success(res) {
            _this.hdimg  = res.tempFilePaths[0];
            uni.uploadFile({
              url:api.uploadImage,
              filePath: _this.hdimg,
              name: 'file',
              formData: {
                'token': uni.getStorageSync('token')
              },
              success: (uploadFileRes) => {
                _this.json = JSON.parse(uploadFileRes.data);
                _this.registration_electronic = _this.json.data;
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        })
      },
			nextinfor: function() {
				let reg = /(^[1-9]([0-9]*)$|^[0-9]$)/;
				if (!this.account_name) {
					uni.showToast({
						title:'请填写开户名',
						icon:'none'
					})
					return;
				}
				if (!reg.test(this.company_account) || this.company_account.length < 12) {
					uni.showToast({
						title:'公司银行账号错误',
						icon:'none'
					})
					return;
				}
				if (!this.branch_bank) {
					uni.showToast({
						title:'请填写开户银行支行名称',
						icon:'none'
					})
					return;
				}
				if (!this.settle_name) {
					uni.showToast({
						title:'请填写结算账户开户名',
						icon:'none'
					})
					return;
				}
				if (!reg.test(this.settle_account) || this.settle_account.length < 12) {
					uni.showToast({
						title:'结算公司银行账号错误',
						icon:'none'
					})
					return;
				}
				if (!this.settle_number) {
					uni.showToast({
						title:'请填写结算开户支行',
						icon:'none'
					})
					return;
				}
				if (!this.wechatNum) {
					uni.showToast({
						title:'请填写微信账号',
						icon:'none'
					})
					return;
				}
				if (!this.alipayNum) {
					uni.showToast({
						title:'请填写支付宝账号',
						icon:'none'
					})
					return;
				}
				if (!this.certificate_number) {
					uni.showToast({
						title:'请填写税务登记证号',
						icon:'none'
					})
					return;
				}
				if (!this.registration_electronic) {
					uni.showToast({
						title:'请上传税务登记证号电子版',
						icon:'none'
					})
					return;
				}
				let url = api.storeBank+
					'?account_name='+this.account_name+
					'&company_account='+this.company_account+
					'&branch_bank='+this.branch_bank+
					'&settle_name='+this.settle_name+
					'&settle_account='+this.settle_account+
					'&settle_bank='+this.settle_number+
					'&certificate_number='+this.certificate_number+
					'&registration_electronic='+this.registration_electronic+
					'&alipay_account='+this.alipayNum+
					'&wx_account='+this.wechatNum+
					'&store_id='+uni.getStorageSync('shop_ID')+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
          method: "POST",
          url: api.storeBank,
          data: {
            account_name:_this.account_name,
            company_account:_this.company_account,
            branch_bank:_this.branch_bank,
            settle_name:_this.settle_name,
            settle_account:_this.settle_account,
            settle_number:_this.settle_number,
            certificate_number:_this.certificate_number,
            registration_electronic:_this.registration_electronic,
            alipayNum:_this.alipayNum,
            wechatNum:_this.wechatNum,
            store_id:uni.getStorageSync('shop_ID'),
            token:uni.getStorageSync("token")
          },
					success: (res) => {
            if (res.data.status == 1) {
              uni.navigateTo({
                url: '/modules/shopOpen/companyShop/business',
                fail(e) {
                  console.log(e)
                }
              })
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

		},
		created(){

		},
		
	}
</script>

<style lang="scss">
	.u-delete-icon{
		top:10rpx;
		right:10rpx;
		z-index:10;
		background-color:#fa3534;
		border-radius:100rpx;
		width:44rpx;
		height:44rpx;
		display:flex;
		flex-direction:row;
		align-items:center;
		justify-content:center;
	}
	.idPhotos{
		border-bottom: 1rpx solid #fff;
		padding: 0 27rpx 27rpx 27rpx;
		h4{
			padding: 30rpx 0 25rpx;
			color:#BDBDBD;
			font-size: 32rpx;
		}
	  background-color: #fff;
	  .first-upload{
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 32rpx;
			color:#959595;
		   .sec-upload{
				border: 1rpx dashed  #BDBDBD;
				.images{
					width: 300rpx;
					height: 300rpx;
				}
		   }
      .input-btn{
        width: 300rpx;
        height: 300rpx;
        .frame{
          width: 100%;
          height: 100%;
        }
      }
		  
	  }
	   .p{   
		   margin: 30rpx 0 40rpx;
			font-size: 24rpx;
			color: #959595;
			text-align: left;
		   }
	}
	.bankInfo{
    width: 100%;
		background-color: #f1f1f1;
		position:absolute;
	}
	.hd {
		padding: 20rpx;
		.title {
			border-left: 6rpx solid #d02629;
			padding-left: 20rpx;
			font-size: 32rpx;
			color: #111111;
		}
	}
	.per-center {
		li {
			background-color: #fff;
			border-bottom: 2rpx solid #F1F1F1;
			height: 90rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			text {
				width: 260rpx;
				font-size: 32rpx;
				color: #BDBDBD
			}
			u-input {
				width: 500rpx;
				height: 90rpx;
				border: 0;
				font-size: 28rpx;
				padding-left: 30rpx;
				box-sizing: border-box
			}
		}
	}
	
	.button {
		margin: 45rpx 20rpx 25rpx;
		height: 90rpx;
		color: #fff;
		background-color: #d02629;
		border-radius: 90rpx;
		border: 0;
		width: 710rpx;
		outline: none;
		font-size: 32rpx;
		line-height:80rpx;
		text-align:center;
	}	
</style>
