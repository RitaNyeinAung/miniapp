<template>
	<view>
		<view class="person-wrap">
			<view class="hd">
				<view class="status fl">我的头像</view>
				<image :src="hdimg" class="fr"  v-model="user_header" @click="chooseAvatar"></image>
				<!-- <image class="icon-btn" src="@/static/images/common/btn-right.png"></image> -->
				<!-- <view>
					<u-upload
						:fileList="avatar"
						@on-list-change="afterRead"
						@delete="deleteAvatar"
						name="1"
						width="150"
						height="150"
						:maxCount="1"
						:auto-upload="false"
					></u-upload>
				</view> -->
			</view>
			<view class="dd">
				<view class="li">
					<text class="userStatus fl">用户名<text class="span">*</text></text>
					<text class="userName fr">{{userInfo.user_name}}</text>
				
				</view>
				<view class="li"  @click="showEditNameModel=true">
					<text class="userStatus fl">昵称<text class="span">*</text></text>
					<text class="userName fr">{{userInfo.nick_name|| '请填写'}}</text>
					
				</view>
				<u-modal v-model="showEditNameModel" :content="content" title="编辑昵称" :mask-close-able="true">
					<view class="slot-content" style="padding:20px 10px ">
						<u-input v-model="userInfo.nick_name" placeholder="请输入昵称" :type="type" :border="border" :focus="true"/>
					</view>
				</u-modal>
				<view class="li " @click="showEditEmailModel=true">
					<text class="userStatus fl">邮箱</text>
					<text class="userName fr">{{userInfo.email || '请填写'}}</text>	
				</view>
				<u-modal v-model="showEditEmailModel" :content="content" title="编辑邮箱" :mask-close-able="true">
					<view class="slot-content" style="padding:20px 10px ">
						<u-input v-model="userInfo.email" placeholder="请输入邮箱" :type="type" :border="border" :focus="true"/>
					</view>
				</u-modal>
				
				<view class="li " @click="showEditGenderModel=true">
					<text class="userStatus fl">性别</text>
					<text class="userName fr">{{sex[userInfo.sex] || '请选择'}}</text>
	
				</view>
				<u-picker mode="selector" v-model="showEditGenderModel" :default-selector="[0]" :range="sex" @confirm="(obj)=>{userInfo.sex=sex[obj[0]]}"></u-picker>
				
				
				<view class="li " @click="showEditBirthdayModel=true">
					<text class="userStatus fl">生日</text>
					<text class="userName fr">{{userInfo.birthday}}</text>
				
				</view>
				<u-picker  v-model="showEditBirthdayModel" mode="time" :params="{year:true,month:true,day:true}" @confirm="(obj)=>{userInfo.birthday=obj.year+'-'+obj.month+'-'+obj.day}"></u-picker>
			</view>
		</view>
		<view class="from-btn" @click="preservation">确认修改</view>
		<view class="prompt"><text class="spann">*</text>为必填项</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	import {mapState} from'vuex'
	import {pathToBase64} from '@/js_sdk/mmmm-image-tools/index.js'
	export default {
		
		data(){
			return {
				config,
				data: [],
				hdimg: "",
				user_header:'',
				sex: ["女", "男"],
				showEditNameModel:false,
				showEditEmailModel:false,
				showEditGenderModel:false,
				showEditBirthdayModel:false,
				avatar:''
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods:{
			userinfo(){
				// let url = api.userinfo+
				// 	'?token='+uni.getStorageSync('token');
				// let _this = this;
				// uni.request({
				// 	url : url,
				// 	success: (res) => {
				// 		_this.data = res.data.data;
				// 		var pattern = /^((http|https|ftp):\/\/)/;						
				// 		if(!pattern.test(_this.data.user_header)) {
				// 		    _this.hdimg = config.image_url+_this.data.user_header
				// 		}else{
				// 			_this.hdimg = _this.data.user_header;
				// 		}
				// 	},
				// 	fail: (res)=>{
				// 		console.log(res);
				// 	}
				// })
				console.log(this.userInfo)
				var pattern = /^((http|https|ftp):\/\/)/;						
				if(!pattern.test(this.userInfo.user_header)) {
					this.hdimg = config.image_url+this.userInfo.user_header
				}else{
					this.hdimg = this.userInfo.user_header;
				}
				this.avatar = [{url:this.hdimg}];
			},
			toRouter(){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/personalData',
					fail(e) {
						console.log(e)
					}
				})
			},
			deleteAvatar(){
				this.avatar = [];
			},
			async afterRead(lists, name){
				console.log(lists);
				let result = await this.uploadFilePromise(event.file)
				// console.log(result)
			},
			uploadFilePromise(file){
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://192.168.2.21:7001/upload', // 仅为示例，非真实的接口地址
						filePath: file,
						name: 'file',
						formData: {
							user: 'test'
						},
						success: (res) => {
							setTimeout(() => {
								resolve(res.data.data)
							}, 1000)
						}
					});
				})
			},
			chooseAvatar(){
				let _this = this;
				uni.chooseImage({
					count:1,
					sizeType:['original'],
					sourceType:['album'],
					async success(res) {
						_this.hdimg  = res.tempFilePaths[0];
						
						  // pathToBase64(_this.hdimg)
						  // .then(path=>{
							 //  console.log(_this.parseBlob(path));
							 //  return;
							 //  uni.request({
							 //  	url:api.uploadAvatar,
								// data:{
								// 	chunk:0,
								// 	adv_content:_this.parseBlob(path)
								// },
								// method:"POST",
								// success(res) {
								// 	console.log(res)
								// },
								// fail(err) {
								// 	console.log(err)
								// }
							 //  })
						  // })
						  // .catch(error=>{
							 //  console.log(error)
						  // })
						  
						 //  let metadata = {
							// type: 'image/jpeg'
						 //  };
						 //  let file = new File([data], "test.jpg", metadata);
						 //  console.log(file);
						uni.uploadFile({
							url:api.uploadAvatar,
							filePath: _this.hdimg,
							name: 'file',
							formData: {
								'token': uni.getStorageSync('token')
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
							},
							fail(err) {
								console.log(err);
							}
						})
					}
				})
			},
			dataURLtoFile(dataurl, filename) {
			 
			        var arr = dataurl.split(','),
			            mime = arr[0].match(/:(.*?);/)[1],
			            bstr = atob(arr[1]), 
			            n = bstr.length, 
			            u8arr = new Uint8Array(n);
			            
			        while(n--){
			            u8arr[n] = bstr.charCodeAt(n);
			        }
			        
			        return new File([u8arr], filename, {type:mime});
				
			},
			parseBlob(base64){
				var arr = base64.split(',');
				var mime = arr[0].match(/:(.*?);/)[1];
				var bstr = atob(arr[1]);
				var n = bstr.length;
				var u8arr = new Uint8Array();
				for(var i=0;i<n;i++){
					u8arr[i] = bstr.charCodeAt(i);
				}
				var url = URL || webkitURL;
				return url.createObjectURL(new Blob([u8arr],{type:mime}));
			},
			preservation(){
				uni.showLoading({
					title:"修改中"
				})
				uni.request({
					url:api.EditUserInfo,
					data:{
						nick_name : this.userInfo.nick_name,
						email : this.userInfo.email,
						sex:this.userInfo.sex,
						birthday: this.userInfo.birthday,
						img_new : "",
						type:'data:image/jpeg;base64',
						token:uni.getStorageSync("token")
					},
					method:"POST",
					success(result) {
						if(result.data.status){
							uni.showToast({
								title:"修改成功",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"修改失败",
								icon:"none"
							})
						}
						uni.hideLoading();
					},
					fail(err) {
						uni.hideLoading();
						console.log(err)
					}
				})
			}
			    
			  
		},
		mounted() {
			this.userinfo();
		}	
	}
</script>

<style lang="scss">
	
	.person-wrap {
	  background: #fff;
	  .hd {
	    display:flex;
		justify-content: space-between;
		align-items: center;
		padding:5px 10px;
		color:$font-color-light;
	    // height: 114rpx;
	    position: relative;
		
	    border-bottom: 1rpx solid rgba($color: #000000, $alpha: 0.05);
	    
	    .input {
	      width: 300%;
	      height: 100%;
	      position: absolute;
	      left: -200%;
	      top: 0;
	    }
	    image {
	      width: 100rpx;
	      height: 100rpx;
	      border-radius: 100%;
	      box-sizing: border-box;
		  background-color: $light-grey;
		  
	    }
		image.fr{
			margin-right: 10px;
		}
		.fl{
			font-size: 12px;
		}
	 
	   
	    .icon-btn {
	      position: absolute;
	      top: 50%;
	      right: 20rpx;
	      margin-top: -12rpx;
	      width: 14rpx;
	      height: 24rpx;
	      background-size: 100% 100%;
	    }
	  }
	  .dd {
	    .li:nth-child(1) {
	      .icon-btn {
	        display: none;
	      }
	    }
	    .li {
	      
	      border-bottom: 1rpx solid rgba($color: #000000, $alpha: 0.05);	      
	      
	      padding: 10px;
		  display:flex;
		  align-items: center;
		  justify-content: space-between;
		  width: 100%;
		  .fl{
			  color: $font-color-light;
		  }
		  .fr{
			  color:$font-color-dark
		  }
	      .icon-btn {
	        position: absolute;
	        top: 50%;
	        right: 20rpx;
	        margin-top: -12rpx;
	        width: 14rpx;
	        height: 24rpx;
	        background-size: 100% 100%;
	      }
	    }
	  }
	}
	.button-wrap {
	  padding: 20rpx;
	}
	
	.from-btn {
	  width: 710rpx;
	  height: 90rpx;
	  text-align: center;
	  line-height: 90rpx;
	  background: #d02629;
	  border-radius: 40rpx;
	  box-sizing: border-box;
	  color: #fff;
	  font-size: 32rpx;
	  margin: 60rpx auto 20rpx;
	}
	
	.from-btn:active {
	  box-shadow: 0 10rpx 10rpx #ccc;
	}
	
	.prompt {
	  text-align: center;
	  font-size: 24rpx;
	  color: #3d4245;
	  position: relative;
	  .spann {
	    font-size: 32rpx;
	    color: #d0111b;
	    position: absolute;
	    top: 50%;
	    left: 310rpx;
	    margin-top: -15rpx;
	  }
	}
</style>
