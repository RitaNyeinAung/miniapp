<template>
	<view class="content">
		<view class="banner" v-if="cateType==4">
			<image src="@/static/images/common/integral_banner.png"></image>
		</view>
		<view class="navbar" v-if="cateType==4">
			<view class="nav-item" :class="{current: selectedFilterIntegral!=''}" @click="showFilterIntegral=true">
				<text>{{selectedFilterIntegral.label||"积分"}}</text>
			</view>
			<u-select v-model="showFilterIntegral" :list="filterIntegralList" @confirm="selectFilterIntegral"></u-select>
			<view class="nav-item" :class="{current: selectedFilterCategory!=''}" @click="showFilterCategory=true">
				<text>{{selectedFilterCategory.label||"分类"}}</text>
			</view>
			<u-select v-model="showFilterCategory" :list="filterCategoryList" @confirm="selectFilterCategory"></u-select>		
			
		</view>
		<view class="flashsale time-list" v-if="timeList.length>0">
			<view class="time">
				<view class="start">
					<view class="b hour">{{countDownTime|toHMS('h')}}</view>
					<view class="b minute">{{countDownTime|toHMS('m')}}</view>
					<view class="b second">{{countDownTime|toHMS('s')}}</view>
				</view>
				<view class="note">活动进行中</view>
			</view>
			<view class="time close">
				<view class="start ">{{timeList[0].startTime}}</view>
				<view class="note" >{{timeList[0].name}}</view>
			</view>
		</view>
		<view class="goods-list" v-if="timeList.length>0">
			<view 
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToFlashDetailPage(item)"
			>
				<!-- 秒杀商品 -->
				<view class="image-wrapper">
					<image :src="config.image_url+item.pic_url" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="bar">
					<view class="innerbar" :style="{width:(item.buy_num/item.activity_num)*100+'%'}"></view>
				</view>
				<view class="price-box">
					<text class="price">{{item.activity_price}}
						<text class="line-through" style="text-decoration:line-through ;">{{item.price_member}}</text>
					</text>
					
					<text>已售 {{item.buy_num}}</text>
				</view>
			</view>
		</view>
		<view class="goods-list" v-else-if="cateType!=4">
			<view 
				v-for="(item, index) in goodsList" :key="index"
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
		</view>
		<view class="goods-list" v-else style="margin-top: 40px;">
			<!-- 积分商品 -->
			<view
				v-for="(item, index) in goodsList" :key="index"
				class="goods-item"
				@click="navToIntegralDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="config.image_url+item.image" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="price-box">
					<text class="integral">积分{{item.integral}}</text>
					<text>实际价 {{item.money}}</text>
				</view>
			</view>
		</view>
		
		<uni-load-more :status="loadingType"></uni-load-more>
		
		
		
	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import api from '@/api.js';
	import config from '@/config.js'
	export default {
		components: {
			uniLoadMore	
		},
		data() {
			return {
				
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				goodsList: [],
				currentPage: 1,
				config,
				timeList:[],
				countDownTime: 0,//倒计时
				timer:null,
				cateType:0,
				filterIntegralList:[{value:"-",label:"所有"},{value:"0-999",label:"0-999"},{value:"1000-1999",label:"1000-1999"},{value:"2000-2999",label:"2000-2999"}],
				filterCategoryList:[{value:"-",label:"所有"}],
				showFilterIntegral:false,
				showFilterCategory:false,
				selectedFilterIntegral:"",
				selectedFilterCategory:"",
			};
		},
		
		onLoad(options){
			// // #ifdef H5
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// // #endif
			this.cateType = options.type;
			// this.loadCateList(options.fid,options.sid);
			this.loadData();
			let name = [
				"店铺",
				'新品推荐',
				'热门商品',
				'',
				'积分商品'
			]
			
			uni.setNavigationBarTitle({
				title:name[this.cateType]
			})
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			if(e.scrollTop>=0){
				this.headerPosition = "fixed";
			}else{
				this.headerPosition = "absolute";
			}
		},
		//下拉刷新
		onPullDownRefresh(){
			this.currentPage = 1;//initialize page number
			this.loadData('refresh');
		},
		//加载更多
		onReachBottom(){
			
			this.loadData();
		},
		methods: {
			//加载分类
		
			//加载商品 ，带下拉刷新和上滑加载
			async loadData(type='add', loading) {
				//没有更多直接返回
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				
				if(this.currentPage==this.lastPage){
					//last page
					return ;
				}
				
				let url = '';
				console.log(this.cateType)
				if(this.cateType==0){
					url = api.storeList
				}
				if(this.cateType==1){
					url = api.newGoodList
				}
				if(this.cateType==2){
					url = api.hotGoodList
				}
				if(this.cateType==4){
					this.performIntegralAction(type);
					return
				}
				
				if(this.cateType==3){
					this.performFlashsaleAction(type);//关于 秒杀的 
					return;
				}
				
				uni.request({
					url : url+"?page="+this.currentPage+"&store_id="+config.store_id,
					success: (res) => {
						console.log(res);
						
						if(res.data.data){
											
							let goodsList = res.data.data.data;
							if(type === 'refresh'){
								uni.showToast({title:'以刷新 !'})
								this.goodsList = [];
							}
							//筛选，测试数据直接前端筛选了
													
							this.goodsList = this.goodsList.concat(goodsList);
							//update current fetching page
							if(res.data.data.current_page<res.data.data.last_page){
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
								uni.showToast({title:'以刷新 !'})
								this.goodsList = [];
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
			navToIntegralDetailPage(item){
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productIntegralDetail/index?id=${id}&goods_id=${item.goods_id}`
				})
			},
			performFlashsaleAction(type){
				let _this = this;
				
				uni.request({
					url:api.getSecKillTimeList,
					success(res) {
						if(res.data.data){
							_this.timeList = res.data.data;
							let now = Math.round(new Date().getTime()/1000);
							_this.timeList.forEach((time,index)=>{
							  console.log(time)
								if(time.countdown){
									_this.countDownTime = time.countdown
									_this.activeTime = time;
									uni.request({
										url:api.getSecKillProductList,
										data:{
											id:time.id,
											page:_this.currentPage
										},
										success(res) {
											if(res.data.data){
												
												if(type=="refresh"){
													_this.goodsList = res.data.data.records
												}else{
													_this.currentPage++;
													_this.goodsList = _this.goodsList.concat(res.data.data.data)
												}
												
											}else{
												_this.loadingType="nomore"
											}
										},
										fail(e) {
											_this.loadingType="nomore"
										}
									})
									_this.timer = setInterval(()=>{
										//更新 秒杀时间											
									
										if(_this.countDownTime>1){
											//每秒 减去 一千 毫秒
											_this.countDownTime=_this.countDownTime-1
											
										}else{
											clearInterval(_this.timer)
										}
																		
										
									},1000)
								}
							})
							_this.timeList = _this.timeList.filter(time=>{
								return !(time.end_time<now)
							}).filter(time => {
								return !(now>time.start_time&&now<time.end_time)
							}).slice(0,4);
							_this.timeList.map(item=>{
								let startDate = item.start.split(" ")[0];
								let startTime = item.start.split(" ")[1];
								item.startTime = startTime;
								
								let current = new Date();
								// let currentDate = current.getUTCFullYear()+"-"+("0"+(current.getUTCMonth()+1)).slice(-2)+"-"+("0"+current.getUTCDate().slice(-2));
								
								let day1 = new Date(startDate);
								let day2 = new Date();
								let diff = Math.abs(day2-day1);
								let diffDays = Math.ceil(diff/(1000*60*60*24));
								
								if(diffDays == 0){
									item.name = '今天'
								}
								if(diffDays == 1){
									item.name = '明天'
								}
								if(diffDays == 2){
									item.name = '后天'
								}
								if(diffDays > 2){
									item.name = startDate
								}
								return item;
								
							})
							console.log(_this.timeList);
						}else{
							_this.loadingType="nomore"
						}
					},
					fail(e) {
						_this.loadingType="nomore"
					}
				})
			},
			stopPrevent(){},
			performIntegralAction(type){

				let _this = this;
				
				let integral_lower = "";
				let integral_upper = "";
				if(this.selectedFilterIntegral!=""){
					let integral_range = this.selectedFilterIntegral.value.split("-");
					if(integral_range.length>0){
						integral_lower=integral_range[0]
						integral_upper=integral_range[1]
					}
				}
				uni.request({
					url: api.getIntegralProducts,
					data:{
						page:_this.currentPage,
						intergral_lower:integral_lower,
						intergral_upper:integral_upper
					},
					success(res) {
						
						if(res.data.data&&res.data.data.records){
							
							if(type=="refresh"){
								_this.goodsList = res.data.data.records
							}else{
								_this.currentPage++;
								_this.goodsList = _this.goodsList.concat(res.data.data.records)
							}
							
						}else{
							_this.loadingType="nomore"
						}
						if(_this.goodsList.length==res.data.data.count){
							_this.loadingType="nomore"
							
						}
					},
					fail(e) {
						_this.loadingType="nomore"
					}
				})
			},
			selectFilterIntegral(e){
				this.currentPage=1
				this.selectedFilterIntegral = e[0]
				this.loadData("refresh",1)
			},
			selectFilterCategory(e){
				this.currentPage=1
				this.selectedFilterCategory = e[0]
				this.loadData("refresh",1)
			}
		},
		filters:{
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
		}
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 10upx;
	}
	.banner{
		height: 100px;
		width: 100%;
		background-color: $light-grey;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.navbar{
		// position: fixed;
		// left: 0;
		// top: 100px !important;
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0,0,0,.06);
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
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
		background: $light-grey;
		margin-top:30upx !important;
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
		.title{
			font-size: $font-lg;
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
			.integral{
				color:$main-color
			}
		}
		.bar{
			with:100%;
			height: 6px;
			background-color: $light-grey;
			border-radius: 50px;
			margin-bottom: 5px;
			.innerbar{
				width:50%;
				height:100%;
				border-radius: 50px;
				background:linear-gradient(to left,red,orange);
			}
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
			.line-through{
				color:grey;
				font-size: 10px;
				padding-left: 5px;
			}
		}
	}
	
	.flashsale.time-list{
		display: flex;
		overflow-x: auto;
		align-items: center;
		justify-content: space-around;
		background:linear-gradient(to right,red,orange);
		color:white;
		padding:20rpx;
		margin-bottom: 20rpx;
		.time{
			padding:0px 10px 0px 10px;
			
			display: flex;
			flex-direction: column;
			align-items: center;
			.start{
				padding-bottom: 5px;
				display: flex;
				justify-content: space-between;
				.b{
					background:white;
					width:20px;
					height: 20px;
					display: flex;
					align-items: center;
					justify-content: center;
					border-radius: 5px;
					margin:0px 5px;
					color:red;
				}
			}
		}
		.close{
			opacity:0.7
		}
	}
	

</style>

