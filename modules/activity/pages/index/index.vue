<template>
	<view class="activity">
		<view class="header">
			<image src="@/static/images/common/background.png"></image>
		</view>
		<view v-if="products.length>0">
			<view class="products" v-for="product in products">
				<view class="product" @click="toDetail(product)">
					<view class="left">
						<image :src="config.image_url+product.pic_url"></image>
					</view>
					<view class="right">
						<view class="title">{{product.title|cut}}</view>
						<view class="price">￥ {{product.activity_price}}</view>
						<view class="bar">
							<view class="bar-container" >
								<view class="inner-bar" :style="{width:(product.buy_num/product.activity_num)*100+'%'}"></view>
							</view>
							<view class="percent">{{(product.buy_num/product.activity_num)*100}}%</view>
						</view>
						<view class="btn">
							<view class="count">
								{{product.buy_num}} 人以参团
							</view>
							<view class="b buy" v-if="product.status==0">
								去拼团
							</view>
							<view class="b bought" v-else>
								拼团中
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="empty" v-else>
			暂无拼团商品
		</view>
	</view>
</template>

<script>
	import api from '@/api.js'
	import config from '@/config.js'
	export default{
		data(){
			return {
				products:[],
				config
			}
		},
		mounted() {
			uni.showLoading({
				title:"加载中"
			})
			let _this = this;
			uni.request({
				url:api.getGroupProduct,
				success(result){
					if(result.data.data){
						_this.products = result.data.data.data
						console.log(_this.products)
					}
				
					uni.hideLoading()
				},
				fail(e) {
					uni.hideLoading()
					console.log(e);
				}
			})
			
		},
		methods:{
			toDetail(product){
				uni.navigateTo({
					url:"/modules/activity/pages/productDetail/index?id="+product.id+"&goodId="+product.goods_id
				})
			},
			
		},
		filters:{
			cut(value){
				if(!value) return;
 				console.log(value)
				return value.length>18?value.slice(0,18)+" ...":value;
			},
			cutShort(value){
				return value.length>11?value.slice(0,11)+" ...":value;
			},
			cutShorter(value){
				return value.length>7?value.slice(0,7)+" ...":value;
			}
			
		},
	}
</script>

<style lang="scss">
	.activity{
		background-color: $light-grey;
		.header{
			background:white;
			padding:20rpx;
			border-radius:5px;
			height:150px;
			image{
				background-color: $light-grey;
				width:100%;
				height:100%;
				border-radius: 5px;
			}
			
		}
		.products{
			padding: 20rpx;
			.product{
				border-radius: 10px;
				background-color: white;
				display: flex;
				height: 100px;
				padding:10px;
				.left{
					width:100px;
					height: 100px;
					
					image{
						background-color: $light-grey;
						width:100%;
						height:100%;
						border-radius: 5px;
					}
				}
				.right{
					display: flex;
					align-items: flex-start;
					justify-content: space-around;
					flex-direction: column;
					width: 100%;
					padding:10px 0px 10px 10px;
					.title{
						color: $font-color-dark;
						font-size: 12px;
						
					}
					.price{
						color:$main-color;
						font-size: 14px;
						padding:5px 0px;
					}
					.bar{
						display: flex;
						justify-content: space-between;
						padding-bottom: 5px;
						align-items: center;
						width: 100%;
						.bar-container{
							border-radius: 5px;
							width:150px;
							height:8px;
							background-color: rgba($color: red, $alpha: 0.2);
							.inner-bar{
								border-radius: 5px;
								width:50px;
								height: 8px;
								background-color: red;
							}
						}
						.percent{
							color:$font-color-light;
							font-size: 10px;
						}
					}
					.btn{
						display: flex;
						justify-content: space-between;
						width:100%;
						align-items: center;
						.count{
							font-size: 10px;
							color:$font-color-light
						}
						.b{
							width:50px;
							display: flex;
							justify-content: center;
							align-items: center;
							border-radius: 50px;
							height: 28px;
							border: 2px solid white;
							cursor: pointer;
							font-size: 10px;
						}
						.buy{
							background:linear-gradient(30deg,red,pink);
							color:white;
						}
						.bought{
							background-color: white;
							border: 2px solid $light-grey;
							color:$font-color-light;
						}
					}
				}
			}
			
			
		}
		.empty{
			height:100px;
			justify-content: center;
			align-items: center;
			display: flex;
			color:$font-color-light;
			background-color: white;
		}
	}
</style>
