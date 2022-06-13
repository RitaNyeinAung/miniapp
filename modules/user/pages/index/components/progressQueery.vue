<template>
	<view>
		<view class="com-content">
			<view class="hd">
				<view class="hd-text">
					<view class="number">订单编号：{{data.order_id}}</view>
					<view class="money">退款金额：<text>{{data.price}}</text>元</view>
				</view>
				<view class="status">{{statusArr[data.status]}}</view>
			</view>
			<view class="content">
        <image v-if="data.pic_url" :src="config.image_url+data.pic_url"></image>
        <image v-else src="@/static/images/common/img_bad.jpeg"></image>
				<view class="text">
					<view class="p">{{data.title}}</view>
					<view class="number">数量：{{data.number}}</view>
				</view>
			</view>
		</view>
		<view class="blank"></view>
		<view class="describe">
			<view class="dt">问题描述</view>
			<view class="dd">{{data.explain}}</view>
		</view>
		<view class="blank"></view>
		<view class="describe">
			<view class="dt">审核留言</view>
			<view class="dd">{{data.message}}</view>
		</view>
		<view class="blank"></view>
		<view class="progress">
			<view class="h5">审核进度</view>
			<view class="examine">
				<view v-for="item in data.speed" :key="item.id" class="li">
					<text class="icon"></text>
					<em class="triangle"></em>
					<view class="time">{{item.create_time}}</view>
					<view class="text">{{item.approval_content}}</view>
					<view class="name" v-if="item.approval_name">经办：{{item.approval_name}}</view>
					<view class="name" v-if="!item.approval_name">经办：系统</view>
				</view>                
			</view>
			<view class="button">拨打售后服务</view>
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
                data:{},
                statusArr:['审核中','审核失败','审核通过','退货中','退款中','完成','已撤销'],
			}
		},
		onLoad(options){
			this.cateId = options.id;
		},
		methods:{
			progressQuery(){
				let url = api.progressQuery+
					'?id='+this.cateId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.data = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			}
		},
		mounted() {
			this.progressQuery();
		}	
	}
</script>

<style lang="scss">
	.com-content{
		padding:20rpx;
		background:#fff;
		border-top:2rpx solid #dfdfdd;
		border-bottom:2rpx solid #dfdfdd;
		.hd{
			display: flex;
			.hd-text{
				width: 550rpx;
				height: 130rpx;
				float: left;
				.number{
					font-size:25rpx;
					color:#333;
					padding-top:20rpx;
				}
				.money{
					font-size:28rpx;
					color:#757575;
					padding-top:20rpx;
					span{
						font-size:28rpx;
						color:#d0111b;
						font-weight: bold;
					}
				}
			}
			.status{
				font-size:30rpx;
				color:#d02629;
				line-height: 110rpx;
			}
		}
		.content{
			border-top:2rpx solid #dfdfdd;
			padding-top:38rpx;
			padding-bottom:20rpx;
			display: flex;
			image{
				width: 146rpx;
				height: 146rpx;
				border:2rpx solid #dfdfdd;
				box-sizing: border-box;
			}
			.text{
				width: 500rpx;
				padding-left:20rpx;
				.p{
					font-size:25rpx;
					color:#333;
					line-height: 38rpx;
					font-weight: bold;
					height: 76rpx;
				}
				.number{
					font-size:25rpx;
					color:#999;
					padding-top:20rpx;
				}
			}
		}
	}
	.blank{
		padding: 10rpx 0;
		background-color: #f1f1f1;
	}
	.describe{
		padding:0 20rpx;
		background:#fff;
		border-bottom:2rpx solid #dfdfdd;
		border-top:2rpx solid #dfdfdd;
		.dt{
			font-size:30rpx;
			color:#333;
			padding-top:48rpx;
		}
		.dd{
			font-size:25rpx;
			color:#757575;
			padding-top:20rpx;
			padding-bottom:49rpx;
		}
	}
	.progress{
		border-top:2rpx solid #dfdfdd;
		background:#fff;
		padding:0 20rpx;
		.h5{
			padding-top:40rpx;
			padding-bottom:10rpx;
			font-size:30rpx;
			color:#333;
		}
		.examine{
			border-left:2rpx solid #bbb;
			padding:20rpx 0;
			margin-left:20rpx;
			width: 700rpx;
			.li{
				position: relative;
				margin-left:38rpx;
				border:2rpx solid #d5d5d5;
				border-radius:10rpx;
				padding:20rpx;
				box-sizing: border-box;
				margin-top:20rpx;
				.icon{
					position:absolute;
					left:-56rpx;
					top:0;
					width: 33rpx;
					height: 33rpx;
					border:5rpx solid #d02629;
					box-sizing: border-box;
					border-radius:50%;
					background:#fff;
				}
				.time{
					font-size:25rpx;
					color:#d02629;
					padding-bottom:20rpx;
				}
				.text{
					font-size:25rpx;
					color:#d02629;
					padding-bottom:20rpx;
				}
				.name{
					padding:0;
					font-size:25rpx;
					color:#d02629;
					padding-bottom:20rpx;
				}
			}
		}
		.button{
			width: 100%;
			height: 90rpx;
			line-height: 90rpx;
			background:#d02629;
			border:none;
			margin-top:50rpx;
			font-size:32rpx;
			color:#fff;
			margin-bottom:20rpx;
			text-align: center;
		}
	}
</style>
