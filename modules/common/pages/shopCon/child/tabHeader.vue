<template>
	  <view class="tab-header">
	     <view class="content">
	          <view :class="{active: sortHead == index}" v-for="(item, index) in sortData" :key="index" @click = "proSort(index)" class="txt">{{item}}</view>
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
				sortHead:this.tabdata,
			}
		},
	    props:{
	        sortData:"",
	        tabdata:''
	    },
    onLoad(options){
      console.log(this.tabdata)
    },
		methods:{
			proSort(index){
				// this.$store.state.shop_class_show = false;
				if(this.sortHead == index)return;
				this.sortHead = index;
				uni.setStorageSync('psi',index);
				this.$emit("sortCon",index);
			},
		},	
		created() {
			let psi = uni.getStorageSync("psi");
			console.log(psi)
			if(psi) {
				this.proSort(psi);
			}
		}
	}
</script>

<style lang="scss">
	.tab-header{
		.content{
		    background-color: #fff;
		    display: flex;
		    border-bottom: 1rpx solid #CBCBCB;
		    position:relative;
		    .txt{
		        display: flex;
		        height: 50rpx;
		        margin: 20rpx 0;
		        justify-content: center;
		        align-items: center;
		        flex:1;
		        border-right: 1rpx solid #CBCBCB;
		        font-size: 26rpx;
		        &:last-child{
		            border:0
		        }
		        
		    }
		    .active{
		        color: #d02629;
		        font-size: 26rpx;
		    }
		}
	}
</style>
