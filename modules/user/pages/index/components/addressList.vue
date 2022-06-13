<template>
  <view>
    <view class="address-list">
      <view class="icon_del">
        <text class="message">下过订单的地址请不要修改,肉香更换地址请添加一条</text>
      </view>
      <view class="inf-header" v-for="(address, index) in addresses" @click="editAddress(address)">
        <view class="title">
          <view class="inf-name clearfix">
            <view class="name fl"><text class="span"></text>{{address.realname}}</view>
            <view class="phone fr"><text class="span"></text>{{address.mobile}}</view>
          </view>
          <view class="address">
            <view>{{address.prov_name+"-"+address.city_name+"-"+address.dist_name}}</view>
            <view class="add">{{address.address}}<button type="warn" v-if="address.status == 1" class="mini-btn" disabled="true" size="mini">默认</button></view>
          </view>
        </view>
        <image src="@/static/images/common/bottom-bj.jpg" class="bottom-img"></image>
        <image src="@/static/images/common/btn-right.png" class="btnright"></image>
      </view>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <button type="warn" @click="addAddress">新增收货地址</button>
    </view>
  </view>
</template>

<script>
import config from '@/config.js'
import api from '@/api.js'
	export default{
		data(){
			return {
        config,
				addresses:[],
			}
		},
		methods:{
			getAddress(){
				let _this = this;
				uni.request({
					url:api.getUserAddress,
					data:{
						token:uni.getStorageSync("token")
					},
					method:"POST",
					success(res) {
						if(res.data.data){														
							_this.addresses = res.data.data
						}
					},
					fail(e) {
					}
				});
			},
      addAddress() {
        uni.navigateTo({
          url: '/modules/user/pages/index/components/addAddress'
        })
			},
      editAddress(item) {
        uni.navigateTo({
          url: '/modules/user/pages/index/components/editAddress?id='+item.id,
        })
			},
		},
		mounted(){
			this.getAddress();
		}
			
	}
</script>

<style lang="scss">
	.address-list{
    height: 1087rpx;
    margin-bottom: 20rpx;
    overflow: auto;
		background-color: $light-grey;
	}
  .message{
    color: red;
    font-size: 30rpx;
  }
  .inf-header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin:10px 10px 0px 10px;
    background-color: white;
    border-radius: 5px;

    position: relative;
    overflow: hidden;
    .btnright{
      width:6px;
      height: 10px;
      margin-right:10px;
    }
    .bottom-img{
      position:absolute;
      bottom:0px;
      height:4px;
      width:100%;
      left:0px;
      right:0px;
    }
    .title{
      margin:15px 10px;
      width:100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .inf-name{
        display: flex;
        flex-direction: column;
        .name{
          padding-bottom: 5px;
        }

      }
      .address{
        color: $font-color-base;
        display: flex;
        justify-content: flex-end;
        flex-direction: column;
        .add{
          padding-top: 5px;
          color:$font-color-light;
          .mini-btn{
            background-color: red;
            color: white;
            height: 50rpx;
            line-height: 50rpx;
            width: 85rpx;
            padding: 0;
            margin-left: 20rpx;
          }
        }
      }
    }

  }
</style>
