<template>
	<view class="container_search">
	
		<view class="search-page-header">
			<u-search height="70" v-model="searchKey"  focus="true" bg-color="white" :border-color="config.main_color" :focus="true" placeholder="搜索宝贝,店铺..." action-text="搜索" @custom="onSearch" 
				:action-style="actionStyle"
			></u-search>
			<!-- <u-search height="70" v-model="searchKey"  focus="true" bg-color="white" border-color="#d02629" :focus="true" placeholder="搜索宝贝,店铺..." action-text="搜索" @custom="onSearch"
				:action-style="actionStyle"
			></u-search> -->
		</view>
		<view class="hot-search" v-if="showHotSearch">
			<view class="title">
				<text>搜索发现</text>
			</view>
			<view class="content">
				<text v-for="text in hotSearch" @click="clickOnContent(text.hot_words)">
					{{text.hot_words}}
				</text>
			</view>
		</view>
		<view class="hot-search" v-if="searchHistory.length>0&&showHotSearch">
			<view class="title">
				<text>搜索历史</text>
			</view>
			<view class="content">
				<view v-for="text in searchHistory.slice(0,5)" @click="clickOnContent(text.title)">
					{{text.title}}
					
					<view class="delete" @click.self="deleteHistory(text.id)">
						<image src="@/static/images/common/close.png" ></image>
					</view>
				</view>				
			</view>
		</view>
		<view class="tabData">
			<view class="top">
				<view class="five-title" @click="homeActive(index)" v-for="(item,index) in className" :key="index">
					<view class="title" :class="{active: titleActive == index}">{{item.title}}</view>
					<view class="sectitle" :class="{secactive: titleActive == index}">{{item.name}} <image src="@/static/images/common/conner.jpg" class="img-conner" v-if="titleActive == index"></image></view>
				</view>
			</view>
			<view class="dropDownData">
				<view class="downText">
					<view class="locaAdd" @click="addLocation">
						<u-icon class="map_image" name="map" size="35"></u-icon>
						<view class="add_location">{{address}}</view>
					</view>
					<!-- <u-icon @click="hideAddress" v-if="hideLocation" name="close" color="#c0c4cc" size="28"></u-icon> -->
					<view class="dropData">
						<u-dropdown>
							<u-dropdown-item class="dropDownItem" v-model="value2" title="送货方式" :options="options2"></u-dropdown-item>
							<u-dropdown-item class="dropDownItem" v-model="value3" title="综合排序" :options="options3"></u-dropdown-item>
						</u-dropdown>
					</view>
				</view>
			</view>
		</view>
		<view class="result" v-if="searchResult.length>0">
			<!-- <view class="navbar" :style="{position:headerPosition,top:headerTop}">
				<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
					<text>销量</text>
					<view class="p-box">
						<text :class="{active: sellOrder === 1 && filterIndex === 0}" class="yticon icon-shang"></text>
						<text :class="{active: sellOrder === 2 && filterIndex === 0}" class="yticon icon-shang xia"></text>
					</view>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
					<text>价格</text>
					<view class="p-box">
						<text :class="{active: priceOrder === 1 && filterIndex === 1}" class="yticon icon-shang"></text>
						<text :class="{active: priceOrder === 2 && filterIndex === 1}" class="yticon icon-shang xia"></text>
					</view>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
					<text>人气</text>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 3}" @click="tabClick(3)">
					<text>新品</text>
				</view>
				<view class="nav-item" :class="{current: filterIndex === 4}" @click="tabClick(4)">
					<text>店铺</text>
				</view>
				<text class="cate-item yticon icon-fenlei1" @click="toggleCateMask('show')"></text>
			</view> -->
			<!-- <view class="goods-list">
				<view 
					v-for="(item, index) in searchResult" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="config.image_url+item.pic_url" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.title}}</text>
					<view class="price-box">
						<text class="price">{{item.goods_price}}</text>
						<text>已售 {{item.sales_sum}}</text>
					</view>
				</view>
			</view> -->
			
			<view v-if="flagResult == 'goods'" class="goods-box">
				<view
					:key="index"
					class="floor-goods"
					v-for="(item, index) in searchResult"
					@click="navToDetailPage(item)"
				>
					<image :src="config.image_url+item.pic_url" mode="aspectFill"></image>
					<text class="title">
						{{item.title}}
					</text>
					<view class="price-box">
						<text class="price">￥{{item.goods_price}}</text>
						<text class="">已售 {{item.sales_sum}} 件</text>
					</view>
				</view>
			</view>
			
			<view>
				<view class="storenew" v-if="flagResult == 'store'">
					<view class="cardstore">
						<view class="cardd" v-for="(item, index) in searchResult" :key="index">
							<view class="card-image">
								<image :src="config.image_url+item.store_logo" class="img"></image>
							</view>
							<view class="bd-card">
								<view class="sec-card">
									<image :src="config.image_url+item.store_logo"></image>
								</view>
								<view class="title-main">{{item.shop_name}}</view>
								<view class="title-main1">{{item.distance}}</view>
							</view>
						</view>		
					</view>
				</view>
			</view>
			
			<uni-load-more :status="loadingType"></uni-load-more>
			
			<view class="cate-mask" :class="cateMaskState===0 ? 'none' : cateMaskState===1 ? 'show' : ''" @click="toggleCateMask">
				<view class="cate-content" @click.stop.prevent="stopPrevent" @touchmove.stop.prevent="stopPrevent">
					<scroll-view scroll-y class="cate-list">
						<view v-for="item in cateList" :key="item.id">
							<view class="cate-item b-b two">{{item.name}}</view>
							<view 
								v-for="tItem in item.child" :key="tItem.id" 
								class="cate-item b-b" 
								:class="{active: tItem.id==cateId}"
								@click="changeCate(tItem)">
								{{tItem.name}}
							</view>
						</view>
						<view class="filter">
							<view class="title">价格</view>
							<view class="price">
								<u-input v-model="filter.minPrice" type="number" placeholder="最低价" />
								<view style="width: 30rpx;"></view>
								<u-input v-model="filter.maxPrice" type="number" placeholder="最高价" />
							</view>
						</view>
						<view class="btn">
							<u-button type="error" :custom-style="{backgroundColor:'white',color:'black',borderRadius:0,height:'100rpx'}" @click="cateMaskState=0">取消</u-button>
							<u-button type="error" :custom-style="{backgroundColor:'#d02629',color:'white',borderRadius:0,height:'100rpx'}" @click="()=>{loadData('refresh',1);cateMaskState=0}">确认</u-button>
						</view>
					</scroll-view>
					
				</view>
			</view>
			
		</view>
		<view class="empty" v-if="showEmptyResultIcon">
			<EmptySearch></EmptySearch>
		</view>
	</view>
</template>

<script>
	import config from "@/config.js"
	import api from "@/api.js"
	import EmptySearch from '@/components/empty/empty'
	export default{
		data(){
			return {
				"actionStyle":{
					backgroundColor:config.main_color,
					// backgroundColor: '#d02629',
					color:'white',
					borderRadius:'50px',
					
					height:'70rpx',
					width:'120rpx',
					display:'flex',
					justifyContent:'center',
					alignItems:"center"
					
				},
				config,
				searchKey:"",
				hotSearch:[],
				searchHistory:[],
				searchResult:[],
				flagResult: '',
				currentPage: 1,
				page:1,
				showHotSearch:true,
				showEmptyResultIcon : false,//搜索失败图标
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低,
				sellOrder: 2 ,//销量排序 //默认销量高到低,
				sortText : ['sales_sum','price_member','popularity','id','store'],
				filter:{
					minPrice:'',
					maxPrice:''
				},
				cateMaskState: 0, //分类面板展开状态
				titleActive:0,
				className:'',
				value2: 2,
				value3: 3,
				options2: [{
						label: '去冰',
						value: 1,
					},
					{
						label: '加冰',
						value: 2,
					},
				],
				options3: [{
						label: '默认排序',
						value: 1,
					},
					{
						label: '距离优先',
						value: 2,
					},
				],
				scrollTop: 0,
        address : '',
        lat : '',
        lng : '',
			}
		},
		components:{
			EmptySearch
		},
		methods:{
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
                    uni.request({
                      url:api.getAddressByLat,
                      data:{
                        lat:latitude,
                        lng:longitude
                      },
                      method:"POST",
                      success(res) {
                        if(res.data.status == 1){
                          that.address = res.data.data
                        }
                      },
                      fail(e) {
                        uni.showToast({
                          title:e
                        })
                      }
                    })
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
      },
			getHotSearch(){
				let _this = this;
				uni.request({
					url:api.getHotSearch,
					success(res) {
						if(res.data.data){
							_this.hotSearch = res.data.data
						}
					},
					fail(e) {
						uni.showToast({
							title:e
						})
					}
				})
			},
			getSearchHistory(){
				let history = uni.getStorageSync("searchHistory")
				if(history){
					this.searchHistory = history;
				}else{
					this.searchHistory = [];
					uni.setStorageSync("searchHistory",this.searchHistory);				
				}
				
			},
			onSearch(value){
				this.showHotSearch = false;
				this.searchHistory = this.searchHistory.filter((search)=>{
					return search.title!=value;
				})
				
				this.searchHistory.unshift({title:value,id:null});
				this.searchHistory.map((search,index)=>{
					search.id = index;
					return search;
				})
				uni.setStorageSync("searchHistory",this.searchHistory);
				
				this.performSearch(value);
			},
			deleteHistory(id){
				
				this.searchHistory = this.searchHistory.filter((search)=>{
					return search.id!=id;
				})
				uni.setStorageSync("searchHistory",this.searchHistory);
			},
			performSearch(value){
				
				if(value=="") return;
				this.showEmptyResultIcon = false;
				uni.showLoading({
					title:"搜索中"
				})
				let _this = this;
				this.loadData("refresh",1)
				// uni.request({
				// 	url:api.performSearch+"?keyword="+value+"&sort=1&page="+this.currentPage+"&min_price=&max_price=",
				// 	success(res) {
				// 		uni.hideLoading();
				// 		if(res.data.data){
				// 			_this.searchResult = res.data.data.data;
				// 			if(_this.searchResult.length==0){
				// 				_this.showEmptyResultIcon = true;
				// 			}
				// 		}else{
				// 			_this.showEmptyResultIcon = true;
				// 		}
						
				// 	},
				// 	fail(e) {
				// 		console.log(e);
				// 		_this.showEmptyResultIcon = true;
				// 		uni.hideLoading();
				// 		uni.showToast({
				// 			title:e.message,
				// 			icon:"none"
				// 		})
						
				// 	}
				// })
			},
			homeActive(index){
			  this.titleActive = index;
			},
			classNameData() {
				uni.request({
					url : api.getClass,
					success: (res) => {
						if(res.data.data){
							this.className = res.data.data;
						}
						
					},
					fail: (res)=>{
						
						console.log(res);
					}
				})
			},
			addLocation() {
				let that = this;
				uni.chooseLocation({
					success: (res) => {
						that.lat = res.latitude;
						that.lng = res.longitude;
						that.address = res.name;
						// if(that.lat != null && that.lng) {
						// 	this.getRecommend(this.page);
						// }
						// console.log('位置名称：' + res.name);
						// console.log('详细地址：' + res.address);
						// console.log('纬度：' + res.latitude);
						// console.log('经度：' + res.longitude);
						// this.positionName = res.name;
					}
				})
			},
			hideAddress() {
				this.hideLocation = false;
				this.showLocation = true;
				this.showAddress = false;
			},
			onPageScroll(e) {
			    this.scrollTop = e.scrollTop;
			},
			async loadData(type='add', loading) {
				this.showEmptyResultIcon = false;
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				// if(this.currentPage==this.lastPage){
				// 	//last page
				// 	return ;
				// }
				
				
				let sortOrder ='';
				if(this.filterIndex==0){
					sortOrder = this.sellOrder==1?'asc':'desc';
				}
				if(this.filterIndex==1){
					sortOrder = this.priceOrder==1?'asc':'desc';
				}			
				
				let url = api.performSearch+
					// '?keyword='+this.searchKey+
					// '&page='+this.currentPage+
					// '&sort_field='+this.sortText[this.filterIndex]+
					// '&sort_type='+sortOrder+
					// '&min_price='+this.filter.minPrice+
					// '&max_price='+this.filter.maxPrice;
					'?store_id='+config.store_id+
					'&lat='+this.lat+
					'&lng='+this.lng+
					'&keyword='+this.searchKey;
				
				uni.request({
					url : url,
					success: (res) => {
						console.log(res);
			
						if(res.data.data){
							let goodsList = []				
							if(res.data.data.data){
								goodsList = res.data.data.data;
							}
							if(type === 'refresh'){
								// uni.showToast({title:'以刷新 !'})
								this.searchResult = [];
							}
							//筛选，测试数据直接前端筛选了
							this.flagResult = res.data.data.flag;						
							this.searchResult = this.searchResult.concat(goodsList);
							//update current fetching page
							if(res.data.data.count>this.searchResult.length){
								this.currentPage++;
								this.loadingType = "more"
							}else{
								this.loadingType = "nomore"
							}
							//判断是否还有下一页，有是more  没有是nomore(测试数据判断大于20就没有了)
							
							if(type === 'refresh'){
								if(loading == 1){
									uni.hideLoading()
								}else{
									uni.stopPullDownRefresh();
								}
							}
						}else{
							//后台数据返回 为 空的时候
							if(type === 'refresh'){
								// uni.showToast({title:'以刷新 !'})
								this.showEmptyResultIcon = true;
								this.searchResult = [];
								if(loading == 1){
									uni.hideLoading()
								}else{
									uni.stopPullDownRefresh();
								}
								this.loadingType="nomore"
							}
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
				
			},
			tabClick(index){
				if(this.filterIndex === index && (index == 2 || index == 3 || index == 4) ){
					//排除人气 新品 店铺
					return;
				}
				this.filterIndex = index;
				if(index === 0){
					switch(this.sellOrder){
						case 0 : this.sellOrder = 2;break; //默认	销量从高到低
						case 1 : this.sellOrder = 2;break;
						case 2 : this.sellOrder = 1;break;
					}	
				}else{
					this.sellOrder = 0;
				}
				
				if(index === 1){
					this.priceOrder = this.priceOrder === 1 ? 2: 1;
				}else{
					this.priceOrder = 0;
				}
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.currentPage = 1
				this.loadData('refresh', 1);
				// uni.showLoading({
				// 	title: '加载中'
				// })
			},
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
			clickOnContent(text){
				this.searchKey = text;
				this.onSearch(text);
			},
		},
		mounted() {
			this.classNameData();
			this.authorizedPositioning();
		},
		onReachBottom(){
			this.currentPage++;
			this.loadData();
			// this.getRecommend(this.page);
		},
	}
</script>

<style lang="scss">
	.list-cell {
	  display: flex;
	  box-sizing: border-box;
	  width: 100%;
	  padding: 10px 24rpx;
	  overflow: hidden;
	  color: #323233;
	  font-size: 14px;
	  line-height: 24px;
	  background-color: #fff;
	 }
	 .u-dropdown__content {
		 position:absolute;
		 z-index:100 !important;
		 width:710rpx !important;
		 left:0px;
		 bottom:0;
		 top:100rpx !important;
		 margin-left:-230rpx !important;
		 border-radius: 20rpx !important;
	 }

	.container_search{
		// padding:0rpx 30rpx;
		 // background-color: $light-grey;
		 background-color: #f2f1f2;
		 min-height: 100vh;
		 // width:100%;
		 position: relative;
		 // padding-top: 20rpx;
		 margin:0 20rpx;
		 .tabData {
			width: 100%;
			z-index: 100;
			background-color: #fff;
			.top {
			 	background-color: #f2f1f2;
			 	// width: 100%;
			 	// padding: 20rpx;
				padding:20rpx 0;
			 	display: flex;
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
			.dropDownData {
			 	// width: 100%;
			 	// padding: 20rpx;
				padding: 10rpx 20rpx;
			 	// background:linear-gradient(to bottom, #fff, #fdfdfd, #fbfbfb, #f0f0f0);
			 	background-color: #fff;
			 	.downText {
			 		display: flex;
					.locaAdd {
						display: flex;
						.map_image {
							padding-right: 10rpx;
						}
						.add_location{
							color: #777;
							width: 200rpx;
							padding-top: 20rpx;
						}
					}
			 		.dropData {
			 			width: 100%;
						.dropDownItem {
							width: 100%
						}
			 		}
			 	}
			}
		}
		 
		.locaData {
			// padding:20rpx 0;
			width:100%;
			background-color:#fff;
			margin-top:20rpx;
			.titleHeader {
				border-bottom:2rpx solid #f2f2f2;
				padding:30rpx 20rpx;
				.locaTitle {
					display: flex;
					.map_image {
						padding-right: 10rpx;
					}
				  .title_t {
					color: #333;
				  }
				}
			}
			.locaMiddle {
				padding: 20rpx;
				.mid_text {
					color: #999;
					padding-bottom: 20rpx;
				}
				.btn_all {
					width:710rpx;
					overflow:hidden;
					margin:auto;
					display:flex;
					justify-content:flex-start;
					flex-direction:row;
					flex-wrap:wrap;
					.middle_btn {
						.btn_data {
							border:5rpx solid #f2f2f2;
							padding:8rpx 45rpx;
							background-color:#f2f2f2;
							border-radius:10rpx;
							margin-right:20rpx;
							margin-bottom:20rpx;
						}
					}
				}
			}
		}
	
		.hot-search{
			.title{
				display: flex;
				justify-content: space-between;
				font-size: 12px;
				font-weight: bold;
				// padding:15px 10px;
				padding:15px 0;
				color: $font-color-dark;
			}	
			.content{
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				text,view{
					padding:8px 16px;
					background-color: $light-grey;
					border-radius: 50px;
					font-size: 12px;
					color:$font-color-light;
					margin-right:15px;
					position: relative;
					.delete{
						position: absolute;
						padding:0;
						width:15px;
						height: 15px;
						left:80%;
						top:0;
						border-radius: 50%;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: $font-color-light;
						color: white;
						font-size: 12px;
						opacity: 0.5;
						image{
							width:8px;
							height:8px;
						}
					}
				}
			}
		}
		
	}
	page, .result{
		// background: $page-color-base;
		background: #f2f1f2;
		margin-top: 20rpx;
	}
	
	
	.navbar{
		margin-top: 5px;
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		// border-radius: 5px;
		z-index: 10;
		.nav-item{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
			color: $font-color-dark;
			position: relative;
			&.current{
				color: $main-color;
				&:after{
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $main-color;
				}
			}
		}
		.p-box{
			display: flex;
			flex-direction: column;
			.yticon{
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;
				&.active{
					color: $main-color;
				}
			}
			.xia{
				transform: scaleY(-1);
			}
		}
		.cate-item{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}
	
	/* 分类 */
	.cate-mask{
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0,0,0,0);
		z-index: 95;
		transition: .3s;
		
		.cate-content{
			width: 630upx;
			height: 100%;
			background: #fff;
			float:right;
			transform: translateX(100%);
			transition: .3s;
		}
		&.none{
			display: none;
		}
		&.show{
			background: rgba(0,0,0,.4);
			
			.cate-content{
				transform: translateX(0);
			}
		}
	}
	.cate-list{
		display: flex;
		flex-direction: column;
		height: 100%;
		position: relative;
		.cate-item{
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}
		.two{
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}
		.active{
			color: $main-color;
		}
		.btn{
			display:flex;
			position:absolute;
			bottom:0;
			width:100%;
			u-button{
				width:100%;	
				button{
					width: 100%;
				}
			}
		}
		.filter{
			padding: 30rpx;
			.title{
				padding:10rpx 0rpx 30rpx 0rpx;
				font-size: 30rpx;
			}
			.price{
				display: flex;
				u-input{
					background:$light-grey;
					padding:10rpx 20rpx;
				}
			}
		}
	}
	
	/* 商品列表 */
	// .goods-list{
	// 	display:flex;
	// 	flex-wrap:wrap;
	// 	// padding: 10upx 0upx;
	// 	padding: 20rpx 0rpx;
	// 	background: $light-grey;
	// 	.goods-item{
	// 		display:flex;
	// 		flex-direction: column;
	// 		width: 48%;
	// 		padding-bottom: 40upx;
	// 		margin-bottom: 25upx;
	// 		padding:20rpx;
	// 		background:white;
	// 		border-radius: 5px;
	// 		&:nth-child(2n+1){
	// 			margin-right: 4%;
	// 		}
	// 	}
	// 	.image-wrapper{
	// 		width: 100%;
	// 		height: 330upx;
	// 		border-radius: 3px;
	// 		overflow: hidden;
		
	// 		image{
	// 			width: 100%;
	// 			height: 100%;
	// 			opacity: 1;
	// 		}
	// 	}
	// 	.title{
	// 		font-size: $font-lg;
	// 		color: $font-color-dark;
	// 		line-height: 80upx;
	// 	}
	// 	.price-box{
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: space-between;
	// 		padding-right: 10upx;
	// 		font-size: 24upx;
	// 		color: $font-color-light;
	// 	}
	// 	.price{
	// 		font-size: $font-lg;
	// 		color: $uni-color-primary;
	// 		line-height: 1;
	// 		&:before{
	// 			content: '￥';
	// 			font-size: 26upx;
	// 		}
	// 	}
	// }
	.goods-box {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		// margin: 0 20rpx;
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
				line-height: 38rpx;
				text-align: left;
				padding: 0 20rpx;
				font-size: 28rpx;
				margin-top: 10rpx;
				.shop-grade{
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
.storenew{
    // margin: 20rpx 0;
	// margin: 0 20rpx;
	.title{
		display:flex;
		justify-content: space-between;
		// width:100%;
		padding:0 20rpx 20rpx 20rpx;
		display: flex;
		flex-wrap: wrap;
		color:#909399;
		.name{
			font-size: 26rpx;
			color: #111;
		}	
		.more{
			font-size: 24rpx;
		}		
	}
	.cardstore{
		width:100%;
		// padding:0 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		.cardd{
			// width:300rpx;
			width: 48.7%;
			flex: 0 0 auto;
			height:450rpx;
			background:white;
			// margin-right:20rpx;
			overflow: hidden;
			margin-bottom:20rpx;
			// border-radius: 5px;
			.card-image{
				// width:300rpx;
				width:100%;
				height:300rpx;
				opacity:1 !important;
				.img{
					width:100%;
					height:100%;
					
				}
				background-color: #f0f0f0;
			}
			.bd-card{
			  // background: #f1f1f1;
			}
			.sec-card{
				width: 88rpx;
				height: 88rpx;  
				padding: 5rpx;
				position: relative;
				margin: -50rpx auto 0;
				overflow: hidden;
				z-index: 99;
				background-color: #f0f0f0;
				image{
					width:100%;
					height:100%;
				  text-align: center;
				}
			}
			.title-main{
				color: #303133;
				padding: 6rpx 20rpx;
				font-size: 24rpx;
				display: -webkit-box;
				overflow: hidden;
				white-space: normal !important;
				text-overflow: ellipsis;
				word-wrap: break-word;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				height: 40rpx;
				line-height: 46rpx;
				text-align: center;
			}
			.title-main1{
				color: #9e9e9e;
				padding: 0 20rpx;
				font-size: 24rpx;
				display: -webkit-box;
				overflow: hidden;
				white-space: normal !important;
				text-overflow: ellipsis;
				word-wrap: break-word;
				-webkit-line-clamp: 1;
				-webkit-box-orient: vertical;
				height: 40rpx;
				line-height: 46rpx;
				text-align: center;
			}
		}
	}
}
</style>
