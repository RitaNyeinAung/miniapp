<template>
	<view class="all-hi">
		<view class="puzzle_order">
			<view class="topnav">
				<view class="ul">
					<view :class="{'liactive':indexColor==index}" v-for="(item,index) in navlist" :key="index" @click="nav(index)" class="li">{{item}}</view>
				</view>
			</view>
			<view v-if="errorState == 0" class="errorcss">
				暂无数据
			</view>
			<view v-if="errorState == 1" v-for="(item, index) in orderList" @click="goDetail(item)" :key="index">
				<view class="top">
					<view class="title">{{item.shop_name}}</view>
					<view class="status" v-if="item.status==0">待付款</view>
					<view class="status" v-else-if="item.status==1">待分享</view>
					<view class="status" v-else-if="item.status==3">待收货</view>
					<view class="status" v-else-if="item.status==4">已完成</view>
					<view class="status" v-else-if="item.status==2">拼团成功</view>
					<view class="status" v-else-if="item.comment-status==1">已评价</view>
					<view class="status" v-else>拼团未成功</view>
				</view>
				<view class="cell">
					<view class="l">
            <image class="fl" v-if="item.goods.pic_url" :src="config.image_url+item.goods.pic_url"></image>
            <image class="fl" v-else src="@/static/images/common/img_bad.jpeg"></image>
					</view>
					<view class="r">
						<view class="r_1">
							<view class="title">{{item.goods.title}}}</view>
							<view class="num">×{{item.goods.goods_num}}</view>
						</view>
						<view class="r_3">
							<view class="target">
								目标人数
								<text class="r_3-num">{{item.sheets_num}}</text>人
							</view>
							<view class="peo">
								已拼单人数
								<text class="peo-peo">{{item.surplus}}</text>人
							</view>
						</view>
						<view class="r_4">
							剩余时间：
							<text class="r_4-time">{{timerHour}}</text>天
							<text class="r_4-time">{{timerMinute}}</text>时
							<text class=" class="r_4-time"">{{timerSecond}}</text>分
						</view>
						<view class="r_5">￥{{item.goods.goods_price}}</view>
					</view>
				</view>
				<view class="footer">
					<view class="f_l">
						共
						<text class="pan1">{{item.goods.goods_num}}</text>件商品
					</view>
					<view class="f_r">
						合计：￥
						<text class="pan2">{{parseInt((item.goods.goods_price)*(item.goods.goods_num))}}</text>
					</view>
				</view>
			</view>
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
				indexColor: 0,
				navlist: ["全部", "待付款", "待分享", "待收货", "已完成", "已评价", "已取消"],
				orderList: [],
				type: "", 
				status: 0,
				number: 1,
				timerHour: 0,
				timerMinute: 0,
				timerSecond: 0,
				errorState: ''
			}
		},
		methods:{
			nav(index) {
				this.indexColor = index;
				switch (index) {
					case 0:
						this.type = ""; //全部
						this.getmessage(this.type)
						break;
					case 1:
						this.type = "1"; //待付款
						this.getmessage(this.type)
						break;
					case 2:
						this.type = "0"; //待分享
						this.getmessage(this.type)
						break;
					case 3:
						this.type = "4"; //待收货
						this.getmessage(this.type)
						break;
					case 4:
						this.type = "3"; //已完成
						this.getmessage(this.type)
						break;
					case 5:
						this.type = "5"; //已平价
						this.getmessage(this.type)
						break;
					case 6:
						this.type = "6"; //已取消
						this.getmessage(this.type)
						break;
				}
			},
			goDetail(item) {
				uni.navigateTo({
					url: '/modules/order/pages/puzzle/puzzleOrderDetail?id='+item.id,
					fail(e) {
						console.log(e)
					}
				})
			},
			getmessage(type){
				let url = api.getOrderGroup+
					'?type='+type+
					'&token='+uni.getStorageSync('token');
					uni.showLoading({
						title:"获取数据中"
					})
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.errorState = res.data.status;
						if(res.data.data && res.data.data.data.length > 0) {
							_this.orderList = res.data.data.data;
							var timestamp = res.data.data.data[0].end_time;
							_this.computationTime(timestamp);
							}
						uni.hideLoading();
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			computationTime(timestamp) {
				let that = this;
				function component(x, v) {
					return Math.floor(x / v);
				}				
				this.timer = setInterval(function() {	
					timestamp--;
					var days    = component(timestamp, 24 * 60 * 60),
					hour   = component(timestamp,      60 * 60) % 24,
					min = component(timestamp,           60) % 60,
					sec = component(timestamp,            1) % 60;
					
					hour = hour < 10 ? "0" + hour : hour;
					min = min < 10 ? "0" + min : min;
					sec = sec < 10 ? "0" + sec : sec;
					that.timerHour = `${hour}`;
					that.timerMinute = `${min}`;
					that.timerSecond = `${sec}`;
				}, 1000);
			}
		},
		mounted() {
			this.getmessage();
		}	
	}
</script>

<style lang="scss">
	.all-hi{
		height: 100%;
		background-color: #f1f1f1;
		width: 100%;
	}
	.puzzle_order{
		background-color: #f1f1f1;
		.topnav {
		    border-top: 1rpx solid #dfe3e4;
		    width: 100%;
		    background: white;
		    .ul {
		        width: 95%;
		        margin: auto;
		        display: flex;
		        height: 100rpx;
		        flex-direction: row;
		        justify-content: space-between;
		        .li {
		            height: 100rpx;
		            line-height: 100rpx;
		            font-size: 26rpx;
		            color: #3c3c3c;
		        }
		        .liactive {
		            font-size: 28rpx;
		            color: #66b1ff;
		        }
		    }
		}
		.errorcss {
			text-align: center;
			margin-top: 50%;
			font-size: 50rpx;
		}
		.top {
			background: #fff;
			height: 100rpx;
			margin-top: 10rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx;
			position: relative;
			.title {
				font-size: 30rpx;
			}
			.status {
				font-size: 30rpx;
				color: #ff9536;
			}
		}
		.cell {
			display: flex;
			padding: 20rpx;
			.l {
				image {
					height: 200rpx;
					width: 200rpx;
				}
			}
	
			.r {
				padding: 0 20rpx 0 30rpx;
				.r_1 {
					display: flex;
	
					.title {
						font-size: 25rpx;
					}
					.num {
						font-size: 25rpx;
						position: absolute;
						right: 20rpx;
					}
				}
				.r_2 {
					color: #a9a6a6;
					font-size: 25rpx;
				}
				.r_3 {
					font-size: 25rpx;
					.target {
						color: #a9a6a6;
						font-size: 25rpx;
						.r_3-num {
							color: #ff9536;
							font-size: 25rpx;
						}
					}
					.peo {
						color: #a9a6a6;
						font-size: 25rpx;
						.peo-peo {
							color: #ff9536;
							font-size: 25rpx;
						}
					}
				}
				.r_4 {
					color: #a9a6a6;
					font-size: 25rpx;
					.r_4-time {
						color: #ff9536;
						font-size: 25rpx;
					}
				}
				.r_5 {
					font-size: 20rpx;
				}
			}
		}
		.footer {
			display: flex;
			justify-content: flex-end;
			padding: 20rpx;
			background: #fff;
			.f_l {
				font-size: 30rpx;
				.pan1 {
					font-size: 30rpx;
				}
			}
			.f_r {
				font-size: 30rpx;
				.pan2 {
					font-size: 30rpx;
				}
			}
		}
	}
</style>
