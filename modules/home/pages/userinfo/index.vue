<template>  
    <view class="container">  
		
		<view class="user-section"> 
			<!-- <image class="bg" src="/static/user-bg.jpg"></image> -->
			<view class="user-info-box" @click="toPersonDataPage">
				<view class="portrait-box">
					<image class="portrait" :src="userData.user_header || '/static/images/common/user-avatar.png'"></image>
				</view>
				<view class="info-box">
					<text class="username" v-if="userData.user_name">{{userData.user_name || '游客'}}</text>
					<view v-if="!userData.user_name">
						<Login type="btn" @logged="getuserinfo"></Login>
					</view>
				</view>
			</view>
			<view class="order-topsection">
				<view class="order-item" v-for="(item,index) in topattention" :key="index" @click="topnav(index)">
					<text class="yticon">{{item.text}}</text>
					<text class="yticon1">{{item.txt}}</text>
				</view>
			</view>
		</view>
		
		<view 
			class="cover-container"
			:style="[{
				transform: coverTransform,
				transition: coverTransition
			}]"
			@touchstart="coverTouchstart"
			@touchmove="coverTouchmove"
			@touchend="coverTouchend"
		>
			<!-- <image class="arc" src="/static/arc.png"></image> -->
			<view class="blank"></view>
			<view class="tj-section">
				<view class="secHeader">
					<image class="yticon" src="@/static/images/common/qddd.png"></image>
					<!-- <text class="yticon icon-lishijilu"></text> -->
					<text class="orderList">我的订单</text>
					<text class="orderList1" @click="toOrder">查看订单</text>
					<image class="orderList-img" src="@/static/images/common/btn-right.png"></image>
				</view>
				<view class="tj-sction">
					<view class="tj-item" v-for="(item,index) in navCon" :key="item.id" @click="myOrder2(index)">
						<view class="orderNum">{{item.num}}</view>
						<image class="num" :src="item.imgData"></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
			<view class="tjsction">
				<view class="tj-item" @click="puzzleOrderClick()">
					<image class="num" src="@/static/images/common/tg.png"></image>
					<text>拼团订单</text>
				</view>
				<view class="tj-item" @click="packageListClick()">
					<image class="num" src="@/static/images/common/dingdan.png"></image>
					<text>套餐订单</text>
				</view>
				<view class="tj-item" @click="orderListClick()">
					<image class="num" src="@/static/images/common/qtdd.png"></image>
					<text>其他订单</text>
				</view>
			</view>
			<!-- 订单 -->
			<view class="order-section">
				<view class="order-item" v-for="(item,index) in navCon3" :key="index" @click="myOrder4(index)">
					<text class="yticon">{{item.text}}</text>
					<text>{{item.txt}}</text>
				</view>
			</view>
			<!-- 浏览历史 -->
			<view class="history-section">
				<view class="sec-header">
					<!-- <text class="yticon icon-lishijilu"></text> -->
					<text>我的服务</text>
				</view>
				<view class="orderItem-ul">
					<view class="orderItem" v-for="(item,index) in navserver1" :key="item.id" @click="myserver2(index)">
						<image class="num" :src="item.imgData"></image>
						<text>{{item.text}}</text>
					</view>
				</view>
				<view class="orderItem-ul">
					<view class="orderItem" v-for="(item,index) in navserver2" :key="item.id" @click="myserver3(index)">
						<image class="num" :src="item.imgData"></image>
						<text>{{item.text}}</text>
					</view>
				</view>
				<view class="orderItem-ul">
					<view class="orderItem" v-for="(item,index) in addIcon" :key="item.id" @click="toLink(index)">
						<image class="num" :src="item.imgData"></image>
						<text>{{item.text}}</text>
					</view>
				</view>
			</view>
		</view>
			
		
    </view>  
</template>  
<script> 
 import config from '@/config.js'
 import api from '@/api.js'
	import listCell from '@/components/mix-list-cell';
    import {  
        mapState,
		 mapMutations
    } from 'vuex';  
	let startY = 0, moveY = 0, pageAtTop = true;
    export default {
		components: {
			listCell
		},
		data(){
			return {
				config,
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				other:{},
				userData:'',
				topattention: [
					{text: "0", txt: "收藏宝贝"},
					{text: "0", txt: "关注店铺"},
					{text: "0", txt: "关注门店"},
					{text: "0", txt: "足迹"}
				],
				navCon: [
					{ num: '0', text: "待付款", imgData: require("@/static/images/common/Orders_01.png") },
					{ num: '0', text: "待发货", imgData: require("@/static/images/common/Orders_02.png") },
					{ num: '0', text: "待收货", imgData: require("@/static/images/common/Orders_03.png") },
					{ num: '0', text: "待评价", imgData: require("@/static/images/common/Orders_04.png") },
					{ num: '0', text: "退货", imgData: require("@/static/images/common/Orders_05.png") }
				],
				navCon3: [
					{text: "0", txt: "可用积分"},
					{text: "0", txt: "优惠卷"},
					{text: "0.00", txt: "余额"},
				],
				navserver1: [
					{
						text: "我的发票",
						imgData: require("@/static/images/common/invoice.png")
					},
					{
						text: "我的积分",
						imgData: require("@/static/images/common/youhuiquan.png")
					},
					{
						text: "积分商城",
						imgData: require("@/static/images/common/loadingjifenguize.png")
					},
					{
						text: "评价管理",
						imgData: require("@/static/images/common/pjgl.png")
					}
				],
				navserver2: [
					{
						text: "账户设置",
						imgData: require("@/static/images/common/shezhi.png")
					},
					{
						text: "客服服务",
						imgData: require("@/static/images/common/kefu.png")
					},
					{
						text: "举报",
						imgData: require("@/static/images/common/report1.png")
					},
					{
						text: "意见反馈",
						imgData: require("@/static/images/common/opinion.png")
					},
				],
				addIcon: [
					{
						text: "我的收藏",
						imgData: require("@/static/images/common/collection.png")
					},
					{
						text: "我要开店",
						imgData: require("@/static/images/common/shop.png")
					},
					{
						text: "收货地址",
						imgData: require("@/static/images/common/myAdvice.png")
					},
					{
						text: "积分订单",
						imgData: require("@/static/images/common/intmall_order.png")
					}
					
				],
			}
		},
		onLoad(){
		},
		onShow() {
			this.getuserinfo();
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			}else if(index === 1){
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
        computed: {
			...mapState(['hasLogin','userInfo'])
		},
		mounted(){
			this.getuserinfo();
		},
        methods: {
			...mapMutations(['setUserInfo']),
			getuserinfo(){
				let _this = this;
				uni.request({
					url:api.userinfo,
					method:"POST",
					data:{
						token:uni.getStorageSync("token")||'-'
					},
					success(res) {
					  if(res.data.status == 1){
              var pattern = /^((http|https|ftp):\/\/)/;
              _this.userData = res.data.data;
              if(!pattern.test(_this.userData.user_header)) {
                _this.userData.user_header = config.image_url+_this.userData.user_header
              }
              _this.setUserInfo(_this.userData);
              _this.other = res.data.data.other;
              if (_this.other.integral == '') {
                _this.navCon3[0].text = "0";
              } else {
                let t0 = _this.other.integral
                _this.navCon3[0].text = t0;
              }
              let t1 = _this.other.coupon
              _this.navCon3[1].text = t1;
              let t3 = _this.other.balance
              _this.navCon3[2].text = t3;
              _this.topattention[0].text = _this.other.collection;
              _this.topattention[1].text = _this.other.store;
              _this.topattention[2].text = _this.other.shop;
              _this.topattention[3].text = _this.other.foot;
              _this.navCon[0].num = res.data.data.order.pendingPayment;//代付款
              _this.navCon[1].num = res.data.data.order.pendingDelivery;//代处理
              _this.navCon[2].num = res.data.data.order.receivingGoods;//待交货  receivingGoods
              _this.navCon[3].num = res.data.data.order.toBeEvaluated;//待评价
              _this.navCon[4].num = res.data.data.order.refunds;//退款
            } else {
				uni.navigateTo({
					url: '/modules/common/pages/login/index',
					fail(e) {
						console.log(e)
					}
					
				})
			}
					},
					
					fail(e) {
						console.log(e);
					}
				})
			},
			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url){
				if(!this.hasLogin){
					url = '/pages/public/login';
				}
				uni.navigateTo({  
					url
				})  
			}, 
	
			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e){
				if(pageAtTop === false){
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e){
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if(moveDistance < 0){
					this.moving = false;
					return;
				}
				this.moving = true;
				if(moveDistance >= 80 && moveDistance < 100){
					moveDistance = 80;
				}
		
				if(moveDistance > 0 && moveDistance <= 80){
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend(){
				if(this.moving === false){
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},
			topnav(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/myCollection?index='+0+'&type='+0,
							fail(e) {
								console.log(e)
							}
							
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/myCollection?index='+1+'&type='+1,
							fail(e) {
								console.log(e)
							}
							
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/myCollection?index='+0+'&type='+2,
							fail(e) {
								console.log(e)
							}
							
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/modules/user/pages/index/footPrint',
							fail(e) {
								console.log(e)
							}
							
						})
						break;
				}
			},
			myOrder2(sat) {
				
				if (sat == 0) {
					uni.navigateTo({
						url: '/modules/order/pages/order/orderList?id='+1,
						fail(e) {
							console.log(e)
						}
					})
				} else if (sat == 1) {
					uni.navigateTo({
						url: '/modules/order/pages/order/orderList?id='+2,
						fail(e) {
							console.log(e)
						}
					})
				} else if (sat == 2) {
					uni.navigateTo({
						url: '/modules/order/pages/order/orderList?id='+3,
						fail(e) {
							console.log(e)
						}
					})
				} else if (sat == 3) {
					uni.navigateTo({
						url: '/modules/order/pages/order/orderList?id='+6,
						fail(e) {
							console.log(e)
						}
					})
				} else if (sat == 4) {
					uni.navigateTo({
						url: '/modules/user/pages/index/components/returnRepair',
						fail(e) {
							console.log(e)
						}
						
					})
				}
			},
			puzzleOrderClick() {
				uni.navigateTo({
					url: '/modules/order/pages/puzzle/puzzleOrder',
					fail(e) {
						console.log(e)
					}
				})
			},
			packageListClick() {
				uni.navigateTo({
					url: '/modules/order/pages/package/packageOrderList?id='+0,
					fail(e) {
						console.log(e)
					}
				})
			},
			orderListClick() {
				uni.navigateTo({
					url: '/modules/order/pages/other/orderList?id='+0,
					fail(e) {
						console.log(e)
					}
				})
			},
			myOrder4(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: '/modules/service/pages/integral/myIntegral',
							fail(e) {
								console.log(e)
							}	
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/coupon',
							fail(e) {
								console.log(e)
							}	
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/myWallet',
							fail(e) {
								console.log(e)
							}	
						})
						break;
				}
			},
			myserver2(index) {
				switch (index) {
					case 0:
						// this.$router.push("/documents"); //documents.vue
						uni.navigateTo({
							url: '/modules/service/pages/documents/documents',
							fail(e) {
								console.log(e)
							}	
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/modules/service/pages/integral/myIntegral',
							fail(e) {
								console.log(e)
							}	
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/modules/service/pages/integral/index',
							fail(e) {
								console.log(e)
							}	
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/modules/service/pages/comment/myComment',
							fail(e) {
								console.log(e)
							}	
						})
						break;
				}
			},
			myserver3(index) {
				switch (index) {
					case 0:
						// this.$router.push("/seetin");
						uni.navigateTo({
							url: '/modules/user/pages/index/components/settingPage',
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/customerService',
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/informOutline',
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/Feedback',
							fail(e) {
								console.log(e)
							}
						})
						break;
				}
			},
			toLink(index) {
				switch (index) {
					case 0:
						// this.$router.push("/seetin");
						uni.navigateTo({
							url: '/modules/user/pages/index/components/myCollection?index='+0+'&type='+0,
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 1:
						uni.navigateTo({
							url: '/shopOpen/pages/indexShopOpen',
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 2:
						uni.navigateTo({
							url: '/modules/user/pages/index/components/addressList',
							fail(e) {
								console.log(e)
							}
						})
						break;
					case 3:
						uni.navigateTo({
							url: '/modules/order/pages/integral/integralOrder',
							fail(e) {
								console.log(e)
							}
						})
						break;
				}
			},
			toOrder(){
				uni.navigateTo({
					url: '/modules/order/pages/order/orderList?id='+0,
					fail(e) {
						console.log(e)
					}
				})
			},
			toPersonDataPage(){
				if(!this.hasLogin){
					return;
				}
				uni.navigateTo({
					url:'/modules/user/pages/index/components/personalData',
					fail(e) {
						console.log(e);
					}
				})
			}
        }  
    }  
</script>  
<style lang='scss'>
	%flex-center {
	 display:flex;
	 flex-direction: column;
	 justify-content: center;
	 align-items: center;
	}
	%section {
	  display:flex;
	  justify-content: space-around;
	  align-content: center;
	  background: #fff;
	  border-radius: 10upx;
	}
	.blank{
		background-color: #f5f5f5;
		padding: 11rpx 0;
	}
	.user-section{
		height: 450rpx;
		padding: 10px 30upx 0;
		position:relative;
		background-color:white;
		.bg{
			position:absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			opacity: .7;
			background-color: rgb(238, 17, 17);
		}
	}
	.user-info-box{
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		background-color: rgba($color: $main-color, $alpha: 0.5);
		padding:10px 10px 0px 10px;
		border-radius: 5px 5px 0px 0px;
		.portrait{
			width: 130upx;
			height: 130upx;
			border:5upx solid #fff;
			border-radius: 50%;
			background: $light-grey;
			
		}
		.username{
			font-size: $font-lg + 6upx;
			color: white;
			margin-left: 20upx;
		}
	}
	.order-topsection{
		display:flex;
		justify-content: space-around;
		align-content: center;
		background-color: rgba($color: $main-color, $alpha: 0.5);
		padding:0px 10px 10px 10px;
		border-radius: 0px 0px 5px 5px;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: white;
		}
		.yticon{
			margin-bottom: 18upx;
			text-align: center;
			font-size: 30rpx;
			color: white;
			font-weight: 500;
			height: 36rpx;
		}
		.yticon1{
			margin-bottom: 18upx;
			text-align: center;
			font-size: 30rpx;
			color: white;
			font-weight: 500;
			height: 36rpx;
		}
	}

	.cover-container{
		background: $page-color-base;
		margin-top: -150upx;
		padding: 0 30upx;
		position:relative;
		background: #f5f5f5;
		padding-bottom: 20upx;
		.arc{
			position:absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}
	.tj-section{
		background: #fff;
		border-radius: 10upx;
		.tj-sction{
		  display:flex;
		  justify-content: space-around;
		  align-content: center;
		  padding: 20rpx;
		  border-top: 1rpx solid #e7e7e7;
			.tj-item{
				@extend %flex-center;
				flex-direction: column;
				height: 140upx;
				font-size: $font-sm;
				color: #75787d;
			}
			.num{
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 15rpx;
			}
			.orderNum {
				position: relative;
				top:15rpx;
				left:30%;
				width: 45rpx;
				height: 45rpx;
				line-height: 35rpx;
				text-align: center;
				border-radius: 50%;
				color: #ff9d4b;
				border: 1rpx solid #ff9d4b;
			}
		}
		.secHeader{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			padding: 28rpx 0;
			.yticon{
				margin-right: 16upx;
				line-height: 40upx;
				width: 40rpx;
				height: 40rpx;
			}
			.orderList{
			width: 430rpx;
			}
			.orderList1{
			padding: 0 30rpx 0 0;
			}
			.orderList-img{
				width: 20rpx;
				height: 25rpx;
			}
		}
	}
	.tjsction{
		@extend %section;
		margin-top: 20upx;
		.tj-item{
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}
		.num{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 15rpx;
		}
	}
	.order-section{
		@extend %section;
		padding: 28upx 0;
		margin-top: 20upx;
		.order-item{
			@extend %flex-center;
			width: 120upx;
			height: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
			color: $font-color-dark;
		}
		.yticon{
			margin-bottom: 18upx;
			text-align: center;
			font-size: 30rpx;
			color: #565656;
			font-weight: 500;
			height: 36rpx;
		}
		.icon-shouhoutuikuan{
			font-size:44upx;
		}
		.num{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 15rpx;
		}
	}
	.history-section{
		padding: 30upx 0 0;
		margin-top: 20upx;
		background: #fff;
		border-radius:10upx;
		.sec-header{
			display:flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;
			padding: 0 0 30rpx 0;
			.yticon{
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}
		.orderItem-ul{
			  display:flex;
			  justify-content: space-around;
			  align-content: center;
			  border-top: 1rpx solid #e7e7e7;
			  padding: 20rpx 0;
		}
		.orderItem{
			width: 120upx;
			height: 120upx;
			font-size: $font-sm;
			color: $font-color-dark;
			display:flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.num{
			width: 40rpx;
			height: 40rpx;
			margin-bottom: 15rpx;
		}
	}
	
</style>