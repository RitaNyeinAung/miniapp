<template>
	<view class="flash-wrap">
		<view class="flash">
			<view class="flash_logo">
				<image src="@/static/images/common/icon1.png"></image>
			</view>
			<view class="up-news">
				 <view class="scroll_box" ref="scroll_box">
				   <view v-for="(items,index) in recommend" :key="index" class="scroll_box-li">{{items.title}}</view>
				</view>
			</view>
			<view class="More">更多</view>
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
				recommend:''
			}
		},
        created() {
            
        },
        mounted(){
			this.articleRecommend();
            // this.scroll_box();
        },
		methods:{
			articleRecommend(){
				let routeId = uni.getStorageSync("routeId");
				let _this = this;
				let url = api.recommendStoreArticle+
					'?store_id='+routeId+
					'&token='+uni.getStorageSync('token');
				
				uni.request({
					url : url,
					success: (res) => {
						_this.recommend = res.data.data;
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
            // scroll_box(){
            //     var count = 0,
            //         clear = null;
            //     clear = setInterval(() => {
            //         count ++;
                    
            //         if(this.recommend && count >= this.recommend.length){
            //             count = 0;
            //         }
            //         if(this.$refs.scroll_box){
            //             this.$refs.scroll_box.style.top = -count * 55 +'rpx';
            //         }
            //     },2000);
            // },
		},	

	}
</script>

<style lang="scss">
	.flash-wrap{
		background:#f2f2f2;
		margin: 330rpx 0 0 0;
		.flash{
			background:#ffffff;
			margin-bottom: 5rpx;
			margin-top: -10rpx;
			display: flex;
			.flash_logo{
				display:flex;
				span{
				  padding: 20rpx 0rpx 17rpx 15rpx;
				  font-size: 25rpx;
				}
			   image{
				width: 75rpx;
				padding: 15rpx;
				height: 75rpx;
			   } 
			}
			.up-news{
				border-right: 2rpx dotted #b6b0b0;
				border-left: 2rpx dotted #b6b0b0;
				margin-top: 9rpx;
				margin-bottom: 9rpx;
				width:570rpx;
				overflow: hidden;
			.scroll_box{
				// position: absolute;
				left:25rpx;
				transition: 1s all ease; 
				position: relative;
				width: 405rpx;
				height: 55rpx;
				
				.scroll_box-li{
					height: 55rpx;
					line-height: 55rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					display: block;
					cursor:pointer;
				}
				.scroll_box-li:hover{
					color:red;
				}
			 } 
			}
			.More{
					margin-top: 5rpx;
					font-size: 28rpx;
					padding:17rpx;
			}
		}
	}
</style>
