<template>
	<view class="search">
		<view :class="['search-page']">
			<view class="search-page-header">
				<u-search height="60" :focus="true" placeholder="搜索宝贝、店铺..." action-text="取消" @click="remove"></u-search>
			</view>
			<view class="Search-content">
			  <view class="hot">
				<view class="title">
				  <image src="@/static/images/common/tj.png"></image>热门搜索
				</view>
				<view class="clearfix">
				  <view
					class="fll"
					v-for="(item,index) in hot_data"
					:key="item.id"
					@click="tolist(item.hot_words)"
				  >{{item.hot_words}}</view>
				</view>
				<view class="def" v-if="hot_data == null || hot_data.legnth <= 0">热门搜索为空!</view>
			  </view>
			  <view class="hit">
				<view class="title">历史搜索</view>
				<view class="clearfix">
				  <view
					class="fll"
					v-for="(item,index) in hit"
					:key="item.id"
					@click="toHit('/list',index)"
				  >{{item}}</view>
				</view>
				<view class="def" v-show="hit.length <= 0">你还没浏览过任何商品哦，快去逛逛吧！</view>
			  </view>
			  <view class="btn" @click="clear" v-if="hit.length > 0">清空历史记录</view>
			</view>
		</view>	
<!-- 		<view class="list-item-wrap">
		  <view
			v-for="(item,index) in search_data"
			:key="item.id"
			class="text1-hidden"
			@click="toLink('/list',index,item)"
		  >{{item.title}}</view>
		</view> -->
	</view>	
</template>
<script>
	import api from '@/api.js';
	import config from '@/config.js'
	export default {
		data(){
			return {
				config,
				hot_data:'',
				hit: [],
				search_data:'',
				status: "search",
			}
		},

		methods:{
			hotSearch(){
				let url = api.hotSearch+
					'?token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.hot_data = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},	
			tolist(item){
				uni.navigateTo({
					url: 'modules/common/pages/search/list?id='+item+'&status='+this.status
				})
			},
		},
		mounted() {
			this.hotSearch();
		}		
	}
	
</script>

<style lang="scss">
	.search{
		position:fixed;
		width: 100vw;
		z-index: 100000;
	}	
	.search-page{
		background-color: white;
		position: absolute;
		height: 100rpx;
		top:0;
		width: 100vw;
		min-height:100vh;
		z-index: 1000;
		.search-page-header{
			height: 80rpx;
			padding:10rpx 30rpx;
			background-color: #ee1111;
		}
	}
	  .Search-content {
	    .hot,
	    .hit {
	      padding: 14rpx 20rpx 0;
	      .title {
	        font-size: 30rpx;
	        color: #999;
	        padding: 30rpx 0;
	      }
	      .def {
	        font-size: 30rpx;
	        color: #999;
	        text-align: center;
	      }
		  .clearfix{
			  display: flex;
		  }
	      .fll {
	        height: 73rpx;
	        width: 235rpx;
	        padding: 0 25rpx;
	        font-size: 30rpx;
	        color: #757575;
	        line-height: 73rpx;
	        text-align: center;
	        background: #f1f1f1;
	        border-radius: 10rpx;
	        margin-right: 17rpx;
	        margin-top: 20rpx;
	        overflow: hidden;
	        text-overflow: ellipsis;
	        white-space: nowrap;
	      }
	      .fl:nth-child(3n) {
	        margin-right: 0;
	      }
	    }
	    .hit {
	      padding-bottom: 30rpx;
	    }
	    .hot {
	      .title {
	        padding-left: 40rpx;
	        position: relative;
	        image {
	          width: 25rpx;
	          height: 31rpx;
	          position: absolute;
	          left: 0;
	          top: 50%;
	          margin-top: -15.5rpx;
	          background-size: 100% 100%;
	        }
	      }
	    }
	    .btn {
	      width: 710rpx;
	      height: 78rpx;
	      margin: 0 auto;
	      display: block;
	      font-size: 30rpx;
	      color: #b3b3b3;
	      border: 2rpx solid #b3b3b3;
	      border-radius: 10rpx;
	      background: #fff;
	    }
	  }

</style>
