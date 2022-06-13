<template>
	<view class="agreementDetial">
		<view class="contentchioce">
			<view class="title">{{text}}</view>
			<view class="body">{{content}}</view>
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
				content:'',
				text:'',
				tid:''
			}
		},
		onLoad(option){
			this.tid = option.title;
		},
		methods:{
			StoreHelp(){
				let url = api.StoreHelp+
					'?title='+this.tid+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					  if(res.data.status == 1){
              _this.text = res.data.data.title;
              _this.content = res.data.data.info;
            }

					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
		},
		mounted() {
			this.StoreHelp();
		}
		
	}
</script>

<style lang="scss">
	.agreementDetial{
		border-top: 2rpx solid #f1f1f1;
	}
.contentchioce {
	width: 100% !important;
	padding:20rpx;
  .title {
    font-size: 30rpx;
    padding: 10rpx 0 30rpx 0;
	font-weight: bold;
	text-align: center;
  }
  .body {
      font-size: 30rpx;
  } 
}
</style>
