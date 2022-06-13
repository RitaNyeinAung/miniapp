<template>
	<view class="search" v-if="showNavbar">
		<view class="search_header" :style="'background-color:'+apicolor">
			<view class="logo" v-if="showDefaultLogo">
				<image src="@/static/images/common/logo3.png"></image>
			</view>
			<view class="logo" v-else>
				<image :src="config.image_url + logo"></image>
			</view>
			<u-search height="60" disabled="true" :show-action="false" placeholder="搜索宝贝,店铺..." @click="showSearchPage"></u-search>
			<view class="notification" >
				<image src="@/static/images/common/notification_icon.png"></image>
			</view>
			
		</view>	
			<view :class="['search-page']" v-if="show">
				<view class="search-page-header">
					<u-search height="60" :focus="true" placeholder="搜索宝贝,店铺..." action-text="搜索" @custom="show=false"></u-search>
				</view>
				<view class="hot-search">
					<text class="content">
						
					</text>
				</view>
			</view>
	</view>
</template>
<script>
	import api from '@/api.js';
	import config from '@/config.js'
	import {mapState,mapMutations} from 'vuex'
	export default {
		data(){
			return {
				config,
				showNavbar: true,
				hotSearch:[],
				lastScrollPosition: 0,
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
				console.log("get")
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
		},
		
		
	}
	
</script>

<style lang="scss">
	.search{
		position:fixed;
		width: 100vw;
		z-index: 100000;
		background:white;
	}
	.search_header{
		
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 100rpx;
		padding:0px 30rpx;
		background-color: $main-color;
		
		.logo{
			display: flex;
			align-items: center;

			image{
				width: 150rpx;
				height: 70rpx;	
			}
		}
		.notification{
			display: flex;
			align-items: center;		
			image{
				width: 50rpx;
				height: 50rpx;

			}
		}
		
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
		z-index: 1000;
		.search-page-header{
			height: 80rpx;
			padding:10rpx 30rpx;
	
		}
	}

</style>
