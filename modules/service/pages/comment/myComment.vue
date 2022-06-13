<template>
  <view class="document">
    <view class="content">
      <view :class="{active: sortHead == 0}"@click = "proSort(0)" class="li">
        <view class="secdiv">
          <view class="h4">{{allNum}}</view>
          <view class="h6">所有评价</view>
        </view>
      </view>
      <view :class="{active: sortHead == 1}" @click = "proSort(1)" class="li">
        <view class="secdiv">
          <view class="h4">{{appraisalNum}}</view>
          <view class="h6">有图评价</view>
        </view>
      </view>
    </view>
    <view class="item-wrap">
      <view class="item-list" v-for="item in mycomment" :key="item.id">
        <view class="product">
          <image v-if="item.pic_url" :src="config.image_url+item.pic_url"></image>
          <image v-else src="@/static/images/common/img_bad.jpeg"></image>

          <view class="text1-hidden">{{item.title}}</view>
        </view>
        <view class="text">{{item.content}}</view>
        <view class="img-wrap">
          <image v-if="item.path" v-for="(items,index) in item.path" :src="config.image_url+items.path"></image>
          <image v-else src="@/static/images/common/img_bad.jpeg"></image>
        </view>
        <view class="inf-wrap">
          <view class="inf">
            {{item.create_time}}&nbsp;&nbsp;&nbsp;
            <text v-for="items in item.space" :key="items.id">{{items.speName+':'+items.item}}</text>
          </view>
          <view class="status" v-if="item.score == 3">差评</view>
          <view class="status" v-if="item.score == 2">中评</view>
          <view class="status" v-if="item.score == 1">好评</view>
        </view>
      </view>
    </view>
    <uni-load-more :status="loadingType"></uni-load-more>
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
      loadingType: 'more',
      mycomment:[],
      chart:[],
      sortData:["所有评价", '有图评价'],
      sortHead:0,
      type1Com:true,
      type2Com:false,
      allNum:0,
      appraisalNum:0,
      page:1,
      type:1,
    }
  },
  components:{
    uniLoadMore,
  },
  onReachBottom(){
    this.loadData();
  },
  methods:{
    loadData(type='add', loading){
      if(type === 'add'){
        this.loadingType = 'loading';
      }else{
        this.loadingType = 'more'
      }
      let _this = this;
      uni.request({
        method: "POST",
        url: api.myComment,
        data: {type:_this.type,page:_this.page,token:uni.getStorageSync("token")},
        success: (res) => {
          if(res.data.status == 1){
            if(res.data.data.data.length !== 0){
              for (let index = 0; index < res.data.data.data.length; index++) {
                _this.mycomment.push(res.data.data.data[index]);
              }
              this.page++;
              this.loadingType = "more"
            }else{
              this.loadingType = "nomore"
            }
            _this.allNum = res.data.data.countAll;
            _this.appraisalNum = res.data.data.img_count;
          }else{
            this.loadingType = "nomore"
          }
        },
        fail: (res)=>{
          console.log(res);
        }
      })

    },
    proSort(index){
      this.page = 1;
      this.mycomment = [];
      this.sortHead = index;
      if(index == 0){
        this.type = 1;
      }else{
        this.type = 2;
      }
      this.loadData();
    }
  },
  mounted() {
    this.loadData();
  }

}
</script>

<style lang="scss">
.content{
  background-color: #fff;
  display: flex;
  border-bottom: 1rpx solid #f1f1f1;
  border-top: 1rpx solid #f1f1f1;
  .li{
    display: flex;
    height: 110rpx;
    padding: 20rpx 0;
    margin:0 60rpx;
    justify-content: center;
    align-items: center;
    flex:1;
    .secdiv{
      text-align: center;
      .h4{
        font-size: 40rpx;
      }
      .h6{
        font-size: 24rpx;
        color: #CECECE;
      }
    }
  }
  .active{
    border-bottom: 3rpx solid #d02629;
  }
}
.item-wrap {
  padding-top: 20rpx;
  .item-list {
    padding: 34rpx 20rpx;
    box-sizing: border-box;
    min-height: 300rpx;
    background: #fff;
    border-bottom: 2rpx solid #ccc;
    .img-wrap {
      padding: 20rpx 0;
      image {
        width: 88rpx;
        height: 88rpx;
        margin-right: 20rpx;
      }
    }
    .product {
      display: flex;
      image {
        width: 90rpx;
        height: 90rpx;
      }
      .text1-hidden {
        line-height: 90rpx;
        width: 610rpx;
        padding-left: 33rpx;
        font-size: 20rpx;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    .text {
      font-size: 24rpx;
      color: #333;
      height: 70rpx;
      width: 100%;
      line-height: 40rpx;
      padding: 10rpx 0;
    }
    .inf-wrap {
      padding-top: 25rpx;
      display: flex;
      .inf {
        font-size: 20rpx;
        color: #999;
        width: 650rpx;
      }
      .status {
        font-size: 20rpx;
        color: #d0111b;
      }
    }
  }
}
</style>
