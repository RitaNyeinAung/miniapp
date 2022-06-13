<template>
	<view>
		<view class="tab-hd">
			<view class="fl" :class="{active:status == 0}" @click="toAjax(0)"><text class="htxt">退货</text></view>
			<view class="fl" :class="{active:status == 1}" @click="toAjax(1)"><text class="htxt">退款</text></view>
		</view>
		<view class="search-hd" v-if="status == 0">
			<u-search height="75" type="search" placeholder="商品名称 , 订单编号" class="search-fl" v-model="keyword" :show-action="false"></u-search>
			<view class="button-fl" @click="search(0)">搜索</view>
		</view>
		<view class="search-hd" v-if="status == 1">
			<u-search height="75" type="search" placeholder="商品名称 , 订单编号" class="search-fl" v-model="keyword1" :show-action="false"></u-search>
			<view class="button-fl" @click="search(sta1tus)">搜索</view>
		</view>
		<view class="list-wrap">
			<view v-for="item in repair" :key="item.id" class="li">
				<view class="hd">
					<view class="oddNumbers">
						<text class="name">服务单号：{{item.id}}</text>
					</view>
					<div class="time">申请时间：{{item.create_time}}</div>
				</view>
				<view class="dd" @click="tolink(item)">
          <image class="fl" v-if="item.pic_url" :src="config.image_url+item.pic_url"></image>
          <image class="fl" v-else src="@/static/images/common/img_bad.jpeg"></image>
					<view class="text-wrap">
						<text class="text">{{item.title}}</text>
						<view class="btn-wrap">
							<text class="num-txt">数量：{{item.number}}</text>
							<view class="button">{{statusArr[item.status]}}</view>
						</view>
					</view>
				</view>
			</view>
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
				loadingType: 'more',
				status: 0,
				keyword:'',
				keyword1:'',
				statusArr:['审核中','审核失败','审核通过','退货中','换货中','换货完成','退货完成','已撤销'],
				repair:'',
				type:1
			}
		},
		components:{
			uniLoadMore,
		},
		methods:{
			toAjax(index) {
				this.status = index;
        let _this = this;
				if(index == 0){
          _this.type = 1;
        }else{
          _this.type = 2;
        }
        uni.request({
          method: "POST",
          url: api.progressQueryList,
          data: {type:_this.type,token:uni.getStorageSync("token")},
          success: (res) => {
            if(res.data.status==1){
              _this.repair = res.data.data;
              uni.showToast({
                title:res.data.message
              })
            }else{
              uni.showToast({
                title:res.data.message
              })

            }
          },
          fail: (res)=>{
            uni.showToast({title:res.data.message})
          }
        })
			},
			search(index) {
				if(index == 0) {
					let url = api.progressQueryList+
						'?keyWord='+this.keyword+
						'&token='+uni.getStorageSync('token');
					let _this = this;
					uni.request({
						url : url,
						success: (res) => {
							_this.repair = res.data.data;
							uni.showToast({
								title:res.data.message														
							})
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				}else{
					let url = api.progressQueryList+
						'?keyWord='+this.keyword1+
						'&token='+uni.getStorageSync('token');
					let _this = this;
					uni.request({
						url : url,
						success: (res) => {
							_this.repair = res.data.data;
							uni.showToast({
								title:res.data.message														
							})
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				}
			},
			tolink(item) {
					uni.navigateTo({
						url: '/modules/user/pages/index/components/progressQueery?id='+item.id,
						fail(e) {
							console.log(e)
						}
					})
			},
		},
		mounted() {
			this.toAjax(0);
		}	
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
	.search-hd {
		padding: 20rpx;
		display: flex;
		background-color: #f1f1f1;
		.search-fl {
			width: 620rpx;
			height: 80rpx;
			border: 2rpx solid #ccc;
			border-radius: 10rpx;
			box-sizing: border-box;
			font-size: 24rpx;
			color: #333;
			background-size: 29rpx 29rpx;
			outline: none;
		}
		.button-fl {
			padding:0 0 0 20rpx;
			line-height: 80rpx;
			border: none;
			outline: none;
			background: none;
			font-size: 30rpx;
			color: #333;
		}
	}
	.list-wrap {
		background-color: #f1f1f1;
		.li {
			padding: 0 20rpx 20rpx 20rpx;
			width: 100%;
			background: #fff;
			box-sizing: border-box;
			border-bottom: 2rpx solid #dfdfdd;
			border-top: 2rpx solid #dfdfdd;
			margin-bottom: 15rpx;
			.hd {
				height: 140rpx;
				border-bottom: 2rpx solid #dfdfdd;
				box-sizing: border-box;
				.oddNumbers {
					padding-top: 44rpx;
					.name {
						font-size: 25rpx;
						color: #333;
					}
					.status {
						font-size: 30rpx;
						color: #f9781e;
					}
				}
				.time {
					font-size: 25rpx;
					color: #757575;
				}
			}
			.dd {
				padding-top: 35rpx;
				display: flex;
				image {
					width: 146rpx;
					height: 146rpx;
				}
				.text-wrap {
					padding-left: 20rpx;
					// width: 515rem;
					.text {
						font-size: 25rpx;
						color: #333;
						line-height: 38rpx;
					}
					.btn-wrap {
						padding-top: 28rpx;
						display: flex;
						.num-txt {
							font-size: 25rpx;
							color: #999;
							float: left;
							width: 370rpx;
						}
						.button {
							width: 143rpx;
							height: 53rpx;
							background: #fff;
							border-radius: 10rpx;
							border: none;
							font-size: 24rpx;
							color: #333;
							outline: none;
							border: 2rpx solid #757575;
							box-sizing: border-box;
							float: right;
						}
					}
				}
			}
		}
	}
</style>
