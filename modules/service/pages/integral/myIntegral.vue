<template>
  <view class="integralDetail">
    <view class="header">
      <view class="date">
        <picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
          <view>
            <text>{{date}}</text>
            <image src="@/static/images/common/down-one.png"></image>
          </view>
        </picker>
      </view>
      <view class="more" @click="routerLink">
        <view>
          <image src="@/static/images/common/shopping-bag.png"></image>
          <text>积分商城</text>

        </view>

      </view>
      <view class="integral">
        {{integral}}
        <text>积分</text>
      </view>
    </view>
    <view class="tab">
      <view class="income" :class="{active: type == 1}" @click="proSort(1)">
        <view class="plu">+{{incomeMonth}}</view>
        <view class="txt">积分获取</view>
      </view>
      <view class="exepen" :class="{active: type == 0}" @click="proSort(0)">
        <view class="min">-{{spendingMonth}}</view>
        <view class="text">积分支出</view>
      </view>
      <tab-header :sortData ="sortData" v-on:sortCon ="tabindex" :tabdata ="tabdata"></tab-header>
    </view>
    <view>
      <view class="uni-flex uni-row">
        <view class="flex-item uni-bg-red">日期</view>
        <view class="flex-item uni-bg-green">备注</view>
        <view class="flex-item uni-bg-blue">变动积分</view>
      </view>
      <view class="uni-flex uni-row"  v-for="(items,index) in integralRecords">
        <view class="flex-item uni-bg-red">{{items.trading_time}}</view>
        <view class="flex-item uni-bg-green">{{items.remarks}}</view>
        <view class="flex-item uni-bg-blue">{{items.changes_integral}}</view>
      </view>
    </view>

    <uni-load-more :status="loadingType"></uni-load-more>
    <view class="uni-padding-wrap uni-common-mt">
      <button type="warn" @click="routerLink">马上兑换商品</button>
    </view>
  </view>

</template>

<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import config from '@/config.js'
import api from '@/api.js'
function getDate(type) {
  const date = new Date();

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === 'start') {
    year = year - 10;
  } else if (type === 'end') {
    year = year + 10;
  }
  month = month > 9 ? month : '0' + month;;
  day = day > 9 ? day : '0' + day;

  return `${year}-${month}`;
}
export default {

  data(){
    return {
      config,
      page: 1,
      loadingType: 'more',
      dataInte:'',
      show:false,
      integralRecords:[],
      type:1,
      selectedMonth:0,
      selector:[],
      sortData:["积分获取","积分支出"],
      date: getDate({
        format: true
      }),
      startDate:getDate('start'),
      endDate:getDate('end'),
      integral:0,
      incomeMonth:0,
      spendingMonth:0,
    }
  },
  components:{
    uniLoadMore,
  },
  onReachBottom(){
    this.loadData();
  },
  methods:{
    async loadData(type='add', loading){
      if(type === 'add'){
        if(this.loadingType === 'nomore'){
          return;
        }
        this.loadingType = 'loading';
      }else{
        this.loadingType = 'more'
      }
      let url = api.integralLog+
          '?page='+this.page+"&token="+uni.getStorageSync("token")+"&date="+this.date+"&type="+this.type;
      let _this = this;
      uni.request({
        url : url,
        success: (res) => {
          if(res.data.status == 1){
            _this.integral = res.data.data.integral;
            _this.incomeMonth = res.data.data.incomeMonth;
            _this.spendingMonth = res.data.data.spendingMonth;
            if(res.data.data.records.length !== 0){
              for (let index = 0; index < res.data.data.records.length; index++) {
                _this.integralRecords.push(res.data.data.records[index]);
              }
              this.page++;
              this.loadingType = "more"
            }else{
              this.loadingType = "nomore"
            }
          }
        },
        fail: (res)=>{
          console.log(res);
        }
      })

    },
    selectMonth(data){
      this.selectedMonth=data[0];
    },
    changeTab(index){
      this.type = [1,0][index]
    },
    bindDateChange: function(e) {
      this.date = e.detail.value;
      this.integralRecords = [];
      this.page = 1;
      this.loadingType = "more";
      this.loadData();
    },
    proSort(type){
      this.type = type;
      this.integralRecords = [];
      this.page = 1;
      this.loadingType = "more";
      this.loadData();
    },
    routerLink(){
      uni.navigateTo({
        url: '/modules/service/pages/integral/index'
      })
    }
  },
  mounted() {
    this.loadData();
  },

}
</script>

<style lang="scss">
.integralDetail{
  background-color: $light-grey;
  min-height:100vh
}
.header{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 130px;
  width: 100%;
  background-color: #2b2b2b;
  position: relative;
  .date{
    position: absolute;
    top:10px;
    left:10px;

    view{
      display: flex;
      align-items: flex-end;

      text{
        width:50px;
        color:white;
      }
      image{
        width:20px;
        height: 20px;
        opacity: 0.5;
        margin-left: -5px;
      }
    }
  }
  .more{
    position: absolute;
    top:10px;
    right:10px;
    view{
      display: flex;
      align-items: center;
      padding:5px 0px;
      text{
        width:50px;
        color:white;
      }
      image{
        width:15px;
        height: 15px;

        margin-right: 5px;
      }
    }
  }
  .integral{
    color:#ffe169;
    font-size: 40px;
    text{
      color:white;
      font-size: 10px;
      margin-left: 10px;
    }
  }
}
.tab{
  width:100%;
  background: white;
  padding-bottom: 5rpx;
  height: 85rpx;
  .income{
    background: #fff;
    float: left;
    text-align: center;
    padding: 2rpx 0;
    width: 50%;
    .plu{
      height: 50rpx;
      font-size: 28rpx;
    }
    .txt{
      font-size: 28rpx;
      height: 30rpx;
      line-height: 4rpx;
    }
  }
  .exepen{
    padding: 2rpx 0;
    background: #fff;
    float: right;
    text-align: center;
    width: 50%;
    .min{
      height: 50rpx;
      font-size: 28rpx;
    }
    .text{
      font-size: 28rpx;
      height: 30rpx;
      line-height: 4rpx;
    }
  }
  .active {
    color: #d02629;
    border-bottom: 3rpx solid #d02629;
  }
}
.uni-row {
  display: flex;
  flex-direction: row;
  .flex-item {
    width: 33.3%;
    height: 100rpx;
    text-align: center;
    line-height: 100rpx;
  }
}

.uni-common-mt{
  position: fixed;
  bottom: 3px;
  width: 100%;
}
</style>
