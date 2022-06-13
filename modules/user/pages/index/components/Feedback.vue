<template>
	<view>
		<view class="ordinary">
			<view class="li">
				<view class="p">
					<text class="span">反馈类型</text>
          <picker @change="bindPickerChange" :value="index" :range="array" range-key="feedBackName">
            <view class="uni-input picker_input">{{array[index].feedBackName}}</view>
          </picker>
				</view>
			</view>
			<view class="li">
				<view class="p">
					<text class="span">联系方式</text>
					<u-input type="text" v-model="mobile" class="input" placeholder="请输入手机号或邮箱等..."/>
				</view>
			</view>
			<view class="li">
				<view class="p">
					<text class="span">反馈内容</text>
					<u-input type="text" v-model="con" class="input" placeholder="请输入反馈内容..."/>
				</view>
			</view>
		</view>
		<view class=" protect" @click="submit">确认提交</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		data(){
			return {
				config,
				fn: '',
				con: '',
				mobile: '',
        array: [],
				btmValue:'',
				status:'',
        index: 0,
			}
		},
		methods:{
			submit(){
				if(this.status == '') {
					uni.showToast({title:'请选择反馈类型'});
					return;
				}
        if(this.mobile == '') {
          uni.showToast({title:'联系方式不能为空'});
          return;
        }
				if(this.con == '') {
					uni.showToast({title:'反馈内容不能为空'});
					return;
				}
				let _this = this;
				uni.request({
          method: "POST",
					url : api.feedback,
          data: {
            type:this.status,
            tel:this.mobile,
            content:this.con,
            token:uni.getStorageSync("token")
          },
					success: (res) => {
						if(res.data.status == 1){
							uni.navigateTo({
								url: '/modules/user/pages/index/index',
								fail(e) {
									console.log(e)
								}	
							})
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
      bindPickerChange: function(e) {
        this.index = e.detail.value
        this.status = this.array[e.detail.value].id
      },
      feedBackType() {
        let _this = this;
        uni.request({
          method: "POST",
          url : api.feedbackType,
          data: {
            token:uni.getStorageSync("token")
          },
          success: (res) => {
            if(res.data.status == 1){
              _this.array = res.data.data;
            }else{
              uni.showToast({title:res.data.message});
            }
          },
          fail: (res)=>{
            console.log(res);
          }
        })

      },
		},
		mounted() {
      this.feedBackType()
		}
	}
</script>

<style lang="scss">
	.pop {
		width: 100%;
		padding: 20rpx;
		height:700rpx;
		box-sizing: border-box;
	}
	.picker-toolbar {
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
	}
	.select {
		width: 100%;
		padding: 20rpx;
	}
	.mint-datetime-action{
		color: #ff8000;
		width: 50%;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	.mint-datetime-cancel{
		float: left;
	}
	.mint-datetime-confirm{
		float: right;
	}
	.address-area-tit {
		padding: 0;
		box-shadow: none;
		border-bottom: 0;
		height: 82rpx;
		line-height: 80rpx;
		.li {
			cursor: pointer;
			position: relative;
			left: 0;
			top: 2rpx;
			height: 80rpx;
			padding: 0 20rpx;
			width: 33%;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			text-align: center;
			font-size: 24rpx;
			display: inline-block;
			border-bottom: 2rpx solid #ccc;
		}
		.li.active {
			border-bottom: 2rpx solid #ff8000;
			color: #ff8000;
		}
	}
	.address-city {
		height: 450rpx;
		overflow:hidden;
		margin-top: 20rpx;
		overflow-y: scroll;
		.li {
			padding: 0 70rpx;
			line-height: 60rpx;
			font-size: 24rpx;
			cursor: pointer;
		}
		.li.selected-li {
			color: #ff8000;
		}
	}
	.ordinary{
		width: 100%;
		height: 90%;
		border-top: 2rpx solid #f1f1f1;
	    .li{
	        background-color: #fff;
	        padding: 0 25rpx;
	        border-bottom: 2rpx solid #f1f1f1;

	        .p{
              display: flex;
              padding:20rpx 0;
            }
	        .span{
	            color: #727272;
	            font-size: 28rpx;
              padding:15rpx 0 0 0;
              width:250rpx;
	        }
	        .input{
	        	width: 420rpx;
	        	border: 0;
	        	font-size: 25rpx;
	        }
         .picker_input{
           margin-top: 15rpx;
           font-size: 28rpx;
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
