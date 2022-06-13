<template>
  <view class="logist-wrap">
    <view class="exp-name">
      <view class="list-hide-top">{{express.name}}{{express.code}}</view>
      <view class="list-hide-bottom">{{logis_data.LogisticCode}}</view>
    </view>
    <view v-if="logis_data.Traces.length>0">
      <view class="status-wrap" :class="{active:index == 0}" v-for="(item,index) in logis_data.Traces" :key="index">
        <view class="list-item">
          <view class="status-icon-wrap">
            <text class="icon"></text>
          </view>
          <view class="hd clearfix">
            <text class="fl time">{{item.AcceptTime}}</text>
            <text class="fr name"></text>
            <text class="icon"><i></i></text>
          </view>
          <view class="con">{{item.AcceptStation}}</view>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="status-wrap">
        <view class="list-item">
          <view class="status-icon-wrap">
            <text class="icon"></text>
          </view>
          <view class="hd clearfix">
            <text class="fl time"></text>
            <text class="fr name"></text>
            <text class="icon"><i></i></text>
          </view>
          <view class="con">{{logis_data.Reason}}</view>
        </view>
      </view>
    </view>

  </view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import config from '@/config.js'
import api from '@/api.js'
export default {
  data() {
    return {
      index: 0,
      cateId: 0,
      order_status: 0,
      express_id: 0,
      exp_id: 0,
      logis_data: {},
      express: {},
    }
  },
  components: {
  },
  onLoad(options){
    this.cateId = options.id;
    this.order_status = options.order_status;
    this.express_id = options.express_id;
    this.exp_id = options.exp_id;
    this.getOrderInfo();
  },
  methods:{
      getOrderInfo(){
        let _this = this;
        uni.request({
          method: "POST",
          url: api.lookOrderPackageExpress,
          data: {
            id: _this.cateId,
            express_id: _this.express_id,
            exp_id: _this.exp_id,
            order_status: _this.order_status,
            token:uni.getStorageSync("token")
          },
          success: (res) => {
            if(res.data.status==1){
               _this.express = res.data.data.express;
               _this.logis_data = JSON.parse(res.data.data.logist);
            }else{
              uni.showToast({
                title:res.data.message
              });
            }
          },
          fail: (res)=>{
          }
        })
      }
  }
}
</script>
<style lang="scss">
.exp-name{
  display: flex;
  margin-top: 20rpx;
  .list-hide-top {
    width: 160rpx;
    height: 50rpx;
    margin-left: 50rpx;
  }
  .list-hide-bottom {
    bottom: 0;
    width: 560rpx;
    height: 50rpx;
  }
}

.status-wrap {
  margin: 20rpx 35rpx;
  border-left: 1px solid #bbb;
  position: relative;
  padding-bottom: 100rpx;
  .list-item {
    padding: 20rpx;
    margin-top: 40rpx;
    margin-left: 35rpx;
    border: 1px solid #d2d2d2;
    border-radius: 5px;
    width: 616rpx;
    position: relative;
    background: #fff;
    .status-icon-wrap {
      position: absolute;
      left: -74rpx;
      top: 0;
      width: 74rpx;
      height: 100%;
      .icon {
        position: absolute;
        left: 25rpx;
        top: 20rpx;
        width: 21rpx;
        height: 21rpx;
        background: #fff;
        border: 5rpx solid #b5b5b5;
        box-sizing: border-box;
        border-radius: 50%;
      }
    }
    .hd {
      span {
        color: #999;
        font-size: 25rpx;
      }
      position:relative;
      span.icon {
        position: absolute;
        left: -30rpx;
        top: 10rem;
        width: 20rpx;
        height: 20rpx;
        border: 1px solid #ccc;
        transform: rotate(45deg);
        background: #fff;
        box-sizing: border-box;
        i {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 20rpx;
          height: 20rpx;
          border: 1px solid #fff;
          background: #fff;
        }
      }
    }
    .con {
      font-size: 30rpx;
      color: #333;
      padding: 20rpx 0;
      line-height: 40rpx;
    }
  }
  .list-item.active {
    .con {
      color: #e02828;
    }
    .status-icon-wrap {
      .icon {
        background: #e02828;
        border-color: #e02828;
        box-shadow: 0 0 10rpx 5rpx rgba(224, 40, 40, .5);
      }
    }
  }

}
</style>