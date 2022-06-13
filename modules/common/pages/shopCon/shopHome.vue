<template>
	<view class="shopHome">
		<view class="headMain">
			<image src="@/static/images/common/shopdefault.jpg" class="logo-img"></image>
			<!-- 顶部头 -->
			<shopHeader></shopHeader>
			<!-- 店铺信息 -->
			<view class="shopTitle">
				<view class="shopTitle-hed">
				  <image :src="config.image_url+storeInfo.store_logo" v-show="storeInfo.store_logo" class="shopTitle-img"></image>
				  <text class="shop-display">{{storeInfo.shop_name}}</text>
				  <text class="shop-gradename">{{storeInfo.store_grade_name}}</text>
				  <text class="count-time" v-show="shophomedata.open_time">
					<text class="show-year">{{
						shophomedata.open_time
					}}</text>年
				  </text>
				</view>
				<view class="storeFans-hed">
				  <text class="storeFans">
					{{shophomedata.storeFans}}
					<br />
					<text class="storeFans-txt">粉丝数</text>
				  </text>
				  <view @click="attenStoreAjax(0)" class="btn" v-if="atten == 1">已关注</view>
				 <view @click="attenStoreAjax(1)" class="btn" v-if="atten == 0">关注</view>
				</view>
			</view>
			
			<tabHeader :sortData="sortData" v-on:sortCon="sortindex" :tabdata="tabIndex"></tabHeader>
			
			<view class="babylistSort" v-if="titleData==1">
				<view
				  v-for="(item,index) in babyList"
				  :key="index"
				  class="babylistSort-li" @click="goodsAllOne(index)"
				>
				  {{item}}
				  <view class="sorts" :class="{current: filterIndex === 0}">
            <view class="sorts-div"></view>
            <view class="sorts-div"></view>
				  </view>
				</view>
			</view>
		</view>
		<view class="content">
			<view v-if="titleData == 0">			    
				<articleFlash></articleFlash>
				<view class="image-banner" v-if="banner.length!=null">
					<swiper indicator-dots circular=true duration="400" :autoplay="true" class="bannerSwi">
						<swiper-item v-for="(item, index) in banner.slice(0,8)" :key="index">
							<image :src="config.image_url + item.adv_content" @click="goAd(item.ad_url)" class="bannerSwi-img"></image>
						</swiper-item>	
					</swiper>
				</view>
				<view class="advertImg" v-if="irregular.left.length!=0 && irregular.right.length!=0">
				  <image
					v-if="irregular.left && irregular.left.length > 0"
					:src="config.image_url+irregular.left[0].adv_content"
					></image>
				  <view class="box" v-if="irregular.right">
					<image
					  v-for="(image, index) in irregular.right"
					  :key="index"
					  :src="config.image_url+image.adv_content"
					  :alt="image.adv_title"
					></image>
				  </view>
				</view>
				<view class="advertList" v-show="buttonImage.length!=0">
				  <view class="item" v-for="(img, i) in buttonImage" :key="i">
					  <image :src="config.image_url+img.adv_content" :alt="img.adv_title"></image>
				  </view>
				</view>
				<view class="recommend">
				  <image src="@/static/images/common/tj.png"></image> 新品上架
				</view>
				<view class="newgood">
				  <view class="newgoodlist">
					<view v-for="(item,index) in shopgood" :key="item.id" @click="enterProduct(item.id)" class="newgoodlist-li">
					  <image v-if="item.pic_url" :src="config.image_url+item.pic_url"></image>
					  <image v-else src="@/static/images/common/img_bad.jpeg"></image>
					  <text class="newgoodlist-txt">{{item.title}}</text>
					  <view class="more">
						<text class="more-txt">￥{{item.price_member}}</text>
					  </view>
					</view>
				  </view>
				</view>
				<view class="recommend">
				  <image src="@/static/images/common/tj.png"></image>推荐商品
				</view>
				<articleList :temList="0" :hotList="recommondGoods"></articleList>
			</view>
			<view v-if="titleData == 1" class="contentBabyList">
				<articleList :temList="1" :goodsAlls="goodsAlls"></articleList>
			</view>
			<view v-if="titleData == 2" class="contentBabyListsec">
				<articleList :temList="2" :data="dynamic"></articleList>
			</view>
      <view v-if="titleData == 3" class="contentBabyListsec">
        <shopDetails :temList="3" :data="detailData"></shopDetails>
      </view>
		</view>
		<view class="btm">
			<view @click="shopDetail" class="btm-li"><image src="" class="no-image"></image>店铺详情</view>
			<view @click="alertHotList" class="btm-li">
				<image src="@/static/images/common/hotlist.png"></image>热门分类
			</view>
			<view @click="goToCustomerService" class="btm-li">
				<image src="@/static/images/common/lxmj.png"></image>联系卖家

			</view>
		</view>
	</view>
</template>

<script>
	import shopHeader from '@/modules/common/pages/shopCon/child/shopHeader.vue';
	import tabHeader from '@/modules/common/pages/shopCon/child/tabHeader.vue';
	import articleFlash from '@/modules/common/pages/shopCon/child/articleFlash.vue';
	import articleList from '@/modules/common/pages/shopCon/child/articleList.vue';
	import config from '@/config.js'
	import api from '@/api.js'
  import shopDetails from "./shopDetails";
	export default {
		
		data(){
			return {
				config,
				storeInfo:'',
				shophomedata:'',
				cateId:0,
				sortData: ["店铺首页", "全部宝贝", "店铺动态"],
				cateIndex:0,
				tabIndex: uni.getStorageSync("rIndex"),
				banner:'',
				shopgood:[],
				babyList: ["按销量", "价格", "按人气"],
				titleData: 0,
				irregular: {
					left: [],
					right: []
				},
				buttonImage: [],
				recommondGoods: [],
				goodsAlls:[],
        detailData:[],
				proSortindex: -1,
				prosortUpDown: false,
        classDataStatus: false,
				dynamic:[],
				classData:[],
				atten: 0,
				bad_img: '@/static/images/common/img_bad.jpeg',
        serveUrl: '',
        filterIndex: '',
        sellOrder: 0,

			}
		},
		components:{
			shopHeader,
			tabHeader,
			articleFlash,
			articleList,
      shopDetails
		},
		onLoad(options){
			this.cateId = options.id;
			this.cateIndex = options.index;
			uni.setStorageSync('routeId',options.id);
			uni.setStorageSync('rIndex',0);
			uni.setStorageSync('psi',0);
		},
		methods:{
			storeHome(){
				let _this = this;
				let url = api.storeHome+
					'?id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.shophomedata = res.data.data;
						_this.storeInfo = res.data.data.storeInfo;
						_this.atten = res.data.data.if_atten;
						uni.setStorageSync('StoreAtt',res.data.data.store_id);
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},	
			attenStoreAjax(index){
				if(index==1){
					let StoreAtt = uni.getStorageSync("StoreAtt");
					let _this = this;
					let url = api.attenStore+
						'?store_id='+StoreAtt+
						'&token='+uni.getStorageSync('token');
					uni.request({
						url : url,
						success: (res) => {
						_this.atten = index;
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				}
				else{
					let StoreAtt = uni.getStorageSync("StoreAtt");
					let _this = this;
					let url = api.cancelAttenStore+
						'?store_id='+StoreAtt+
						'&token='+uni.getStorageSync('token');
					uni.request({
						url : url,
						success: (res) => {
						_this.atten = index;
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				}

			},
			getBanner(){
				let _this = this;
				let url = api.storeBanner+
					'?store_id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.banner = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getIrregular(){
				let _this = this;
				let url = api.storeIrregular+
					'?store_id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.irregular = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			newGoods(){
				let _this = this;
				let url = api.newGoods+
					'?store_id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.shopgood = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getButton(){
				let _this = this;
				let url = api.buttonAdv+
					'?store_id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.buttonImage = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getRecommondGoods(){
				let _this = this;
				let url = api.getRecommondGoods+
					'?store_id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				uni.request({
					url : url,
					success: (res) => {
						_this.recommondGoods = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			goodsAll(flag){
				let url = api.storeGoodsAll+
					'?id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
            _this.goodsAlls = [];
            if(res.data.status == 1){
              _this.goodsAlls = res.data.data;
            }

					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
      goodsAllOne(flag){
        console.log(flag)
        if(this.filterIndex === flag){
          //排除人气 新品 店铺
          return;
        }
        this.filterIndex = flag;

        switch(flag){
          case 0 : this.sellOrder = 1;break; //默认	销量从高到低
          case 1 : this.sellOrder = 3;break;
          case 2 : this.sellOrder = 4;break;
        }
        let url = api.storeGoodsAll+
            '?id='+this.cateId+
            '&sort='+this.sellOrder+
            '&token='+uni.getStorageSync('token');
        let _this = this;
        uni.request({
          url : url,
          success: (res) => {
            _this.goodsAlls = [];
            if(res.data.status == 1){
              _this.goodsAlls = res.data.data;
            }

          },
          fail: (res)=>{
            console.log(res);
          }
        })
      },
			storeDynamicAjax(){
				let url = api.storeDynamic+
					'?id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.dynamic = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			storeDynamicAjax1(dat){
				let url = api.storeDynamic+
					'?id='+dat+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.dynamic = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
      goToCustomerService(){
				let url = api.serviceList+
					'?store_id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
            let serveUrl =  decodeURIComponent(res.data.data);
            uni.navigateTo({
              url: '/modules/common/pages/shopCon/child/server?url='+serveUrl
            })
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			sortindex(data, id) {
			  this.titleData = data;
			  switch (data) {
				case 1:
				  this.goodsAll(id);
				  break;
				case 2:
				  this.storeDynamicAjax();
				  break;
			  }
			},
			enterProduct(item){
				let id = item;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
			shopDetail(){
        this.titleData = 3;
			},
      alertHotList(){
        let routeId = uni.getStorageSync("routeId");
        uni.navigateTo({
          url: '/modules/common/pages/shopCon/shopList?id='+routeId
        })
      },
		},	
		mounted() {
			this.storeHome();
			this.newGoods();
			this.getBanner();
			this.getIrregular();
			this.getButton();
			this.getRecommondGoods();
		},
		created() {
		  let sc = uni.getStorageSync("sc");
		  let sic = uni.getStorageSync("sic");
		  let csi = uni.getStorageSync("csi");
		  let psi = uni.getStorageSync("psi");
		  if(sc && sic) {
			  this.tabIndex = psi
			  this.titleData = sic
			  this.sortindex1(parseInt(this.tabIndex));
		  } else {
			  this.sortindex(parseInt(uni.getStorageSync("rIndex")));
		  }
		},
	}
</script>

<style lang="scss">
	.shopHome{
		.contentBabyList {
		  margin-top: 400rpx;
		}
		.contentBabyListsec {
		  margin-top: 320rpx;
		}
		.headMain {
		  width: 100%;
		  position: fixed;
		  top: 0;
		  z-index: 199;
		  height: 258rpx;
		  background-size: cover;
		  .logo-img{
			width: 100%;
			 height: 258rpx;
		  }
		}
		.babylistSort {
		  background-color: #fff;
		  height: 80rpx;
		  border-bottom: 1rpx solid #cbcbcb;
		  display: flex;
		  margin:-87rpx 0 0 0;
		  
		  display: -ms-flexbox;
		  display: -webkit-flex;
		  .babylistSort-li {
		    display: flex;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    flex: 1;
		    justify-content: center;
		    align-items: center;
		    color: #636363;
		    font-size: 28rpx;
		    .sorts {
		      margin-left: 10rpx;
		      .sorts-div {
		        width: 0;
		        height: 0;
		        border-top: 9rpx solid transparent;
		        border-left: 9rpx solid transparent;
		        border-right: 9rpx solid transparent;
		        border-bottom: 9rpx solid transparent;
		        &:first-child {
		          margin-bottom: 4rpx;
		          border-bottom: 9rpx solid #757577;
		        }
		        &:last-child {
		          border-top: 9rpx solid #757577;
		        }
		        &:first-child.sortActiveTop {
		          border-bottom-color: #d02629;
		        }
		        &:last-child.sortActivebtm {
		          border-top-color: #d02629;
		        }
		      }
		    }
		  }
		  .active {
		    color: #d02629;
		  }
		}
		.shopTitle {
		  color: #fff;
		  overflow: hidden;
		  padding: 20rpx;
		  height: 125rpx;
		  // background-color: #003d34;
		  display: flex;
		  display: -ms-flexbox;
		  display: -webkit-flex;
		  justify-content: space-between;
		  -webkit-justify-content: space-between;
		  z-index: 999;
		  margin-top: -160rpx;
		  .shopTitle-hed {
		    display: flex;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    align-items: center;
		  }
		  .shopTitle-img {
		    border: none;
		    width: 80rpx;
		    height: 80rpx;
		    margin-right: 20rpx;
		  }
		  .shop-display{
		    font-size: 28rpx;
		    padding: 0 15rpx 0 0;
		    width: 200rpx;
			display: -webkit-box;
			overflow: hidden;
			text-overflow: ellipsis;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		  }
		  .shop-gradename{
		    font-size: 25rpx;
		    background: #de2d35;
		    color: white;
		    border-radius: 5rpx;
		    padding: 5rpx 10rpx;
		    text-align: center;
		  }
		  .count-time{
		    font-size: 25rpx;
		    margin: 0 0 0 15rpx;
		    .show-year{
		        font-size: 25rpx;
		        color: #d02629;
		    }
		  }
		  .storeFans-hed{
			display: flex;
			display: -ms-flexbox;
			display: -webkit-flex;
			align-items: center;  
		  }
		  .storeFans{
		    font-size: 28rpx;
		  }
		  .storeFans-txt {
		    font-size: 20rpx;
		  }
		  .btn {
		    margin-left: 15rpx;
		    width: 120rpx;
		    height: 50rpx;
		    border-radius: 50rpx;
		    display: flex;
		    display: -ms-flexbox;
		    display: -webkit-flex;
		    justify-content: center;
		    -webkit-justify-content: center;
		    align-items: center;
		    background-color: #d02629;
		    font-size: 20rpx;
		  }
		}
		.content{
			background:#f1f1f1;
			margin-bottom:90rpx;
			.image-banner{
				width: 100%;
				height: 328rpx;
				.bannerSwi {
				  width: 100%;
				  height: 328rpx;
				  .bannerSwi-img {
					width: 100%;
					height: 100%;
				  }
				}	
			}
			.advertImg {
			  width: 100%;
			  overflow: hidden;
			  height: 500rpx;
			  margin-bottom: 10rpx;
			  image {
			    width: 268rpx;
			    height: 500rpx;
			    float: left;
			    border-right: 1rpx solid #cecece;
			  }
			  .box {
			    float: right;
			    height: 500rpx;
			    width: 480rpx;
			    image {
			      width: 100%;
			      height: 250rpx;
			      border-bottom: 3rpx solid #cecece;
			    }
			  }
			}
			.advertList {
			  overflow: hidden;
			  width: 100%;
			  box-sizing: border-box;
			  .item {
			    width: 370rpx;
			    height: 150rpx;
			    float: left;
			    border: 1rpx solid #e0e0e0;
			    image {
			      width: 370rpx;
			      height: 150rpx;
			    }
			  }
			}
			.recommend {
			  display: flex;
			  justify-content: center;
			  align-items: center;
			  height: 90rpx;
			  font-size: 28rpx;
			  color: #d02629;
			  image {
			    width: 30rpx;
			    height: 30rpx;
			    margin-right: 15rpx;
			  }
			}
			.newgoodlist {
			  display: flex;
			  flex-wrap: wrap;
			  flex-direction: row;
			  justify-content: space-between;
			  .bttom {
			    width: 100%;
			    display: flex;
			    margin: 30rpx 0 0 0;
			    justify-content: center;
			  }
			  .newgoodlist-li {
			    margin-top: 2%;
			    background-color: #fff;
			    width: 49%;
			    float: left;
			    box-sizing: border-box;
			    display: flex;
			    flex-direction: column;
			
			    image {
			      width: 100%;
			      height: 350rpx;
			      align-self: center;
			      border-bottom: 1rpx solid #f2f1f2;
			    }
			    .newgoodlist-txt {
			      overflow: hidden;
			      text-overflow: ellipsis;
			      white-space: nowrap;
			      padding: 15rpx 25rpx;
			      font-size: 28rpx;
			    }
			    .more {
			      display: flex;
			      flex-direction: row;
			      justify-content: space-between;
			      height: 50rpx;
			      .more-txt {
			        padding: 0 25rpx;
			        font-size: 28rpx;
			        color: #d12f2d;
			      }
			    }
			  }
			}
		}
		.btm {
		  position: fixed;
		  bottom: 0;
		  background-color: #fff;
		  height: 90rpx;
		  width: 750rpx;
		  border-top: 1rpx solid #e6e6e8;
		  .btm-li {
		    float: left;
		    width: 33.33%;
		    height: 50rpx;
		    border-right: 1rpx solid #e7e7e7;
		    text-align: center;
		    line-height: 50rpx;
		    font-size: 28rpx;
		    margin: 20rpx 0;
			display: flex;
			padding: 0 0 0 40rpx;
			.no-image {
			  margin-right: 15rpx;
			  margin-top: 5rpx;
			  width: 20rpx;
			  height: 40rpx;
			}
		    image {
		      margin-right: 15rpx;
		      margin-top: 5rpx;
		      width: 40rpx;
		      height: 40rpx;
		    }
		  }
		  .jiantou {
		    position: absolute;
		    top: -60rpx;
		    left: 50%;
		    z-index: 9999;
		  }
		  /*// 热门弹框*/
		  .parentDiv {
		      position: fixed;
		      .cssalert {
		        z-index: 999;
		        position: absolute;
		        background-color: #fff;
		        left: 20rpx;
		        width: 180rpx;
		        padding: 0 20rpx;
		        bottom: 90rpx;
		        height: 300rpx;
		        overflow: auto;
            margin-bottom: -68rpx;
		        border-radius: 10rpx;
		        border: 1rpx solid #e6e6e8;
		        p {
		          height: 60rpx;
		          text-align: center;
		          line-height: 60rpx;
		          border-bottom: 1rpx solid #e6e6e8;
		          &:last-child {
		            border: 0;
		          }
		        }
		        .rotate {
		          width: 32rpx;
		          height: 32rpx;
		          border-radius: 50%;
		          margin-top: 100rpx;
		          border: 2rpx solid gray !important;
		          border-bottom-color: transparent !important;
		        }
		        .rotate {
		          display: inline-block;
		          -webkit-animation: rotate 0.6s linear infinite;
		          animation: rotate 0.6s linear infinite;
		        }
		        @-webkit-keyframes rotate {
		          0% {
		            -webkit-transform: rotate(0deg);
		          }
		          100% {
		            -webkit-transform: rotate(360deg);
		          }
		        }
		        @keyframes rotate {
		          0% {
		            transform: rotate(0deg);
		          }
		          100% {
		            transform: rotate(360deg);
		          }
		        }
		      }
		  }
		}
	}
</style>
