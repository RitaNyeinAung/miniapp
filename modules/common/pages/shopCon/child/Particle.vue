<template>
	<view>
		<view class="head">
			<view :style="{width:category.length * 400+'rpx'}" class="headers" ref="headers">
			  <view :class="{avtive:titleAddIndex1 == true}" @click="ArticleAllList" class="header-li">全部</view>
			  <view :class="{avtive:titleAddIndex == index}" v-for="(item,index) in category" 
			  :key="index" @click="selectTab(item.id, index)" class="header-li">{{item.name}}</view>
			</view>
		</view>
		<view class="allSelect">
			<view class="details" v-for="(item,index) in list.data" :key="index" @click="toggleDetail(item.id)">
				<view>
					<image src="@/static/images/common/time_icon.png"></image> {{item.create_time}}
				</view>
				<view style="float: right;">
					<image src="@/static/images/common/openeye.png"></image>{{item.count}}
				</view>
				<view class="about_article">
					<text class="h4">{{item.title}}</text>
					<image :src="config.image_url + item.pic" class="articleImg"></image>
				</view>
			</view>
			<view class="inner_article">
			  <view class="up">
				<text class="up-h4">{{details.title}}</text>
				<text>{{details.create_time}}</text>
			  </view>
			  <view class="down">
				<text class="tolink">{{details.source}}</text>
				<text class="viewer">
					<image src="@/static/images/common/openeye.png"></image>{{details.count}}
				</text>
				<view v-html="contentDetails" class="down-p"></view>
			  </view>
			  <view class="skip">
				<text v-if="upArticle" @click="toggleDetail(upArticle.id)">上一篇： {{upArticle.title}}</text>
				<text v-if="downArticle" @click="toggleDetail(downArticle.id)" style="float:right">下一篇： {{downArticle.title}}</text>
			  </view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				titleAddIndex: -1,
				titleAddIndex1: false,
				category:'',
				list:'',
				currentPage: 1,
				details:'',
				contentDetails: null,
				upArticle: '',
				downArticle:'',
			}
		},
        mounted(){
          this.storeCategory();
		      this.ArticleAllList();
        },
		methods:{
			storeCategory(){
				let routeId = uni.getStorageSync("routeId");
				let url = api.getStoreArticleCategory+
					'?store_id='+routeId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					  if(res.data.status == 1){
               _this.category = res.data.data;
            }
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			ArticleAllList(){
				let routeId = uni.getStorageSync("routeId");
				let url = api.getStoreArticle+
					'?store_id='+routeId+
					'&page='+this.currentPage+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
            _this.list = [];
            if(res.data.status == 1) {
              _this.list = res.data.data;
              this.toggleDetail(res.data.data.data[0].id)
            }
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			toggleDetail(id){
				let url = api.getStoreArticleById+
					'?id='+id+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					  _this.details = res.data.data; 
					  _this.downArticle = res.data.data.up_article;
					  _this.upArticle = res.data.data.down_article;
					  _this.contentDetails = res.data.data.content;
						  if(_this.contentDetails.includes('&lt;')) {
							  _this.contentDetails = _this.htmlDecode(_this.contentDetails);
						  }
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
      selectTab(id, index){
			  this.titleAddIndex = index;
        let routeId = uni.getStorageSync("routeId");
        let url = api.getStoreArticle+
            '?store_id='+routeId+
            '&class_id='+id+
            '&page='+this.currentPage+
            '&token='+uni.getStorageSync('token');
        let _this = this;
        uni.request({
          url : url,
          success: (res) => {
            if(res.data.status == 1) {
              _this.list = res.data.data;
              this.toggleDetail(res.data.data.data[0].id)
            }
          },
          fail: (res)=>{
            console.log(res);
          }
        })
      },
		},	

	}
</script>

<style lang="scss">
	.head {
			background: #fff;
			width: 100%;
			overflow-x: auto;
			height: 90rpx;
			border-bottom: 1rpx solid #CBCBCB;
	  }
	.headers {
	padding-top: 25rpx;
		.header-li {
			font-size: 26rpx;
			text-align: center;
			box-sizing: border-box;
			padding:0 20rpx;
			display: table-cell;
		}
		.avtive {
			color: #d02629;
		}
	}
	.allSelect{
	  background: #ffffff;
	  .details{
	    padding: 40rpx 30rpx 20rpx 30rpx;
	    border-bottom: 1rpx solid #e5e5e5;
	    image{
	      width: 29.5rpx;
		  height:30rpx;
	    }
	  .about_article{
	    padding: 40rpx 0rpx 40rpx 0rpx;
	      .h4{
	        padding-bottom: 40rpx;
	      }
	      .articleImg{
	        width:200rpx;
	        }
	        .p{
	          float: right;
	          width: 450rpx;
	          line-height: 32rpx;
	          padding-top: 5rpx;
	        }
	      }
	    }
	  .inner_article{
	    .up{
	      text-align: center;
	      padding: 30rpx 0rpx 50rpx 0rpx;
	      .up-h4{
	        padding-bottom: 25rpx;
	      }
	    }
	    .down{
	      padding:20rpx;
	      .tolink:hover{
	        color: #d02629;
	      }
	      .viewer{
	        float:right;
	         image{
	          width: 29.5rpx;
			  height:30rpx;
	        }
	      }
	      .down-p{
	        padding-top:50rpx;
	      }
	    }
	    .skip{
	      padding: 40rpx 10rpx 40rpx 10rpx;
	      border-top: 100rpx solid #efeded;
	    }
	  }
	}
</style>
