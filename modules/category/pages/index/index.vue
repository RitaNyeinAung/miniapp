<template>
	<view class="category">
		<HomeHeader bg="#d02629"></HomeHeader>
	
		<view class="content">
			
			<scroll-view scroll-y class="left-aside">
				<view v-for="(item,index) in firstCategories" :key="item.id" class="f-item b-b" :class="{active: currentId!=null?item.id === currentId:index==0}" @click="tabtap(item)">
					{{item.class_name}}
				</view>
			</scroll-view>
			<scroll-view scroll-with-animation scroll-y class="right-aside" @scroll="asideScroll" :scroll-top="tabScrollTop">
				<view v-for="item in secondCategories" :key="item.id" class="s-list" :id="'main-'+item.id">
					<text class="s-item">{{item.class_name}}</text>
					<view class="t-list">
						<view @click="navToList(item.id, titem.id,titem.class_name)" v-if="titem.fid === item.id" class="t-item" v-for="titem in thirdCategories" :key="titem.id" >
							<image :src="config.image_url+titem.pic_url" ></image>
							<text>{{titem.class_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	import config from '@/config.js';
	import api from '@/api.js';
	import HomeHeader from '@/modules/common/components/homeHeader.vue';
	import {mapState} from 'vuex';
	export default {
		data() {
			return {
				sizeCalcState: false,
				tabScrollTop: 0,
				currentId: null,
				config : config
				
			}
		},
		components:{
			HomeHeader
		},
		computed:{
			...mapState('product',['firstCategories','secondCategories','thirdCategories'])
		},
		onShow(){
			// this.loadData();
			if(!this.sizeCalcState){
				this.calcSize();
			}
		},
		methods: {
			
			async loadData(){
				var _this = this;
				uni.showLoading({
				    title: 'Loading'
				});
				uni.request({
					url:api.getRootCategories,
		
				
				})
			},
			//一级分类点击
			tabtap(item){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				
				this.currentId = item.id;
				let index = this.secondCategories.findIndex(sitem=>sitem.fid === item.id);
	
				this.tabScrollTop = this.secondCategories[index].top;
			
			},
			//右侧栏滚动
			asideScroll(e){
				if(!this.sizeCalcState){
					this.calcSize();
				}
				let scrollTop = e.detail.scrollTop;
			
				// this.tabScrollTop = scrollTop;
				//加一是为了 弥补 scrollTop 和 item.top 的 分差 确保 父类的首个子类 包含在 tab
				let tabs = this.secondCategories.filter(item=>item.top <= scrollTop+1).reverse();
				
				if(tabs.length > 0){
					this.currentId = tabs[0].fid;
				}
			},
			//计算右侧栏每个tab的高度等信息
			calcSize(){
				let h = 0;
				this.secondCategories.forEach(item=>{
					let view = uni.createSelectorQuery().select("#main-" + item.id);
					view.fields({
						size: true
					}, data => {
						item.top = h;
						h += data.height;
						item.bottom = h;
					}).exec();
				})
				this.sizeCalcState = true;
			},
			navToList(sid, tid ,tname){

				uni.navigateTo({
					url: '/modules/category/pages/list/index?title='+tname+'&tid='+tid,
					fail(e) {
						console.log(e)
					}
					
				})
			}
		}
	}
</script>

<style lang='scss'>
	page,.category{

		min-height: 100% !important;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.content {
		height: 100%;
		padding-top: 80rpx;
		background-color: white;
		
	}

	.content {
		display: flex;
	}
	.left-aside {
		flex-shrink: 0;
		width: 200upx;
		min-height: 100% ;
		background-color: white;
	
	}
	.f-item {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100upx;
		font-size: 25upx;
		padding:0px 5px;
		color: $font-color-base;
		position: relative;
		&.active{
			color: $main-color;
			background: #f8f8f8;
			&:before{
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				height: 36upx;
				width: 8upx;
				background-color: $base-color;
				border-radius: 0 4px 4px 0;
				opacity: .8;
			}
		}
	}

	.right-aside{
		flex: 1;
		overflow: hidden;
		padding-left: 20upx;
		min-height: 100%;
		background-color: #f7f7f7;
	}
	.s-item{
		display: flex;
		align-items: center;
		height: 70upx;
		padding-top: 5upx;
		font-size: 25upx;
		color: $font-color-dark;
	}
	.t-list{
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		background: #fff;
		padding-top: 20upx;
		&:after{
			content: '';
			flex: 99;
			height: 0;
		}
	}
	.t-item{
		flex-shrink: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		width: 176upx;
		font-size: 24upx;
		color: #666;
		padding-bottom: 20upx;
		
		image{
			width: 130upx;
			height: 130upx;
			padding-bottom:5px;
			background:#f7f7f7;
			margin-bottom:5px;
		}
	}
</style>
