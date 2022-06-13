<template>
	<view class="home">
		<login></login>
		<view class="header">			
			<SearchHeader bg="#d02629"></SearchHeader>
		</view>
		<view class="body" @pull>
			<ProductCarousel :banner="banner"></ProductCarousel>
			<QuickStart :nav="nav" :data="announcement" @hit="hit"></QuickStart>
			
			<view>
				<view class="offline-node" v-if="newoffline.length>0">
					<view class="title">
						<view class="title-left"></view>
						<view class="name">线下节点</view>
						<view class="name-dis">热推项目等</view>
					</view>
				<view class="offline-card">
					<view class="cardstore">
						<view class="cardd" v-for="good in newoffline" :key="good.id" @click="linkTo(good.ad_url)">
							<view class="card-image">
							  <image :src="config.image_url+good.adv_content" class="img"></image>
							</view>
						</view>		
					</view>
				</view>
			  </view>
			</view>
			
			<view class="img-div" v-if="newcross">
				<image :src="config.image_url+newcross.adv_content" class="banner-img" @click="linkTo(newcross.ad_url)"></image>
			</view>
			
			<!-- <view>
				<view class="Redeem" v-if="newintegral.length>0">
					<view class="title">
						<view class="title-left"></view>
						<view class="name">积分兑换</view>
						<view class="name-dis">创造价值</view>
						<view class="more">更多</view>
					</view>
					<view class="offline-card">
						<view class="cardstore">
							<view class="cardd" v-for="good in newintegral" :key="good.id" @click="linkTo(good.ad_url)">
								<view class="card-image">
									<image :src="config.image_url+good.adv_content" class="img"></image>
								</view>
							</view>		
						</view>
					</view>
				</view>
			</view> -->
			
			<!-- <view>
				<view class="Recommended_store" v-if="newstore.length>0">
					<view class="title">
						<view class="title-left"></view>
						<view class="name">推荐店铺</view>
						<view class="name-dis">创造价值</view>
					</view>
					<view class="offline-card">
						<view class="cardstore">
							<view class="cardd" v-for="good in newstore" :key="good.id" @click="linkTo(good.ad_url)">
								<view class="card-image">
									<image :src="config.image_url+good.adv_content" class="img"></image>
								</view>
							</view>		
						</view>
					</view>
				</view>
			</view> -->
			
			<!-- <view>
				<view class="New-arrivals" v-if="goodsNews.length>0">
					<view class="title">
						<view class="title-left"></view>
						<view class="name">新品上架</view>
						<view class="name-dis">创造价值</view>
					</view>
					<view class="cards">
						<view class="card" v-for="good in goodsNews" :key="good.id" @click="navToDetailPage(good)">
							<view class="card-image">
								<image :src="config.image_url+good.pic_url"></image>
							</view>
							<view class="title">
								<image v-if="good.iconData" :src="config.image_url+good.iconData" class="shop-grade"></image>
									{{good.title}}
							</view>
							<view class="price-box">
								<text class="price">￥{{good.price_member}}</text>
								<text class="count">已售 {{good.sales_sum}}</text>
							</view>
						</view>		
					</view>
				</view>
			</view>		 -->
			
			<view class="floor">
				<view class="floor-item">
					<view class="top">
						<view class="five-title" @click="homeActive(index)" v-for="(item,index) in className" :key="index">
							<view class="title" :class="{active: titleActive == index}">{{item.title}}</view>
							<view class="sectitle" :class="{secactive: titleActive == index}">{{item.name}} <image src="@/static/images/common/conner.jpg" class="img-conner" v-if="titleActive == index"></image></view>
						</view>
					</view>
					<view class="goods-box" v-if="recommendGoods.length>0">
						<view
							:key="ing"
							class="floor-goods"
							v-for="(i,ing) in recommendGoods"
							@click="enterDetail(i)"
						>
							<image :src="config.image_url+i.pic_url"></image>
							<text class="title">
								<!-- <text class="shop-grade">自营</text> -->
								<image v-if="i.iconData" :src="config.image_url+i.iconData" class="shop-grade"></image>
								{{i.title}}
							</text>
							<!-- <view class="showdiv">
								<text class="discountshow">以旧换新</text>
							</view> -->
							<view class="price-box">
								<text class="price">￥{{i.price_member}}</text>
								<!-- <text class="count">看相似</text> -->
							</view>
							<view class="priceimg-box">
								<text class="price">￥{{i.price_market}}</text>
								<!-- <image src="@/static/images/common/plus.jpg" class="img"></image> -->
							</view>
						</view>
					</view>
				</view>
			
			</view>
		</view>	
	</view>
</template>

<script>
	import SearchHeader from '@/modules/common/components/SearchHeader.vue';
	import ProductCarousel from '@/modules/home/pages/index/components/ProductCarousel.vue';
	import QuickStart from '@/modules/home/pages/index/components/QuickStart.vue';
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				nav:[],
				banner:[],
				announcement:[],
				indexData: null,
				currentPage:1,
				loadingType: 'more',
				currentCarouselIndex:0,
				showCardLoading:true,
				page:1,
				store:null,
				showStore:false,
				flashsale:[],
				recommend_items:[],
				flashsaleTime:null,
				timer:null,
				integralProducts:[],
				newoffline:'',
				newintegral:'',
				newstore:'',
				newcross:'',
				goodsNews: [],
				recommendGoods: [],
				titleActive:0,
				className:'',
				lat:'',
				lng:'',
			}
		},
		components:{
			SearchHeader,
			ProductCarousel,
			QuickStart,
			uniLoadMore,
		},
		methods:{
			async getHomeData(){
				let _this = this;
				uni.request({
					url:api.getHome+'?store_id='+config.store_id,
					success(result) {
						_this.nav = result.data.data.nav;
						_this.banner = result.data.data.banner;
						// _this.announcement = result.data.data.announcement.map((a)=>{
						// 	return a.title;
						// });
						_this.announcement = result.data.data.announcement;
					},
					fail(e) {
						console.log(e);
					}
				})
				_this.loadingStore=true;
				uni.request({
					url:api.getStoreList+'?store_id='+config.store_id+"&sort_types=store_sort",
					success(result){
						_this.loadingStore=false;
						if(result.data.data){
							_this.store = result.data.data.records.find((rec)=>rec.id==config.store_id);
						}
					
					},
					fail(e) {
						_this.loadingStore=false;
						console.log(e);
					}
				})
			},
			async loadData(){
				
				let url = api.indexFloor+'?store_id='+config.store_id
					
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.data){
							_this.indexData = res.data.data;
							_this.showCardLoading = false;
						}
						
					},
					fail: (res)=>{
						
						console.log(res);
					}
				})
				uni.request({
					url:api.flashsale,
					success(res) {
						
						if(res.data.data){
							_this.flashsale = res.data.data.goods;
							_this.flashsaleTime = res.data.data.time;
							_this.timer = setInterval(()=>{
								//更新 秒杀时间
								if(_this.flashsaleTime.countdown>1){
									//每秒 减去 一千 毫秒
									_this.flashsaleTime.countdown=_this.flashsaleTime.countdown-1

								}else{
									clearInterval(_this.timer)
								}
							},1000)
						}
					}
				})
				uni.request({
					url:api.getIntegralProducts,
					success(res) {
						
						if(res.data.data&&res.data.data.records){
							_this.integralProducts=res.data.data.records
					
						}
					}
				})
				uni.request({
					url : api.newGoodsData,
					success: (res) => {
						if(res.data.data){
							_this.goodsNews = res.data.data.data;
							_this.showCardLoading = false;
						}
						
					},
					fail: (res)=>{
						
						console.log(res);
					}
				})
				uni.request({
					url : api.getClass,
					success: (res) => {
						if(res.data.data){
							_this.className = res.data.data;
							_this.showCardLoading = false;
						}
						
					},
					fail: (res)=>{
						
						console.log(res);
					}
				})
			},
			getGuessYouLike(page){
				if(page>1){
					uni.showLoading({
						title:"获取数据中"
					})
				}
				let _this = this;
				uni.request({
					url:api.recommend,
					method:"POST",
					data:{
						page:page,
						token:uni.getStorageSync("token")
					},
					success(res) {
						
						uni.hideLoading();
						if(res.data.data){
							if(page==1){
								_this.recommendGoods = res.data.data.data;
							}else{
								_this.recommendGoods = [..._this.recommendGoods,...res.data.data.data];
							}
							
							_this.page++;
						}else{
							uni.showToast({
								title:"没有数据了哦",
								icon:"none"
							})
						}
					},
					fail(e){
						uni.hideLoading();
						console.log(e);
					}
				})
			},
			getIndexAd(){
				let url = api.getIndexAd+'?store_id='+config.store_id;
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.newoffline = res.data.data.offline;
						_this.newintegral = res.data.data.integral;
						_this.newstore = res.data.data.store;
						_this.newcross = res.data.data.cross;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			linkTo(link){
				// location.href = link;
			},
			homeActive(index){
			  this.titleActive = index;
			},
			enterDetail(item){
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
			more(tid,tname){
			
				uni.navigateTo({
					url: '/modules/category/pages/list/index?title='+tname+'&tid='+tid,
					fail(e) {
						console.log(e)
					}
					
				})
			},
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
			navToFlashDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productFlashDetail/index?id=${id}&goods_id=${item.goods_id}`
				})
			},
			toList(type){
				uni.navigateTo({
					url:'modules/common/pages/list/index?type='+type
				})
			},
			buyFlashItem(){
				uni.showToast({
					title:"正在开发此功能",
					icon:"none"
				})
			},
			toOrder(good){
				uni.navigateTo({
					url: '/modules/common/pages/productFlashDetail/confirmFlashOrder?good_id='+good.id+'&num='+1,
					fail(e) {
						console.log(e)
					}
					
				})
				
			},
			navToIntegralDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productIntegralDetail/index?id=${id}&goods_id=${item.goods_id}`
				})
			},
			
			hit(id) {
				uni.navigateTo({
					url: '/modules/user/pages/index/components/noticeChild?id='+id,
					fail(e) {
						console.log(e)
					}
				})
			},
      authorizedPositioning(){
			  let that = this;
        uni.getSystemInfo({ // 获取系统信息
          success(res) {
              // GPS 已授权 判断微信定位是否授权
              uni.authorize({
                scope: 'scope.userLocation',
                success() {
                  // GPS已授权 微信定位已授权
                  uni.getLocation({
                    type: 'wgs84',
                    success({latitude,longitude}) {
                      that.lat = latitude;
                      that.lng = longitude;
                    }
                  });
                },
                fail() {
                  uni.showModal({
                    title: '未打开小程序定位',
                    content: '找不到您的位置，请开启定位',
                    confirmText: '开启定位',
                    showCancel: false,
                    success: (res) => {
                      if (res.confirm) {
                        uni.openSetting(); // 打开地图权限设置
                      }
                    }
                  });
                }
              });
            }
        })
      }

		},
		mounted() {
			this.getHomeData();
			this.loadData();
			this.getGuessYouLike(this.page);
			this.getIndexAd();
			this.authorizedPositioning();
		},
		onReachBottom() {
		
			this.getGuessYouLike(this.page);
		},
		filters:{
			cut(value){
				if(!value) return
				return value.length>20?value.slice(0,20)+" ...":value;
			},
			cutShort(value){
				if(!value) return
				return value.length>9?value.slice(0,9)+" ...":value;
			},
			cutShorter(value){
				if(!value) return
				return value.length>6?value.slice(0,6)+" ...":value;
			},
			toHMS(secs,type){
				if(!secs) return;
				var sec_num = parseInt(secs, 10)
				var hours   = Math.floor(sec_num / 3600)
				var minutes = Math.floor(sec_num / 60) % 60
				var seconds = sec_num % 60
				
				let result = [hours,minutes,seconds]
					.map(v => v < 10 ? "0" + v : v)
					.filter((v,i) => v !== "00" || i > 0)
					
				if(type=="h"){
					return result[0]
				}
				if(type=="m"){
					return result[1]
				}
				if(type=="s"){
					return result[2]
				}
				return result;
			}
		},
		
		
	}
</script>

<style lang="scss">
	@import '@/uni.scss';
	.home{
		background-color: #ffffff;
		.header{
			height: 200rpx;
			// background: $main-color;
			border-radius: 0px 0px 20px 20px;
		}
	}
	.slide{
		background-color:$light-grey;
	
		.title{
			display:flex;
			justify-content: space-between;
			width:100%;
			padding:20rpx 30rpx;
			display: flex;
			flex-wrap: wrap;
			color:$font-color-light;
					
		}
		.store-cards{
			display: flex;
			flex-direction: row;
			width:100%;
			overflow-x: auto;
			padding:0rpx 30rpx;
			flex-wrap: nowrap;
			.store-card{
				background:white;
				width:120px;
				flex: 0 0 auto;
				height:140px;
			
				margin-right:20rpx;
				overflow: hidden;
				display: flex;
				flex-direction: column;
				align-items: center;
				
				position:relative;
				.main{
					width:120px;
					height:75px;
					border:3px solid white;
					image{
						width: 100%;
						height: 100%;
						background-color:#f0f0f0 ;
					}
				}
				.logo{
					width: 50px;
					height:50px;
					margin-top: -25px;
					border:3px solid white;
					image{
						width:100%;
						height:100%;
						background-color:#f0f0f0 ;
						
					}
				}
				.title{
					text-align: center;
					color:$font-color-dark;
					display: flex;
					align-items: center;
					width: auto !important;
				}
			}
		}
		.cards{
			display: flex;
			flex-direction: row;
			width:100%;
			overflow-x: auto;
			padding:0rpx 30rpx;
			flex-wrap: nowrap;
			.card{
				width: 150.5rpx;
				height: 221rpx;
				flex: 0 0 auto;
				height:220px;
				background:white;
				margin-right:20rpx;
				overflow: hidden;
				// border-radius: 5px;
				.card-image{
					width:150px;
					height:150px;
					opacity:1 !important;
					border:3px solid white;
					image{
						width:100%;
						height:100%;
						
					}
					background-color: #f0f0f0;
				}
				.title{
					color:$font-color-dark;
					padding:10rpx 20rpx;
					width:100%;
					height:40px;
					overflow-y: hidden;
					font-size: 12px;
				}
				.price-box{
					display: flex;
					justify-content: space-between;
					padding:5rpx 20rpx 20rpx 20rpx;
					color:$font-color-light;
					font-size: 8px;
					align-items: center;
					.price{
						color:$main-color;
						font-size:12px;
						
					}
				}
			}
		}
	}
	.flash-sale{
		background:white;
		
		.title{
			display: flex;
			color: $font-color-base;
			align-items: center;
			border-left: 3px solid $main-color;
			.more{
				display: flex;
				color:$font-color-light;
				align-items: center;
				.block{
					width:20px;
					height:20px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 5px;
					color:white;
					background-color: $main-color;
					margin-left: 5px;
				}
			}
		}
		.flash-item{
			display: flex;
			flex-direction: row;
			width:100%;
			overflow-x: auto;
			padding:0rpx 30rpx;
			flex-wrap: nowrap;
			.flash-card{
				width:150px;
				flex: 0 0 auto;
				height:230px;
				background:white;
				margin-right:20rpx;
				overflow: hidden;
				.sale-bar{
					width:100%;
					background-color: rgba($color: $main-color, $alpha: 0.2);
					height:4px;
					border-radius: 50px;
					margin-top:3px;
					position: relative;
					.inner-bar{
						width:50%;
						height: 4px;
						position: absolute;
						left: 0;
						background-color: $main-color;
						border-radius: 50px;
					}
				}
				.image{
					width:150px;
					height:150px;
					background-color: $light-grey;
					border: 3px solid white;
					image{
						width:100%;
						height:100%;
					}
				}
				.title{
					border: none;
					padding:0;
					padding-top:3px;
					padding-left:3px;
					padding-right: 3px;
					font-size: 12px;
				}
				.remain{
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: $font-color-light;
					font-size: 10px;
					padding-top:3px;
					padding-left:3px;
					padding-right: 3px;
					.stock{
						color:$main-color;
					}
				}
				.bottom{
					display: flex;
					align-items: center;
					justify-content: space-between;
					padding-top: 3px;
					.price{
						color:$base-color;
						font-size: 14px;
					}
					.btn{
						border: 2px solid $main-color;
						color:$main-color;
						padding:3px 10px;
						font-size: 10px;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50px;
					}
				}
				.more{
					color:$font-color-light;
					border:2px solid $main-color;
					padding:5px 10px;
					
				}
			}
		}
	}
	.you-like{
		padding:20rpx 30rpx;
		color: $font-color-light;
		.title{
			text-align: center;
		}
	}
	.you-like{
		padding:30rpx;
		.title{
			color:$font-color-light;
			border-top:0.2px solid rgba($color: #000000, $alpha: 0.05);
			text-align: center;
			padding:10rpx;
			font-size: 12px;
		}
		.items{
			display:flex;
			flex-wrap:wrap;
	/* 		padding: 0 30upx; */
			background: $light-grey;
			.goods-item{
				display:flex;
				flex-direction: column;
				width: 48%;
				padding-bottom: 40upx;
				margin-bottom: 30upx;
				padding:20rpx;
				background:white;
				border-radius: 5px;
				&:nth-child(2n+1){
					margin-right: 4%;
				}
			}
			.image-wrapper{
				width: 100%;
				height: 330upx;
				border-radius: 3px;
				overflow: hidden;
			
				image{
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			.titl{
				font-size: 12px;
				color: $font-color-dark;
				line-height: 80upx;
			}
			.price-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-right: 10upx;
				font-size: 24upx;
				color: $font-color-light;
			}
			.price{
				font-size: $font-lg;
				color: $main-color;
				line-height: 1;
				&:before{
					content: '￥';
					font-size: 26upx;
				}
			}
		}
	}
	.offline-node{
		// background:linear-gradient(to bottom, #fbf4f1, #fcdce0);
		background:linear-gradient(to bottom, #fff4f4, #fcdce4);
	    padding: 10rpx 20rpx 10rpx 20rpx;
		.title{
			display: flex;
			// padding-bottom: 10rpx;
			.title-left{
				width: 12rpx;
				height: 35rpx;
				background: #bf1e2e;
				border-radius: 50rpx;
				margin-top: 5rpx;
			}
			.name{
				font-size: 30rpx;
				// color: #333;
				color: #d02629;
				padding-left: 10rpx;
				line-height: 43rpx;
				height: 50rpx;
			}	
			.name-dis{
				font-size: 24rpx;
				color: #d02629;
				padding-left: 20rpx;
				line-height: 50rpx;
				height: 50rpx;
			}	
			.more{
				font-size: 24rpx;
			}		
		}
		.offline-card{
			display: flex;
		}
		.cardstore{
			display: flex;
			flex-direction: row;
			overflow-x: auto;
			flex-wrap: nowrap;
			.cardd{
				// width: 160rpx;
				// height: 230rpx;
				width: 150rpx;
				height: 249rpx;
				flex: 0 0 auto;
				background:white;
				margin-right:10rpx;
				overflow: hidden;
				border-radius: 12rpx;
				.card-image{
					// width: 160rpx;
					// height: 230rpx;
					width: 150rpx;
					height: 249rpx;
					opacity:1 !important;
					.img{
						width:100%;
						height:100%;
					}
					background-color: #f0f0f0;
				}
			}
		}
	}
	.img-div{
	    // padding:5rpx;
		padding: 5rpx 10rpx 5rpx 15rpx;
	    height:80rpx;
	    background-color:#fff;
	    .banner-img{
	      width: 100%;
	      height: 100%;
	    }
	}
	// .Redeem{
	// 	padding: 10rpx 20rpx 0 20rpx;
	// 	background-color:#f2f2f2;
	// 		.title{
	// 			display: flex;
	// 			// padding-bottom: 10rpx;
	// 			.title-left{
	// 				width: 12rpx;
	// 				height: 35rpx;
	// 				background: #bf1e2e;
	// 				border-radius: 50rpx;
	// 				margin-top: 5rpx;
	// 			}
	// 			.name{
	// 				font-size: 30rpx;
	// 				color: #333;
	// 				padding-left: 10rpx;
	// 				line-height: 43rpx;
	// 				height: 50rpx;
	// 			}	
	// 			.name-dis{
	// 				font-size: 24rpx;
	// 				color: #d02629;
	// 				padding-left: 20rpx;
	// 				line-height: 50rpx;
	// 				height: 50rpx;
	// 			}	
	// 			.more{
	// 				font-size: 30rpx;
	// 				color: #999;
	// 				right: 20rpx;
	// 				position: absolute;
	// 				line-height: 43rpx;
	// 				height: 50rpx;
	// 			}		
	// 		}
	// 		.offline-card{
	// 			display: flex;
	// 		}
	// 		.cardstore{
	// 			display: flex;
	// 			flex-direction: row;
	// 			overflow-x: auto;
	// 			flex-wrap: nowrap;
	// 			.cardd{
	// 				// width: 160rpx;
	// 				// height: 230rpx;
	// 				width: 150rpx;
	// 				height: 249rpx;
	// 				flex: 0 0 auto;
	// 				background:white;
	// 				margin-right:10rpx;
	// 				overflow: hidden;
	// 				border-radius: 12rpx;
	// 				.card-image{
	// 					// width: 160rpx;
	// 					// height: 230rpx;
	// 					width: 150rpx;
	// 					height: 249rpx;
	// 					opacity:1 !important;
	// 					.img{
	// 						width:100%;
	// 						height:100%;
	// 					}
	// 					background-color: #f0f0f0;
	// 				}
	// 			}
	// 		}
	// 	}
	//   .Recommended_store{
	// 	padding: 10rpx 20rpx 0 20rpx;
	// 		background-color:#f2f2f2;
	// 		.title{
	// 			display: flex;
	// 			// padding-bottom: 10rpx;
	// 		.title-left{
	// 			width: 12rpx;
	// 			height: 35rpx;
	// 			background: #bf1e2e;
	// 			border-radius: 50rpx;
	// 			margin-top: 5rpx;
	// 		}
	// 		.name{
	// 			font-size: 30rpx;
	// 			color: #333;
	// 			padding-left: 10rpx;
	// 			line-height: 43rpx;
	// 			height: 50rpx;
	// 		}	
	// 		.name-dis{
	// 			font-size: 24rpx;
	// 			color: #d02629;
	// 			padding-left: 20rpx;
	// 			line-height: 50rpx;
	// 			height: 50rpx;
	// 		}	
	// 		.more{
	// 			font-size: 30rpx;
	// 			color: #999;
	// 			right: 20rpx;
	// 			position: absolute;
	// 			line-height: 43rpx;
	// 			height: 50rpx;
	// 		}		
	// 	}
	//     .offline-card{
	// 		display: flex;
	//     }
	// 	.cardstore{
	// 		display: flex;
	// 		flex-direction: row;
	// 		overflow-x: auto;
	// 		flex-wrap: nowrap;
	// 		.cardd{
	// 			// width: 160rpx;
	// 			// height: 230rpx;
	// 			width: 150rpx;
	// 			height: 249rpx;
	// 			flex: 0 0 auto;
	// 			background:white;
	// 			margin-right:10rpx;
	// 			overflow: hidden;
	// 			border-radius: 12rpx;
	// 			.card-image{
	// 				// width: 160rpx;
	// 				// height: 230rpx;
	// 				width: 150rpx;
	// 				height: 249rpx;
	// 				opacity:1 !important;
	// 				.img{
	// 					width:100%;
	// 					height:100%;
						
	// 				}
	// 				background-color: #f0f0f0;
	// 			}
	// 		}
	// 	}
	// }
	// .New-arrivals{
	// 	padding: 10rpx 20rpx 0 20rpx;
	// 	background-color: #f2f2f2;
	// 	.title{
	// 		display: flex;
	// 		// padding-bottom: 10rpx;
	// 		.title-left{
	// 			width: 12rpx;
	// 			height: 35rpx;
	// 			background: #bf1e2e;
	// 			border-radius: 50rpx;
	// 			margin-top: 5rpx;
	// 		}
	// 		.name{
	// 			font-size: 30rpx;
	// 			color: #333;
	// 			padding-left: 10rpx;
	// 			line-height: 43rpx;
	// 			height: 50rpx;
	// 		}	
	// 		.name-dis{
	// 			font-size: 24rpx;
	// 			color: #d02629;
	// 			padding-left: 20rpx;
	// 			line-height: 50rpx;
	// 			height: 50rpx;
	// 		}	
	// 		.more{
	// 			font-size: 30rpx;
	// 			color: #999;
	// 			right: 20rpx;
	// 			position: absolute;
	// 			line-height: 43rpx;
	// 			height: 50rpx;
	// 		}		
	// 	}
	// 	.cards{
	// 		display: flex;
	// 		flex-direction: row;
	// 		overflow-x: auto;
	// 		flex-wrap: nowrap;
	// 		.card{
	// 			width: 265rpx;
	// 			flex: 0 0 auto;
	// 			background:white;
	// 			margin-right: 10rpx;
	// 			overflow: hidden;
	// 			border-radius: 12rpx;
	// 			.card-image{
	// 				width: 265rpx;
	// 				height: 265rpx;
	// 				opacity:1 !important;
	// 				image{
	// 					width:100%;
	// 					height:100%;
	// 				}
	// 				background-color: #f0f0f0;
	// 			}
	// 			.title {
	// 				display: -webkit-box;
	// 				overflow: hidden;
	// 				white-space: normal !important;
	// 				text-overflow: ellipsis;
	// 				word-wrap: break-word;
	// 				-webkit-line-clamp: 2;
	// 				-webkit-box-orient: vertical;
	// 				color: #343434;
	// 				height: 80rpx;
	// 				line-height: 40rpx;
	// 				text-align: left;
	// 				padding: 0 20rpx;
	// 				font-size: 28rpx;
	// 				margin-top: 10rpx;
	// 				.shop-grade{
	// 				  // font-size: 22rpx;
	// 				  // background: #de2d35;
	// 				  // color: white;
	// 				  // border-radius: 5rpx;
	// 				  // padding: 5rpx 10rpx;
	// 				  // text-align: center;
	// 				  // margin-right:10rpx;
	// 					width:50rpx;
	// 					height:30rpx;
	// 					border-radius:10rpx;
	// 					margin-right:10rpx;
	// 					margin-bottom: -3rpx;
	// 				}
	// 			}
	// 			.showdiv{
	// 				display: flex;
	// 				padding: 1rpx 20rpx;
	// 				.discountshow{
	// 				  color: #da3632;
	// 				  height: 21rpx;
	// 				  padding: 4rpx 2rpx 2rpx 2rpx;
	// 				  font-size: 22rpx;
	// 				  margin: 5rpx 7rpx 0 2rpx;
	// 				}
	// 			}
	// 			.price-box{
	// 				display: flex;
	// 				justify-content: space-between;
	// 				padding: 10rpx 20rpx 20rpx 20rpx;
	// 				.price{
	// 					color:#da3632;
	// 					font-size: 26rpx;
	// 					font-weight: bold;
	// 				}
	// 				.count{
	// 					font-size: 20rpx;
	// 					color: #999;
	// 					// background: #d5d7db;
	// 					// border-radius: 5rpx;
	// 					// padding: 5rpx 10rpx;
	// 					// text-align: center;
	// 				}
	// 			}
	// 		}
	// 	}
	// }
	.floor {
	    background-color: #f2f1f2;
	    box-sizing: border-box;
	    .floor-item {
			background-color: #f2f1f2;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.top {
				background-color: #f2f1f2;
				width: 100%;
				padding: 20rpx;
				display: flex;
				flex-direction: row;
				overflow-x: auto;
				flex-wrap: nowrap;
				justify-content: space-between;
				.title {
					text-align: center;
					font-size: 30rpx;
					color: #444;
				}
				.sectitle {
					text-align: center;
					font-size: 28rpx;
					color: #999;
					.img-conner{
						width: 20rpx;
						height: 20rpx;
						// margin: 25rpx 0 0 -17rpx;
						// margin:8rpx 0 0 5rpx;
						margin:0 0 -15rpx -3rpx;
					}
				}
				.active{
					color:#000;
				}
				.secactive{
					color:#d02629;
				}
				.more {
					line-height: 40rpx;
					color: #999;
					font-size: 28rpx;
					position: relative;
					padding-right: 20rpx;
					em {
						position: absolute;
						right: 0;
						top: 7rpx;
						i {
							border-left: 6rpx solid #ccc;
							border-top: 6rpx solid transparent;
							border-bottom: 6rpx solid transparent;
							position: absolute;
							right: -4rpx;
							top: 0;
						}
						b {
							border-left: 6rpx solid #f2f2f2;
							border-top: 6rpx solid transparent;
							border-bottom: 6rpx solid transparent;
							position: absolute;
							right: 0;
							top: 0;
						}
					}
				}
			}
			.image-ad {
				width: 745rpx;
				height: 350rpx;
				border: 1rpx solid #eee;
				display: flex;
				align-items: center;
				justify-content: center;
				image {
					width: 100%;
					height: 350rpx;
					border: none;
				}
			}
			.goods-box {
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: space-between;
				margin: 0 20rpx;
				.floor-goods {
					margin-bottom: 20rpx;
					padding-bottom: 10rpx;
					background-color: #fff;
					width: 48.7%;
					float: left;
					border-radius: 20rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					image {
						width: 100%;
						height: 365.8rpx;
						align-self: center;
						border-bottom: 0.5rpx solid #f2f1f2;
						border-top-left-radius: 20rpx;
						border-top-right-radius: 20rpx;
					}
					.title {
						display: -webkit-box;
						overflow: hidden;
						white-space: normal !important;
						text-overflow: ellipsis;
						word-wrap: break-word;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						color: #343434;
						height: 80rpx;
						// line-height: 24rpx;
						line-height: 38rpx;
						text-align: left;
						padding: 0 20rpx;
						font-size: 28rpx;
						margin-top: 10rpx;
						.shop-grade{
							// font-size: 22rpx;
							// background: #de2d35;
							// color: white;
							// border-radius: 5rpx;
							// padding: 5rpx 10rpx;
							// text-align: center;
							width:50rpx;
							height:30rpx;
							border-radius:10rpx;
							margin-right:10rpx;
							margin-top:2rpx;
						}
					}
					.showdiv{
						display: flex;
						padding: 1rpx 20rpx;
						.discountshow{
							color: #da3632;
							height: 21rpx;
							padding: 4rpx 2rpx 2rpx 2rpx;
							font-size: 22rpx;
							margin: 5rpx 7rpx 0 2rpx;
						}
					}
					.price-box{
						display: flex;
						justify-content: space-between;
						padding:10rpx 20rpx 10rpx 20rpx;								
						.price{
							color:#da3632;
							font-size:26rpx;
							font-weight: bold;
						}
					.count{
						font-size: 20rpx;
						color: #999;
						background: #d5d7db;
						border-radius: 5rpx;
						padding: 5rpx 10rpx;
						text-align: center;
					}
				}
				.priceimg-box{
					display: flex;	
					padding:0 20rpx 10rpx 20rpx;								
					.price{
						color:#2f1918;
						font-size:26rpx;
					}
					.img{
						padding-left: 10rpx;
						width: 80rpx;
						height: 30rpx;
					}
				}
			}
		}
	}
}
</style>
