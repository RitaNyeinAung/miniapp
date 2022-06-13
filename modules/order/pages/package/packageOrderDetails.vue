<template>
  <view>
    <view class="order-wrap">
      <view class="order-number">
        <view class="fl title" >订单编号：{{order.order_sn_id}}</view>
        <view class="status fr" >{{order_status[Number(order.order_status)+1]}}</view>
      </view>
      <view class="bnack"></view>
      <view  class="inf-header">
        <view class="title">
          <view class="inf-name clearfix">
            <view class="name fl"><text class="span"></text>{{address.realname}}</view>
            <view class="phone fr"><text class="span"></text>{{address.mobile}}</view>
          </view>
          <view class="address">
            <view>{{address.prov_name+"-"+address.city_name+"-"+address.dist_name}}</view>
            <view class="add">{{address.address}}</view>
          </view>
        </view>
        <image src="@/static/images/common/bottom-bj.jpg" class="bottom-img"></image>
        <image src="@/static/images/common/btn-right.png" class="btnright"></image>
      </view>
      <view class="bnack"></view>
      <view class="mark-wrap">
        <view>
          <!-- 购物车购买 -->

          <view class="store">
            <view class="header li"><image :src="config.image_url + order.store_logo"></image><text class="span">{{order.shop_name}}</text></view>
            <view class="clearfixli li" id="store" v-for="item in order.goods">
              <image v-if="item.pic_url" :src="config.image_url + item.pic_url " class="fl"></image>
              <image v-else src="@/static/images/common/img_bad.jpeg"></image>
              <view class="pull-right fl">
                <view class="text">{{item.title}}</view>
                <view class="price-wrap clearfix">
                  <text class="number fr">数量 ：{{item.package_num}}</text>
                  <text class="fl price">￥<text class="span">{{item.goods_discount}}</text></text>

                </view>
              </view>

            </view>
          </view>
        </view>
      </view>
      <view class="dist-wrap">
        <view class="hd">
          <view class="title fl">开具发票</view>
          <view>
            {{order.translate}}
          </view>
        </view>
        <view class="dd">
          <view class="title">给商家留言：</view>
          <view class="txtview">
            {{order.remarks}}
          </view>
        </view>
      </view>
      <view class="price-set-wrap"  style="padding-left: 5px;">
        <view class="total price">
          <text class="fl">商品总额</text>
          <text class="fr">￥{{order.money}}</text>
        </view>
        <view class="freight price">
          <text class="fl">实付款</text>
          <text class="fr">￥{{order.price_sum}}</text>
        </view>
      </view>
      <view class="footer-wrap" >
        <view class="btn" v-if="order.order_status == 3" @click="conReceipt">确认收货</view>
        <view class="pay" v-if="order.order_status == 3||order.order_status==2" @click="toLogis(order)">查看物流</view>
        <view class="pay" v-if="order.order_status==1||order.order_status=='-1'" @click="goBuy">再次购买</view>
        <view class="black" v-if="order.order_status == 0" @click="cancelOrder">取消订单</view>
        <view class="pay" v-if="order.order_status == 0" @click="pay(order)">马上付款</view>

      </view>
    </view>
    <view class="bnack"></view>
  </view>
</template>

<script>
import config from '@/config.js'
import api from '@/api.js'
import {mapState} from 'vuex'
export default {

  data(){
    return {
      config,
      title: '订单详情',
      order: {},
      address: '',
      totalPrice: 0,
      order_status:['取消订单','未支付','已支付','发货中','已发货','已收货','退货审核中','审核失败','审核成功','退款中','退款成功'],
      shipMonery: '',
      cutvalue: '',
      goodsPrice: '',
      IntegralPri:''
    }
  },
  onLoad(options){
    this.routid = options.id;
    this.getData();
  },
  methods:{
    getData(){
      let _this = this;
      uni.request({
        method: "POST",
        url: api.packageOrderDetail,
        data: {id:_this.routid,token:uni.getStorageSync("token")},
        success: (res) => {
          if(res.data.status == 1){
            _this.order = res.data.data;
            _this.address = this.order.address;
          }
        },
        fail: (res)=>{
          console.log(res);
        }
      })
    },
    toLogis(item) {
      uni.navigateTo({
        url: '/modules/order/pages/package/logistics?id='+item.id+'&order_status='+item.order_status+'&express_id='+item.express_id+'&exp_id='+item.exp_id,
        fail(e) {
          console.log(e)
        }
      })
    },
    cancelOrder() {
      let _this = this;
      uni.showModal({
        title: '温馨提示!',
        content: '确定取消订单吗?',
        success: function (res) {
          if (res.confirm) {
            uni.request({
              method: "POST",
              url: api.packageCancelOrder,
              data: {id:_this.routid,token:uni.getStorageSync("token")},
              success: (res) => {
                if(res.data.status==1){
                  uni.showToast({
                    title:res.data.message
                  });
                  uni.navigateTo({
                    url: 'modules/order/pages/package/packageOrderList'
                  })
                }else{
                  uni.showToast({
                    title:res.data.message
                  })

                }
              },
              fail: (res)=>{
                uni.showToast({title:res.data.message})
              }
            })
          }
        }
      })
    },
    goBuy(item) {
      let _this = this;
      uni.request({
        method: "POST",
        url: api.orderPackageBuyAgain,
        data: {id:_this.routid,token:uni.getStorageSync("token")},
        success: (res) => {
          if(res.data.status==1){
            uni.showToast({
              title:res.data.message
            });
            uni.navigateTo({
              url: 'modules/cart/pages/index/index'
            })
          }else{
            uni.showToast({
              title:res.data.message
            })

          }
        },
        fail: (res)=>{
          uni.showToast({title:res.data.message})
        }
      })
    },
    conReceipt() {
      let _this = this;
      uni.showModal({
        title: '温馨提示!',
        content: '确定订单已收货吗?',
        success: function (res) {
          if (res.confirm) {
            uni.request({
              method: "POST",
              url: api.orderPackageConfirmGet,
              data: {id:_this.routid,token:uni.getStorageSync("token")},
              success: (res) => {
                if(res.data.status==1){
                  uni.showToast({
                    title:res.data.message
                  });
                  uni.navigateTo({
                    url: '/modules/order/pages/package/packageOrderList'
                  })
                }else{
                  uni.showToast({
                    title:res.data.message
                  })

                }
              },
              fail: (res)=>{
                uni.showToast({title:res.data.message})
              }
            })
          }
        }
      })
    },
    pay(item) { //马上付款
      uni.navigateTo({
        url: '/modules/common/pages/productDetail/cashier?order_sn_id='+item.order_sn_id+'&total='+item.price_sum,
      })
    },
  },
}
</script>

<style lang="scss">
.order-wrap{
  background-color: $light-grey;
  min-height: 100vh;
  margin-bottom: 150rpx;
}
.order-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px 0px 10px;
  background-color: white;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  height: 100rpx;
  .title {
    font-size: 28rpx;
    color: #666;
  }
  .status {
    font-size: 32rpx;
    color: #d0111b;
    overflow: hidden;
    margin-right: 50rpx;
  }
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
      }
    }
  }

}

.mark-wrap{
  margin:10rpx;
  padding:10rpx;
  .header{
    display:flex;
    align-items: center;
    justify-content: flex-start;
    padding:5px 10px;
    border-bottom: 0.3px solid $light-grey;
    image{
      width:30px;
      height:30px;
      margin-right: 10px;
      background-color: $light-grey;
      border-radius: 5px;
    }
    text{
      color:$font-color-base
    }
  }
  .clearfixli{
    padding:10px 10px 10px 10px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    image{
      background-color: $light-grey;
      width:60px;
      height: 60px;
      margin-right: 10px;
      border-radius: 5px;
    }
    .pull-right{
      display: flex;
      flex-direction: column;
      .price-wrap{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .price{
          color:$main-color
        }
        .number{
          color:$font-color-base
        }
      }
    }
  }
  .clearfixli:not(:last-child){
    border-bottom: 0.2px solid $light-grey;
  }
  .store{
    border-bottom: 0.2px solid $light-grey;
    background:white;
    border-radius: 5px;
    .header{
      display:flex;
      align-items: center;
      justify-content: flex-start;
      padding:5px 10px;
      border-bottom: 0.3px solid $light-grey;
      image{
        width:30px;
        height:30px;
        margin-right: 10px;
        background-color: $light-grey;
        border-radius: 5px;
      }
      text{
        color:$font-color-base
      }
    }
    .clearfixli{
      padding:10px 10px 10px 10px;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      image{
        background-color: $light-grey;
        width:60px;
        height: 60px;
        margin-right: 10px;
        border-radius: 5px;
      }
      .pull-right{
        display: flex;
        flex-direction: column;
        .price-wrap{
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          .price{
            color:$main-color
          }
          .number{
            color:$font-color-base
          }
        }
      }
    }
    .clearfixli:not(:last-child){
      border-bottom: 0.2px solid $light-grey;
    }
  }
}

.dist-wrap{
  margin:0px 10px 10px 10px;

  .hd{
    background-color: white;
    border-radius: 5px;
    padding:10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:100%;
    color:$font-color-base;
    margin-bottom: 5px;
    view{
      display: flex;
      align-items: center;
      .busi{
        color:$font-color-light

      }
      image{
        width:5px;
        height:10px;
        margin-left:5px;
      }
    }
  }
  .dd{
    display: flex;
    flex-direction: column;
    padding:10px;
    background:white;
    border-radius: 5px;

    .title{
      color:$font-color-base;
      margin-bottom: 2px;

    }
    .txtview{
      height: 100rpx;
      background-color: #dadada;
      border-radius: 20rpx;
    }
  }
}
.price-set-wrap{
  margin:0px 10px 50px 10px;
  background-color: white;
  border-radius: 5px;
  padding:5px 10px;
  .price{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding:5px 0px;
  }
}
.footer-wrap{
  position:fixed;
  bottom:5px;
  margin:10px;
  box-sizing: border-box;
  background:white;
  border-radius: 5px;
  box-shadow: 2px 2px 5px rgba($color: #000000, $alpha: 0.1);
  display:flex;
  align-items: center;
  padding:5px 5px 5px 5px;
  justify-content: space-between;
  width:51%;
  right:0;
  border-radius: 50px;
  .btn{
    border-radius: 50px;
    color:white;
    padding:8px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #65ee47;
  }
  .red{
    border-radius: 50px;
    color:white;
    padding:8px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: red;
  }
  .black{
    border-radius: 50px;
    color:white;
    padding:8px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #666;
  }
  .pay{
    border-radius: 50px;
    color:white;
    padding:8px 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f97620;
  }
}
</style>
