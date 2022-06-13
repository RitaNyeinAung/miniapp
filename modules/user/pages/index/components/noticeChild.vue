<template>
	<view class="NoticeChild">
		<view class="contentchioce">
			<view class="title">{{content.title}}</view>
			<view class="body" v-html="content.content"></view>
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
				content:[],
				nid:''
			}
		},
		onLoad(option){
			this.nid = option.id;
			this.aboutEtcetera();
			uni.setNavigationBarTitle({
				title:decodeURIComponent(uni.getStorageSync('mainNameLocal')+'公告详情')
			})
		},
		methods:{
			unescape(html) {
				return String(html)
					.replace(/&amp;/g, '&')
					.replace(/&quot;/g, '"')
					.replace(/&#39;/g, '\'')
					.replace(/&lt;/g, '<')
					.replace(/&gt;/g, '>');
			},
			getHomeData(){
				let url = api.announcement_list+
					'?id='+this.nid+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
						_this.content = res.data.data;
						_this.content.content = _this.unescape(_this.content.content);
						_this.content.content=_this.content.content.replace('<image alt="" class="image" src="'+_this.config.image_url);
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			aboutEtcetera(){
				let _this = this;
				uni.request({
					url:api.aboutEtcetera,
					success(result) {
						uni.setStorageSync('mainNameLocal',result.data.data.intnet_title);
					},
					fail(e) {
						console.log(e);
					}
				})
			},
		},
		mounted() {
			this.getHomeData();
		}
		
	}
</script>

<style lang="scss">
	.NoticeChild{
		border-top: 2rpx solid #f1f1f1;
	}
	img{
	    width: 100%;
	   
	}
	image{
			width: 100%;  
	}
	.image{
			width: 100%;  
	}
.contentchioce {
	width: 100% !important;
	padding:20rpx;
  .title {
    font-size: 30rpx;
    padding: 10rpx 0 30rpx 0;
	font-weight: bold;
  }
  .body {
      width: 100% !important;
      p{
        width: 100% !important;
          line-height: 50rpx !important;
          padding: 20rpx 0;
      }
      img{
          width: 100%;
         
      }
	  image{
		width: 100%;  
	  }
	  .image{
	  		width: 100%;  
	  }
  } 
	  .image{
	  		width: 100%;  
	  }
}
</style>
