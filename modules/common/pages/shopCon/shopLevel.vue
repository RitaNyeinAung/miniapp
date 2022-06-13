<template>
	<view class="content">
		<view class="navbar" :style="{position:headerPosition,top:headerTop}">
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
		</view>
		<view class="goods-list">
			<view 
				v-for="(item, index) in search_data" :key="index"
				class="goods-item"
				@click="navToDetailPage(item)"
			>
				<view class="image-wrapper">
					<image :src="config.image_url+item.pic_url" mode="aspectFill"></image>
				</view>
				<text class="title clamp">{{item.title}}</text>
				<view class="price-box">
					<text class="price">{{item.goods_price || item.price_market|| item.price_member}}</text>
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
				cateMaskState: 0, //分类面板展开状态
				headerPosition:"fixed",
				headerTop:"0px",
				loadingType: 'more', //加载更多状态
				filterIndex: 0, 
				cateId: 0, //已选三级分类id
				priceOrder: 0, //1 价格从低到高 2价格从高到低,
				sellOrder: 2 ,//销量排序 //默认销量高到低
				cateList: [],
				search_data: [],
				currentPage: 1,
				sortText : ['sales_sum','price_member','5','6'],
				config
			};
		},
		
		onLoad(options){
			// // #ifdef H5
			// this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight+'px';
			// // #endif
			this.cateId = options.id;
			this.cateOne = options.level_one;
			this.cateTwo = options.level_two;
			this.cateThree = options.level_three;
			// this.loadCateList(options.fid,options.sid);
			this.loadData();
			uni.setNavigationBarTitle({
				title:decodeURIComponent(options.class_name)
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
			async loadCateList(fid, sid){
				let list = await this.$api.json('cateList');
				let cateList = list.filter(item=>item.pid == fid);
				
				cateList.forEach(item=>{
					let tempList = list.filter(val=>val.pid == item.id);
					item.child = tempList;
				})
				this.cateList = cateList;
			},
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
				
				
				let sortOrder ='';
				if(this.filterIndex==0){
					sortOrder = this.sellOrder==1?'1':'2';
				}
				if(this.filterIndex==1){
					sortOrder = this.priceOrder==1?'3':'4';
				}
				if(this.filterIndex==2){
					sortOrder = '5';
				}	
				if(this.filterIndex==3){
					sortOrder = '6';
				}	
				let url = api.storeGoodsAll+
					'?id='+this.cateId+
					'&sort='+sortOrder+
					'&store_class_one='+this.cateOne+
					'&store_class_two='+this.cateTwo+
					'&store_class_three='+this.cateThree+
					'&page='+this.currentPage+
					'&token='+uni.getStorageSync('token');				
				uni.request({
					url : url,
					success: (res) => {
						console.log(res);
						if(res.data.data&&res.data.data.data){
											
							let search_data = res.data.data.data;
							if(type === 'refresh'){
								uni.showToast({title:'Page refresh !'})
								this.search_data = [];
							}
							//筛选，测试数据直接前端筛选了
													
							this.search_data = this.search_data.concat(search_data);
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
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
				
			},
			//筛选点击
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
			//显示分类面板
			toggleCateMask(type){
				let timer = type === 'show' ? 10 : 300;
				let	state = type === 'show' ? 1 : 0;
				this.cateMaskState = 2;
				setTimeout(()=>{
					this.cateMaskState = state;
				}, timer)
			},
			//分类点击
			changeCate(item){
				this.cateId = item.id;
				this.toggleCateMask();
				uni.pageScrollTo({
					duration: 300,
					scrollTop: 0
				})
				this.loadData('refresh', 1);
				uni.showLoading({
					title: '正在加载'
				})
			},
			//详情
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/pages/product/product?id=${id}`
				})
			},
			stopPrevent(){}
		},
	}
</script>

<style lang="scss">
	page, .content{
		background: $page-color-base;
	}
	.content{
		padding-top: 96upx;
	}

	.navbar{
		position: fixed;
		left: 0;
		top: var(--window-top);
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
			// border-right: 2upx solid #cbcbcb;
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
	}

	/* 商品列表 */
	.goods-list{
		display:flex;
		flex-wrap:wrap;
		padding: 0 30upx;
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
		}
		.price{
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;
			&:before{
				content: '￥';
				font-size: 26upx;
			}
		}
	}
	

</style>

