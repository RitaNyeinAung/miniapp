<template>
	<view class="orderDetail">
		<view class="headers">
			<view>
				<view class="p_title" >{{title}}</view>
				<view class="p_desc">{{subTitle}}</view>
			</view>
			<view>
				<image src="@/static/images/common/shadow.png"></image>
			</view>
		</view>
		<view class="address"  >
			<view class="divleft" >
				<image src="@/static/images/common/loca.png"></image>
				<view class="info">
					<view class="detail">
						<view class="name">{{orderData.realname}}</view>
						<view class="phone">{{orderData.mobile}}</view>
					</view>
					<view class="addr">{{orderData.prov_name}}-{{orderData.city_name}}-{{orderData.dist_name}}-{{orderData.address}}</view>
				</view>
			</view>
		</view>
		<view class="pin" @click="inviteFriends">
			<view class="p">
				<view class="r">{{groupStatus}}</view>
				<view class="l" v-if="isCommander == 1">
					<image :src="config.image_url+orderData.commander_header"></image>
				</view>
			</view>
			<view class="pr" v-if="isCommander == 1" >
				<text class="rjt" ></text>
			</view>
			<view class="pr" v-else >
				<text class="rjx" ></text>
			</view>

		</view>
		<view class="order">
			<view class="up">
				<image :src="config.image_url+orderData.pic_url"></image>
				<view class="l">
					<view class="p_title">{{orderData.title}}</view>
					<view class="p_desc">
					</view>
					<view class="p_price">
						<view class="p_l">￥{{orderData.price_num}}</view>
					</view>
				</view>
			</view>
			<view class="down" v-if="orderData.status == 0">
				<view class="cancel" :class="{'gopayment' :indexColor==index}" v-for="(item,index) in nav" :key="index" @click="Gocancel(index)" >{{item}}</view>
			</view>
		</view>
		<view class="pay">
			<view class="pay_full">
				实付：
				<!-- <text v-if="$route.query.TotalPrice">￥{{$route.query.TotalPrice}}</text> -->
				<text class="price_num">￥{{orderData.price_num}}</text>
			</view>
			<view class="free"></view>
		</view>
		<view v-if="orderData.pay_type == null"></view>
		<view v-else class="btn">
			<view class="sub" @click="shareOrInvitation($event)">邀请好友拼团</view>
		</view>
		<view class="footers">
			<view class="num">
				<view class="order_name">订单编号</view>
				<view class="order_no">{{orderData.order_sn_id}}</view>
				<view class="btn_copy "  @click='copyActiveCode($event,orderData.order_sn_id )'>复制</view>

			</view>
			<view class="method">
				<view class="pay_way">支付方式</view>
				<view class="wechat">{{payName}}</view>
			</view>
			<view class="parent" v-if="isCommander == 1">
				<view class="commander">开团团长</view>
				<view class="member">{{commander}}</view>
			</view>
			<view class="leage" v-if="isCommander == 1">
				<view class="my">我是</view>
				<view class="member">团员</view>
			</view>
			<view class="leage" v-if="isCommander == 0">
				<view class="my">我是</view>
				<view class="member">团长</view>
			</view>
			<view class="time">
				<view class="order_time">下单时间</view>
				<view class="date">
					{{orderData.add_time*1000| formatDate}}
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
				title: "",
				subTitle : "",
				groupStatus : "",
				commander : "",
				isCommander : "",
				payName : "",
				successInfo:'',
				orderData:'',
				orderNumber:'',
				id:'',
				nav:['取消订单','去付款'],
			}
		},
		onLoad(option){
			this.routeId = option.id;
		},
		filters: {
			formatDate: function (value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;
				return y + '/' + MM + '/' + d+'/'+h+':'+m+':'+s;
			}
		},
		methods:{
			AssembleSpellsuccess(){
				let url = api.orderGroupLeagueMember+
					'?id='+this.routeId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
               _this.successInfo = res.data.data;
               _this.payName = res.data.data.payName;
               _this.title = res.data.data.message[0];
               _this.subTitle = res.data.data.message[1];
               _this.groupStatus = res.data.data.message[2];
               _this.commander = res.data.data.commander_name;
               _this.isCommander = res.data.data.commander;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getorderGroupDetail(){
				let url = api.orderGroupDetail+
					'?id='+this.routeId+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.orderData=res.data.data;
						_this.orderNumber=res.data.data.order_sn_id;
						_this.id=res.data.data.id;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
		},
		mounted() {
			this.AssembleSpellsuccess();
			this.getorderGroupDetail();
		}	
	}
</script>

<style lang="scss">
	.orderDetail{
		background-color: #f1f1f1;
		height: 100%;
	}
	.headers {
		background: #ffa136;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 200rpx;
		.p_title {
			font-size: 30rpx;
			color: #fff;
			margin: 20rpx;
		}
		.p_desc {
			font-size: 20rpx;
			color: #fff;
			margin: 20rpx;
		}
		image {
			width: 100rpx;
			height: 100rpx;
			margin: 20rpx;
		}
	}
	.address {
		justify-content: space-between;
		align-items: center;
		display: flex;
		padding: 0 20rpx;
		background: #fff;
		padding-bottom: 30rpx;
		.divleft {
			display: flex;
			flex-direction: row;
			image {
				margin-top: 30rpx;
				height: 50rpx;
				width: 40rpx;

			}
			.info {
				margin-left: 20rpx;
				.detail {
					display: flex;
					padding: 20rpx 0;
					.name {
						font-size: 25rpx;
					}
					.phone {
						padding-left: 20rpx;
						font-size: 25rpx;
					}
					.addr {
						padding-bottom: 20rpx;
					}
				}
			}
		}

		.btn {
			font-size: 30rpx;
			border: 1rpx solid #ffa136;
			border-radius: 10rpx;
			text-align: center;
			color: #ffa136;
			line-height: 50rpx;
			height: auto;
			width: 100rpx;
			margin-top: 30rpx;
			background: #fff;
		}
	}
	.pin {

		display: flex;
		flex-direction: row;
		.p{
			width: 95%;
			display: flex;
			align-items: center;
			background: #fff;
			justify-content: space-between;
			margin-top: 20rpx;
			.l {
				display: flex;
				align-items: center;
				padding: 0 20rpx;
				image {
					padding: 10rpx 10rpx;
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}
				.name {
					padding: 0 20rpx;
					font-size: 30rpx;
				}
			}
			.r {
				padding: 0 20rpx;
				color: #ffa136;
				font-size: 30rpx;
			}
		}
		.pr{
			background: white;
			width: 50rpx;
			margin-top: 20rpx;
		   /* justify-content: center;
			align-items: center;*/
			.rjt{
				display: inline-block;
				width: 25rpx;
				height: 35rpx;
				margin-top: 27rpx;
				background: url("@/static/images/common/btn-right.png") no-repeat;
				background-size: 100% 100%;
			}
			.rjx{
				display: inline-block;
				width: 25rpx;
				height: 35rpx;
				margin-top: 27rpx;
				background-size: 100% 100%;
				height : 50rpx;
			}
		}

	}
	.order {
		.up {
			display: flex;
			align-items: center;
			padding-left: 20rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
			border-bottom: 1rpx solid #dfdfdd;
			image {
				width: 630rpx;
				height: 200rpx;
			}
			.l {

				.p_title {
					padding-left: 20rpx;
					font-size: 28rpx;
				}
				.p_desc {

					font-size: 40rpx;
					display: flex;
					padding: 30rpx 10rpx;
					color: #afafaf;

					.ys {

						padding-left: 30rpx;
					}
					.bz {
						border: 2rpx solid black;
						padding-left: 30rpx;
					}
				}
				.p_price {
					display: flex;
					justify-content: space-between;
					padding: 0 30rpx;
					.p_l {
						font-size: 33rpx;
						padding-left: 10rpx;
						position: relative;
						left: -20rpx;
						color: #ffa136;
					}
					.p_r {
						font-size: 40rpx;
					}
				}
			}
			.r {
				display: flex;
				flex-direction: column;
			}
		}
		.down {
			display: flex;
			justify-content: flex-end;
			padding: 0 20rpx;
			margin-top: 20rpx;
			.cancel {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				border: 1rpx solid #747576;
				border-radius: 10rpx;
				width: 150rpx;
				text-align: center;
				color: #454648;
				height: 60rpx;
				margin-right: 20rpx;
				margin-top: 10rpx;
			}
			.gopayment{
				background: #ffa136;
				color: white;
			}
			.check {
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				border: 1rpx solid #747576;
				border-radius: 10rpx;
				width: 200rpx;
				text-align: center;
				color: #454648;
				height: 60rpx;
				margin-top: 10rpx;
			}
		}
	}
	.pay {
		display: flex;
		justify-content: flex-end;
		background: #fff;
		height: 100rpx;
		margin-top: 20rpx;
		align-items: center;
		.pay_full {
			.price_num {
				font-size: 40rpx;
				color: #ff9536;
				padding-right : 50rpx;
			}
		}
		.free {
			font-size: 30rpx;
		}
	}
	.btn {
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #f1f1f1;
		.sub {
			background: #ff9536;
			font-size: 35rpx;
			width: 90%;
			color: #fff;
			border-radius: 15rpx;
			height: 100rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-weight: 100;
		}
	}
	.footers {
		background: #fff;
		padding: 20rpx;
		margin-bottom: 20rpx;
		.num {
			display: flex;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.order_name {
				width: 170rpx;
				font-size: 30rpx;
			}
			.order_no {
				padding-left: 80rpx;
				font-size: 30rpx;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
			.btn_copy {
				font-size: 30rpx;
				width: 100rpx;
				height: 50rpx;
				border: 2rpx solid #000;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-left: 30rpx;
				border-radius: 5rpx;
				margin-top: -10rpx;
			}
		}
		.method {
			display: flex;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.pay_way {
				font-size: 30rpx;
			}
			.wechat {
				padding-left: 100rpx;
				font-size: 30rpx;
			}
		}
		.parent{
			display: flex;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.commander {
				font-size: 30rpx;
			}
			.member {
				padding-left: 100rpx;
				font-size: 30rpx;
			}
		}
		.leage{
			 display: flex;
			padding: 0 20rpx;
			margin-bottom: 20rpx;
			.my {
				font-size: 30rpx;
			}
			.member {
				padding-left: 158rpx;
				font-size: 30rpx;
			}
		}
		.time {
			display: flex;
			padding: 0 20rpx;
			.order_time {
				font-size: 30rpx;
			}
			.date {
				padding-left: 100rpx;
				font-size: 30rpx;
				span {
					margin-left: 10rpx;
					font-size: 30rpx;
				}
			}
		}
	}
</style>
