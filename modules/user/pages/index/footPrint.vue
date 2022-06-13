<template>
	<view>
		<view class="dl">
			<view v-for="item in footprint" class="dd">
				<view class="time">{{item.create_time}}</view>
				<view class="item-wrap" v-for="good in item.goods" @click="navToDetailPage(good)">
          <image v-if="good.pic_url" :src="config.image_url+good.pic_url"></image>
          <image v-else src="@/static/images/common/img_bad.jpeg"></image>
					<view class="item">
						<view class="text">{{good.title}}{{good.goods_id}}</view>
						<view class="Price">￥
							<text class="pri-member">{{good.price_member}}</text>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="loadingType"></uni-load-more>
		</view>
		<view v-if="footprint =='' " class="status text-center">您还没有浏览过任何商品，快去逛逛吧！</view>
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
				footprint: [],
				page: 1,
				loadingType: 'more',
			}
		},
		components:{
			uniLoadMore,
		},
		onReachBottom(){
			this.loadData();
		},
		methods:{
			async loadData(type='add', loading){
				if(type === 'add'){
					if(this.loadingType === 'nomore'){
						return;
					}
					this.loadingType = 'loading';
				}else{
					this.loadingType = 'more'
				}

				let url = api.myFootprint+
					'?page='+this.page+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(res.data.data.goods){
							for (let index = 0; index < res.data.data.goods.length; index++) {
								_this.footprint.push(res.data.data.goods[index]);
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
      navToDetailPage(good){
        console.log(good)
        let id = good.goods_id;
        uni.navigateTo({
          url: `/modules/common/pages/productDetail/index?id=${id}`
        })
      },
		},
		mounted() {
			this.loadData();
		}
		
	}
</script>

<style lang="scss">
	.dl{
		.dd{
			width: 100%;
			box-sizing: border-box;
			background:#fff;
			overflow:hidden;
			position:relative;
			.time{
				text-indent: 20rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 25rpx;
				background: rgb(241,241,241);
			}
			.item-wrap{
				border-bottom:2rpx solid #ccc;
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
				}
			}
		}
	}
</style>
