<template>
	<view>
		<view class="header">
			<view class="h4">￥{{changes_balance}}</view>
			<view class="h6">{{description}}</view>
		</view>
		<view class="ul">
			<view class="li">
				<text class="span">可用余额</text>
				<text class="p">￥{{account_balance}} </text>
			</view>
			 <view class="li">
				<text class="span">余额状态</text>
				<text class="p">{{status}} </text>
			</view>
			<view class="li">
				<text class="span">冻结余额</text>
				<text class="p">￥{{lock_balance}} </text>
			</view>
			<view class="li">
				<text class="span">支付时间</text>
				<text class="p">{{modify_time | temp2time}} </text>
			</view>  
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
				modify_time : 0,
				account_balance : 0,
				lock_balance : 0,
				changes_balance : 0,
				status : "",
				description : "",
			}
		},
		filters:{
			temp2time:function(value){
				if (!value) {
					return "";
				}
				var time = new Date(Number(value) * 1000);
				var Y = time.getFullYear();
				var m = time.getMonth() + 1;
				var d = time.getDate();
				var H = time.getHours();
				var mi = time.getMinutes();
				var s = time.getSeconds();
				if (m < 10) {
					m = '0' + m;
				}
				if (d < 10) {
					d = '0' + d;
				}
				if (H < 10) {
					H = "0" + H;
				}
				if (mi < 10) {
					mi = '0' + mi;
				}
				if (s < 10) {
					s = "0" + s;
				}
				return (Y + "-" + m + "-" + d + " " + H + ":" + mi + ":" + s);
			}
		},
		onLoad(option){
			this.wallet_id=option.wallet_id;
		},
		methods:{
			loadData(){
				let url = api.walletDetail+
					'?id='+this.wallet_id+
					'&token='+uni.getStorageSync('token');
				let _this = this;
				uni.request({
					url : url,
					success: (res) => {
					if(res.data.status == 1){		   
					  var result = res.data.data;
					  _this.modify_time = result.modify_time;
					  _this.changes_balance = result.changes_balance;
					  _this.account_balance = result.account_balance;
					  _this.lock_balance = result.lock_balance;
					  _this.status = result.status;
					  _this.description = result.description;
						 
					}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
				
			},
		},
		mounted() {
			this.loadData();
		},
		
	}
</script>

<style lang="scss">
	.ul{
	    background-color: #fff;
	    padding:10rpx 30rpx;
	    .li{
	        
	        display: flex;
	        align-items: center;
	        margin: 50rpx 0;
	        justify-content: space-between;
	        .span{
	            font-size: 32rpx;
	            width: 300rpx;
	        }
	        .p{
	            font-size: 32rpx;
	            text-align: right;
	            line-height: 50rpx;
	        }
	    }
	}
	.header{
	    height: 275rpx;
	    display: flex;
	    flex-direction: column;
	    justify-content: center;
	    align-items: center;
	    background-color: #fff;
	    border-bottom: 1rpx solid #E8E8E8;	 
		border-top: 1rpx solid #E8E8E8;	
	    .h4{
	        margin-top: 25rpx;
	        font-size: 50rpx;
	    }
	     .h6{
	        margin-top: 25rpx;
	        font-size: 24rpx;
	        color: #9E9E9E;
	    }
	}
</style>
