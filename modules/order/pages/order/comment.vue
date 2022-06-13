<template>
  <view>
    <view class="evaluate-wrap">
      <view class="item-list" >
        <view class="text-wrap clearfix" v-for="(item,index) in goods" :key="item.id">
          <view class="card-data">
            <image v-if="item.pic_url" :src="config.image_url+item.pic_url" @click="toDetails(item)"></image>
            <image v-else src="@/static/images/common/img_bad.jpeg" @click="toDetails(item)"></image>
            <view>
              <view class="card-text">{{item.title}}</view>
              <view class="star">评分:<uni-rate color="#bbb" active-color="red" v-model="score[index]"/></view>
            </view>
          </view>
          <textarea placeholder="说说商品的特色和使用感受" v-model="message[index]"/>
          <view class="addMost">
            <view class="text">最多添加3张，每张不超过5M，支持jpg、bmp、png</view>
            <view class="text">
              宽度范围：{{imagesConfig.min_comment_width}}~{{imagesConfig.max_comment_width}}  &nbsp;&nbsp;
              高度范围：{{imagesConfig.min_comment_height}}~{{imagesConfig.max_comment_height}}
            </view>
          </view>

          <view class="img-wrap clearfix">
            <view class="list-img fl" v-for="(imgas,value) in img[index]" :key="value" v-show="img">
              <image src="@/static/images/common/cross.png" class="del el-icon-circle-close"></image>
              <image :src="config.image_url+imgas" class="images"></image>
            </view>
            <view class="input-btn fl" >
              <image src="@/static/images/common/img-btn.jpg" class="frame" v-model="images[index]" @click="chooseAvatar(index)"></image>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="uni-padding-wrap uni-common-mt">
      <button type="warn" @click="routerLink">提交评价</button>
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
      hdimg: "",
      message: [],
      images: [],
      imagesConfig: [],
      img: [],
      score: [],
      goods:[],
      goodsId:[],
      order: {},
      json: {},
      imagesData: "",
    }
  },
  components:{
    uniLoadMore,
  },
  onLoad(options){
    this.cateId = options.id;
    this.getOrderInfo(parseInt(this.cateId));
    this.getImagesConfig();
  },
  methods:{
    routerLink(){
      let _this = this;
      for(var i=0;i<_this.goods.length;i++){
        uni.request({
          method: "POST",
          url: api.commentOrder,
          data: {
            order_id:_this.order.id,
            goods_id:_this.goods[i].goods_id,
            content:_this.message[i],
            score:_this.score[i],
            img:_this.img[i],
            token:uni.getStorageSync("token")
          },
          success: (res) => {
            if(res.data.status==1){
            }else{
              uni.showToast({
                title:res.data.message
              });return;
            }
          },
          fail: (res)=>{
          }
        })
      }
      uni.showToast({
        title:"操作成功"
      });
      uni.navigateTo({
        url: 'modules/order/pages/order/orderList'
      })
    },
    getImagesConfig(){
      let _this = this;
      uni.request({
        method: "POST",
        url: api.commentImagesConfig,
        data: {token:uni.getStorageSync("token")},
        success: (res) => {
          if(res.data.status==1){
             _this.imagesConfig = res.data.data;
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
    getOrderInfo(item){
      let _this = this;
      uni.request({
        method: "POST",
        url: api.orderDetail,
        data: {id:_this.cateId,token:uni.getStorageSync("token")},
        success: (res) => {
          if(res.data.status==1){
            _this.order = res.data.data;
            _this.goods = res.data.data.goods;
            for(var i=0;i<_this.goods.length;i++){
              _this.score[i] = 5;
            }
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
    chooseAvatar(index){
      let _this = this;
      if(!_this.img[index]){
        _this.img[index] = [];
      }
      uni.chooseImage({
        count:1,
        sizeType:['original'],
        sourceType:['album'],
        async success(res) {
          _this.hdimg  = res.tempFilePaths[0];
          uni.uploadFile({
            url:api.uploadImageComment,
            filePath: _this.hdimg,
            name: 'file',
            formData: {
              'token': uni.getStorageSync('token')
            },
            success: (uploadFileRes) => {
              _this.json = JSON.parse(uploadFileRes.data);
              _this.img[index].push(_this.json.data)
              console.log( _this.img);
            },
            fail(err) {
              console.log(err);
            }
          })
        }
      })
    },
    toDetails(item) {
      uni.navigateTo({
        url: '/modules/common/pages/productDetail/index?id='+item.goods_id,
        fail(e) {
          console.log(e)
        }
      })
    },
  }
}
</script>
<style lang="scss">
.evaluate-wrap {
  background: #fff;
  margin-top: 20rpx;
  .item-list {
    width: 100%;
    padding: 2rpx 3rpx;
    border-bottom: 1px solid #dfdfdf;
    margin-bottom: 150rpx;
    .text-wrap {
      padding: 56rpx 0;
      .card-data {
        display: flex;
        height: 165rpx;
        border-bottom: 1px solid #dfdfdf;
        image {
          width: 150rpx;
          height: 150rpx;
        }
        .card-text {
          width: 610rpx;
          padding-left: 33rpx;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .star{
          width: 610rpx;
          padding-left: 33rpx;
          font-size: 30rpx;
          margin-top: 20rpx;
          color: #050505;
        }
      }
      textarea {
        margin-left: 15rpx;
        margin-top: 20rpx;
        margin-bottom: 20rpx;
        width: 715rpx;
        height: 174rpx;
        padding: 2rpx;
        border: none;
        resize: none;
        outline: none;
        font-size: 28rpx;
        color: #333;
        background-color: #ececec;
      }
      .addMost{
        border-top: 1px solid #dfdfdf;
        font-size: 28rpx;
        .text{
          margin-left: 20rpx;
        }
      }
    }
    .img-wrap {
      border-top: 1px solid #dfdfdf;
      margin-top: 20rpx;
      width: 100%;
      display:flex;
      flex-direction:row;
      justify-content:space-around;
      .list-img {
        margin-right: 30rpx;
        margin-top: 20rpx;
        position: relative;
        .images {
          width: 150rpx;
          height: 150rpx;
        }
        .del {
          position: absolute;
          top: -15rpx;
          right: -15rpx;
          font-size: 50rpx;
          color:#f00;
          background-color:#fff;
          border-radius:50%;
          width: 40rpx;
          height: 40rpx;
        }
      }
      .list-img:nth-child(4n) {
        margin-right: 0;
      }
      .input-btn {
        position: relative;
        overflow: hidden;
        width: 150rpx;
        height: 150rpx;
        background-size: 100% 100%;
        margin-top: 20rpx;
        .frame{
          width: 100%;
          height: 100%;
        }
        input {
          width: 200%;
          height: 200%;
          position: absolute;
          left: -100%;
          top: -100%;
          outline: none;
        }
      }
    }
  }
  .max-img {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, .7);
    z-index: 999;
    img {
      width: 100%;
      height: 80%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
.uni-padding-wrap {
  width: 100%;
  position: fixed;
  bottom: 10rpx;
}
</style>