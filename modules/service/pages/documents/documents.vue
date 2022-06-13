<template>
  <view>
    <tab-header :sortData ="sortData" v-on:sortCon ="tabindex" :tabdata ="tabdata"></tab-header>
    <view v-if="titleIndex ==0 && datas.length!= 0 " class="ordinary" >
      <view v-for="(ordins,index) in datas" @click="editOr(ordins)" class="ordinaryLi">
        <view class="p">发票抬头：{{ordins.name}}</view>
        <image src="@/static/images/common/right-icon.png" alt="" class="right_img"></image>
      </view>
    </view>
    <view v-if="titleIndex ==1 && news.length!= 0 " class="increase" >
      <view v-for="(items,index) in news" @click="editIn(items)" class="li">
        <view>
          <view class="p">发票号码：{{items.ein}}</view>
          <view class="p">公司名称：{{items.company_name}}</view>
          <view class="p">开户银行：{{items.opening_bank}}</view>
          <view class="p">注册地址：{{items.prov_name + items.city_name}}</view>
          <view class="p">开户银行账号{{items.bank_account}}</view>
        </view>
        <image src="@/static/images/common/right-icon.png" alt="" class="right_img"></image>
      </view>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <button type="warn" @click="routerLink()">{{btn[titleIndex]}}</button>
    </view>
  </view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import config from '@/config.js'
import api from '@/api.js'
import tabHeader from '@/modules/service/pages/documents/child/tabHeader.vue';
export default {
  data () {
    return {
      config,
      sortData:["普通发票","增资发票"],
      tabdata:0,
      datas:[],
      titleIndex:0,
      btn:['新增发票抬头','新增专票资质'],
      news:[]
    }
  },
  onLoad(options){
    this.loadData()
  },
  methods: {
    loadData(){
      let _this = this;
      let url = api.myInvoice+
          '?id='+this.cateId+
          '&type=1'+
          '&token='+uni.getStorageSync('token');
      uni.request({
        url : url,
        success: (res) => {
          _this.datas=res.data.data
        },
        fail: (res)=>{
          console.log(res);
        }
      })
    },
    tabindex(index){
      if(this.titleIndex==1){
        this.titleIndex==1
      }else{
        let _this = this;
        let url = api.myInvoice+
            '?id='+this.cateId+
            '&type=2'+
            '&token='+uni.getStorageSync('token');
        uni.request({
          url : url,
          success: (res) => {
            _this.news=res.data.data
          },
          fail: (res)=>{
            console.log(res);
          }
        })
      }
      this.titleIndex = index;
    },
    editOr(item){
      uni.setStorageSync('invoice_title',item);
      uni.navigateTo({
        url: '/modules/service/pages/documents/child/editOrdinary'
      })
    },
    editIn(items){
      uni.setStorageSync('increase',items);
      uni.navigateTo({
        url: '/modules/service/pages/documents/child/editIncrease'
      })
    },
    routerLink(){
      if(this.titleIndex ==0){
        uni.navigateTo({
          url: '/modules/service/pages/documents/child/addOrdinary'
        })
      }else{
        uni.navigateTo({
          url: '/modules/service/pages/documents/child/addIncrease'
        })
      }
    },
  },
  components:{
    tabHeader,
  }
}
</script>
<style lang="scss">
.ordinary{
  height: 1030rpx;
  text-align: center;
  overflow: auto;
  background-color: #f1f1f1;
  .ordinaryLi{
    margin-top: 15rpx;
    height: 20rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 50rpx;
    .p{
      font-size: 30rpx;
    }
    .span{
      color: #727272;
      font-size: 30rpx;
    }
    .right_img{
      width: 30rpx;
      height: 45rpx;
    }
  }
}
.increase{
  text-align: center;
  height: 1030rpx;
  overflow: auto;
  background-color: #f1f1f1;
  .li{
    margin-top: 15rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding:50rpx;
    .p{
      font-size: 28rpx;
      line-height: 50rpx;
    }
    .right_img{
      width: 30rpx;
      height: 45rpx;
      margin-left: 3rpx
    }
  }
}
</style>
