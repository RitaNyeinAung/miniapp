<template>
	<view class="description">
		<view class="content" v-if="btmIndex ==0">
			<view :class="{active: sortHead == index}" v-for="(item, index) in sortData" :key="index" @click = "proSort(index)" class="li">{{item}}</view>
		</view>
		<view v-if="btmIndex ==0">
			<view class="Process" v-if="sortHead ==0">
				<view v-html="htmll"></view>
			</view>
			<view v-if="sortHead ==1" class="standard">
				<view v-html="enterHtml"></view>
			</view>
			<view v-if="sortHead ==2" class="detail">
				<view v-html="copHtml"></view>
			</view>
		</view>
		<view class="content" v-if="btmIndex ==1">
			<view :class="{active: progressHead == index}" v-for="(item, index) in progressNav" :key="index" @click="cut(index)" class="li">{{item}}</view>
		</view>
		<view  v-if="btmIndex ==1">
			<view class="per-center"  v-if="personalData && show">
				<view class="liData">
					<text class="span"> 店铺名称:</text>
					<text class="yspan">{{personalData.store_name}}</text>
				</view>
				<view class="liData">
					<text class="span"> 姓名:</text>
					<text class="yspan">{{personalData.person_name}}</text>
				</view>
				<view class="liData">
					<text class="span"> 联系人手机:</text>
					<text class="yspan">{{personalData.mobile}}</text>
				</view>
				<view class="liData">
					<text class="span"> 申请时间:</text>
					<text class="yspan">{{personalData.create_time}}</text>
				</view>
				<view class="liData">
					<text class="span"> 更新时间:</text>
					<text class="yspan">{{personalData.update_time}}</text>
				</view>
				<view class="liData">
					<text class="span"> 身份证号码:</text>
					<text class="yspan">{{personalData.id_card}}</text>
				</view>
				<view class="id-img">
					<span class="spann"> 身份证正面:</span>
					<image :src="config.image_url + personalData.idcard_positive" alt=""></image>
				</view>
				<view class="id-img">
					<span class="spann"> 身份证反面:</span>
					<image :src="config.image_url + personalData.other_side" alt=""></image>
				</view>
				<view class="liData1">
					<text class="span"> 申请状态:</text>
					<text class="yspan">{{applyList[personalData.status]}}</text>
					<view class="divfr" v-if="personalData.status == 2">
						<view class="payment-btn fr" @click="payment(1)">支付</view>
					</view>
				</view>
			</view>
		</view>
		<view  v-if="btmIndex ==1">
			<view class="per-center"  v-if="enterpriseData && !show">
				<view class="liData">
					<text class="span"> 店铺名称:</text>
					<text class="yspan">{{enterpriseData.store_name}}</text>
				</view>
				<view class="liData">
					<text class="span"> 公司名称:</text>
					<text class="yspan">{{enterpriseData.company_name}}</text>
				</view>
				<view class="liData">
					<text class="span"> 公司电话:</text>
					<text class="yspan">{{enterpriseData.company_mobile}}</text>
				</view>
				<view class="liData">
					<text class="span"> 联系人手机:</text>
					<text class="yspan">{{enterpriseData.mobile}}</text>
				</view>
				<view class="liData">
					<text class="span"> 注册资金:</text>
					<text class="yspan">{{enterpriseData.registered_capital}}</text>
				</view>
				<view class="liData">
					<text class="span"> 营业执照号:</text>
					<text class="yspan">{{enterpriseData.license_number}}</text>
				</view>
				<view class="liData">
					<text class="span manner"> 营业执照有效期开始时间:</text>
					<text class="yspan">{{enterpriseData.validity_start | temp2time}}</text>
				</view>
				<view class="liData">
					<text class="span manner"> 营业执照有效期结束时间:</text>
					<text class="yspan">{{enterpriseData.validity_end | temp2time}}</text>
				</view>
				<view class="liData">
					<text class="span manner"> 法定经营范围:</text>
					<text class="yspan">{{enterpriseData.scope_of_operation}}</text>
				</view>
				<view class="liData">
					<text class="span manner"> 组织机构代码:</text>
					<text class="yspan">{{enterpriseData.organization_code}}</text>
				</view>
				<view class="liData">
					<text class="span"> 申请时间:</text>
					<text class="yspan">{{enterpriseData.create_time}}</text>
				</view>
				<view class="liData">
					<text class="span"> 更新时间:</text>
					<text class="yspan">{{enterpriseData.update_time}}</text>
				</view>
				<view class="id-img">
					<span class="spann"> 组织机构代码证明电子版:</span>
					<image :src="config.image_url + enterpriseData.organization_electronic" alt=""></image>
				</view>
				<view class="id-img">
					<span class="spann"> 一般纳税人证明:</span>
					<image :src="config.image_url + enterpriseData.taxpayer_certificate" alt=""></image>
				</view>
				<view class="liData1">
					<text class="span"> 申请状态:</text>
					<text class="yspan">{{applyList[enterpriseData.status]}}</text>
					<view class="divfr" v-if="enterpriseData.status == 2">
						<view class="payment-btn fr" @click="payment(2)">支付</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btm">
			<view class="btn-foot">
				<view @click="btmIndex =0" class="foot">
					<image :src="notesImg" alt=""></image>
					<text class="span">入驻须知</text>
				</view>
				<view @click="btmIndex =1" class="foot">
					<image :src="ViewImg" alt=""></image>
					<text class="span">进度查看</text>
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
				sortData: ['入驻流程', '入驻标准', '合作细则'],
				sortHead:0,
				htmll:'',
				copHtml:'',
				enterHtml:'',
				progressNav:['个人入驻进度','企业入驻进度'],
				progressHead:0,
				personalData:'',
				enterpriseData:'',
				notesImg: require("@/static/images/common/lc.png"),
				ViewImg: require("@/static/images/common/View_off.png"),
				Notes: [require("@/static/images/common/Notes_off.png"), require("@/static/images/common/lc.png")],
				View: [require("@/static/images/common/View_off.png"), require("@/static/images/common/jd.png")],
				btmIndex:0,
				show:true,
				applyList:['已提交申请','缴费完成','审核成功','审核失败','缴费审核失败','审核通过开店'],
			}
		},
		watch: {
			btmIndex() {
				if(this.btmIndex == 0) {
					this.notesImg = this.Notes[1];
					this.ViewImg = this.View[0]
				} else {
					this.getPersonalProgress();
					this.notesImg = this.Notes[0];
					this.ViewImg = this.View[1];
					
				}
			}
		},
		filters:{
			temp2time:function(value){
				if (!value) {
					return "";
				}
				var time = new Date(Number(value) * 1000);
				var Y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var H = time.getHours();
				var mi = time.getMinutes();
				var s = time.getSeconds();
				if (m < 10) {
					m = '0' + m;
				}
				if (d < 10) {
					d = '0' + d;
				}
				if (H < 10) {
					H = "0" + H;
				}
				if (mi < 10) {
					mi = '0' + mi;
				}
				if (s < 10) {
					s = "0" + s;
				}
				return (Y + "-" + m + "-" + d + " " + H + ":" + mi + ":" + s);
			}
		},
		methods:{
			proSort(index){
				this.sortHead = index;
				if(index == 0) {
					this.standAjax();
				} else if(index == 1) {
					this.enterAjax();
				} else if(index == 2) {
					this.copAjax();
				}
			},
			cut(index){
				this.progressHead = index;
				if(index === 0){
					this.show = true;
					this.getPersonalProgress();
				}else{
					this.show = false;
					this.getEnterpriseProgress();
				}
				if(index == this.progressHead) return;
			},
			standAjax(){
				let url = api.enterFlow+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.htmll = res.data.data.info;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			enterAjax(){
				let url = api.standardOfInvestment+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.enterHtml = res.data.data.info;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			copAjax(){
				let url = api.rulesOfCooperation+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.copHtml = res.data.data.info;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getPersonalProgress(){
				let url = api.PersonStoreAduitProgress+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.personalData = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getEnterpriseProgress(){
				let url = api.CompanyStoreAduitProgress+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.enterpriseData = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
		},
		mounted() {
			this.standAjax();
		}
	}
</script>

<style lang="scss">
	.content{
	    background-color: #fff;
	    display: flex;
	    border-bottom: 1rpx solid #CBCBCB;
	    .li{
	        display: flex;
	        height: 50rpx;
	        margin: 20rpx 0;
	        justify-content: center;
	        align-items: center;
	        flex:1;
	        border-right: 1rpx solid #CBCBCB;
	        &:last-child{
	            border:0
	        }
	        
	    }
	    .active{
	        color: #d02629;
	    }
	}
	.Process{
		background-color: #fff;
		padding: 30rpx 25rpx;
	}
	.standard {
		background-color: #fff;
		padding: 30rpx 25rpx;
		h2 {
			font-size: 28rpx;
			border-left: 10rpx solid #D29D29;
			padding-left: 10rpx;
			margin-bottom: 20rpx;
		}
		td {
			border-color: #939393;
			font-size: 24rpx;
			padding: 20rpx;
			min-height: 65rpx;
			&:first-child {
				width: 240rpx;
			}
		}
		th {
			height: 65rpx;
			border-color: #939393;
			font-size: 28rpx;
			font-weight: normal;
			color: #939393
		}
		p {
			font-size: 24rpx;
			padding: 30rpx 0;
			line-height: 150%;
			span {
				font-size: 24rpx;
				color: #0990D2;
			}
		}
	}
	.detail {
		background-color: #fff;
		padding: 0 25rpx 30rpx;
		overflow: hidden;
		h2 {
			border-left: 10rpx solid #D29D29;
			padding-left: 10rpx;
			margin: 30rpx 0;
			font-size: 28rpx;
		}
		p {
			font-size: 28rpx;
			line-height: 120%;
			color: rgb(82, 82, 82);
		}
	}
	.btm {
		background-color: #fff;
		position: fixed;
		width: 100%;
		height: 105rpx;
		border-top: 1rpx solid #ccc;
		bottom: 0;
		.btn-foot {
			display: flex;
			height: 100%;
			.foot {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.span {
					margin-top: 1rpx;
					font-size: 22rpx;
				}
				image {
					width: 45rpx;
					height: 45rpx;
				}
			}
		}
	}
	.per-center {
		padding-bottom: 100rpx;
		.liData {
			background-color: #fff;
			border-bottom: 2rpx solid #F1F1F1;
			height: 90rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			.yspan{
				color: #555;
				font-size:25rpx;
			}
			.span {
				width: 220rpx;
				font-size: 32rpx;
			}
			.manner{
				width:250rpx;
			}
			.divfr{
				padding-left:200rpx;
				.payment-btn{
					height: 60rpx;
					padding: 0 30rpx;
					border: 0;
					color: #fff;
					border-radius: 8rpx;
					background-color: #26a2ff;
					line-height: 60rpx;
				}
			}
		}
		.liData1 {
			background-color: #fff;
			height: 90rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			.yspan{
				color: #555;
				font-size:25rpx;
			}
			.span {
				width: 220rpx;
				font-size: 32rpx;
			}
			.manner{
				width:250rpx;
			}
			.divfr{
				padding-left:200rpx;
				.payment-btn{
					height: 60rpx;
					padding: 0 30rpx;
					border: 0;
					color: #fff;
					border-radius: 8rpx;
					background-color: #26a2ff;
					line-height: 60rpx;
				}
			}
		}
		.id-img{
			height: 170rpx;
			border-bottom: 2rpx solid #F1F1F1;
			display: flex;
			background-color: #fff;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			.spann{
				width: 220rpx;
				font-size: 32rpx;
			}
			image{
				width: 280rpx;
				height: 160rpx;
			}
		}
	}
</style>
