<template>
	<view>
		<view class="order-wrap">
			<view  class="inf-header" @click="toaddr()">
				<view v-if="rec_address" class="title">
					<view class="inf-name clearfix">
						<view class="name fl"><text class="span"></text>{{rec_address.realname}}</view>
						<view class="phone fr"><text class="span"></text>{{rec_address.mobile}}</view>
					</view>
					<!-- <view class="address" v-if="show_addres">
						{{rec_address.prov+"-"+rec_address.city+"-"+rec_address.dist+"-"+rec_address.address}}
					</view> -->
					<view class="address">
						<view>{{rec_address.prov_name+"-"+rec_address.city_name+"-"+rec_address.dist_name}}</view>
						
						<view class="add">{{rec_address.address}}</view>
					</view>
					
					
				</view>
				<image src="@/static/images/common/bottom-bj.jpg" class="bottom-img"></image>
				<view class="status text-center title" v-if="!rec_address">您还没有填写收货地址，请填写！</view>
				<image src="@/static/images/common/btn-right.png" class="btnright"></image>
			</view>
			
			<view class="bnack"></view>
		
			<view class="mark-wrap">
				<view  >
					<!-- 立即购买 -->
					<view class="store" v-if="store&&goods_data">
						<view class="header li"><image :src="config.image_url + store.store_logo"></image><text class="span">{{store.shop_name}}</text></view>
						<view class="clearfixli" id="store" style="display:flex">
							<image v-if="goods_data.pic_url" :src="config.image_url + goods_data.pic_url " class="fl"></image>
							<image v-else :src="apiLink + '/goods/2019-08-16/5d564e9785339.jpg'" class="fl"></image>
							<view class="pull-right fl">
								<view>{{goods_data.title|cut}}</view>
								<view class="price-wrap clearfix">
									<text class="fl price">￥<text class="span">{{goods_data.activity_price||""}}</text></text>
									<text class="number fr">X{{goods_data.goods_num||0}}</text>
								</view>
								
							</view>
							
							
						</view>
					</view>
					<!-- <view class="promotion-all">
						<view class="promotion-card" v-for="(item,index) in progive" :key="index" v-if="progive.length != 0">
							<view class="promotion-title" v-if="item.name">{{item.name}}</view>
							<image :src="config.image_url + item.pic_url" class="promotion-img"></image>
							<view class="promotion-num" v-if="item.give_num != 0 && item.give_num != null">x{{item.give_num}}</view>
							<view class="promotion-detail">购满￥{{ item.full }}送赠品，数量{{item.give_count}}赠完即止</view>
						</view>
						<view class="promotion-card"  v-if="reduce.length != 0">
							<view class="promotion-title" v-if="reduce.promotion_name">{{reduce.promotion_name}}</view>
							<view class="promotion-detail">单笔订单满￥{{ expense }}，立减￥{{cut}}</view>
						</view>
					</view> -->
				</view>
				
				
			</view>
				
				
				<view class="dist-wrap">
					<view class="hd">
						<template v-if="money == -1" class="delivery_money">
							<view class="delivery_type fl">配送费 ：</view>
							<view class="delivery_price fr">免配送费</view>
						</template>
						<template v-else-if="money" class="delivery_money">
							<view class="delivery_type fl">配送费 ：</view>
							<view class="delivery_price fr">￥{{money}}</view>
						</template>
						<template v-else class="delivery_money">
							<view class="delivery_type fl">运费：</view>
							<view v-if="freight == 0" class="delivery_price fr">卖家包邮</view>
							<view v-else class="delivery_price fr">￥{{freight}}</view>
						</template>
					</view>
					<!--   -->
					<!-- <view class="hd" @click="tolink('/invoice',goods_data.store_id)" >
						<view class="title fl">开具发票</view>
						<view>
							<view class="busi" v-if="show[0] == 1">已开发票</view>
							<view class="busi" v-else>无需发票</view>
							<image src="@/static/images/common/btn-right.png" class="imag"></image>
						</view>
					</view> -->
					<view class="dd">
						<view class="title">给商家留言：</view>
						<view class="txtview">
							<u-input class="txtin" placeholder="选填：备注限字在45个字以内" type="textarea" v-model="message"></u-input>
						</view>					
					</view>
				</view>
				
				<view class="price-set-wrap" style="padding-left: 5px;">
					<view class="total price">
						<text class="fl">税前商品总额</text>
						<text class="fr" v-if="goods_data.activity_price&&goods_data.goods_num">￥{{((goods_data.activity_price * goods_data.goods_num).toFixed(2))||0}}</text>
					</view>
					<view class="freight price">
						<text class="fl" >{{cartDis.memberLevel||"会员"}}:</text>
						<text class="fr">&nbsp;&nbsp;{{Number(cartDis.discount)/10}} 折优惠</text>
					</view>
					<view class="freight price" v-if="money == -1">
						<text class="fl">配送共计</text>
						<text class="fr">+&nbsp;&nbsp;免配送费</text>
					</view>
					<view class="freight price" v-else-if="status == 1"><!-- v-else-if="money" -->
						<text class="fl">配送共计</text>
						<text class="fr">+&nbsp;&nbsp;￥{{money}}</text>
					</view>
					<view class="freight price" v-else-if="status == 0">
						<text class="fl">运费共计</text>
						<text v-if="freight == 0" class="fr">&nbsp;&nbsp;<i>卖家包邮</i></text>
						<text v-else class="fr">+&nbsp;&nbsp;￥{{freight}}</text>
					</view>
					<!-- <view class="freight price">
						<text class="fl">优惠券</text>
						<text class="fr">-&nbsp;&nbsp;￥{{coupon.money}}</text>
					</view> -->
					<!-- <view class="freight price">
						<text class="fl">满立减</text>
						<text class="fr" v-if="(goods_data.price_member * goods_data.goods_num) >= expense">-&nbsp;&nbsp;￥{{cut}}</text>
						<text class="fr" v-else>-&nbsp;&nbsp;￥0</text>
					</view> -->
				</view>
				
				<view class="footer-wrap" >
					<view class="money">
						实付款&nbsp;:&nbsp; 
						<!-- <text class="price" v-if="routid&&routnum&&!routids&&goods_data&&goods_data.price_member" style="padding-left: 5px;">￥
							<text v-if="(money == -1) && ((goods_data.price_member * goods_data.goods_num) >= expense)">a{{(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) - Number(coupon.money) - Number(cut))).toFixed(2))||0}}</text>
							<text v-else-if="(money == -1)">b{{(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) - Number(coupon.money))).toFixed(2))||0}}</text>
							<text v-else-if="money && ((goods_data.price_member * goods_data.goods_num) >= expense)">c{{(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) + Number(money) - Number(coupon.money) - Number(cut))).toFixed(2))||0}}</text>
							<text v-else-if="money">{{d(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) + Number(money) - Number(coupon.money))).toFixed(2))||0}}</text>
							<text v-else-if="freight && ((goods_data.price_member * goods_data.goods_num) >= expense)">e{{(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) + Number(freight) - Number(coupon.money) - Number(cut))).toFixed(2))||0}}</text>
							<text v-else-if="freight">f{{(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) + Number(freight) - Number(coupon.money))))||0}}</text>
							<text v-else>{{(parseFloat((Number(goods_data.price_member) * Number(goods_data.goods_num) * (Number(cartDis.discount)/100) - Number(coupon.money))).toFixed(2) )||0}}</text>
						</text> -->
						<text  style="padding-left: 5px;">
							<text v-if="goods_data.activity_price&&goods_data.goods_num&&cartDis">￥{{((goods_data.activity_price*goods_data.goods_num)*(cartDis.discount/100)).toFixed(2)}}</text>
							<text v-else>￥0.00</text>
						</text>
					</view>	
					<view class="btn" @click="toCashierAll">提交订单</view>	
				</view>
			</view>
			
			<view class="bnack"></view>
			
			<view
				class="popup spec" 
				:class="addressClass"
				@touchmove.stop.prevent="stopPrevent"
				@click="toggleAddress"
				
			>
				<!-- 遮罩层 -->
				<view class="mask"></view>
				<view class="layer" @click.stop="stopPrevent">
					<text class="popup-title">选择收货地址</text>
					<view class="middle attr-content">
						<view class=" address-box" v-for="address in addressList" @click="()=>selectAddress(address)">
							<uni-swipe-action>
			
							    <uni-swipe-action-item>
							        <!-- <template v-slot:left>
							            <view><text>置顶</text></view>
							        </template> -->
							        <view>
										<view :class="['address-card',address.selected?'selected':'']">
										    <view class="top">
												<view class="name">
													{{address.realname}}
												</view>
												<view class="phone">
													{{address.mobile}}
												</view>
											</view>
											<view class="last">
												<text class="default" v-if="address.status==1">[默认地址]&nbsp;</text>
												{{address.address+' '}}
												{{address.dist_name}}
												{{address.city_name}}
												{{address.prov_name}}
											</view>
										</view>
									</view>
							        <template v-slot:right>
							            <view><text>删除</text></view>
							        </template>
									
							    </uni-swipe-action-item>
			
							</uni-swipe-action>
						</view>
						<view class="middle empty-address" v-if="addressList.length==0">您还没有添加地址哦！</view>
					</view>	
					<view class="bottom" style="padding-top:10rpx ;">
						<button :class="['btn']" @click="addNewAddress">新增</button>
					</view>
				</view>
				
			</view>
			<view
				class="popup spec" 
				:class="couponClass"
				@touchmove.stop.prevent="stopPrevent"
				@click="toggleCoupon"
				
			>
				<!-- 遮罩层 -->
				<view class="mask"></view>
				<view class="layer " @click.stop="stopPrevent">
					<text class="popup-title">优惠劵</text>
					<view class="middle attr-content" style="padding:0px 10px">
						<view class="coupon-box" v-for="(c,index) in couponList" >
							<view class="info">
								<view class="money">
									￥{{c.money}} <text class="title">{{c.name}}</text>
								</view>
								<view class="condition">
									满{{c.condition}}元可以使用
								</view>
								<view class="date">
									有效期 {{c.use_start_time|date}} - {{c.use_end_time|date}}
								</view>
							</view>
							<view class="receive-coupon">
							
								<text v-if="!c.used" @click="()=>receiveCoupon(c)" >点击使用</text>
								<text v-else style='opacity:0.3'  @click="()=>cancelCoupon(c)">取消使用</text>
							</view> 
						</view>
						<view style="width: 100%;text-align: center;margin-top: 10px;" v-if="couponList.length==0">无优惠劵</view>
					</view>
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	import {mapState} from 'vuex'
	export default {
		
		data(){
			return {
				config,
				rec_address:'',
				load_wrap: true,
				show_addres:true,
				freight: 0,
				error_message: '',
				prompt:'',
				status:'',
				delivery:'',
				money:'',
				transport:'',
				goods_data: {},
				store: {},
				reduce:'',
				expense:0,
				cut:0,
				image: {},
				cartDis: {},
				progive:'',
				cardGive: [],
				invoiceGroup:{},
				show:[],
				routid:null,
				routnum:null,
				message:'',
				apiLink: 'http://center.shopsn.net/uploads',
				cartData: [],
				routids:null,
				addressList:[],
				addressClass:'none',
				couponClass:'none',
				error_message:'',
				couponList:[],
				coupon:{
					money:0
				}
			}
		},
		onLoad(options){
			this.routid = options.good_id;
			this.routnum = options.num;
			
			console.log(this.routids);
			this.getAddress();
			this.getCoupon();
		},
		onShow(){
			this.getAddress();
		},
		computed:{
			...mapState(['selectedAddress'])
		},
		methods:{
			toaddr(){
				this.toggleAddress();
				// uni.navigateTo({
				// 	url: '/modules/common/pages/addNewAddress/index?status='+1,
				// })
			},
			addNewAddress(){
				uni.navigateTo({
					url:'modules/common/pages/addNewAddress/index'
				})
			},
			getAddress(){
				this.addressList = uni.getStorageSync("addressList");
				console.log(this.selectedAddress)
				this.addressList.forEach((address)=>{
					if(address.status==1){
						address.selected = true;
						this.rec_address = address;
					}else{
						address.selected = false;
					}
				})
				this.getFreight();
			},
			selectAddress(address){
				this.addressList.map((a)=>{
					if(a.id==address.id){
						a.selected = true;
						this.rec_address=a;
					}else{
						a.selected = false;
					}
					return a;
				})
				this.toggleAddress();
				this.getFreight();
			},
			getFreight() {
				
			
				let _this = this;
				uni.request({
					url : api.getFreight,
					method:"POST",
					data:{
						token:uni.getStorageSync('token'),
						prov_id:!this.rec_address.dist_id ? this.rec_address.prov : this.rec_address.prov_id,
						city_id: !this.rec_address.dist_id ? this.rec_address.city : this.rec_address.city_id,
						dist_id:!this.rec_address.dist_id ? this.rec_address.dist : this.rec_address.dist_id
					},
					success: (res) => {
						if(res.data.status == 1){
							_this.freight = res.data.data;
						}else{
							uni.showToast({
							  title:"所选地址 " +res.data.message,
							  duration: 1000,
							  icon:"none"
							});
							_this.error_message = res.data.message
							
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getconfirmOrder(){
				let url = api.requeryConfirmOrderId+
					'?token='+uni.getStorageSync('token')+
					'&store_id='+this.goods_data.store_id+
					'&address_id='+this.rec_address.id+
					'&goods_id='+this.routid;
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					   _this.delivery=res.data.data.delivery;
					   _this.money=parseFloat(res.data.data.money);
					   _this.transport=res.data.data.transport;
						_this.status=res.data.status;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			getShopInfo(){
				let _this = this;
				uni.request({
					url:api.shopInfo,
					data:{
						token:uni.getStorageSync("token"),
						id: _this.goods_data.store_id,
					},
					success(res) {
						_this.store = res.data.data;
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			getData(){
				uni.showLoading({
					title:'创建订单中'
				})			
				
				let _this = this;
				uni.request({
					url:api.getSecKillBuyProductDetail,
					method:"GET",
					data:{
						token:uni.getStorageSync("token")||"-",
						id:this.routid,
						goods_num:this.routnum
					},
					success(res) {
						
						if(res.data.status==10001){
							uni.showToast({
								title:"请登录",
								icon:"none"
							})
						}
						if(res.data.data){
							
							_this.cartData = res.data.data;
							_this.cartDis = res.data.data.discount;
							_this.goods_data = res.data.data.goods;
							_this.getShopInfo();
						
							uni.hideLoading();
						}
					},
					fail(e) {
						uni.hideLoading();
						uni.showToast({
							title:e.data.message,
							icon:"none"
						})
					}
					
				})
				
				
			},
			toCashierAll() {
				uni.showLoading({
					title:"提交订单中"
				})
				if(!this.rec_address){
					uni.hideLoading();
					uni.showToast({
					  title: '请填写收货地址',
					  icon:"none",
					  duration: 1000
					})
					return
					
				}
				
				// if(this.money == -1 && ((this.goods_data.price_member * this.goods_data.goods_num) >= this.expense)) {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) - parseFloat(this.$store.state.const_coupon_price) - parseFloat(this.cut);
				// }
				// else if(this.money == -1) {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) - parseFloat(this.$store.state.const_coupon_price);
				// }
				// else if(this.money && ((this.goods_data.price_member * this.goods_data.goods_num) >= this.expense)) {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) + parseFloat(this.money) - parseFloat(this.$store.state.const_coupon_price) - parseFloat(this.cut);
				// }
				// else if(this.money) {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) + parseFloat(this.money) - parseFloat(this.$store.state.const_coupon_price);
				// }
				// else if(this.freight && ((this.goods_data.price_member * this.goods_data.goods_num) >= this.expense)) {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) + parseFloat(this.freight) - parseFloat(this.$store.state.const_coupon_price) - parseFloat(this.cut);
				// }
				// else if(this.freight) {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) + parseFloat(this.freight) - parseFloat(this.$store.state.const_coupon_price);
				// }
				// else {
				// 	var total = parseFloat(this.goods_data.price_member * this.goods_data.goods_num * Number(this.cartDis.discount)/100) - parseFloat(this.$store.state.const_coupon_price);
				// }
				// var b = parseFloat(total).toFixed(3);
				// var _price = b.substring(0,b.toString().length - 1);  //这里先将a转换为float类型再保留三位小数，最后截取字符串前b.length - 1位
				
				let url ;
				let data = {};
				
				
									
				
				
				
				let total = this.goods_data.activity_price*this.goods_data.goods_num;
				url = api.generateSeckillProductOrder
				data.token=uni.getStorageSync('token')
				data.panic_id=this.routid
				data.total=total
				data.address_id=this.rec_address.id
				data.invoice_id=[{translate:0},{translate:0},{translate:0}]
				data.remarks=this.message
				data.platform=2
				
				
				let _this = this;
				uni.request({
					url : url,
					method:"POST",
					data:data,
					success: (res) => {
					console.log(res);
					
					if(res.data.status == 1){
						if(isNaN(this.money)==true){
							this.money=0;
						}
						uni.hideLoading();
						uni.showToast({
							title:"提交订单成功",
							icon:"none"
						})
						
						uni.navigateTo({
							url: '/modules/common/pages/productDetail/cashier?order_sn_id='+res.data.data.order_sn_id+'&total='+res.data.data.price_sum,
						})
						
					
						
					}else{
						uni.hideLoading();
						uni.showToast({
						  title: res.data.message,
						  duration: 1000,
						  icon:"none"
						});
					}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			stopPrevent(){},
			toggleAddress(){
				
				if(this.addressClass === 'show'){
					this.addressClass = 'hide';
					setTimeout(() => {
						this.addressClass = 'none';
					}, 250);
				}else if(this.addressClass === 'none'){					
					this.addressClass = 'show';
				}
				//优惠劵
			},
			getCoupon(){
				let _this = this;
				uni.request({
					url:api.getUserCoupon,
					data:{
						token:uni.getStorageSync("token")||"-"
					},
					method:"POST",
					success(res) {
					
						if(res.data.data){
							_this.couponList = [];
							let couponList = res.data.data.do_use;
							for(let c in couponList){
								couponList[c].used = false;
								_this.couponList.push(couponList[c]);
							}
							
						}
					},
					fail(err) {
						console.log(err)
					}
				})
			},
			toggleCoupon(){
				
				

				if(this.couponClass === 'show'){
					this.couponClass = 'hide';
					setTimeout(() => {
						this.couponClass = 'none';
					}, 250);
				}else if(this.couponClass === 'none'){
				
					this.couponClass = 'show';
				}
				//优惠劵
			},
			receiveCoupon(coupon){
				
				this.couponList.map(c=>{
					if(c.id==coupon.id){
						c.used = true;
					}else{
						c.used = false;
					}
					return c;
				})
				this.coupon = coupon;
			},
			cancelCoupon(coupon){
				this.couponList.map(c=>{
					if(c.id==coupon.id){
						c.used = false;
					}
					return c;
				})
				this.coupon = {money:0};
			}
		},
		filters:{
			cut(value){
				if(!value) return;
				return value.length>20?value.slice(0,20)+" ...":value;
			}
		},
		mounted() {
			this.getData();
			this.$store.state.const_coupon_price=0;
		},
		
	}
</script>

<style lang="scss">
	.order-wrap{
		background-color: $light-grey;
		min-height: 100vh;
		
	}
	.inf-header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		
		margin:10px 10px 0px 10px;
		background-color: white;
		border-radius: 5px;
	
		position: relative;
		overflow: hidden;
		.btnright{
			width:6px;
			height: 10px;
			margin-right:10px;
		}
		.bottom-img{
			position:absolute;
			bottom:0px;
			height:4px;
			width:100%;
			left:0px;
			right:0px;
		}
		.title{
			margin:15px 10px;
			width:100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.inf-name{
				display: flex;
				flex-direction: column;
				.name{
					padding-bottom: 5px;
				}
				
			}
			.address{
				color: $font-color-base;
				display: flex;
				justify-content: flex-end;
				flex-direction: column;
				.add{
					padding-top: 5px;
					color:$font-color-light;
				}
			}
		}
		
	}
	
	.mark-wrap{
		margin:10rpx;
		padding:10rpx;
		.header{
			display:flex;
			align-items: center;
			justify-content: flex-start;
			padding:5px 10px;
			border-bottom: 0.3px solid $light-grey;
			image{
				width:30px;
				height:30px;
				margin-right: 10px;
				background-color: $light-grey;
				border-radius: 5px;
			}
			text{
				color:$font-color-base
			}
		}
		.clearfixli{
			padding:10px 10px 10px 10px;
			display: flex;
			align-items: flex-start;
			justify-content: flex-start;
			image{
				background-color: $light-grey;
				width:60px;
				height: 60px;
				margin-right: 10px;
				border-radius: 5px;
			}
			.pull-right{
				display: flex;
				flex-direction: column;
				.price-wrap{
					display: flex;
					justify-content: space-between;
					margin-top: 10px;
					.price{
						color:$main-color
					}
					.number{
						color:$font-color-base
					}
				}
			}
		}
		.clearfixli:not(:last-child){
			border-bottom: 0.2px solid $light-grey;
		}
		.store{
			border-bottom: 0.2px solid $light-grey;
			background:white;
			border-radius: 5px;
			.header{
				display:flex;
				align-items: center;
				justify-content: flex-start;
				padding:5px 10px;
				border-bottom: 0.3px solid $light-grey;
				image{
					width:30px;
					height:30px;
					margin-right: 10px;
					background-color: $light-grey;
					border-radius: 5px;
				}
				text{
					color:$font-color-base
				}
			}
			.clearfixli{
				padding:10px 10px 10px 10px;
				display: flex;
				align-items: flex-start;
				justify-content: flex-start;
				image{
					background-color: $light-grey;
					width:60px;
					height: 60px;
					margin-right: 10px;
					border-radius: 5px;
				}
				.pull-right{
					display: flex;
					flex-direction: column;
					.price-wrap{
						display: flex;
						justify-content: space-between;
						margin-top: 10px;
						.price{
							color:$main-color
						}
						.number{
							color:$font-color-base
						}
					}
				}
			}
			.clearfixli:not(:last-child){
				border-bottom: 0.2px solid $light-grey;
			}
		}
	}
	
	.dist-wrap{
		margin:0px 10px 10px 10px;
		
		.hd{
			background-color: white;
			border-radius: 5px;
			padding:10px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width:100%;
			color:$font-color-base;
			margin-bottom: 5px;
			view{
				display: flex;
				align-items: center;
				.busi{
					color:$font-color-light
				
				}
				image{
					width:5px;
					height:10px;
					margin-left:5px;
				}
			}
		}
		.dd{
			display: flex;
			flex-direction: column;
			padding:10px;
			background:white;
			border-radius: 5px;
			
			.title{
				color:$font-color-base;
				margin-bottom: 2px;
				
			}
		}
	}
	.price-set-wrap{
		margin:0px 10px 50px 10px;
		background-color: white;
		border-radius: 5px;
		padding:5px 10px;
		.price{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:5px 0px;
		}
	}
	.footer-wrap{
		position:fixed;
		bottom:5px;
		margin:10px;
		box-sizing: border-box;
		background:white;
		border-radius: 5px;
		box-shadow: 2px 2px 5px rgba($color: #000000, $alpha: 0.1);
		display:flex;
		align-items: center;
		padding:5px 5px 5px 15px;
		justify-content: space-between;
		width:60%;
		right:0;
		border-radius: 50px;
		.btn{
			border-radius: 50px;
			color:white;
			padding:8px 15px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: $main-color;
		}
		
	}
	.popup {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		z-index: 990;
		
		&.show {
			display: block;
			.mask{
				animation: showPopup 0.2s linear both;
			}
			.layer {
				image{
					background-color: #F8F8F8;
				}
				animation: showLayer 0.2s linear both;
			}
		}
		&.hide {
			.mask{
				animation: hidePopup 0.2s linear both;
			}
			.layer {
				animation: hideLayer 0.2s linear both;
			}
		}
		&.none {
			display: none;
		}
		.mask{
			position: fixed;
			top: 0;
			width: 100%;
			height: 100%;
			z-index: 1;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.layer {
			position: fixed;
			z-index: 99;
			bottom: 0;
			width: 100%;
			height: auto;
			border-radius: 10upx 10upx 0 0;
			background-color: #fff;
			.middle{
				overflow: auto;
				margin: 70rpx 0rpx;
				min-height: 50vh;
				max-height: 70vh;
			}
			.bottom{
				width: 100%;
				padding:0rpx 30rpx;
				position: fixed;
				bottom:0;
				.btn{
					height: 70upx;
					line-height: 70upx;
					border-radius: 100upx;
					background: $main-color;
					font-size: $font-base + 2upx;
					color: #fff;
					margin: 30upx auto 20upx;
					
					width:100%;
					
				}
				.btn.disabled{
					opacity: 0.3;
					
				}
			}
			.popup-title{
				font-size: 12px;
				font-weight: bold;
				width:100%;
				display: block;
				padding:15rpx 0rpx 15rpx 0rpx;
				text-align: center;
				position:fixed;
				top:0;
			}
			.empty-address{
				width:100%;
				text-align: center;
				margin:50rpx 0rpx;
				height:100%;
			}
			.coupon-box{
				border-radius: 5px;
				height:200rpx;
		
				margin-bottom:20rpx;
				display: grid;
				grid-template-columns: 2.5fr 1.5fr;
				color:white;
				border: 1px solid $main-color;
				.info{
					margin:10rpx;
					
					padding: 20rpx 0px 20rpx 10px;
					border-radius: 5px;
					background: linear-gradient(to left,rgba($color: $main-color, $alpha: 0.5),rgba($color: $main-color, $alpha: 0.9));
					.money{
						font-size: 17px;
						.title{
							margin-left:20rpx;
							font-size: 10px;
						}
						margin-bottom:20rpx
					}
					.condition{
						font-size: 10px;
						margin-bottom: 10rpx;
					}
					.date{
						font-size: 10px;
					}
				}
				.receive-coupon{
					display: flex;
					align-items: center;
					justify-content: center;
					color:$main-color;
					font-weight: bold;
					font-size:14px;
				}
			}
			
		}
		@keyframes showPopup {
			0% {
				opacity: 0;
			}
			100% {
				opacity: 1;
			}
		}
		@keyframes hidePopup {
			0% {
				opacity: 1;
			}
			100% {
				opacity: 0;
			}
		}
		@keyframes showLayer {
			0% {
				transform: translateY(120%);
			}
			100% {
				transform: translateY(0%);
			}
		}
		@keyframes hideLayer {
			0% {
				transform: translateY(0);
			}
			100% {
				transform: translateY(120%);
			}
		}
	}
	.address-box{
		padding:0rpx 10rpx 10rpx 10rpx;
		
		.address-card{
			
			display: flex;
			flex-direction: column;
			background-color: $light-grey;
			border-radius: 5px;
			padding:10px;
			border:1px solid white;
			&.selected{
				border: 1px solid $main-color;
			}
			.top{
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 12px;
				font-weight: bold;
				margin-bottom: 15rpx;
			}
			.last{
				display: flex;
				justify-content: left;
				font-size: 10px;
				.default{
					color:$main-color
				}
			}
		}
	}
</style>
