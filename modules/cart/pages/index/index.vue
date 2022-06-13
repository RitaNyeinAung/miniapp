<template>
	<view class="container">
	
		<view v-if="!hasLogin || empty===true" class="empty">
			
			<view>
				<image src="/static/images/common/empty-search.png" mode="aspectFit"></image>
				<view v-if="hasLogin" class="empty-tips">
					空空如也
					<navigator class="navigator" v-if="hasLogin" url="/modules/category/pages/index/index" open-type="switchTab">随便逛逛></navigator>
				</view>
				<view v-else class="empty-tips" style="display:flex;align-items: center;">
					空空如也
					<Login type="btn" @logged="loadData"></Login>
				</view>
			</view>
			
			
		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<view class="store" v-for="(store,index) in cartList">
					<view class="store-info">
						<view style="display: flex;align-items: center;">
							<view
								class="yticon icon-xuanzhong2 checkbox"
								:class="{checked: store.checked}"
								@click="check('store', index,childIndex)"
							></view>
							<text style="margin-left: 5px;">全选</text>
						</view>

						<view class="title">
							店铺 ：{{store.shop_name}}
						</view>
					</view>
					<block v-for="(item, childIndex) in store.goods" :key="item.id">
						<view
							class="cart-item"
							:class="{'b-b': index!==cartList.length-1}"
						>
							<view class="image-wrapper">
								<image :src="config.image_url+item.pic_url"
								></image>
								<view
									class="yticon icon-xuanzhong2 checkbox"
									:class="{checked: item.checked}"
									@click="check('item', index,childIndex)"
								></view>
							</view>
							<view class="item-right">
								<text class="clamp title">{{item.title}}</text>
								<text class="attr">
									<text style="margin-right:5px">{{item.spec}}</text>
								</text>
								<text class="price" style="color:Red">{{item.price_member}}元</text>
								<uni-number-box
									class="step"
									:min="1"
									:value="item.goods_num"
									:index="index"
									@eventChange="(data)=>numberChange(data,index,childIndex,item)"
								></uni-number-box>
							</view>
							<text class="del-btn yticon icon-fork" @click="deleteCartItem(index,item.id)"></text>
						</view>
					</block>
				</view>
			</view>


			<!-- 底部菜单栏 -->
			<view class="action-section">

					<view style="display: flex;align-items: center;">
						<view
							class="yticon icon-xuanzhong2 checkbox"
							:class="{checked: allChecked}"
							@click="check('all', null,null)"
						></view>
						<text style="margin-left: 5px;">全选</text>
					</view>

				<view class="total-box">
					<text style="color:red" class="price">{{total}}元</text>
					<text class="coupon">

						<text>无优惠</text>

					</text>
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
		
		
		<view class="recommend-item" v-if="cartList.length==0">
			<view class="title">
				推荐商品
			</view>
			<view class="items" v-if="recommend_items.length>0">
				<view
					v-for="(item, index) in recommend_items" :key="index"
					class="goods-item"
					@click="navToDetailPage(item)"
				>
					<view class="image-wrapper">
						<image :src="config.image_url+item.pic_url" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.title}}</text>
					<view class="price-box">
						<text class="price">{{item.price_member}}</text>
						
					</view>
				</view>
			</view>
			<view v-else class="" style="width: 100%;text-align: center;padding-top:20px;opacity: 0.3;">
				暂无
			</view>
		</view>
		
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	import uniNumberBox from '@/components/uni-number-box.vue'
	import api from '@/api.js'
	import config from '@/config.js'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: false, //全选状态  true|false
				empty: true, //空白页现实  true|false
				cartList: [],
				config,
				recommend_items:[],
				page:1
			};
		},
		onLoad(){
			this.loadData();
		},
		onShow(){
			if(this.cart.length>0){
				this.loadData();
				
			}
			
			// this.updateCart({type:'clear',item:null});
		},
		onPullDownRefresh() {
			this.loadData();
		},
		watch:{
			//显示空白页
			cartList(e){
				let empty = e.length === 0 ? true: false;
				if(this.empty !== empty){
					this.empty = empty;
				}
			}
		},
		computed:{
			...mapState(['hasLogin','cart'])
		},
		methods: {
			//请求数据
			...mapMutations(['setHasLogin']),
			async loadData(){
				if(!this.hasLogin){
					return;
				}
				uni.showLoading({
					title:"加载数据中"
				})
				let token = uni.getStorageSync('token')||"-";
				var _this = this;
				uni.request({
					url:api.getCartItem, 
					method:'POST',
					data:{
						'token':token
					},
					header:{
						'Authorization' : 'Bearer '+token
					},
					success(res){
						if(res.data.status==10001){
							_this.setHasLogin(false);
						}
						if(!res.data.data){
							_this.cartList = [];         
						}else{
							let cartList = res.data.data.goods.map(store=>{
								store.checked = true;
								store.goods.forEach((item)=>{
									item.checked = true;
								})
								return store;
							});
							_this.allChecked = true;
							_this.cartList = cartList;
							
							
						}
						if(_this.cartList.length==0){
							_this.getGuessYouLike(1);
						}
						
						uni.hideLoading()
						_this.calcTotal();//计算总价
					},
					fail(err){
						uni.hideLoading()
						console.log(err);
					}
				})
				
				  
			},
			//监听image加载完成
			onImageLoad(key, index) {
				this.$set(this[key][index], 'loaded', 'loaded');
			},
			//监听image加载失败
			onImageError(key, index) {
				this[key][index].image = '/static/errorImage.jpg';
			},
			navToLogin(){
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			 //选中状态处理
			check(type, index,childIndex){
				
				if(type === 'item'){
					this.cartList[index].goods[childIndex].checked = !this.cartList[index].goods[childIndex].checked;
					console.log(this.cartList[index].goods)
					let allcheck = true;
					this.cartList[index].goods.forEach((item)=>{
						if(!item.checked){
							allcheck = item.checked;
						}
					})
					this.cartList[index].checked=allcheck;
					
					let globalCheck = true;
					this.cartList.forEach((i)=>{
						if(!i.checked){
							globalCheck = i.checked;
						}
					})
					this.allChecked = globalCheck;
				}
				if(type === 'store'){
					this.cartList[index].checked=!this.cartList[index].checked;
					this.cartList[index].goods.forEach((item)=>{
						item.checked = this.cartList[index].checked;
					})
					let globalCheck = true;
					this.cartList.forEach((i)=>{
						if(!i.checked){
							globalCheck = i.checked;
						}
					})
					this.allChecked = globalCheck;
				}
				if(type ==='all'){
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(store=>{
						store.checked = checked;
						store.goods.forEach((item)=>{
							item.checked = checked;
						})
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//数量
			numberChange(data,index,childIndex,item){
				let token = uni.getStorageSync('token')||"-";
				var _this = this;
				let url ;
				let amount ;
				if(!_this.hasLogin){
					uni.showToast({
						title:'请登录',
						icon:"none"
					})
					return;
				}
				if(data.number>item.goods_num){
					url = api.plusOneToCartItem;
					amount=+1
				}
				if(data.number<item.goods_num){
					 url = api.minusOneToCartItem;
					 amount=-1;
				};
				uni.request({
					url : url,
					method:'POST',
					header:{
						'Authorization' : 'Bearer '+token
					},
					data:{
						'cart_id' : item.id,
						'token' : token
					},
					success(res) {
						if(res.data.status){
							_this.cartList[index].goods[childIndex].goods_num+=amount;
							_this.calcTotal();
						}else{
							_this.cartList[index].goods[childIndex].goods_num-=amount;
						}
					},
					fail(err){
						console.log(err);
					}
				})
				
			},
			//删除
			deleteCartItem(index,cart_id){
				let token = uni.getStorageSync('token');
				var _this = this;
				uni.showLoading({
					title:"删除中"
				})
				uni.request({
					url:api.deleteOneCartItem,
					data:{
						'id':cart_id,
						'token':token
					},
					method:'Post',
					header:{
						'Authorization' : 'Bearer '+token
					},
					success(res) {
						_this.loadData();
					
					},
					fail(err){
						console.log(err);
					}
				})
				
			},
			//清空
			clearCart(){
				uni.showModal({
					content: '清空购物车？',
					success: (e)=>{
						if(e.confirm){
							this.cartList = [];
						}
					}
				})
			},
			//计算总价
			calcTotal(){
				let list = this.cartList;
				if(list.length === 0){
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(store=>{
					store.goods.forEach((item)=>{
						if(item.checked){
							total += item.price_member*item.goods_num;
						}
					})
				})
				
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			async createOrder(){
				let goodsData = [];
				let list = this.cartList;
				list.forEach((store)=>{
					store.goods.forEach((item)=>{
						if(item.checked){
							goodsData.push(item.id)
						}
					})
				})
				
				if(!this.hasLogin){
					uni.showToast({
						title:"请登录",
						icon:'none'
					})
					return;
				}
				if(goodsData.length==0){
					uni.showToast({
						title:"请选最少一样哦",
						icon:'none'
					})
					return;
				}

				uni.navigateTo({
					url: '/modules/common/pages/productDetail/confirmOrder?good_ids='+goodsData.join(','),
					fail(e) {
						console.log(e)
					}
					
				})
				
			},
			async itemsAvailable(){
				uni.showLoading({
					title:'Checking'
				})
				let list = this.cartList;
				let msgPromise = [];
				let msg
				list.forEach(item=>{
					if(item.checked === true){
						//check number of stock
						let token = uni.getStorageSync('token');
						var _this = this;
						var _item = item;
						msgPromise.push(new Promise((resolve,reject)=>{
							uni.request({
								url:api.getStock+item.sku_detail.id,
								header:{
									'Authorization' : 'Bearer '+token
								},
								success(res) {
							
									if(_item.quantity>res.data.body[0].stock){
										var text = ''
										for(let spec in _item.sku_detail.own_spec){
											text+=_item.sku_detail.own_spec[spec]+' '
										}
										resolve(_item.product_detail.name+' '+text+'has only '+res.data.body[0].stock+' left!');
									}							
									resolve('')
								},
								fail(err){
									reject(err);
									console.log(err);
									uni.hideLoading();
								}
							})
						}))
					}
				})
				let hasEnough = true;
				msg =await Promise.all(msgPromise) //wait all request in for loop finish
				for(let i=0;i<msg.length;i++){
					if(msg[i]!=''){
						this.$api.msg(msg[i]);
						hasEnough = false; 
						break;
					}
				}
				
				uni.hideLoading();
				return hasEnough;
			},
			getGuessYouLike(page){
				if(page>1){
					uni.showLoading({
						title:"获取数据中"
					})
				}
				let _this = this;
				uni.request({
					url:api.guessYouLike,
					data:{
						page:page
					},
					success(res) {
						uni.hideLoading();
						if(res.data.data){
							if(page==1){
								_this.recommend_items = res.data.data;
							}else{
								_this.recommend_items = [..._this.recommend_items,...res.data.data];
							}
							console.log(_this.recommend_items);
							_this.page++;
						}else{
							uni.showToast({
								title:"没有数据了哦",
								icon:"none"
							})
						}
					},
					fail(e){
						uni.hideLoading();
						console.log(e);
					}
				})
			},
			navToDetailPage(item){
				//测试数据没有写id，用title代替
				let id = item.id;
				uni.navigateTo({
					url: `/modules/common/pages/productDetail/index?id=${id}`
				})
			},
		},
		onReachBottom(){
			this.page++;
			this.getGuessYouLike(this.page);
		}
	}
</script>

<style lang='scss'>
	.container{
		padding-bottom: 134upx;
		/* 空白页 */
		.empty{
			/* position:fixed;
			left: 0;
			top:0; */
			width: 100%;
			height: 30vh;
			padding-bottom:100upx;
			display:flex;
			justify-content: center;
			flex-direction: column;
			align-items:center;
			background: #fff;
			image{
				width: 240upx;
				height: 160upx;
				margin-bottom:30upx;
			}
			.empty-tips{
				display:flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;
				.navigator{
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
		
	}
	/* 购物车列表项 */
	.store{
		.store-info{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding:5px;
			margin: 0upx 40upx;
			background-color: $light-grey;
			border-radius: 5px;
			.yticon{
				color:#dedede;
				&.checked{
					color:$main-color;
				}
			}
			*{
				color:$font-color-base
			}
		}
	}
	.cart-item{
		display:flex;
		position:relative;
		padding:30upx 40upx;
		.image-wrapper{
			width: 230upx;
			height: 230upx;

			position:relative;
			opacity:1 !important;
			image{
				border-radius:8upx;
				opacity:1 !important;
			}
		}
		.checkbox{
			position:absolute;
			left:-16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background:#fff;
			border-radius: 50px;
		}
		.item-right{
			display:flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position:relative;
			padding-left: 30upx;
			.title,.price{
				font-size:$font-base + 2upx;
				color: $font-color-base;
				height: 40upx;
				line-height: 40upx;
			}
			.attr{
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}
			.price{
				height: 50upx;
				line-height:50upx;
			}
		}
		.del-btn{
			padding:4upx 10upx;
			font-size:34upx; 
			height: 50upx;
			color: $font-color-light;
		}
	}
	/* 底部栏 */
	.action-section{
		/* #ifdef H5 */
		margin-bottom:100upx;
		/* #endif */
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.1);
		border-radius: 16upx;
		.checkbox{
			height:52upx;
			position:relative;
			image{
				width: 52upx;
				height: 100%;
				position:relative;
				z-index: 5;
			}
		}
		.clear-btn{
			position:absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius:0 50px 50px 0;
			opacity: 0;
			transition: .2s;
			&.show{
				opacity: 1;
				width: 120upx;
			}
		}
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: $font-lg;
				color: $font-color-dark;
			}
			.coupon{
				font-size: $font-sm;
				color: $font-color-light;
				text{
					color: $font-color-dark;
				}
			}
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $main-color;
		
		}
	}
	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked{
		color: $main-color;
	}
	.yticon{
		color:#dedede;
		height:auto !important;
		&.checked{
			color:$main-color;
		}
	}
	.recommend-item{
		padding:30rpx;
		.title{
			color:$font-color-light;
			border-top:0.2px solid rgba($color: #000000, $alpha: 0.05);
			text-align: center;
			padding:10rpx
		}
		.items{
			display:flex;
			flex-wrap:wrap;
	/* 		padding: 0 30upx; */
			background: $light-grey;
			.goods-item{
				display:flex;
				flex-direction: column;
				width: 48%;
				padding-bottom: 40upx;
				margin-bottom: 30upx;
				padding:20rpx;
				background:white;
				border-radius: 5px;
				&:nth-child(2n+1){
					margin-right: 4%;
				}
			}
			.image-wrapper{
				width: 100%;
				height: 330upx;
				border-radius: 3px;
				overflow: hidden;
			
				image{
					width: 100%;
					height: 100%;
					opacity: 1;
				}
			}
			.title{
				font-size: $font-lg;
				color: $font-color-dark;
				line-height: 80upx;
			}
			.price-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding-right: 10upx;
				font-size: 24upx;
				color: $font-color-light;
			}
			.price{
				font-size: $font-lg;
				color: $uni-color-primary;
				line-height: 1;
				&:before{
					content: '￥';
					font-size: 26upx;
				}
			}
		}
	}
</style>
