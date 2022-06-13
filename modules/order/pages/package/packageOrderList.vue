<template>
  <view>
    <view class="nav-wrap">
      <view class="nav">
        <view class="li" v-for="(name,index) in datas.name" :key="name.id" :class="{active:isactive == index}"
              @click="proSort(index)"><text class="span">{{name}}</text></view>
      </view>
    </view>
    <view class="order-wrap">
      <view>
        <view class="order-list" v-for="(item,index) in order" :key="item.id">
          <view class="hd clearfix">
            <text class="title fl">{{item.shop_name}}</text>
            <text class="status fr">{{order_status[Number(item.order_status)+1]}}</text>
          </view>
          <view class="describe clearfix" v-for="text in item.goods" :key="text.id">
            <image class="fl" v-if="text.pic_url" :src="config.image_url+text.pic_url" @click="toDetails(text)"></image>
            <image class="fl" v-else src="@/static/images/common/img_bad.jpeg" @click="toDetails(text)"></image>
            <view class="fl words" @click="toDetails(item,text,index)">
              <view class="text">{{text.title}}</view>
              <text class="pack-num">x{{text.package_num}}</text>
              <text class="pack-count">{{text.goods_discount}}</text>
            </view>
            <view class="btn" @click="comment(item)" v-if="item.order_state == 1">马上评论
            </view>
          </view>
          <view class="commod clearfix">
            <text class="fl actual">实付款&nbsp;:&nbsp;<text class="actual-child">￥{{item.price_sum}}</text></text>
            <text class="icon" v-if="item.order_status == 4 || item.order_status == -1"
                  @click="deletOrder(item,index)"></text>
          </view>
          <view class="operation clearfix">
            <text class="timer fl">下单时间：{{item.create_time}}</text>
            <view class="btn fr" @click="payment(item)" v-if="item.order_status == 0">马上付款
            </view>
            <view class="btn fr" @click="checkOrder(item)" v-if="item.order_status == 1">查看订单
            </view>
            <view class="btn fr" @click="logistics(item)" v-if="item.order_status == 3">查看物流
            </view>
            <view class="btn fr repeat" @click="buyAgain(item)"
                  v-if="(item.order_status == 4 && item.order_state != 1) || (item.order_status == -1 && item.order_state != 1)">
              再次购买
            </view>
          </view>
        </view>
      </view>
      <uni-load-more :status="loadingType"></uni-load-more>
    </view>
  </view>
</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import config from '@/config.js'
import api from '@/api.js'
export default {

  data(){
    return {
      config,
      datas: {
        name: ['全部', '待付款', '待发货', '待收货', '已完成', '已取消', '待评论']
      },
      isactive: 0,
      page: 1,
      order: [],
      loadingType: 'more',
      order_status:['取消订单','未支付','已支付','发货中','已发货','已收货','退货审核中','审核失败','审核成功','退款中','退款成功']
    }
  },
  components:{
    uniLoadMore,
  },
  onLoad(options){
    this.cateId = options.id;
    uni.setStorageSync('OrderID',options.id);
  },
  onReachBottom(){
    this.addClass(uni.getStorageSync("ClickID"));
  },
  methods:{
    addClass(index,type='add', loading) {
      this.isactive = index;
      uni.setStorageSync('ClickID',index);
      let url = api.packageOrderAll;
      switch(index){
        case 0 : url = api.packageOrderAll;break; //默认	销量从高到低
        case 1 : url = api.packagePendingPayment;break;
        case 2 : url = api.packagePendingDelivery;break;
        case 3 : url = api.packageGoodsToBeReceived;break;
        case 4 : url = api.packageCompleted;break;
        case 5 : url = api.packageHaveBeenCancelled;break;
        case 6 : url = api.packageToBeEvaluated;break;
      }
      if(type === 'add'){
        this.loadingType = 'loading';
      }else {
        this.loadingType = 'more'
      }
      let _this = this;
      uni.request({
        method: "POST",
        url: url,
        data: {page:_this.page,token:uni.getStorageSync("token")},
        success: (res) => {
          if(res.data.data){
            for (let index = 0; index < res.data.data.list.length; index++) {
              _this.order.push(res.data.data.list[index]);
            }
            this.page++;
            this.loadingType = "more"
          }
          else{
            this.loadingType = "nomore"
          }
        },
        fail: (res)=>{
          console.log(res);
        }
      })
    },
    deletOrder(item,index){
      let url = api.packageOrderDel+
          '?id='+item.id;
      let _this = this;
      uni.request({
        url : url,
        success: (res) => {
          _this.order.splice(index,1);
          uni.showToast({title:res.data.message});
        },
        fail: (res)=>{
          console.log(res);
        }
      })
    },
    proSort(index){
      let _this = this;
      _this.page = 1;
      _this.order = [];
      _this.isactive = index;
      uni.setStorageSync('ClickID',index);
      this.addClass(index);
    },
    toDetails(item) {
      uni.navigateTo({
        url: `/modules/common/pages/productDetail/index?id=`+item.goods_id
      })
    },
    payment(item){
      uni.navigateTo({
        url: '/modules/order/pages/package/packageOrderDetails?id='+item.id,
        fail(e) {
          console.log(e)
        }
      })
    },
    checkOrder(item){
      uni.navigateTo({
        url: '/modules/order/pages/package/packageOrderDetails?id='+item.id,
        fail(e) {
          console.log(e)
        }
      })
    },
    logistics(item){
      uni.navigateTo({
        url: '/modules/order/pages/package/logistics?id='+item.id+'&order_status='+item.order_status+'&express_id='+item.express_id+'&exp_id='+item.exp_id,
        fail(e) {
          console.log(e)
        }
      })
    },
    buyAgain(item){
      uni.navigateTo({
        url: `modules/common/pages/productIntegralDetail/confirmIntegralOrder?goods_id=`+item.goods_id+'&num='+item.goods_num
      })
    },
  },
  mounted() {
    this.addClass(uni.getStorageSync("OrderID"));
  }

}
</script>

<style lang="scss">
.fl{
  float: left;
}
.fr{
  float: right;
}
.nav-wrap {
  width: 100%;
  overflow-x: auto;
  background: #fff;

  .nav {
    width: 1239rpx;
    height: 94rpx;
    border-bottom: 2rpx solid #dfdfdd;
    border-top: 2rpx solid #dfdfdd;
    .li {
      width: 177rpx;
      height: 100%;
      text-align: center;
      overflow: hidden;
      box-sizing: border-box;
      float: left;
      .span {
        display: block;
        color: #676767;
        font-size: 30rpx;
        line-height: 54rpx;
        height: 54rpx;
        margin: 20rpx 0;
        border-right: 2rpx solid #dfdfdd;
      }
    }

    .li:last-child .span {
      border-right: 0;
    }

    .active {
      border-bottom: 6rpx solid #fd4f4b;

      .span {
        color: #ff781a;
      }
    }
  }
}
.order-list {
  background: #fff;
  line-height: 70rpx;
  margin-bottom: 20rpx;

  .hd {
    margin: 0 20rpx;
    border-bottom: 2rpx solid #dfdfdd;
    height: 70rpx;

    .title {
      font-size: 29rpx;
      color: #d02629;
    }

    .status {
      font-size: 30rpx;
      color: #f9781e;
    }

    .status.light {
      color: #adadad;
    }

    .status.ash {
      color: #333;
    }
  }

  .describe {
    margin: 0 20rpx;
    // height: 1.46rem;
    padding: 13rpx 0;
    border-bottom: 2rpx solid #dfdfdd;
    position: relative;

    .btn {
      position: absolute;
      right: 0;
      bottom: 10rpx;
      width: 150rpx;
      height: 50rpx;
      border: 2rpx solid #ff881e;
      background: #fff;
      border-radius: 40rpx;
      color: #ff881e;
    }

    image {
      width: 146rpx;
      height: 146rpx;
    }

    .words {
      width: 524rpx;

      .number {
        font-size: 22rpx;
        color: #fd5149;
      }
      .price {
        font-size: 28rpx;
        color: #333;
        line-height: 62rpx;
      }
      .add{
        font-size:25rpx;
        margin:63rpx 0 0 0;
        line-height:30rpx;
      }
      .text {
        padding: 0 20rpx;
        font-size: 32rpx;
        color: #333;
        line-height: 45rpx;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .pack-num{
        padding: 0 20rpx;
      }
      .pack-count{
        padding: 0 20rpx;
        float: right;
      }
    }
  }

  .commod {
    padding: 0 20rpx;
    height: 90rpx;
    line-height: 90rpx;
    border-bottom: 2rpx solid #dfdfdd;
    position: relative;

    .total {
      font-size: 30rpx;
      color: #333;
    }

    .actual {
      font-size: 30rpx;
    }
    .actual-child{
      font-size: 30rpx;
      color: #ff881e;
    }
    .icon {
      font-size: 30rpx;
      color: #333;
      position: absolute;
      right: 35rpx;
      top: 50%;
      width: 38rpx;
      height: 47rpx;
      background: url(@/static/images/common/trash.png);
      background-size: 100% 100%;
      margin-top: -23.5rpx;
    }
  }

  .operation {
    height: 90rpx;
    padding: 10rpx 20rpx;
    line-height: 70rpx;

    .timer {
      font-size: 25rpx;
      color: #757575;
    }

    .butn {
      width: 150rpx;
      height: 70rpx;
      margin-right: 10rpx;
      background: #fff;
      border: 2rpx solid #f9781e;
      font-size: 27rpx;
      color: #f9781e;
      border-radius: 10rpx;
      outline: none;
    }

    .btn {
      width: 150rpx;
      height: 70rpx;
      background: #fff;
      border: 2rpx solid #f9781e;
      font-size: 27rpx;
      color: #f9781e;
      border-radius: 10rpx;
      outline: none;
      line-height: 70rpx;
      text-align: center;
    }

    .repeat {
      width: 130rpx;
      height: 70rpx;
      background: #fff;
      border: 2rpx solid #f9781e;
      font-size: 27rpx;
      color: #f9781e;
      margin: 0 10rpx;
      border-radius: 10rpx;
      outline: none;
    }
  }
}
.whole-wrap {
  background: #f1f1f1;
}

.order-wrap {
  padding-top: 10rpx;
  background-color: #f1f1f1;
  .comm-null {
    padding-top: 50rpx;

    .p {
      font-size: 28rpx;
      color: #666;
      padding-top: 20rpx;
    }
  }
}
.up-warp {
  height: 50rpx;
  padding: 30rpx 0;
  text-align: center;

  .rotate {
    display: inline-block;
    vertical-align: middle;
    width: 32rpx;
    height: 32rpx;
    border-radius: 50%;
    border: 2rpx solid gray;
    margin-right: 12rpx;
    border-bottom-color: transparent;
  }

  .rotate {
    -webkit-animation: rotate .6s linear infinite;
    animation: rotate .6s linear infinite
  }

  @-webkit-keyframes rotate {
    0% {
      -webkit-transform: rotate(0deg)
    }
    100% {
      -webkit-transform: rotate(360deg)
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg)
    }
    100% {
      transform: rotate(360deg)
    }
  }

  .load-title {
    font-size: 24rpx;
    color: gray;
    display: inline-block;
    vertical-align: middle;
  }
}

.no-data {
  background-color: #fff;
  height: 50rpx;
  padding: 30rpx 0;
  text-align: center;
  font-size: 24rpx;
  color: gray;
}
</style>
