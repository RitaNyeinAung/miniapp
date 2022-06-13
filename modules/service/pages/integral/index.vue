<template>
	<view class="integralDiv">
		<view class="header" :show="show" @click="screen">积分筛选
		<image src="@/static/images/common/down-arrow.png"></image>
		</view>
			 <u-picker mode="selector" :default-selector="[0]" :range="columns" v-model="show" @columnchange="columnchange" @confirm="confirm">
			 </u-picker>
		<view class="list-wrap" v-if="data">
			<view class="clearfixli" v-for="item in data" :key="item.id">
        <image class="fl" v-if="item.image" :src="config.image_url+item.image" @click="tolink(item)"></image>
        <image class="fl" v-else src="@/static/images/common/img_bad.jpeg" @click="tolink(item)"></image>
				<view class="list-text fl">
					<view class="text" @click="tolink(item)">{{item.title}}</view>
					<view class="new-price" @click="tolink(item)" v-if="integral">
						<text class="span-inte">{{item.integral}}<text class="em">积分</text></text>
					</view>
					<view class="new-price" @click="tolink(item)" v-if="!integral">￥
						<text class="span-inte">{{item.price_market}}</text>
					</view>
					<view class="status" @click="tolink(item)" v-if="!integral">
						<text class="span-st">已有{{item.comment}}条评论</text>
						<text class="span-st">{{item.trade}}笔交易成功</text>
					</view>
					<view class="status" @click="tolink(item)" v-if="!integral" style="padding-top:20rpx;">
						<text class="span-st">市场参考价：{{item.price_market}}元</text>
					</view>
					<view class="show-shop">
						<view class="show-name" @click="goToShop(item.store_id)">{{item.shop_name}}</view>
						<image @click="goToShop(item.store_id)" src="@/static/images/common/btn-right.png" class="btn-shop" v-if="item.shop_name"/></image>
						<text class="shop-gradename">{{item.store_grade_name}}</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadingType"></uni-load-more>
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
				loadingType: 'more',
				data:[],
				integral:'',
				page: 1,
				intergral_lower: '',
				intergral_upper: '',
				show: false,
                columns:['1-999', '1000-1999', '2000-2999', '3000-3999', '4000-4999', '5000-5999','6000-6999','7000-7999','8000-8999','9000-9999'],
			}
		},
		components:{
			uniLoadMore,
		},

		onReachBottom(){	
			this.integralGoodsList();
		},
		onPullDownRefresh(){
			this.page = 1;//initialize page number
			this.integralGoodsList('refresh');
		},
		methods:{
			integralGoodsList(type='add', loading) {
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}
				let _this = this;
				let url = api.integralGoodsList+
					'?page='+this.page+
					'&intergral_lower='+this.intergral_lower+
					'&intergral_upper='+this.intergral_upper;
				
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.data&&res.data.data.records){
							let data = res.data.data.records;
							if(type === 'refresh'){
								uni.showToast({title:'Page refresh !'})
								this.data = [];
							}	
							this.data = this.data.concat(data);
							this.integral = true;
							if(this.page<res.data.data.totalPages){
								this.page++;
								this.loadingType = "more"
							}else{
								this.loadingType = "nomore";
							}
							
							if(type === 'refresh'){
								if(loading == 1){
									uni.hideLoading()
								}else{
									uni.stopPullDownRefresh();
								}
							}
						}
						else{
							uni.showToast({title:'Page refresh !'})
							this.data = [];
							this.loadingType = "nomore";
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			screen(){
				this.show=true;
			},
			open() {
			  // console.log('open');
			},
			close() {
			  this.show = false;
			},
			columnchange(columns) {
				this.confirm(columns);
			},
			confirm(columns){
				this.show = false;
				if(columns == 0){
					this.intergral_lower = 1;
					this.intergral_upper = 999;
				}
				else if(columns == 1){
					this.intergral_lower = 1000;
					this.intergral_upper = 1999;
				}
				else if(columns == 2){
					this.intergral_lower = 2000;
					this.intergral_upper = 2999;
				}
				else if(columns == 3){
					this.intergral_lower = 3000;
					this.intergral_upper = 3999;
				}
				else if(columns == 4){
					this.intergral_lower = 4000;
					this.intergral_upper = 4999;
				}
				else if(columns == 5){
					this.intergral_lower = 5000;
					this.intergral_upper = 5999;
				}
				else if(columns == 6){
					this.intergral_lower = 6000;
					this.intergral_upper = 6999;
				}
				else if(columns == 7){
					this.intergral_lower = 7000;
					this.intergral_upper = 7999;
				}
				else if(columns == 8){
					this.intergral_lower = 8000;
					this.intergral_upper = 8999;
				}
				else if(columns == 9){
					this.intergral_lower = 9000;
					this.intergral_upper = 9999;
				}
				this.page = 1
				this.integralGoodsList('refresh', 1);
			},
			tolink(item){
				uni.navigateTo({
					url: '/modules/service/pages/integral/integralDetail?id='+item.id+'&status='+2+'&money='+item.money,
					fail(e) {
						console.log(e)
					}
				})
			},
      goToShop(store_id){
        uni.navigateTo({
          url: `/modules/common/pages/shopCon/shopHome?id=${store_id}&index=0`
        })
      }
		},
		mounted() {
			this.integralGoodsList();
		}	
	}
</script>

<style lang="scss">
	.integralDiv{
		background-color: #f1f1f1;
		height: 100%;
	}
	.picker-toolbar{
		padding: 20rpx;
		height: 600rpx;
	}
	.cancel{
		float: left;
	}
	.confirm{
		float: right;
	}
	.header{
		padding: 30rpx 0;
		text-align: center;
		border-bottom: 2rpx solid #f1f1f1;
		border-top: 2rpx solid #f1f1f1;
		background-color: #fff;
		margin:0 15rpx;
		image{
			width:25rpx;
			height:20rpx;
			margin:0 15rpx;

		}
	}
	.fl{
		float: left;
	}
	.fr{
		float: right;
	}
	.status{
		padding-top:20rpx;
		font-size:30rpx;
		color:#333;
	}
	.list-wrap{
		background:#fff;
		margin: 13rpx 15rpx;
		.clearfixli{
			padding:13rpx;
			height:241rpx;
			border-bottom:13rpx solid #f1f1f1;
			image{
				width:220rpx;
				height:200rpx;
			}
			.list-text{
				width:430rpx;
				padding-left:25rpx;
				.text{
					font-size:32rpx;
					color:#333;
					line-height:45rpx;
					overflow:hidden; 
					text-overflow:ellipsis;
					display:-webkit-box; 
					-webkit-box-orient:vertical;
					-webkit-line-clamp:2; 
				}
				.new-price{
					font-size:32rpx;
					color:#f23030;
					padding-top:10rpx;
					.span-inte{
						font-size:40rpx;
						font-weight:bold;
						.em{
							font-style:normal;
							font-size:25rpx;
							color:#7c7c7d;
							line-height: 25rpx;
							padding: 0 0 0 10rpx;
						}
					}
				}
				.status{
					color:#ddd;
					padding-top:10rpx;
					.span-st{
						font-size:24rpx;
					}
					.span-st:nth-child(2){
						padding-left:30rpx;
					}
				}
				.show-shop{
					display: flex;
					margin: 15rpx 0 5rpx 0;
					.show-name{
						font-size: 24rpx;
						padding: 3rpx 10rpx 0 0;
						color: #999999;
					}
					.btn-shop{
						width: 18rpx;
						height: 20rpx;
						margin: 10rpx 20rpx 0 0;
					}
					.shop-gradename{
						font-size: 22rpx;
						background: #de2d35;
						color: white;
						border-radius: 5rpx;
						padding: 5rpx 10rpx;
						text-align: center;
					}
				}  
			}
		}
	}
</style>
