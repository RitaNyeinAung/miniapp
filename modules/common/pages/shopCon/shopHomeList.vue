<template>
	<view class="shopHomeList">
		<view class="head">
			<view :style="{width:width * 400+'rpx'}" class="headers" ref="headers">
				<view :class="{avtive:titleAddIndex == index}" class="f2" @click="proAddTab(index,item.prov_id)" v-for="(item, index)  in address" :key="index">
					{{item.prov_name}}
				</view>
			</view>
		</view>
		<view class="head">
			<view :style="{width:width * 200+'rpx'}" class="headers fl" ref="headers">
				<view :class="{avtive:titleIndex == index1}" class="f2" @click="fixproTab(index1)">
					热门店铺
				</view>
				<view :class="{avtive:titleIndex == index}" class="f2" @click="proTab(index,item.id)" v-for="(item, index) in titleData" :key="index">
					{{item.sc_name}}
				</view>
			</view>
		</view>
		<view class="content">
			<view :class="{active: sortHead == index}" v-for="(item, index) in sortData" :key="index" @click="proSort(index)" class="contentli">{{item}}</view>
		</view>
		<view class="list-shop" id="list-shop">
			<view v-for="item in shoplist" :key="item.id" class="li">
				<view class="header">
					<view class="title">
						<image :src="config.image_url+item.store_logo" alt=""></image>
						<view>
							<text class="h4">{{item.shop_name}}&nbsp;   
							<text class="shop-gradename">{{item.store_grade_name}}</text>
<!-- 							<el-dropdown v-if="item.store_grade_name">
								<span class="shop-gradename">{{item.store_grade_name}}</span>
								<el-dropdown-menu slot="dropdown" v-if="item.classification">
								<el-dropdown-item>{{item.classification}}</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown> -->
							</text>
							<view class="goods-num">销量{{item.store_sales}} &nbsp;&nbsp;共{{item.good_number}}件</view>
						</view>
					</view>
					<text @click="shopHoe(item.id)" class="initShop"> 进店</text>
				</view>
				
				<view class="con">
					<view v-for=" val in item.store_goods" :key="val.id" @click="goproduct(val)" class="con-div">
						<image v-if="val.pic_url" :src="config.image_url+val.pic_url"></image>
						<view class="con-pri">￥{{val.goods_price}}</view>
					</view>
				</view>			   
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
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
				index1:-1,
				address:[],
				titleData:[],
				titleIndex: -1,
				sortData: ['综合排序', '销量优先', '按信誉'],
				sortHead: 0,
				shoplist: [],
				sort_types:'store_sort',
				class_id:'recommendShop',
				page: 1,
				address_id:'',
				loadingType: 'more',
			}
		},
		props:{
			width: {
				default: uni.getStorageSync("ww")
			},
		},
		onReachBottom(){
			this.getStoreListAjax();
		},
		methods:{
			storeClasses(){
				let url = api.storeClasses+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.titleData = res.data.data.class;
						_this.address = res.data.data.address;
						uni.setStorageSync('ww',_this.titleData.length);	
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			proAddTab(index,id) {
				//初始化page
				this.page = 1;
				//清空数据列表
				this.shoplist = [];
				this.titleAddIndex = index;
				this.address_id = id;
				this.getStoreListAjax();

			},
			proTab(index,id) {
				this.page = 1;
				//清空数据列表
				this.shoplist = [];
				this.titleIndex = index;
				this.class_id = id;
				this.getStoreListAjax();

			},
			fixproTab(index1) {
				//初始化page
				this.page = 1;
				//清空数据列表
				this.shoplist = [];
				this.titleIndex = index1;
				this.class_id = 'recommendShop';
				this.getStoreListAjax();

			},
			proSort(index){
				this.page = 1;
				//清空数据列表
				this.shoplist = [];
					this.sortHead = index;
				if(this.sortHead==0){
					this.sort_types = 'store_sort';
					this.getStoreListAjax();
					
				}else if(this.sortHead==1){
					this.sort_types = 'store_sales';
					this.getStoreListAjax();
					
				}else if(this.sortHead==2){
					this.sort_types = 'grade_id';
					this.getStoreListAjax();

				}
			},
			async getStoreListAjax(type='add', loading){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				let url = api.getStoreList+
					'?page='+this.page+
					'&class_id='+this.class_id+
					'&sort_types='+this.sort_types+
					'&address_id='+this.address_id+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.data.records){
							for(let key in res.data.data.records) {
								this.shoplist.push(res.data.data.records[key])
							}
							this.page++;
							this.loadingType = "more"
						}
						else{
							this.loadingType = "nomore"
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			shopHoe(id){
				uni.navigateTo({
					url: '/modules/common/pages/shopCon/shopHome?id='+id+'&index='+0,
				})
			},
			goproduct(val){
				let id = val.id;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
		},
		mounted() {
			this.storeClasses();
			this.getStoreListAjax();
		}
		
	}
</script>

<style lang="scss">
	.shopHomeList{
		background: #f1f1f1;
	}
		.head {
			background: #fff;
			width: 100%;
			overflow-x: auto;
			height: 90rpx;
			border-bottom: 1rpx solid #CBCBCB;
		}
		
		.headers {
			height: 100%;
			display: flex;
			.f2 {
				font-size: 26rpx;
				width: 150rpx;
				text-align: center;
				line-height: 90rpx;
				box-sizing: border-box;
				padding:0 20rpx;
				display:inline;
			}
			.avtive {
				color: #d02629;
			}
		}
		.content {
			background-color: #fff;
			display: flex;
			border-bottom: 1rpx solid #CBCBCB;
			.contentli {
				display: flex;
				height: 50rpx;
				margin: 20rpx 0;
				justify-content: center;
				align-items: center;
				flex: 1;
				border-right: 1rpx solid #CBCBCB;
				&:last-child {
					border: 0
				}
			}
			.active {
				color: #d02629;
			}
		}
		.list-shop{
			background-color: #f1f1f1;
		    .li{
		        background-color: #fff;
		        margin-top:20rpx;
		        padding:0 25rpx 35rpx;
		        .header{
		            display: flex;
		            justify-content: space-between;
		            align-items: center;
		            image{
		                width: 80rpx;
		                height: 70rpx;
		                margin-right:30rpx;
		            }
		            .title{
		                height: 130rpx;
		                display: flex;
		                justify-content: flex-start;
		                align-items: center;
		                .h4{
		                    font-size: 30rpx;
		                    .shop-gradename{
		                        font-size: 23rpx;
		                        background: #de2d35;
		                        color: white;
		                        border-radius: 5rpx;
		                        padding: 5rpx 10rpx;
		                        text-align: center;
		                    }
		                }
		                .goods-num{
		                    margin-top: 10rpx;
		                }
		                .h6{
		                    font-size: 26rpx;  
		                }
		            }
		            .initShop{
		                width: 100rpx;
		                height: 48rpx;
		                border-radius: 48rpx;
		                border:2rpx solid #d02629;
		                color: #d02629;
		                 display: flex;
		                justify-content: center;
		                align-items: center;
		            }
		        }
		        .con{
		            display: flex;
		                justify-content: flex-start;
		                align-items: center;
		            .con-div{
		                margin:0 5rpx;
		                margin-top:10rpx;
		                position: relative;
		                width: 225rpx;
		                 image{
		                     width: 100%;
							 height:225rpx;		                    
		                }
		                .con-pri{
		                    display: flex;
		                    justify-content:flex-end;
		                    align-items: center;
		                    margin:0;
		                    position: absolute;
		                    width: 100%;
		                    height: 40rpx;
		                    bottom: 0;
		                    padding:0 15rpx;
		                    box-sizing: border-box;
		                    background-color: rgba(0, 0, 0, .7);
		                    font-size: 24rpx;
		                    color: #fff;
		                }
		            }
		           
		        }
		    }
		}
</style>
