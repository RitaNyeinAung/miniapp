<template>
	
	<view class="Quickstart">
		<u-skeleton v-if="data.length<=0" :loading="true" :animation="true" bg-color="linear-gradient(to bottom, #f7f7f7, #f2f2f2)"></u-skeleton>
		<view class="index_flash">
			<view class="flash_data">
				<view class="index_flash_logo">
					<text>快讯</text>
				</view>
				<view class="box-wrap">
					<view class="scroll_box" ref="scroll_box">
              <swiper class="swiper" circular="true" display-multiple-items="1" :autoplay="autoplay" :interval="interval" :duration="duration">
                <swiper-item v-for="item in data" :key="item.id" @click="hit(item.id)">
                  <view class="swiper-item uni-bg-green">{{item.title}}</view>
                </swiper-item>
              </swiper>
<!--						<view v-for="item in data" :key="item.id" @click="hit(item.id)">{{item.title}}</view>-->
					</view>
				</view>
				<view class="More" @click="toNotice">更多</view>
			</view>
		</view>
		<view class="index_Ctrl">
			<view class="index_Ctrl_auto u-skeleton" v-if="nav.length<=0">
				<view class="link" v-for="index in 5" :key="index">
					<image class="link-img u-skeleton-circle"></image>	
					<view class="skeleton u-skeleton-rect" style="margin:10rpx 10rpx 0rpx 10rpx;">加载</view>
				</view>
			</view>
			<view class="index_Ctrl_auto " v-else>							
				<view class="link " v-for="(item, index) in nav" :key="index" @click = "linkTo(item.link,index)">
					<image v-if="item.pic" :src="config.image_url+item.pic" class="link-img"></image>
					<image v-else src="@/static/images/common/img_bad.jpeg" class="link-img"></image>
					<text class="link-txt">{{item.nav_titile}}</text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js';
	export default {
		props:['nav','data'],
		data(){
			return {				
				config,
				mainNameLocal:'',
				ApiColor:'',
				topStyle: '0rpx',
        autoplay:true,
        interval:5000,
        duration:2000,
        list:[
          '请点击发行菜单进行发布,请点击发行菜单进行发布,请点击发行菜单进行发布',
          '体积较大；若要正式发布,请点击发行菜单进行发布,请点击发行菜单进行发布',
          '运行模式下不压缩代码且含有sourcemap运行模式下不压缩代码且含有sourcemap',
          '检查是否启动多个微信开发者工具，如果是则关闭所有打开的微信开发者工具，',
          '然后再重新运行然后再重新运行然后再重新运行然后再重新运行然后再重新运行',
          '如果出现微信开发者工具启动后白屏的问题',
          '或者关闭微信开发者工具，然后再从HBuilderX中启动指定页面',
          '可以通过微信开发者工具切换pages.json中condition配置的页面',
          '中修改文件并保存，会自动刷新微信模拟器',
          '微信开发者工具已启动，在HBuilderX'
        ],
			}
		},
		methods:{

			aboutEtcetera(){
				let _this = this;
			},
			linkTo(link,index){
				uni.navigateTo({
				  url: link,
				  fail(e) {
					console.log(e)
				  }

				})
			},
			toNotice(){
				uni.navigateTo({
					url: '/modules/user/pages/index/components/Notice',
					fail(e) {
						console.log(e)
					}
				})
			},
			hit(id){
				this.$emit('hit',id)
			}
		},
		mounted() {
			this.aboutEtcetera();
		}	
	}
</script>
<style lang="scss">
	.Quickstart{
		// background-color:#f2f2f2;
		background:linear-gradient(to bottom, #f4f4f4, #ececec);
		padding:0 20rpx;
		    .index_flash{
		        // width:100%;
		        // height:60rpx;
		        background-color:#f2f2f2;
		        overflow:hidden;
		        // margin-top:20rpx;
		        // padding:20rpx 30rpx 0 30rpx;
				padding-top: 20rpx;
				.flash_data {
					height:50rpx;
					background-color:#fff;
					border-radius: 50rpx;
					.index_flash_logo{
						width:80rpx;
						height:50rpx;
						padding-top:2px;
						float:left;
						background-color:#d02629;
						color:#fff;
						text-align:center;
						border-top-left-radius:50rpx;
						border-bottom-left-radius:50rpx
					}
					.box-wrap{
						position:relative;
						width:510rpx;
						height:40rpx;
						margin-top:9rpx;
						float:left;
						margin-left:20rpx;
						overflow:hidden;
						.scroll_box{
              width:510rpx;
							left:0;
							top:0;
							transition: 1s all ease;
              overflow:hidden;
              background: #FFFFFF;
              .swiper{
                height: 40rpx;
              }
						}
					}
					.More{
						width:80rpx;
						height:50rpx;
						display:block;
						float:right;
						text-align:right;
						line-height:50rpx;
						color:#fff;
						font-size:28rpx;
						background-color:#9b9595;
						padding-right:6px;
						border-top-right-radius:50rpx;
						border-bottom-right-radius:50rpx;
					}
				}
		    }
			 .index_Ctrl{
			   width: 100%;
			   overflow: hidden;
			   // background-color: #f2f2f2;
			   // border-top:2rpx solid #DEDEDE;
			   // padding-bottom: 10rpx;
			 .index_Ctrl_auto{
				width: 710rpx;
				overflow: hidden;
				margin: auto;
				display: flex;
				justify-content: flex-start;
				flex-direction: row;
				flex-wrap: wrap;
			 }
			 .link{
				display: block;
				width:115rpx;
				height: 160rpx;
				float: left;
				margin-right: 33rpx;
				margin-top: 20rpx;
				overflow: hidden;
			}
			.link:nth-child(5n){
				margin-right: 0;
			}
			.link-img{
				width: 115rpx;
				height: 115rpx;
				display: block;
				border-radius: 50%;
			   
			}
			.link-txt{
				width: 100%;
				height: 45rpx;
				display: block;
				color: #333;
				font-size: 24rpx;
				text-align: center;
				line-height: 45rpx;
				font-weight: 500;
			}  
		}
	}
</style>
