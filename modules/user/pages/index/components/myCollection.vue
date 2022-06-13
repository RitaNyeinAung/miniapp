<template>
	<view>
		<view class="tab-hd">
			<view class="fl" :class="{active:status == 0}" @click="activeCli(0)"><text class="htxt">我的收藏</text></view>
			<view class="fl" :class="{active:status == 1}" @click="activeCli(1)"><text class="htxt">关注店铺</text></view>
		</view>
		<view class="dl">
			<view class="dd" v-if="goods">
				<view class="time">最近1个月收藏</view>
				<view class="item-wrap" v-for="(item,index) in Colldata" @click="enterDetail(item.goods_id)" :key="index">
					<image :src="config.image_url + item.pic_url"></image>
					<view class="item">
						<view class="text">{{item.title}}c</view>
						<view class="Price">￥
							<text class="pri-member">{{item.price_member}}c</text>
							<!-- <text class="btn" @click="cancel(item,index)">取消收藏</text> -->
						</view>
					</view>
				</view>
			</view>
			<view class="dd" v-if="shop">
				<view class="time">最近1个月收藏</view>
				<view class="item-wrap" v-for="(item,index) in shopData" :key="index">
					<image :src="config.image_url + item.store_logo" @click="collectEnterProduct(index,item)"></image>
					<view class="item">
						<view class="text">{{item.shop_name}}</view>
						<view class="Price">
							<!-- <text class="btn" @click="del(item,index)">取消关注</text> -->
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
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
				Colldata: [],
				page: 1,
				loadingType: 'more',
				status: uni.getStorageSync("routeIndex"),
				goods: true,
				shop: false,
				shopData: [],
			}
		},
		components:{
			uniLoadMore,
		},
		onLoad(options){
			this.cateId = options.index;
			uni.setStorageSync('routeIndex',options.index);
		},
		onReachBottom(){
			this.getList();
		},
		methods:{
			async getList(type='add', loading){
				if(type === 'add'){
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}

				let url = api.myCollection+
					'?page='+this.page+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.status == 1){
							for (let index = 0; index < res.data.data.goods.length; index++) {
								_this.Colldata.push(res.data.data.goods[index]);
							}
							if(res.data.data.goods){
								this.page++;
								this.loadingType = "more"	
							}
							else{
								this.loadingType = "nomore"
							}
						}
						else if(res.data.status == 0){
							this.loadingType = "nomore"
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
				
			},
			shoplist(){
				let url = api.collectShops+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.data){
							for (let index = 0; index < res.data.data.goods.length; index++) {
								_this.shopData.push(res.data.data.goods[index]);
							}
							this.loadingType = "nomore"
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			activeCli(index) {
				this.status = index;
				if(index == 0) {
					this.data = [];
					this.goods = true;
					this.shop = false;
					this.getList();
				} else {
					this.shopData = [];
					this.shop = true;
					this.goods = false;
					this.shoplist();
				}
			},
      enterDetail(item){
        //测试数据没有写id，用title代替
        let id = item;
        uni.navigateTo({
          url: `/modules/common/pages/productDetail/index?id=${id}`
        })
      },
      collectEnterProduct(index,item){
        //测试数据没有写id，用title代替
        let id = item.store_id;
        uni.navigateTo({
          url: `/modules/common/pages/shopCon/shopHome?id=${id}&index=0`
        })
      },
		},
		mounted() {
			if(uni.getStorageSync("routeIndex") == 0){
				this.status = 0;
				this.data = [];
				this.goods = true;
				this.shop = false;
				this.getList();
			}
			else{
				this.status = 1;
				this.shopData = [];
				this.shop = true;
				this.goods = false;
				this.shoplist();
			}
		},

	}
</script>

<style lang="scss">
	.tab-hd {
		height: 90rpx;
		line-height: 90rpx;
		background: #fff;
		display: flex;
		text-align: center;
		.fl {
			width: 50%;
			.htxt {
				display: inline-block;
				width: 250rpx;
				height: 100%;
				font-size: 28rpx;
				color: #666;
				text-align: center;
			}
		}
		.fl.active {
			.htxt {
				color: #d02629;
				border-bottom: 4rpx solid #d02629;
				box-sizing: border-box;
				text-align: center;
			}
		}
	}
	.dl{
		.dd{
			width: 100%;
			box-sizing: border-box;
			background:#fff;
			overflow:hidden;
			position:relative;
			.time{
				text-indent: 20rpx;
				height: 90rpx;
				line-height: 90rpx;
				font-size: 25rpx;
				background: rgb(241,241,241);
			}
			.item-wrap{
				border-bottom:18rpx solid #f1f1f1;
				padding:20rpx;
				width: 100%;
			}
			.item-wrap.active{
				transform:translate(50rpx);
			}
			image{
				width: 150rpx;
				height: 150rpx;
			}
			.item{
				padding-left:25rpx;
				width: 560rpx;
				float: right;
				.text{
					font-size:26rpx;
					color:#333;
					line-height: 40rpx;
					height: 80rpx;
				}
				.Price{
					font-size:28rpx;
					color:#f23030;
					padding-top:35rpx;
					.pri-member{
						font-size:32rpx;
					}
					.btn{
						font-size:32rpx;
						float: right;
					}
				}
			}
		}
	}
</style>
