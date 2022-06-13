<template>
	<view>
		<view class="report">
			<view class="report_box">
				<view class="box">
					<view class="li">1. 请提供充分的证据确保举报成功,珍惜会员权利,帮助更好管理会员网站</view>
					<view class="li">2. 被举报商品信息不能反复提交,下架商品不能举报,商家继续上传违规商品可进行举报</view>
					<view class="li">3. 举报进针对商品本身,若产生纠纷可进行投诉</view>
					<view class="li">4. 举报按顺序进行,上传图片包括三张</view>
				</view>
			</view>
			<view class="header">举报商品</view>
		</view>
		<view class="table" v-if="showListData">
			<view class="table-h">
				<view class="table-header1">相关产品</view>
				<view class="table-header2">原因</view>
				<view class="table-header3">举报时间</view>
				<view class="table-header4">状态</view>
				<view class="table-header5">操作</view>
			</view>
			<view class="table-b" v-for="(item,index) in tableData" :key="index">
				<view class="table-b1">{{item.title}}</view>
				<view class="table-b2">{{item.content}}</view>
				<view class="table-b3">{{item.create_time}}</view>
				<view class="table-b4">
					<span v-if="item.status==0">待审核</span>
					<span v-else>处理成功</span>
				</view>
				<view class="table-b5">
					<view class="can" @click="handleCheck(index,item)">查看</view>
					<view class="con" @click="handleCancel(index,item)">取消</view>
				</view>
			</view>
		</view>
		<view v-if="showSingalData">
			<view class="shop">
				<view class="p">被举报商家</view>
				<text @click="goShopHome" class="span">{{ singalData.shop_name }}</text>
			</view>
			<view class="detail-box">
				<view class="detail">
					<view class="top">
						<text>相关商品:</text>
						<text @click="goGoodsHome">{{ singalData.title }}</text>
					</view>
				</view>
				<view class="type">
					<text>举报类型: </text>
					<view class="show-detail">
						{{ singalData.type }}
					</view>
				</view>
				<view class="select-option">
					<text>举报主题: </text>
					<view class="show-select">
						{{ singalData.topic }}
					</view>
				</view>
				<view class="content">
					<text>举报内容: </text>
					<view class="show-text">
						{{ singalData.content }}
					</view>
				</view>
				<view id="showPic">图片:</view>
				<view class="pic">
					<image :src="config.image_url + singalData.pic_url" alt="" /></image>
				</view>
				<view class="notice">
					<view class="btn" @click="handleSingalCancel">返回列表</view>
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
				tableData:[],
				total:0,
				currentPage:1,
				singalData:'',
				showSingalData: false,
				showListData:true,
			}
		},
		methods:{
			getTableData(){
				let url = api.noticeList+
					'?page='+this.currentPage+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
                    _this.total = Number(res.data.data.count);
                    _this.tableData = res.data.data.list;	
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			handleCheck(index,item){
				this.showListData = false;
				this.showSingalData = true;
				this.getSingleData(item.id);
			},
			handleSingalCancel() {
				this.showListData = true;
				this.showSingalData = false;
			},
			getSingleData(id){
				let url = api.noticeCheckSingle+
					'?id='+id;
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					_this.singalData = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			handleCancel(index,item){
				let url = api.cancelNotice+
					'?id='+item.id;
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					},
					fail: (res)=>{
						console.log(res);
					}
				})
				this.getTableData();
			},
		},
		mounted() {
			this.getTableData();
		}
	}
</script>

<style lang="scss">
	.shop {
		margin: 20rpx;
		background: #f6f6f6;
		padding: 40rpx;

		.p {
			display: inline-block;
		}

		.span {
			margin-left: 60rpx;
			cursor: pointer;

			&:hover {
				color: rgb(134, 163, 226);
			}
		}
	}
	.detail-box{
		margin: 20rpx 20rpx 0 20rpx;
		background: #f6f6f6;
		padding: 40rpx 40rpx 5rpx 40rpx;
	}
	.type {
		margin: 56rpx 0;

		.show-detail {
			display: inline-block;
		}

		.container-radio {
			margin-left: 130rpx;
			line-height: 96rpx;
			margin-top: -66rpx;
		}
	}

	.select-option {

		.show-select {
			display: inline-block;
		}
	}

	.content {
		margin: 52rpx 0;

		.show-text {
			display: inline-block;
		}
	}
	.pic {
		margin: 50rpx 0;
		image {
			width: 400rpx;
			height: 200rpx;
			margin: 20rpx 0;
			border: 2rpx solid #000;	
		}
	}

	.notice {
		margin: 50rpx 0;

		.btn {
			background: red;
			width: 200rpx;
			margin: 20rpx auto;
			text-align: center;
			border-radius: 10rpx;
			height: 72rpx;
			line-height: 72rpx;
			color: #fff;
			font-weight: bold;
			cursor: pointer;
		}
	}
	.table{
		border: 2rpx solid #f1f1f1;	
		margin:20rpx;
	}
	.table-h{		
		display:flex;
		.table-header1{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
		.table-header2{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
		.table-header3{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
		.table-header4{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
		.table-header5{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
	}
	.table-b{
		display:flex;
		.table-b1{
			border-top: 2rpx solid #f1f1f1;
			border-right: 2rpx solid #f1f1f1;
			border-left: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			height: 100rpx;
		}
		.table-b2{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
			overflow: hidden;
		}
		.table-b3{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
		.table-b4{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
		}
		.table-b5{
			border: 2rpx solid #f1f1f1;
			width:200rpx;
			text-align:center;
			padding:20rpx 0;
			.can{
				border:2rpx solid #f1f1f1;
				width:100rpx;
				text-align:center;
				margin:0 0 10rpx 20rpx;
				padding:8rpx 0;
				border-radius: 10rpx;

			}
			.con{
				border: 2rpx solid #f56c6c;
				background-color: #f56c6c;
				color: #f1f1f1;
				width:100rpx;
				text-align:center;
				margin:0 0 10rpx 20rpx;
				padding:8rpx 0;
				border-radius: 10rpx;
			}
		}
	}
	.report {
		padding: 20rpx;
		border-top: 2rpx solid #f1f1f1;
	}
    .report_box {
        height: 350rpx;
        background: #eff8ff;
        border: 2rpx solid #e7e7e7;
        // margin-top: 30rpx;
        .box {
            padding: 30rpx;
            .li {
                font-size: 28rpx;
                color: #333333;
                letter-spacing: 1rpx;
                line-height: 40rpx;
                padding-bottom: 15rpx;
            }
        }
    }
	.header{
		color: #333333;
		padding: 20rpx;
		font-size: 32rpx;
		border-bottom: 2rpx solid #e7e7e7;
		text-align: center;
	}
</style>
