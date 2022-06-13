<template>
	<view class="articleLit">
		<view class="recommendList" v-if="temList ==0">
			<view v-for="item in hotList" :key="item.id"  @click="enterInto(item.id)" class="recommendList-li">
				<image v-if="item.pic_url" :src="config.image_url+item.pic_url" alt=""></image>
				<image v-else alt=""></image>
				<text class="recommend-txt">{{item.title}}</text>
				<view class="more">
					<text class="more-txt">￥{{item.price}}</text>
				</view>
			</view>
		</view>
		<view class="recommendList" v-if="temList == 1">
			<view @click="enterInto(item.id)" v-for="item in goodsAlls.data" :key="item.id" class="recommendList-li">
        <image v-if="item.pic_url" :src="config.image_url+item.pic_url"></image>
        <image v-else src="@/static/images/common/img_bad.jpeg"></image>
				<text class="recommend-txt">{{item.title}}</text>
				<view class="more">
					<text class="more-txt">￥{{item.goods_price}}</text>
					<text class="r">销量:{{item.sales_sum}}</text>
				</view>
			</view>
		</view>
		<view v-if="temList ==2" class="shopList">
			<view class="bland"></view>
			<view class="contentt">
				<view :class="{contentLi: sortIndex == index}" @click="proSort(index)" v-for="(item, index) in secondRow" :key="index" class="content-li">
				{{item}}
				</view>
			</view>
			<view v-if="sortIndex == 0" class="main-bg">				
				<view class="bigBox">
					<view class="times">
						<image src="@/static/images/common/time_icon.png"></image>
						<text class="times-txt">{{newOne.create_time}}</text>
					</view>
					<view class="newtitle">
					  <view class="title">上新</view>
					  <text class="newtitle-txt">上新1件商品</text>
					</view>

					<view class="newCon">
					  <view class="content1" @click="enterInto(newOne.id)">
            <image v-if="newOne.pic_url" :src="config.image_url+newOne.pic_url"></image>
            <image v-else src="@/static/images/common/img_bad.jpeg"></image>
						<view class="newCon-div">
						  <text class="newCon-title">{{newOne.title}}</text>
						  <text class="newCon-price">￥{{newOne.price_member}}</text>
						</view>
					  </view>
					</view>
				</view>
				<view class="newCon" v-for="items in allNewsGoods">
					<view class="times">
						<image src="@/static/images/common/time_icon.png"></image>
						<text class="times-txt">{{items.create_time}}</text>
					</view>
					<view class="newtitle">
						<view class="title">上新</view>
						<text class="newtitle-txt">上新{{items.goods.length}}件商品</text>
					</view>
					<view class="content2">
						<view @click="enterInto(item.id)" v-for="item in items.goods" :key="item.id"class="content2-li">
              <image v-if="item.pic_url" :src="config.image_url+item.pic_url"></image>
              <image v-else src="@/static/images/common/img_bad.jpeg"></image>
							<view class="content2-price">￥{{item.price_member}}</view>
						</view>
					</view>
				</view>
				<view class="newCon">
					<view class="times">
						<image src="@/static/images/common/time_icon.png"></image>
						<text class="times-txt">9月9日</text>
					</view>
					<view class="newtitle">
						<view class="title miaosha">秒杀</view>
						<view class="timer">
						</view>
					</view>
					<view class="content3" v-for="items in acticityGoods" :key="items.id">
            <image v-if="items.pic_url" :src="config.image_url+items.pic_url" class="good-img"></image>
            <image v-else src="@/static/images/common/img_bad.jpeg" class="good-img"></image>
					  <view class="newCon-div">
					    <text class="newCon-title">{{items.title}}</text>
					    <text class="newCon-price">￥{{items.activity_price}}</text>
					  </view>
					</view>
				</view>
			</view>
			<view v-if="sortIndex == 1"> 
				<Particle></Particle>  
			</view>
		</view>
	</view>
</template>

<script>
	import Particle from '@/modules/common/pages/shopCon/child/Particle.vue';
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				secondRow: ['商品动态', '店铺文章'],
				sortIndex: 0,
				newOne:{},
				allNewsGoods:[],
				acticityGoods:[],
				// finish: "",
				// nowday: "",
				// endday: "",
				// end: "",
				
			}
		},
        created() {
            let csi = uni.getStorageSync("csi");
            if(csi) {
                this.proSort(csi);
            }
        },
		components:{
			Particle,
		},
        mounted(){
          this.storeDynamicAjax();
        },
		props: ["temList", "hotList", "goodsAlls"],
		methods:{
			storeDynamicAjax(){
				let routeId = uni.getStorageSync("routeId");
				let url = api.storeDynamic+
					'?id='+routeId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.newOne = res.data.data.newOne;
						_this.allNewsGoods = res.data.data.allNewsGoods;
						_this.acticityGoods = res.data.data.acticityGoods;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			// countDown() {
			//   this.finish = true;
			// },
			proSort(index){
				if(this.sortIndex == index)return;
				this.sortIndex = index;
				uni.setStorageSync("csi",index);
				// this.$emit("sortCon",index);
			},
			enterInto(item){
				let id = item;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
		},	

	}
</script>

<style lang="scss">
	.articleLit{
		// background-color: #f1f1f1;
		.recommendList {
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
		  .recommendList-li {
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
		    .recommend-txt {
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
			  .r{
				padding: 0 25rpx;
				font-size: 28rpx;
				color: #d12f2d;
			  }
		    }
		  }
		}
		.shopList {
			.bland{
				background-color: #f1f1f1;
				padding: 10rpx 0;
			}
			.main-bg{
				background-color: #f1f1f1;
			}
			.contentt{
			    background-color: #fff;
			    display: flex;
			    border-bottom: 1rpx solid #CBCBCB;
			    position:relative;
			    .content-li{
			        display: flex;
			        height: 50rpx;
			        margin: 20rpx 0;
			        justify-content: center;
			        align-items: center;
			        flex:1;
			        border-right: 1rpx solid #CBCBCB;
			        font-size: 26rpx;
			        padding: 0rpx;
			        &:last-child{
			            border:0
			        }
			        
			    }
			    .contentLi{
			        color: #d02629;
			        font-size: 26rpx;
			    }
			}
			.bigBox {
				padding-left: 40rpx;
				background: #fff;
				margin-top:20rpx;
				.times {
				  display: flex;
				  padding-top: 40rpx;
				  align-items: center;
				  image {
					width: 30rpx;
					height: 30rpx;
					margin-right: 10rpx;
				  }
				.times-txt{
					font-size: 28rpx;  
				  }
				}
			}
			.times {
			  display: flex;
			  padding-top: 10rpx;
			  align-items: center;
			  image {
				width: 30rpx;
				height: 30rpx;
				margin-right: 10rpx;
			  }
			.times-txt{
				font-size: 28rpx;  
			  }
			}
			.newtitle {
			    margin: 35rpx 0 20rpx;
			    display: flex;
			    align-items: center;
			    .title {
			      margin-right: 20rpx;
			      display: flex;
			      width: 90rpx;
			      height: 40rpx;
			      border: 3rpx solid #46e26e;
			      color: #46e26e;
			      border-radius: 40rpx;
			      justify-content: center;
			      align-items: center;
			    }
			    .newtitle-txt {
			      font-size: 28rpx;
			    }
				.newtitle-good {
				  background-color: #3b3b3b;
				  color: #fff;
				  padding: 5rpx;
				  border-radius: 5rpx;
				}
			    .miaosha {
			      border: 3rpx solid #d02629;
			      color: #d02629;
			    }
			}
			.newCon {
			    background-color: #fff;
			    margin-top: 20rpx;
			    padding: 35rpx 25rpx 30rpx;
			    .content1 {
			      margin-bottom: 20rpx;
			      display: flex;
					image {
						width: 225rpx;
						height: 225rpx;
					}
					.newCon-div {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 0 50rpx 50rpx 30rpx;
						.newCon-title {
						  font-size: 24rpx;
						  color: #909090;
						  margin-top: 10rpx;
						  text-overflow:ellipsis;
						  overflow: hidden;
						  white-space: normal!important;
						  display: -webkit-box;
							word-wrap:break-word;
							-webkit-line-clamp:3;
							-webkit-box-orient: vertical;
						}
						.newCon-price {
						  font-size: 32rpx;
						  color: #333;
						}
					}
				}
				.content2 {
				  display: flex;
				  flex-wrap: wrap;
				  .content2-li {
					position: relative;
					image {
					  width: 225rpx;
					  height: 225rpx;
					  margin-right: 5rpx;
					  margin-bottom: 10rpx;
					}
					.content2-price {
					  position: absolute;
					  background-color: rgba(255, 255, 255, 0.4);
					  bottom: 10rpx;
					  width: 225rpx;
					  height: 50rpx;
					  font-size: 28rpx;
					  line-height: 50rpx;
					  text-align: center;
					}
				  }
				}
				.content3 {
				  margin-bottom: 20rpx;
				  display: flex;
					.good-img {
						width: 275rpx;
						height: 225rpx;
					}
					.newCon-div {
						display: flex;
						flex-direction: column;
						justify-content: space-between;
						padding: 0 50rpx 50rpx 30rpx;
						.newCon-title {
						  font-size: 24rpx;
						  width: 405rpx;
						  color: #909090;
						  margin-top: 10rpx;
						  text-overflow:ellipsis;
						  overflow: hidden;
						  white-space: normal!important;
						  display: -webkit-box;
							word-wrap:break-word;
							-webkit-line-clamp:3;
							-webkit-box-orient: vertical;
						}
						.newCon-price {
						  font-size: 32rpx;
						  color: #333;
						}
					}
				}
			}
		}
	}
</style>
