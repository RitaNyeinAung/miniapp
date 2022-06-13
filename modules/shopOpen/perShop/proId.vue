<template>
	<view class="prold">
		<view v-loading="loading"  element-loading-text="上传中……" element-loading-background="hsla(0,0%,100%,.9)">
			<con-header :text="text[0]"></con-header>
			<view class="per-center">
				<view class="li">
					<view class="view1" @click="open">
						<text class="span">身份证类型:</text>
						<text class="span"></text>
						<view class="div2">
							<text class="span">{{card}}</text>
							<img class="rightImg" src="@/static/images/common/right-icon.png" alt="">
						</view>
					</view>
					<u-popup v-model="popupVisible" position="bottom" class="tol">
						<view class="picker-toolbar">
							<text class="mint-datetime-action mint-datetime-cancel" @click="can">取消</text>
							<text class="mint-datetime-action mint-datetime-confirm" @click="sel">确定</text>
						</view>
						<view>
							<view class="like" v-for="(n,index) in type" @click="make(index)" :key="index">
								身份证类型：{{n}}
							</view>
						</view>
					</u-popup>
				</view>
			</view>
			<view class="idPhotos">
				<view class="h4">身份证正面：</view>
        <view class="first-upload">
          <view class="sec-upload" v-show="idcard_positive">
            <image :src="config.image_url+idcard_positive" class="images"></image>
          </view>
          <view class="input-btn fl" >
            <image src="@/static/images/common/img-btn.jpg" class="frame" @click="catchs"></image>
          </view>
        </view>
        <view class="p">
          图片建议使用4：3的jpg、gif、png格式的图片，并且图片大小不得超过1M
        </view>
			</view>
			<view class="idPhotos">
				<view class="h4">身份证反面：</view>
        <view class="first-upload">
          <view class="sec-upload" v-show="other_side">
            <image :src="config.image_url+other_side" class="images"></image>
          </view>
          <view class="input-btn fl" >
            <image src="@/static/images/common/img-btn.jpg" class="frame" @click="cotch"></image>
          </view>
        </view>
        <view class="p">
          图片建议使用4：3的jpg、gif、png格式的图片，并且图片大小不得超过1M
        </view>
			</view>
			<button @click="nextinfor">下一步</button>
			<view class="p">
				<text class="reds">*</text> 您提供的身份信息，网站将予以保护，不会挪作他用
			</view>
		</view>
	</view>
</template>

<script>
	import conHeader from '@/common/conHeader'
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		data() {
			return {
				text: ['身份证信息'],
				idcard_positive: "",
				other_side: "",
				popupVisible: false,
				type: ["中国大陆", '港澳', '中国台湾'],
				card: '',
				loading: false
			}
		},
		created(){
				if(uni.getStorageSync('admissionInfo')){
					let shopInfo =  JSON.parse(uni.getStorageSync('admissionInfo'));
					this.idcard_positive = shopInfo.idcard_positive;
					this.other_side = shopInfo.other_side;
				}
			},
		methods: {
			make(index) {
				this.card = this.type[index];
				this.popupVisible = false;
			},
			open() {
				this.popupVisible = true;
			},
			can() {
				this.popupVisible = false;
			},
			sel() {
				this.popupVisible = false;
			},
			cotch() {
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
                _this.other_side = _this.json.data;
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        })
			},
			catchs() {
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
                _this.idcard_positive = _this.json.data;
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        })
			},
			nextinfor: function () {
				if (!this.card) {
					uni.showToast({
						title: '请选择身份证类型',
						icon:'none'
					});
					return;
				}else if (!this.idcard_positive) {
					uni.showToast({
						title: '请上传身份证正面照片',
						icon:'none'
					});
					return;
				}else if (!this.other_side) {
					uni.showToast({
						title: '请上传身份证反面照片',
						icon:'none'
					});
					return;
				}else{
					if(uni.getStorageSync('admissionInfo')){
						let shopInfo =  JSON.parse(uni.getStorageSync('admissionInfo'));
						shopInfo.idcard_positive = this.idcard_positive;
						shopInfo.other_side = this.other_side;
						uni.setStorageSync('admissionInfo',JSON.stringify(shopInfo));
            shopInfo.token = uni.getStorageSync('token');
            let _this = this;
            uni.request({
              method: "POST",
              url: api.personEnter,
              data: shopInfo,
              success: (res) => {
                if (res.data.status == 1) {
                  uni.navigateTo({
                    url: '/modules/shopOpen/perShop/business',
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
					}else{
						uni.showToast({
							title: '入驻信息错误',
							icon:'none'
						});
					}
				}	
			}
		},
		components: {
			conHeader
		}
	}
</script>

<style lang="scss">
	.prold{
		background:#f1f1f1;
		position:absolute;
	}
	.tol {
	  width: 100%;
	}
	
	.picker-toolbar{
		height: 120rpx;
	}
	.u-drawer-left{
		width: 100% !important;
		padding: 20rpx;
		height:700rpx;
		box-sizing: border-box;
		bottom:0;
		margin-top:700rpx;
		font-size:32rpx;
		color:#bdbdbd;
	}
	.mint-datetime-action{
		width: 50%;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	.mint-datetime-confirm {
	  float: right;
	}
	.mint-datetime-cancel {
	  float: left;
	}
	.like {
		background-color: #fff;
		border-bottom: 1rpx solid #f1f1f1;
		height: 90rpx;
		font-size: 28rpx;
		padding: 20rpx;
	}

  .idPhotos{
    border-bottom: 1rpx solid #fff;
    padding: 0 27rpx;
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
        width: 300rpx;
        height: 300rpx;
        border: 1rpx dashed  #BDBDBD;
        .images{
          // opacity: 0;
          width: 100%;
          height: 100%;
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
	
	.per-center {
	  .li {
	    background-color: #fff;
	    border-bottom: 1px solid #f1f1f1;
	    height: 90rpx;
	    display: flex;
	    align-items: center;
	    font-size: 28rpx;
	    padding: 0 20rpx;
	    .span {
	      width: 220rpx;
	      font-size: 32rpx;
	      color: #bdbdbd;
	    }
	    input {
	      width: 520rpx;
	      height: 90rpx;
	      border: 0;
	      font-size: 28rpx;
	      padding-left: 30rpx;
	      box-sizing: border-box;
	    }
	    .div2 {
	      font-size: 32rpx;
	      display: flex;
	      align-items: center;
	      color: #bdbdbd;
	    }
	  }
	  .view1 {
	    width: 100%;
	    height: 100%;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	  }
	  .rightImg {
	    margin-left: 20rpx;
	    width: 24rpx;
	    height: 44rpx;
	  }
	}
	
	button {
	  margin: 45rpx 20rpx 25rpx;
	  height: 90rpx;
	  color: #fff;
	  background-color: #d02629;
	  border-radius: 90rpx;
	  border: 0;
	  width: 710rpx;
	  outline: none;
	  font-size: 32rpx;
	}
	
	.p {
	  text-align: center;
	  margin-bottom: 45rpx;
	  .reds {
	    color: #fe0100;
	  }
	}
</style>