<template>
	<view v-loading="loading" element-loading-text="上传中……" element-loading-background="hsla(0,0%,100%,.9)">
		<con-header :text="text[0]" :prompt="prompt"></con-header>
		<view class="per-center">
			<view class="li">
				<text class="span">组织机构代码: </text><input type="text" placeholder="请输入营业执照号..." v-model="organization_code">
			</view>
		</view>
		<view class="idPhotos">
			<view class="h4">组织机构代码证电子版：</view>
			<view class="div">
				<view class="div1">
          <image v-if="organization_electronic" :src="config.image_url+ organization_electronic" class="ipadImg" @click="oranges"></image>
          <image v-else src="@/static/images/common/img-btn.jpg" class="ipadImg" @click="oranges"></image>
				</view>
			</view>
			<view class="p">
				图片建议使用4：3的jpg、gif、png格式的图片，并且图片大小不得超过1M营业执照、住址机构代码证、税务登记证三证合一jpg、gif、png格式的图片， 并且图片大小不得超过2M
			</view>
		</view>
		<con-header :text="text[1]" :prompt="prompt2"></con-header>
    <view class="idPhotos">
      <view class="h4">{{text[1]}}：</view>
      <view class="div">
        <view class="div1">
          <image v-if="taxpayer_certificate" :src="config.image_url+ taxpayer_certificate" class="ipadImg" @click="orange"></image>
          <image v-else src="@/static/images/common/img-btn.jpg" class="ipadImg" @click="orange"></image>
        </view>
      </view>
      <view class="p">
        图片建议使用4：3的jpg、gif、png格式的图片，并且图片大小不得超过1M营业执照、住址机构代码证、税务登记证三证合一jpg、gif、png格式的图片， 并且图片大小不得超过2M
      </view>
    </view>
    <button @click="nextinfor">提交以上信息，并填写下一页</button>
	</view>
</template>

<script>
	import conHeader from '@/common/conHeader'
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		data() {
			return {
        config,
				text: ['组织机构代码', '一般纳税人证明'],
				prompt: "(企业三证合一没有组织机构代码的上传营业执照)",
				prompt2: "(所属企业具有一般纳税人证明时，此项必填)",
				organization_code: '',
				organization_electronic: '',
				taxpayer_certificate: '',
				ipadImg: '',
				ipadImgs: '',
				loading: false
			}
		},
		created() {
			if (uni.getStorageSync('admissionInfo')) {
				let shopInfo = JSON.parse(uni.getStorageSync('admissionInfo'));
				this.organization_code = shopInfo.organization_code;
				this.organization_electronic = shopInfo.organization_electronic;
				this.taxpayer_certificate = shopInfo.taxpayer_certificate;
			}
		},
		methods: {
			removes() {
				this.taxpayer_certificate = false;
			},
			moves() {
				this.organization_electronic = false;
			},
			orange(e) {
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
                _this.taxpayer_certificate = _this.json.data;
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        })
			},
			oranges(e) {
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
                _this.organization_electronic = _this.json.data;
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        })
			},
	
			nextinfor: function() {
				if (this.organization_code == '') {
					uni.showToast({
						title: '请填写组织机构代码',
						icon:'none'
					});
					return;
				}
				if (this.organization_electronic == '') {
					uni.showToast({
						title: '请上传组织机构代码证电子版',
						icon:'none'
					});
					return;
				}
				if (this.taxpayer_certificate == '') {
					uni.showToast({
						title: '请上传一般纳税人证明',
						icon:'none'
					});
					return;
				}
				if (uni.getStorageSync('admissionInfo')) {
					let shopInfo = JSON.parse(uni.getStorageSync('admissionInfo'));
					shopInfo.organization_code = this.organization_code;
					shopInfo.organization_electronic = this.organization_electronic;
					shopInfo.taxpayer_certificate = this.taxpayer_certificate;
					uni.setStorageSync('admissionInfo', JSON.stringify(shopInfo));
          shopInfo.token = uni.getStorageSync('token');
					let _this = this;
					uni.request({
            method: "POST",
            url: api.storeJoinCompany,
            data: shopInfo,
						success: (res) => {
								if (res.data.status == 1) {
									uni.navigateTo({
										url: '/modules/shopOpen/companyShop/checkCompanyBankInfor',
										fail(e) {
											console.log(e)
										}
									})
								}else{
                  uni.showToast({
                    title: res.data.message,
                    icon:'none'
                  });
                }
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				} else {
					uni.showToast({
						title: '入驻信息错误',
						icon:'none'
					});
				}
			}
		},
		components: {
			conHeader
		}
	}
</script>

<style lang="scss">	
	.organizationPhotos{
		background:#f1f1f1;
		position:absolute;
	}
	.idPhotos {
		border-bottom: 1rpx solid #fff;
		padding: 0 27rpx;
		.h4 {
			padding: 30rpx 0 25rpx;
			color: #BDBDBD;
			font-size: 32rpx;
		}
		background-color: #fff;
		.div {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			font-size: 32rpx;
			color: #959595;
			.div1 {
				// width: 280rpx;
				// height: 210rpx;
				border: 1rpx solid #BDBDBD;
				.ipadImg {
					width: 300rpx;
					height: 300rpx;
				}
				.file {
					width: 100%;
					height: 100%;
					// opacity: 0;
				}
			}
			.div1:last-child {
				border: 1rpx dashed #BDBDBD;
			}
		}
		.p {
			margin: 30rpx 0 40rpx;
			font-size: 24rpx;
			color: #959595;
			text-align: left;
		}
	}
	
	.per-center {
		.li {
			background-color: #fff;
			border-bottom: 1px solid #F1F1F1;
			height: 90rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			span {
				width: 110px;
				font-size: 32rpx;
				color: #BDBDBD
			}
			input {
				width: 520rpx;
				height: 90rpx;
				border: 0;
				font-size: 28rpx;
				padding-left: 30rpx;
				box-sizing: border-box
			}
			.div2 {
				font-size: 32rpx;
				display: flex;
				align-items: center;
				color: #BDBDBD
			}
		}
	}
	
	button {
		margin: 45rpx 20rpx;
		height: 90rpx;
		color: #fff;
		background-color: #d02629;
		border-radius: 90rpx;
		border: 0;
		width: 710rpx;
		outline: none;
		font-size: 32rpx;
	}
</style>
