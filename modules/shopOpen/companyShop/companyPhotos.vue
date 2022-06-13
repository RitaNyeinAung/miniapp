<template>
	<view class="bankInfo">
		<view class="hd">
			<view class="title fl">企业营业执照<text class="span">(按照证书上的内容逐字填写)</text></view>
		</view>
		 <ul class="per-center">
			 <li>
				<text> 营业执照号:</text><u-input class="singo" type="text" placeholder="请输入营业执照号..." v-model="license_number"/></u-input>
			</li>
			<li>
				<text> 执照有效期:</text>
        <picker mode="date" :value="validity_start" @change="bindDateChangeStart">
          <view class="uni-input">{{validity_start}}</view>
        </picker>—
        <picker mode="date" :value="validity_end" @change="bindDateChangeEnd">
          <view class="uni-input">{{validity_end}}</view>
        </picker>

			</li>
			 <li class="businessScope">
				<text class="title"> 法定经营范围:</text>
				<textarea type="text" placeholder="请输入法定经营范围..." v-model="scope_of_operation"></textarea>
			</li>
		</ul>
    <view class="idPhotos">
			<h4 class="title">营业执照电子版</h4>
      <view class="first-upload">
        <view class="sec-upload" v-show="ImgUrl">
          <image :src="config.image_url+ImgUrl" class="images"></image>
        </view>
        <view class="input-btn fl" >
          <image src="@/static/images/common/img-btn.jpg" class="frame" v-model="images" @click="chooseAvatar"></image>
        </view>
      </view>
			<view class="p">
				  图片建议使用4：3的jpg、gif、png格式的图片，并且图片大小不得超过1M
			</view>
		</view>
		<view @click="nextinfor" class="button">提交以上信息,并填写下一页</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				license_number:'',
				validity_start:'请选择开始时间',
				validity_end:"请选择结束时间",
				scope_of_operation:"",
				img:"",
				file:"",
				hide:'',
				size:'',
				loading:false,
				ImgUrl:'',
        images:'',
				shopInfo:{}
			}
		},
		methods:{
      bindDateChangeStart: function(e) {
        this.validity_start = e.detail.value
      },
      bindDateChangeEnd: function(e) {
        this.validity_end = e.detail.value
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
                _this.ImgUrl = _this.json.data;
              },
              fail(err) {
                console.log(err);
              }
            })
          }
        })
      },
			remove(){
				this.ImgUrl=false;
			},
      nextinfor: function() {
        if(this.license_number==''){
          uni.showToast({
            title:'营业执照号不能为空',
            icon:'none'
          })
          return;
        }
        if(this.validity_start=="请选择开始时间"||this.validity_end=="请选择结束时间"){
          uni.showToast({
            title:'请正确填写营业执照的有效期',
            icon:'none'
          })
          return;
        }
        if(this.scope_of_operation==''){
          uni.showToast({
            title:'法定经营范围不能为空',
            icon:'none'
          })
          return;
        }
        if(this.ImgUrl ==''){
          uni.showToast({
            title:'请上传营业执照',
            icon:'none'
          })
          return;
        }
        let time1 = new Date(this.validity_start);
        let validity_start = time1.getTime()/1000;
        let time2 = new Date(this.validity_end);
        let validity_end = time2.getTime()/1000;
        if(uni.getStorageSync('admissionInfo')){
          let shopInfo =  JSON.parse(uni.getStorageSync('admissionInfo'));
          shopInfo.license_number = this.license_number;
          shopInfo.validity_start = validity_start;
          shopInfo.validity_end = validity_end;
          shopInfo.scope_of_operation = this.scope_of_operation;
          shopInfo.electronic_version = this.ImgUrl;
          uni.setStorageSync('admissionInfo',JSON.stringify(shopInfo));
          uni.setStorageSync('kd_time',JSON.stringify({validity_start:this.validity_start,validity_end:this.validity_end}));
          uni.navigateTo({
            url: '/modules/shopOpen/companyShop/organizationPhotos',
            fail(e) {
              console.log(e)
            }
          })
        }else{
          uni.showToast({
            title:'入驻信息错误',
            icon:'none'
          })
        }
      },
      load(){

      }
    },
    mounted() {

    },
    created(){
      if(uni.getStorageSync('admissionInfo')){
        let shopInfo =  JSON.parse(uni.getStorageSync('admissionInfo'));
        this.license_number = shopInfo.license_number;
        this.scope_of_operation = shopInfo.scope_of_operation;
        this.ImgUrl = shopInfo.electronic_version;
      }
      if(uni.getStorageSync('kd_time')){
        let kd_time =  JSON.parse(uni.getStorageSync('kd_time'));
        this.validity_start = kd_time.validity_start;
        this.validity_end = kd_time.validity_end;
      }
    },

  }
</script>

<style lang="scss">
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


	.bankInfo{
		background-color: #f1f1f1;
		height:100%;
		// position:absolute;
	}
	.hd {
		padding: 20rpx;
		.title {
			border-left: 6rpx solid #d02629;
			padding-left: 20rpx;
			font-size: 32rpx;
			color: #111111;
		}
		.span {
			font-size: 18rpx;
			color: #989898;
			margin-left:10rpx;
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
				color: #BDBDBD;
			}
			u-input {
				width: 520rpx;
				// height: 90rpx;
				border: 0;
				font-size: 28rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
			}
			.singo{
			  width: 500rpx;
			  // height: 90rpx;
			  border:0;
			  font-size: 28rpx;
			  padding-left: 20rpx;
			  box-sizing: border-box;
			}
		}
		.businessScope{
				margin-bottom:10rpx;
				height: 260rpx;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			.title{
				width: 100%;
				height: 90rpx;
				display: flex;
				align-items: center;
				text-align: left;
			}
		   
			textarea{
				width: 700rpx;
				height: 160rpx;
				resize: none;
				border:0;
				padding:10rpx;
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
