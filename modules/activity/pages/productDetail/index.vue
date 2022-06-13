<template>
	<view class="container">
		<login @logged="refreshData" type="popup"></login>
		<view class="carousel">
			<swiper indicator-dots circular=true duration="400" :autoplay="true" @change="carouselChange" :current="currentCarouselIndex">
				<swiper-item class="swiper-item" v-for="(item,index) in images" :key="index">
					<view class="image-wrapper">
						<image
							:src="config.image_url + item.pic_url" 
							class="loaded" 
							mode="aspectFill"
						></image>
					</view>
				</swiper-item>
				
			</swiper>
			<view class="indicator" v-if="images.length>0">
				{{currentCarouselIndex+1}} / {{images.length}}
			</view>
		</view>
		
		<view class="introduce-section" v-if="productInfo">
			<text class="title">{{productInfo.title}}</text>
			<br>
			<text class="description">{{productInfo.description}}</text>
			<view class="price-box">
				<view >				
					<text class="price">{{productInfo.price_member}}</text>
					<text class="price-tip">元</text>
					<text class="coupon-tip" v-if="productInfo.price_market">原价</text>
					<text class="m-price" v-if="productInfo.price_market">{{productInfo.price_market}}</text>				
				</view>
			</view>
			<view class="bot-row">
				<text>‌已售 : {{productInfo.sales_sum}}</text>
				<text>库存 : {{productInfo.stock}}</text>
				<text>评论 : {{productInfo.comment_member}}</text>
			</view>
		</view>
		<view class="group-buy" v-if="groupBuyPerson.length>0">
			<view class="count">
				<view class="group-open-count">
					{{groupBuyPerson.length}}人在开团 可直接参与
				</view>
				<view class="group-buy-count">
					{{groupBuyPersonCount}}人已拼
				</view>
			</view>
			<view class="person" v-for="person in groupBuyPerson">
				<view class="left">
					<image :src="config.image_url+person.user_header"></image>
					<view class="title">
						{{person.user_name}}的团
					</view>
				</view>
				<view class="right">
					<view class="time">
						<view class="remain">
							还差<text>{{person.surplus}}人成团</text>
						</view>
						<view class="countdown" v-if="person.end_time>0">
							{{person.end_time|milliToDayHourMinute}}
						</view>
						<view class="countdown" v-else>
							拼团以结束
						</view>
					</view>
					<view class="btn" v-if="person.end_time>0">
						去参团
					</view>
					
				</view>
			</view>
		</view>
		
		<!--  分享 -->
		<!-- <view class="share-section" @click="share">
			<view class="share-icon">
				<text class="yticon icon-xingxing"></text>
				 返
			</view>
			<text class="tit">该商品分享可领49减10红包</text>
			<text class="yticon icon-bangzhu1"></text>
			<view class="share-btn">
				立即分享
				<text class="yticon icon-you"></text>
			</view>
			
		</view> -->
		
		<view class="c-list">
			<view class="c-row b-b" @click="toggleSpec">
				<text class="tit">规格</text>
				<view class="con">
					<text class="selected-text">
						{{selectedSkuProduct?selectedSkuProduct.key_text:"请选择"}}
					</text>
				</view>
				<text class="yticon icon-you"></text>
			</view>
			<view class="c-row b-b" >
				<text class="tit">数量</text>
				<view class="con">					
					<view class="selected-text">
						<uni-number-box v-model="selectedQuantity" :min="1" ></uni-number-box>
					</view>
				</view>
				
			</view>
			
			<view class="c-row b-b" @click="toggleCoupon">
				<text class="tit">优惠</text>
				<view class="con">
					
					<template v-if="couponList.length>0">
						<text class="selected-text  coupon" v-for="coupon in couponList.slice(0,2)">
							满{{parseInt(coupon.condition).toFixed(0)}}减{{parseInt(coupon.money).toFixed(0)}}元
						</text>
					</template>
					<text v-else>
						<text class="selected-text">
							暂无
						</text>
					</text>
				</view>
				<text class="yticon icon-you" v-if="couponList.length>0"></text>
			</view>
			<view class="c-row b-b" @click="toggleAddress">
				<text class="tit">送至</text>
				<view class="bz-list con">				
					<text>{{selectedAddress!=null?selectedAddress.dist_name+' '+selectedAddress.city_name+' '+selectedAddress.prov_name:'选择配送地址'}}</text>
				</view>
			</view>
			<view class="c-row b-b">
				<text class="tit">服务</text>
				<view class="bz-list con">
					<text  v-if="merchantDelivery"> 由
						<text @click="toShop(shopInfo.id)">{{shopInfo.shop_name}}</text>&nbsp;负责供货,&nbsp;{{merchantDelivery}}
					</text>
					<text v-else-if="expressDelivery"> 由
						<text @click="toShop(shopInfo.id)" style="color:red">{{shopInfo.shop_name}}</text>在&nbsp;{{expressDelivery.stock_name}}&nbsp;负责发货,&nbsp;{{expressDelivery.send_time}}小时内发货
					</text>
					<text v-else>
						暂无
					</text>
				</view>
			</view>
		</view>

		
		<!-- 评价 -->
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">评价</text>
				<text>({{commentCount}})</text>
				<text class="tip" @click="toCommentPage">查看更多</text>
				<text class="yticon icon-you"></text>
			</view> 
			<template v-if="commentList.length>0">
				<view class="eva-box" >
					<image class="portrait" :src="config.image_url+commentList[0].user_header" mode="aspectFill"></image>
					<view class="right">
						<text class="name">{{commentList[0].nick_name}}</text>
						<text class="con">{{commentList[0].content}}</text>
						<view class="bot">
							<text class="attr">购买类型：未知</text>
							<text class="time">{{commentList[0].create_time}}</text>
						</view>
					</view>
				</view>
			</template>
			<view class="eva-box" v-if="commentList.length==0">
				<view class="empty">
					没有评论哦
				</view>
			</view>
		</view>
		<view class="eva-section">
			<view class="e-header">
				<text class="tit">商家咨询<text>({{consultCount}})</text></text>
				
				<text class="tip" @click="toConsultPage">查看更多<text class="yticon icon-you"></text></text>
				
			</view> 
			<template v-if="consultList.length>0">
				<view class="consult-box" >
					<view class="question">
						<view class="question-icon">问</view>
						{{consultList[0].content}}
					</view>
					<view class="answer">
						<view class="answer-icon" v-if="consultList[0].answer">答</view>
						{{consultList[0].answer||"还没有回复哦"}}
					</view>
				</view>
			</template>
			<view class="eva-box" v-if="consultList.length==0">
				<view class="empty">
					还没有咨询哦
				</view>
			</view>
		</view>
		<view class="eva-section">
			<view class="e-header">
				<view class="tit">
					<view class="image">
						<image :src="config.image_url+shopInfo.store_logo"></image>
					</view>
					<view class="title">
						<view class="name" v-if="shopInfo">{{shopInfo.shop_name}}</view>
						<view class="intro" v-if="shopInfo">
							{{shopInfo.description}}
						</view>
					</view>
				</view>
				<view class="tip">
					<view class="level">
						<text v-if="shopInfo.store_grade_name">{{shopInfo.store_grade_name}}</text>
					</view>
				</view>
			</view> 
			<view class="eva-box store" >
				<view class="score">
					<view class="box">
						<text class="count">{{shopInfo.goodsNumber}}</text>
						<text class="title">全部宝贝</text>
					</view>
					<view class="box">
						<text class="count">{{shopInfo.store_collect}}</text>
						<text class="title">关注人数</text>
					</view>
					<view class="box">
						<text class="count">{{shopInfo.desccredit}}</text>
						<text class="title">描述相符</text>
					</view>
					<view class="box">
						<text class="count">{{shopInfo.servicecredit}}</text>
						<text class="title">服务态度</text>
					</view>
					<view class="box">
						<text class="count">{{shopInfo.deliverycredit}}</text>
						<text class="title">发货速度</text>
					</view>
				
				</view>
				<view class="btn">
					<view class="b category">
						查看分类
					</view>
					<view class="b more">
						见店逛逛
					</view>
				</view>
			</view>
		</view>
		<view class="eva-section product-detail">
			<text class="title">商品详情</text>
			<view class="content" >
				<u-parse :content="goodsDetail" @preview="preview" @navigate="navigate" noData=" " />
			</view>
			<view class="table">
				<u-table>
					<u-tr>
						<u-th>属性</u-th>
						<u-th>详情</u-th>
					</u-tr>
					<u-tr>						
						<u-td>商品名称</u-td>
						<u-td>{{productInfo.title}}</u-td>
					</u-tr>
					<u-tr v-for="attr in goodsAttr">
						
						<u-td>{{attr.attr_name}}</u-td>
						<u-td>{{attr.attr_value}}</u-td>
					</u-tr>
					
				</u-table>
			</view>
		</view>
		<view class="eva-section">
			<text class="title">推荐套餐</text>
			<view class="content" v-if="recommendSet.length>0">
				<!-- <u-grid :col="3">
					<u-grid-item v-for="set in recommendSet">
						<image></image>
						<view class="title">{{set.title}}</view>
						<view class="price">{{set.price}}</view>
					</u-grid-item>
				</u-grid> -->
				<view class="btn">
					<view class="b">
						查看更多
					</view>
				</view>
			</view> 
			<view class="content" v-else style="text-align: center;font-size: 5px;color: #C0C4CC;">
				暂无套餐
			</view>
			
		</view>
		
		<!-- <view class="detail-desc">
			<view class="d-header">
				<text>图文详情</text>
			</view>
			<rich-text :nodes="desc"></rich-text>
		</view> -->
		
		<!-- 底部操作菜单 -->
		<view class="page-bottom">
			<navigator url="/modules/home/pages/index/index" open-type="switchTab" class="p-b-btn">
				<text class="yticon icon-xiatubiao--copy"></text>
				<text>首页</text>
			</navigator>
			<navigator url="/modules/cart/pages/index/index" open-type="switchTab" class="p-b-btn" style="position: relative;">
				<!-- <u-badge type="error" :count="cartBadge" overflow-count="9" style="position: absolute;top:-10px;right:-10px"></u-badge> -->
			
				<text class="yticon icon-gouwuche"></text>
				<text>购物车</text>
			</navigator>
			<view class="p-b-btn" :class="{active: favorite}" >
				<text class="yticon icon-shoucang"></text>
				<text>收藏</text>
			</view>
			
			<view class="action-btn-group">
				<button type="primary" class=" action-btn no-border buy-now-btn" @click="toOrder">
					<text></text>
					原价购
				</button>
				<button type="primary" class=" action-btn no-border add-cart-btn" @click="addToCart">我要开团</button>
			</view>
		</view>
		
		
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="specClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleSpec"
			
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer" @click.stop="stopPrevent">
				<text class="popup-title">选择规格</text>
				<view class="middle attr-content">
					<view class="a-t" v-if="!noProductMatch">
						<image :src="config.image_url+tempSelectedSkuProduct.pic_url"></image>
						<view class="right">
							<text class="price">{{tempSelectedSkuProduct.price_member}} 元
								<text class="price-market" v-if="tempSelectedSkuProduct.price_market">{{tempSelectedSkuProduct.price_market}} 元</text>
							</text>
							<text class="stock">库存：{{tempSelectedSkuProduct.stock||0}}</text>
							<view class="selected">
								已选：
								<text class="selected-text" >
									{{tempSelectedSkuProduct.key_text}}
								</text>
							</view>
						</view>
					</view>
					<view class=" a-t" v-else>
						<!-- 没有选定规格的商品的时候显示 -->
						<image src="@/static/images/common/empty-data.png" ></image>
						<view class="right">
							<text class="price">暂无数据
								<text class="price-market"></text>
							</text>
							<text class="stock">库存：暂无数据</text>
							<view class="selected">
								已选：
								<text class="selected-text" >
									暂无数据
								</text>
							</view>
						</view>
					</view>
					
					<view v-for="specGroup in specGroup" :key="specGroup.id" class="attr-list">
						<text>{{specGroup.name}}</text>
						<view class="item-list">
							<!-- <text 
								v-for="(childItem, childIndex) in specChildList" 
								v-if="childItem.pid === item.id"
								:key="childIndex" class="tit"
								:class="{selected: childItem.selected}"
								@click="selectSpec(childIndex, childItem.pid)"
							>
								{{childItem.name}}
							</text> -->
							<template  v-for="(spec,specIndex) in specChild">
								<text v-if="specGroup.id == spec.spec_id" :class="{selected: tempSelectedSpecKey[spec.spec_id]==spec.id}"  @click="selectSpec(spec)">
									{{spec.item}}
									
								</text>
							</template>
						
						</view>
					</view>
				</view>
				
				<view class="bottom">
					<button :class="['btn',tempSelectedSkuProduct.stock<=0||noProductMatch?'disabled':'']" :disabled="tempSelectedSkuProduct.stock<=0||noProductMatch" @click="confirmSelectedSpec">完成</button>
				</view>
			</view>
		</view>
		<!-- 规格-模态层弹窗 -->
		<view 
			class="popup spec" 
			:class="couponClass"
			@touchmove.stop.prevent="stopPrevent"
			@click="toggleCoupon"
			
		>
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<view class="layer " @click.stop="stopPrevent">
				<text class="popup-title">领取优惠劵</text>
				<view class="middle attr-content">
					<view class="coupon-box" v-for="(coupon,index) in couponList" >
						<view class="info">
							<view class="money">
								￥{{coupon.money}} <text class="title">{{coupon.name}}</text>
							</view>
							<view class="condition">
								满{{coupon.condition}}元可以使用
							</view>
							<view class="date">
								有效期 {{coupon.use_start_time|date}} - {{coupon.use_end_time|date}}
							</view>
						</view>
						<view class="receive-coupon">
							<text v-if="coupon.status==1" style='opacity:0.3'>以领取</text>
							<text v-else @click="()=>receiveCoupon(coupon)">点击领取</text>
						</view> 
					</view>
				</view>
				
			</view>
		</view>
		<!-- 地址-模态层弹窗 -->
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
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="580"
			:shareList="shareList"
		></share>
	</view>
</template>

<script>
	import share from '@/components/share';
	import uniNumberBox from '@/components/uni-number-box/uni-number-box.vue'
	import api from '@/api.js'
	import config from '@/config.js'
	import {mapMutations,mapState,mapActions} from 'vuex'
	import uParse from '@/components/gaoyia-parse/parse.vue'  
	export default{
		components: {
			share,
			uniNumberBox,
			uParse
		},
		data() {
			return {
		
				specClass: 'none',
				couponClass: 'none',
				addressClass: 'none',
				
				favorite: true,
				shareList: [],
				
				images:[],//轮播图
				currentCarouselIndex:0,//当前轮播图Index
				productInfo:null,
				skuProducts:[],//规格商品
				specChild:[],//子规格
				specGroup:[],//父规格
				selectedSkuProduct:null,//已选规格
				selectedQuantity : 1,//defualt 1; 已选数量 
				selectedSpecKey : {},//已选 规格
				noProductMatch : true, //是否有 已选中的规格商品
				tempSelectedSkuProduct:null,//临时 规格商品 用于 在 弹穿显示
				tempSelectedSpecKey:null,
				tempSelectedAddress:null,//临时地址
			
				couponList:[],//优惠劵
				commentList:[],//评论
				commentCount:0,//评论数量
				consultList:[],//咨询
				consultCount:0,
				
				merchatDelivery:'',
				deliveryCal:'',//配送费
				freightCal:'',//运费
				expressDelivery:'',
				shopInfo:null,
				goodsDetail:'',//商品详情
				goodsAttr:[],
				recommendSet:[],//推荐套餐
				config,
				desc: `
					<div style="width:100%">
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i4/479184430/O1CN01nCpuLc1iaz4bcSN17_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd2.alicdn.com/imgextra/i2/479184430/O1CN01gwbN931iaz4TzqzmG_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd3.alicdn.com/imgextra/i3/479184430/O1CN018wVjQh1iaz4aupv1A_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd4.alicdn.com/imgextra/i4/479184430/O1CN01tWg4Us1iaz4auqelt_!!479184430.jpg_400x400.jpg" />
						<img style="width:100%;display:block;" src="https://gd1.alicdn.com/imgextra/i1/479184430/O1CN01Tnm1rU1iaz4aVKcwP_!!479184430.jpg_400x400.jpg" />
					</div>
				`,
				cartBadge:0,
				groupBuyPerson:[],//开团人
				groupBuyPersonCount:0,//开团人数
				timer:null
			};
		},
		computed:{
		
			
			...mapState(['cart','hasLogin','addressList','selectedAddress'])
		},
		onPullDownRefresh() {
			
			uni.showLoading({
				title:'加载数据中'
			})
			let _this = this;
			uni.request({
				url:api.getProductInfoById+'?id='+_this.productInfo.id,
				success: (res) => {
					uni.hideLoading();
					if(res.data.data){
						this.images = res.data.data.images;
						this.productInfo = res.data.data.goods;
						//获取 优惠劵
						_this.getProductComment();
						_this.getCouponList();
						_this.getAddressList();
						_this.getConsultList();
						_this.getShopInfo();
						_this.getGoodDetail();//商品详情
						_this.getGoodAttr();
						_this.getRecommendSet();//获取推荐套餐
					}			
				},
				fail:(res)=>{				
					console.log(res);
				}
			})			
			uni.request({
				url:api.getProductSpec+'?id='+_this.productInfo.id,
				success:(res)=>{
					uni.hideLoading();
					if(res.data.data){
						this.skuProducts = res.data.data.goods;
						this.specChild = res.data.data.spec.spec_children;
						this.specGroup = res.data.data.spec.spec_group;
						
						this.skuProducts.map((sku)=>{
							// 根据 key 添加 规格名称
							sku.key_text = '';
							let keys = sku.key.split('_');
							let specKey = {} // 将 此商品的 规格 转成 object
							keys.forEach((key)=>{
								let temp = this.specChild.find((spec)=>spec.id == key);
								if(temp!=-1){
									specKey[temp.spec_id] = temp.id;
									sku.key_text+=temp.item+' ';
								}
							})
							sku.specKey = specKey;
							return sku
						})
						
						if(this.skuProducts.length>0){
							this.selectedSkuProduct = this.skuProducts[0];
							this.generateSpecKeyObject();
							this.noProductMatch = false;
							this.tempSelectedSkuProduct = {...this.selectedSkuProduct};
							this.tempSelectedSpecKey = {...this.selectedSpecKey};
						}
						
						
						
					}
				},
				fail:(res)=>{
					uni.hideLoading();
				}
			})
		},
		async onLoad(options){
			
			
			
			//接收传值,id里面放的是标题，因为测试数据并没写id 
			let id = options.goodId;
		
			let group_buy_product_id = options.id;
			//fetch data from server
			uni.showLoading({
				title:'加载数据中'
			})
			let _this = this;
			uni.request({
				url:api.getGroupBuyProductDetail+'?id='+group_buy_product_id+"&goods_id="+id,
				success: (res) => {
					uni.hideLoading();
					if(res.data.data){
						
						return;
						this.images = [res.data.data.pic_url];
						this.productInfo = res.data.data;
						this.shopInfo = res.data.data.store;
						//获取 优惠劵
						_this.getProductComment();
						_this.getCouponList();
						_this.getAddressList();
						_this.getConsultList();
						_this.getShopInfo();
						// _this.getGoodDetail();//商品详情
						// _this.getGoodAttr();
						// _this.getRecommendSet();//获取推荐套餐
					}			
				},
				fail:(res)=>{				
					console.log(res);
				}
			})
		
			// api.getGroupBuyPerson+
			uni.request({
				url:'https://api.shopsn.net/wap/public/index.php/Promotion/getLackingPeopleGroupBuy?id='+group_buy_product_id,
				success(res) {
					if(res.data.data){										
						_this.timer = setInterval(()=>{						
							//更新 拼团 剩余数据	
							let end = true;						
							_this.groupBuyPerson.map(person=>{
						
								if(person.end_time>1000){
									//每秒 减去 一千 毫秒
									person.end_time=person.add_time-1000
									end = false
								}
								
								return person
							})
							if(end){						
								clearInterval(_this.timer)
							}
						},1000)
						_this.groupBuyPersonCount = res.data.data.totalPerson;
					}
				},
				fail(e) {
					console.log(e);
				}
			})			
			uni.request({
				url:api.getProductSpec+'?id='+id,
				success:(res)=>{
					uni.hideLoading();
					if(res.data.data){
						this.skuProducts = res.data.data.goods;
						this.specChild = res.data.data.spec.spec_children;
						this.specGroup = res.data.data.spec.spec_group;
						
						this.skuProducts = this.skuProducts.filter((sku)=>{
							return sku.id == _this.productInfo.id;
						})//去除多余的 规格
						
						this.skuProducts.map((sku)=>{
							// 根据 key 添加 规格名称
							sku.key_text = '';
							let keys = sku.key.split('_');
							let specKey = {} // 将 此商品的 规格 转成 object
							keys.forEach((key)=>{
								let temp = this.specChild.find((spec)=>spec.id == key);
								if(temp!=-1){
									specKey[temp.spec_id] = temp.id;
									sku.key_text+=temp.item+' ';
								}
							})
							sku.specKey = specKey;
							return sku
						})
						
						
						if(this.skuProducts.length>0){
							this.selectedSkuProduct = this.skuProducts[0];
							this.generateSpecKeyObject();
							this.noProductMatch = false;
							this.tempSelectedSkuProduct = {...this.selectedSkuProduct};
							this.tempSelectedSpecKey = {...this.selectedSpecKey};
						}
						
						
						
					}
				},
				fail:(res)=>{
					uni.hideLoading();
				}
			})
			
			
			
			
			//规格 默认选中第一条
			// this.specList.forEach(item=>{
			// 	for(let cItem of this.specChildList){
			// 		if(cItem.pid === item.id){
			// 			this.$set(cItem, 'selected', true);
			// 			this.specSelected.push(cItem);
			// 			break; //forEach不能使用break
			// 		}
			// 	}
			// })
			// this.shareList = await this.$api.json('shareList');
		},
		methods:{
			//规格弹窗开关
			...mapMutations(['toggleLoginPopup','setAddressList','updateCart']),
			
			...mapActions(['asyncGetAddressList']),
			toggleSpec() {			
				if(this.specClass === 'show'){
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				}else if(this.specClass === 'none'){
					this.specClass = 'show';
					this.tempSelectedSkuProduct = {...this.selectedSkuProduct};
					this.tempSelectedSpecKey = {...this.selectedSpecKey};
				}
			},
			toOrder(){
				let _this = this;
				console.log('txt'+_this.hasLogin);
				console.log('ttt'+this.hasLogin);
				if(!this.hasLogin){
					uni.showToast({
						title:"请登录",
						icon:'none'
					})
					return;
				}
				
				uni.navigateTo({
					url: '/modules/common/pages/productDetail/confirmOrder?good_id='+_this.productInfo.id+'&num='+_this.selectedQuantity,
					fail(e) {
						console.log(e)
					}
					
				})
			},
			toggleCoupon(){
				

				if(this.couponList.length<=0) return;
				if(this.couponClass === 'show'){
					this.couponClass = 'hide';
					setTimeout(() => {
						this.couponClass = 'none';
					}, 250);
				}else if(this.couponClass === 'none'){
					let token = uni.getStorageSync("token");
					if(!token){
						this.toggleLoginPopup();
						return;
					}
					this.couponClass = 'show';
				}
				//优惠劵
			},
			//送货地址
			toggleAddress(){
				
				if(this.addressClass === 'show'){
					this.addressClass = 'hide';
					setTimeout(() => {
						this.addressClass = 'none';
					}, 250);
				}else if(this.addressClass === 'none'){
					let token = uni.getStorageSync("token");
					if(!token){
						this.toggleLoginPopup();
						return;
					}
					this.addressClass = 'show';
				}
				//优惠劵
			},
			//完成规格选项
			confirmSelectedSpec(){
				if(!this.noProductMatch){
					this.selectedSkuProduct = {...this.tempSelectedSkuProduct};
					this.selectedSpecKey = {...this.tempSelectedSpecKey};
				}
				this.toggleSpec();
			},
			addNewAddress(){
				uni.navigateTo({
					url:'modules/common/pages/addNewAddress/index'
				})
			},
			//选择规格
			selectSpec(spec){
				if(this.tempSelectedSpecKey[spec.spec_id]&&this.tempSelectedSpecKey[spec.spec_id]==spec.id){
					//取消选择
					delete this.tempSelectedSpecKey[spec.spec_id];
				}else{
					this.tempSelectedSpecKey[spec.spec_id]=spec.id;
					this.tempSelectedSpecKey = this.tempSelectedSpecKey;
				}
				
				//get the price from sku for this spec
				let _this = this ;
				let current = this.skuProducts.find(function(sku){
					return JSON.stringify(sku.specKey) == JSON.stringify(_this.tempSelectedSpecKey);
				})
			
			
				if(current==undefined||current==-1){
					
					this.noProductMatch = true;
				}else{
					this.tempSelectedSkuProduct = current
					this.noProductMatch = false;// 没有可用的 规格 商品
				}
			
				
				
			},
			//生成 已选 规格 对象
			generateSpecKeyObject(){
				let selectedSpecKey = {};
		
				this.selectedSkuProduct.key.split('_').forEach((key)=>{
					let temp = this.specChild.find((spec)=>spec.id == key);
					if(temp!=-1){					
						selectedSpecKey[temp.spec_id] = temp.id;
					}
				})
				this.selectedSpecKey = selectedSpecKey;
				
			},
			getCouponList(){
				let _this = this;
				uni.request({
					url:api.getCouponList+'?store_id='+this.productInfo.store_id,
					method:'POST',
					data:{
						token:uni.getStorageSync('token')
					},
					success(result) {								
						if(result.data.data){									
								_this.couponList = result.data.data.records																																					
						}
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			//领取优惠劵
			receiveCoupon(coupon){
				let _this = this;
				uni.showLoading({
					title:"领取优惠劵中"
				})
				uni.request({					
					url:api.getCoupon,
					method:'POST',
					data:{
						token:uni.getStorageSync('token'),
						id:coupon.id
					},
					success(result) {
						uni.hideLoading()
						console.log(result);
						if(result.data.data){																		
								uni.showToast({
									title:"领卷成功"
								})
								_this.couponList.map((c)=>{
									if(c.id==coupon.id){
										c.status = 1;
									}
									return c;		
								})					
																																				
						}else{
							if(result.data.status==10001){
								_this.toggleLoginPopup();							
							}
						}
						
					},
					fail(e) {
						uni.hideLoading()
						console.log(e);
						uni.showToast({
							title:"领取失败"
						})
					}
				})
			},
			getAddressList(){
				
				let _this = this;
				_this.asyncGetAddressList();
				console.log(this.selectedAddress);
				
				// uni.request({
				// 	url:api.getUserAddress,
				// 	method:'POST',
				// 	data:{
				// 		token:uni.getStorageSync('token')
				// 	},
				// 	success(result) {								
				// 		if(result.data.data){									
				// 				_this.setAddressList(result.data.data);																																				
				// 		}
				// 	},
				// 	fail(e) {
				// 		console.log(e);
				// 	}
				// })
			},
			getProductComment(){
				let _this = this;
				uni.request({
					url:api.getProductComment+'?goods_id='+_this.productInfo.id+'&type=0&status=4&page=1',
					method:'GET',
					success(result) {								
						if(result.data.data){									
								_this.commentList = result.data.data.list
								_this.commentCount = result.data.data.allCount																																					
						}
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			//选择地址
			selectAddress(address){
				this.addressList.map((a)=>{
					if(a.id==address.id){
						a.selected = true;
						this.selectedAddress=a;
					}else{
						a.selected = false;
					}
					return a;
				})
				this.toggleAddress();
			},
			getConsultList(){
				let _this = this;
				uni.request({
					url:api.getConsultList+'?page=1&'+'goods_id='+_this.productInfo.id,
					method:'GET',
					success(result) {								
						if(result.data.data){									
								_this.consultList = result.data.data.records;
								_this.consultCount = result.data.data.countTotal;																																					
						}
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			toCommentPage(){
				let _this = this;
				uni.navigateTo({
					url: 'modules/common/pages/productComment/index?id='+_this.productInfo.id,
					
				})
			},
			toConsultPage(){
				let _this = this;
				uni.navigateTo({
					url: 'modules/common/pages/productConsult/index?id='+_this.productInfo.id,
					
				})
			},
			//登录后 刷新数据
			refreshData(){
				this.getCouponList();
				this.getAddressList();
			},
			//分享
			share(){
				this.$refs.share.toggleMask();	
			},
			//收藏
			toFavorite(){
				this.favorite = !this.favorite;
			},
			buy(){
				uni.navigateTo({
					url: `/pages/order/createOrder`
				})
			},
			stopPrevent(){},
			addToCart(){
				var _this = this;
				uni.showLoading({
					title:'加入购物车中'
				})
				let token = uni.getStorageSync('token');
				
				uni.request({
					url : api.addToCart,
					method:'post',
					header:{
						'Authorization' : 'Bearer '+token
					},
					data:{
						'goods_id': _this.selectedSkuProduct.id,
						'price_new': _this.selectedSkuProduct.price_member,
						'goods_num':_this.selectedQuantity,
						'store_id':_this.shopInfo.id,
						'token':uni.getStorageSync('token')||'-'
					},
					success(res) {
						if(res.data.status==10001){
							uni.hideLoading();
							uni.showToast({
								title:res.data.message,
								icon:'none'
							})
							_this.setHasLogin(false);
						}
						uni.hideLoading();
						if(res.data.status==1){
							_this.updateCart({type:"add",item:_this.selectedSkuProduct});
						}
						uni.showToast({
							title:'加入成功'
						})
					},
					fail(err){
						uni.hideLoading();
						uni.showToast({
							title:'加入失败',
							icon:'none'
						})
					}
				})
			},
			getExpressInfo(){

				let _this = this;
				uni.request({
					url:api.getExpressInfo,
					data:{
						goods_id: this.productInfo.id,
						token: uni.getStorageSync("token"),
					},
					method:"POST",
					success(res) {
						_this.expressDelivery = res.data.data
					},
					fail(err) {
						_this.expressDelivery = err.data.data;
						console.log(err);
					}
				})
			},
			quantityChange(data){
				this.selectedQuantity = data.number;
			},
			carouselChange(e){
				this.currentCarouselIndex = e.detail.current;
			},
			getShopInfo(){
				let _this = this;
				uni.request({
					url:api.shopInfo,
					data:{
						token:uni.getStorageSync("token"),
						id: _this.productInfo.store_id,
					},
					success(res) {
						_this.shopInfo = res.data.data;
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			getGoodDetail(){
				console.log("getting good detail")
				let _this = this;
				uni.request({
					url:api.goodsDetail,
					data:{
						goods_id:_this.productInfo.id
					},
					method:"POST",
					success(res) {
						_this.goodsDetail = res.data.data;
						console.log(_this.goodsDetail);
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			getGoodAttr(){
				let _this = this;
				uni.request({
					url:api.goodsAttr,
					data:{
						id:_this.productInfo.id
					},
					method:"POST",
					success(res) {
						console.log(res);
						if(res.data.data){
							_this.goodsAttr = res.data.data.attr;
						}
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			getRecommendSet(){
				return ;
				let _this = this;
				uni.request({
					url:api.recommendSet,
					data:{
						goods_id:_this.productInfo.id
					},
					method:"POST",
					success(res) {
						console.log(res);
						if(res.data.data){
							_this.recommendSet = res.data.data;
						}
					},
					fail(e) {
						console.log(e);
					}
				})
			}
		},
		filters:{
			discount(price,discount){
				return ((price*discount)/100.00).toFixed(2);
			},
			date(timestamp){
				var date = new Date(timestamp);
				return date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()
			},
			milliToDayHourMinute(t){
				
			    var cd = 24 * 60 * 60 * 1000,
			        ch = 60 * 60 * 1000,
			        d = Math.floor(t / cd),
			        h = Math.floor( (t - d * cd) / ch),
			        m = Math.round( (t - d * cd - h * ch) / 60000),
			        pad = function(n){ return n < 10 ? '0' + n : n; };
			  if( m === 60 ){
			    h++;
			    m = 0;
			  }
			  if( h === 24 ){
			    d++;
			    h = 0;
			  }
			  return [d+"天", pad(h)+"时", pad(m)+"分"].join('');
			}
		},
		watch:{
			selectedAddress(newVal,oldVal){
				let _this =this;
				if(newVal){
					uni.request({
						url:api.deliveryCalc,
						method:'POST',
						data:{
							token:uni.getStorageSync("token"),
							goods_id: _this.productInfo.id,
							prov_id: newVal.prov,
							dist_id: newVal.dist,
							city_id: newVal.city,
							store_id: _this.productInfo.store_id
						},
						success(res) {
							if(res.data.status == 1) {
							  _this.deliveryCal=res.data.data.money;
							  _this.merchantDelivery = res.data.data.transport;
							}
							if(res.data.status == 0) {
							    uni.request({
							    	url:api.freightCalc,
									method:'POST',
									data:{
										token:uni.getStorageSync("token"),
										goods_id: _this.productInfo.id,
										prov_id: newVal.prov,
										dist_id: newVal.dist,
										city_id: newVal.city,
										store_id: _this.productInfo.store_id
									},
									success(res) {
										_this.freightCal=res.data.data;
									
									},
									fail(e) {
										console.log(e)
									}
							    })   
								_this.getExpressInfo();				   
							}
						},
						fail(e) {
							console.log(e);
						}
					})
				}
			},
			cart(newVal,oldVal){
				this.cartBadge= newVal.length;
			}
		}

	}
</script>

<style lang='scss'>
	page{
		background: $page-color-base;
		padding-bottom: 160rpx;
		
	}
	.container{
		margin-bottom: 100upx;
	}
	.icon-you{
		font-size: $font-base + 2upx;
		color: #888;
	}
	.carousel {
		height: 722upx;
		position:relative;
		swiper{
			height: 100%;
		}
		.image-wrapper{
			width: 100%;
			height: 100%;
		}
		.swiper-item {
			display: flex;
			justify-content: center;
			align-content: center;
			height: 750upx;
			overflow: hidden;
			image {
				width: 100%;
				height: 100%;
			}
		}
		.indicator{
			position:absolute;
			z-index: 100;
			bottom:50rpx;
			right:0;
			border-radius: 20px 0px 0px 20px;
			background: rgba($color: #000000, $alpha: 0.2);
			color: white;
			padding:10rpx 30rpx;
		}
		
	}
	
	/* 标题简介 */
	.introduce-section{
		background: #fff;
		padding: 20upx 30upx;
		
		.title{
			font-size: 32upx;
			color: $font-color-dark;
			height: 50upx;
			line-height: 50upx;
		}
		.description{
			font-size: 25upx;
			color: rgba($color: #000000, $alpha: 0.4)
			
		}
		.price-box{
			display:flex;
			align-items:baseline;
			height: 64upx;
			padding: 10upx 0;
			font-size: 26upx;
			color:$main-color;
		}
		.price{
			font-size: $font-lg + 2upx;
		}
		.price-tip{
			margin-left:10rpx;
		}
		.m-price{
			margin:0 12upx;
			color: $main-color;
			text-decoration: line-through;
		}
		.coupon-tip{
			align-items: center;
			padding: 4upx 10upx;
			background: $main-color;
			font-size: $font-sm;
			margin-left:30rpx;
			color: #fff;
			border-radius: 6upx;
			line-height: 1;
			transform: translateY(-4upx); 
		}
		.bot-row{
			display:flex;
			align-items:center;
			height: 50upx;
			font-size: $font-sm;
			color: $font-color-light;
			text{
				flex: 1;
			}
		}
	}
	.group-buy{
		display: flex;
		flex-direction: column;
		background-color: rgba($color: #ff5e59, $alpha: 0.05);
		padding:20rpx;
		border-radius: 10px;
		.count{
			display: flex;
			align-items: center;
			color: #ff5e59;
			justify-content: space-between;
			padding-bottom:10px;
		}
		.person{
			display: flex;
			align-items: center;
			justify-content: space-between;
			background-color: white;
			margin-bottom: 5px;
			border-radius: 5px;
			padding:0px 10px;
			height: 50px;
			.left{
				display: flex;
				align-items: center;
				image{
					border-radius: 50px;
					width:35px;
					height: 35px;
					background-color: white;
				}
				.title{
					padding-left:5px;
					color:$font-color-dark;
					font-size: 10px;
				}
			}
			.right{
				display: flex;
				align-items: center;
				
				.time{
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					.remain{
						font-size: 10px;
						color:$font-color-dark
					}
					.countdown{
						padding-top: 5px;
						 font-size: 10px;
						 color:$font-color-light;
					}
				}
				.btn{
					margin-left: 10px;
					background:linear-gradient(30deg,red,pink);;
					color:white;
					width:50px;
					height: 30px;
					display: flex;
					align-items: center;
					justify-content: center;
					font-size: 10px;
					border-radius: 50px;
				}
			}
		}
	}
	/* 分享 */
	.share-section{
		display:flex;
		align-items:center;
		color: $font-color-base;
		background: linear-gradient(left, #fdf5f6, #fbebf6);
		padding: 12upx 30upx;
		.share-icon{
			display:flex;
			align-items:center;
			width: 70upx;
			height: 30upx;
			line-height: 1;
			border: 1px solid $uni-color-primary;
			border-radius: 4upx;
			position:relative;
			overflow: hidden;
			font-size: 22upx;
			color: $uni-color-primary;
			&:after{
				content: '';
				width: 50upx;
				height: 50upx;
				border-radius: 50%;
				left: -20upx;
				top: -12upx;
				position:absolute;
				background: $uni-color-primary;
			}
		}
		.icon-xingxing{
			position:relative;
			z-index: 1;
			font-size: 24upx;
			margin-left: 2upx;
			margin-right: 10upx;
			color: #fff;
			line-height: 1;
		}
		.tit{
			font-size: $font-base;
			margin-left:10upx;
		}
		.icon-bangzhu1{
			padding: 10upx;
			font-size: 30upx;
			line-height: 1;
		}
		.share-btn{
			flex: 1;
			text-align:right;
			font-size: $font-sm;
			color: $uni-color-primary;
		}
		.icon-you{
			font-size: $font-sm;
			margin-left: 4upx;
			color: $uni-color-primary;
		}
	}
	
	.c-list{
		font-size: $font-sm + 2upx;
		color: $font-color-base;
		background: #fff;
		.c-row{
			display:flex;
			align-items:center;
			padding: 20upx 30upx;
			position:relative;
		}
		.tit{
			width: 140upx;
		}
		.con{
			flex: 1;
			color: $font-color-dark;
			.selected-text{
				margin-right: 10upx;
				position: relative;
			}
			.coupon{
				padding:10rpx 20rpx;
				color:white;
				background-size: 50%;
				background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMQAAAAsCAYAAAA6sReEAAAABHNCSVQICAgIfAhkiAAAARtJREFUeJzt2UFNxFAYhdHbyQgoElBCcPAcIAFwAA5AAgqoBKTggEFBWcwU/mSSLqck75xdu3qL3rTNN8wtH0luAtzutj4B/CcGAYVBQLFL8pDkKsljku9tjwMX95zkOscNZJ9kHKYckrzMLZ9J3jc8HFzS6zDlabmY2/ENcVhuDFOmTY4F2zh73v1DQLFLMi4Xc0vb8CxwaWfP+z7JYW4Zk9wlf99T0IH7ueUrydtyY1Cq4ZdSDZVBQGEQUCjV9E6phhOlGgqlGtYo1fRMqYZCqYYVSjVUBgGFQUChVNM7pRpOlGoolGpYo1TTM6UaCqUaVijVUBkEFAYBhVJN75RqOFGqoVCqYY1STc+UaiiUalihVENlEFAYBBQ/rsBmN03d/tQAAAAASUVORK5CYII=) no-repeat
			}
		}
		.bz-list{
			min-height: 40upx;
			font-size: $font-sm+2upx;
			color: $font-color-dark;
			text{
				display: inline-block;
				margin-right: 30upx;
			}
		}
		.con-list{
			flex: 1;
			display:flex;
			flex-direction: column;
			color: $font-color-dark;
			line-height: 40upx;
		}
		.red{
			color: $uni-color-primary;
		}
	}
	
	/* 评价 */
	.eva-section{
		display: flex;
		flex-direction: column;
		padding: 20upx 30upx;
		background: #fff;
		margin-top: 16upx;
		.e-header{
			display: flex;
			align-items: center;
			min-height: 70upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;
			.tit{
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				margin-right: 4upx;
				display:flex;
				
				.image{
					image{
						width:40px;
						height:40px;
						border-radius: 5px;
						background-color: $light-grey;
					}
					margin-right: 5px;
				}
				.title{
					display: flex;
					flex-direction: column;
					align-items: flex-start;
					justify-content: center;
					.name{
						color:black;
						font-size: 10px;
						font-weight: bold;
					}
					.intro{
						color:grey;
						font-size: 9px;
						margin-top:5px;
					}
				}
			}
			.tip{
				flex: 1;
				text-align: right;
				.level{
					text{
						padding:3px 5px;
						background-color: $main-color;
						color:white;
						border-radius: 5px;
					}
					
				}
			}
			.icon-you{
				margin-left: 10upx;
			}
		
		}
		&.product-detail{
			padding:0px;
			.title{
				width: 100%;
				text-align: center;
				color: grey;
				font-size: 10px;
				padding:10px 0px;
			}
			.content{
				width:100%;
			}
			.table{
				padding:0px 10px;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		&.store{
			display: flex;
			flex-direction: column;
		}
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
			background-color: $light-grey;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
		.empty{
			flex:1;
			text-align: center;
		}
		.score{
			display:flex;
			align-items: center;
			justify-content: space-around;
			.box{
				display: flex;
				flex-direction: column;
				align-items: center;
				.count{
					font-weight: bold;
					margin-bottom: 8px;
				}
				.title{
					font-size: 8px;
				}
			}
			margin:10px 0px 20px 0px;
		}
		.btn{
			display:flex;
			align-items: center;
			justify-content: center;
			margin-bottom:10px;
			.b{
				padding: 5px 10px;
				color:$main-color;
				border-radius:50px;
				border:1px solid $main-color;
				margin:0px 20px;
			}
		}
	}
	.consult-box{
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		.question{
			font-weight: bold;
			font-size:11px;
			margin-bottom:15rpx;
			display:flex;
			.question-icon{
				font-weight: normal;
				padding:10rpx;
				font-size: 6px;
				border-radius: 50%;
				color:white;
				background:linear-gradient(to right,blue,lightblue);
				margin-right: 20rpx;
			}
		}
		.answer{
			font-size:10px;
			display: flex;
			.answer-icon{
				font-weight: normal;
				padding:10rpx;
				border-radius: 5px;
				font-size: 6px;
				color:white;
				background:linear-gradient(to right,blue,lightblue);
				margin-right: 20rpx;
			}
		}
	}
	/*  详情 */
	.detail-desc{
		background: #fff;
		margin-top: 16upx;
		.d-header{
			display: flex;
			justify-content: center;
			align-items: center;
			height: 80upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			position: relative;
				
			text{
				padding: 0 20upx;
				background: #fff;
				position: relative;
				z-index: 1;
			}
			&:after{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translateX(-50%);
				width: 300upx;
				height: 0;
				content: '';
				border-bottom: 1px solid #ccc; 
			}
		}
	}
	
	/* 规格选择弹窗 */
	.attr-content{
		padding: 30upx 30upx;
		.a-t{
			margin-top:10rpx;
			display: flex;
			padding-bottom: 30upx;
			border-bottom: 0.2px solid rgba($color: #000000, $alpha: 0.05);
			image{
				width: 150upx;
				height: 150upx;
				flex-shrink: 0;
				
				border-radius: 8upx;
			}
			.right{
				display: flex;
				flex-direction: column;
				padding-left: 24upx;
				font-size: $font-sm + 2upx;
				color: $font-color-base;
				line-height: 42upx;
				.price{
					font-size: $font-lg;
					color: $main-color;
					margin-bottom: 10upx;
					.price-market{
						margin-left:20rpx;
						font-size: 20rpx;
						color: $font-color-light;
						text-decoration: line-through;
					}
				}
				.selected-text{
					margin-right: 10upx;
				}
			}
		}
		.attr-list{
			display: flex;
			flex-direction: column;
			font-size: $font-base + 2upx;
			color: $font-color-base;
			padding-top: 30upx;
			padding-left: 10upx;
		}
		.item-list{
			padding: 20upx 0 0;
			display: flex;
			flex-wrap: wrap;
			text{
				display: flex;
				align-items: center;
				justify-content: center;
				background: #eee;
				margin-right: 20upx;
				margin-bottom: 20upx;
				border-radius: 100upx;
				min-width: 60upx;
				height: 60upx;
				padding: 0 20upx;
				font-size: $font-base;
				color: $font-color-dark;
			}
			.selected{
				background: #fbebee;
				color: $main-color;
				border: 1px solid $main-color;
			}
		}
	}
	
	/*  弹出层 */
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
	
	/* 底部操作菜单 */
	.page-bottom{
		position:fixed;
		left: 0upx;
		bottom:0upx;
		z-index: 95;
		right:0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.2);
		border-radius: 16upx;
		
		.p-b-btn{
			display:flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: $font-sm;
			color: $font-color-base;
			width:110upx;
			height: 80upx;
			.yticon{
				font-size: 40upx;
				line-height: 48upx;
				color: $font-color-light;
			}
			&.active, &.active .yticon{
				color: #ffac30;
			}
			.icon-fenxiang2{
				font-size: 42upx;
				transform: translateY(-2upx);
			}
			.icon-shoucang{
				font-size: 46upx;
			}
		}
		.action-btn-group{
			display: flex;
			height: 76upx;
			border-radius: 100px;
			overflow: hidden;
			box-shadow: 0 20upx 40upx -16upx #fa436a;
			box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
			background: linear-gradient(to right, #ffac30,$main-color,#F56C6C);
			margin-left: 20upx;
			position:relative;
			
			&:after{
				content: '';
				position:absolute;
				top: 50%;
				right: 50%;
				transform: translateY(-50%);
				height: 28upx;
				width: 0;
				border-right: 1px solid rgba(255,255,255,.5);
			}
			.action-btn{
				display:flex;
				align-items: center;
				justify-content: center;
				width: 180upx;
				height: 100%;
				font-size: $font-base ;
				padding: 0;
				border-radius: 0;
				background: transparent;
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
