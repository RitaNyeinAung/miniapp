<template>
	<view class="search">
		<view class="search_header" :style="'background-color:'+apicolor">
			<view class="logo" v-if="showDefaultLogo">
				<!-- <image src="@/static/images/common/logo.png"></image> -->
				<image src="@/static/images/common/logo3.png"></image>
			</view>
			<view class="logo" v-else>
				<!-- <image src="@/static/images/common/logo.png"></image> -->
				<image :src="config.image_url + logo"></image>
			</view>
			<u-search height="60" disabled="true" :show-action="false" placeholder="搜索宝贝,店铺..." @click="showSearchPage"></u-search>
			<view class="notification" >
				<image src="@/static/images/common/meg.png"></image>
			</view>
		</view>
    <view class="before" :style="'background-color:'+apicolor"></view>
    <view></view>
	</view>

</template>
<script>
	import api from '@/api.js';
	import config from '@/config.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				show:false,//显示搜索页面
				hotSearch:[],//热门关键词
				config,
				showDefaultLogo :false,
				apicolor :'#c3996b',
			}
		},
		props:{
			bg:{
				default:"white",
				type:String,
				
			}
		},
		computed:{
			...mapState(['logo'])
		},
		methods:{
			...mapMutations(['setLogo']),
			showSearchPage(){
				uni.navigateTo({
					url: 'modules/home/pages/search/index'
				})
			},
			
			getLogo() {
				let url = api.getLogo+
					'?store_id='+config.store_id;
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						if(!res.data.data||res.data.data.length==0){
						
							_this.showDefaultLogo = true;
						}else{
							_this.setLogo(res.data.data.wap_logo);
						}
						
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
      StyColor(){
        let _this = this;
        let url = api.StyColor+
            '?store_id='+config.store_id;
        uni.request({
          url:url,
          success(result) {
            if(result.data.status == 1){
              _this.apicolor = result.data.data.theme_color;
            }

          },
          fail(e) {
            console.log(e);
          }
        })
      },
		},
		mounted() {
	
			if(this.logo==''){
				this.getLogo();
			}
      this.StyColor();
		}
		
	}
	
</script>

<style lang="scss">
	.search{
		
		width: 100vw;
		background:white;
	}
	.search_header{
		position: relative;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		padding:0px 20rpx;
		background-color: $main-color;
		.logo{
			display: flex;
			align-items: center;

			image{
				width: 221rpx;
				height: 70rpx;
			}
			
		}
		//&::before{
		//	content:'';
		//	position: absolute;
		//	width:100%;
		//	height:200%;
		//	top:100%;
		//	left: 0;
		//	border-radius: 0px 0px 10px 10px;
		//	background-color: $main-color;
		//}
		.notification{
			display: flex;
			align-items: center;		
			image{
				width: 60rpx;
				height: 60rpx;
				margin-left: 20rpx;
			}
		}
	}
  .before{
    content:'';
    position: absolute;
    width:100%;
    height:145rpx;
    left: 0;
    border-radius: 0px 0px 12px 12px;
    background-color: $main-color;
  }
	u-search{
		width:60vw !important;
	}
	
	
	.search-page{
		background-color: white;
		position: absolute;
		height: 100rpx;
		top:0;
		width: 100vw;
		min-height:100vh;
		z-index: 10000000;
		.search-page-header{
			height: 80rpx;
			padding:10rpx 30rpx;
	
		}
	}

</style>
