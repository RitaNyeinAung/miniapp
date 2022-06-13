<template>
	<view class="consult">
		<login></login>
		<template v-if="consultList.length>0">
			<view class="consult-box" v-for="consult in consultList">
				<view class="user">
					<text class="name">用户{{consult.user_name}}的提问</text>
					<text class="id">{{consult.create_time}}</text>
				</view>
				<view class="question">
					<view class="question-icon">问</view>
					{{consult.content}}
				</view>
				<view class="answer">
					<view class="answer-icon" v-if="consult.answer">答</view>
					{{consult.answer||"还没有回复哦"}}
				</view>
			</view>
		</template>
		<view class="eva-box" v-if="consultList.length==0">
			<view class="empty">
				还没有咨询哦
			</view>
		</view>
		<view class="question-input">
			<u-input class="input" v-model="question" :type="type"   />
			<u-button class="btn" :custom-style="{background:'#d02629',color:'white'}" shape="circle" @click="submitQuestion">提问</u-button>
		</view>
	</view>
</template>

<script>
	import api from '@/api';
	import {mapMutations} from'vuex'
	export default{
		data(){
			return {
				currentPage:1,
				consultList:[],
				consultCount:0,
				question:''
			}
		},
		onLoad(options) {
			this.productId= options.id;
			this.getConsultList(this.currentPage);
		},
		onReachBottom(){
			this.getConsultList(this.currentPage,"add");
		},
		methods:{
			...mapMutations(['toggleLoginPopup']),
			getConsultList(page,type="refresh"){
				uni.showLoading({
					title:"获取数据中"
				})
				
				let _this = this;
				uni.request({
					url:api.getConsultList+'?page='+page+'&'+'goods_id='+_this.productId,
					method:'GET',
					success(result) {
						uni.hideLoading();
						if(result.data.data){
								if(_this.consultCount==result.data.data.countTotal){
									uni.showToast({
										title:"没有更多数据了",
										icon:"none"
									})
									return;
								}
								if(page>1){
									_this.consultList= _this.consultList.concat(result.data.data.records);
									_this.consultCount = _this.consultCount+result.data.data.countTotal;		
								}else{
									_this.consultList= result.data.data.records;
									_this.consultCount = result.data.data.countTotal;
								}
								_this.currentPage++;																																			
						}else{
							uni.showToast({
								title:"数据获取失败",
								icon:"none"
							})
						}
					},
					fail(e) {
						uni.showToast({
							title:"数据获取失败",
							icon:"none"
						})
						console.log(e);
					}
				})
			},
			submitQuestion(){
				if(this.question==''){
					uni.showToast({
						title:"请输入内容",
						icon:"none"
					})
					return;
				}
				let _this= this;
				uni.showLoading({
					title:"提交问题中"
				})
				uni.request({
					method:"POST",
					data:{
						token:uni.getStorageSync("token"),
						goods_id:_this.productId,
						content:_this.question
					},
					url:api.submitConsultQuestion,
					success(result) {
						uni.hideLoading();
						if(result.data.status==10001){
							_this.toggleLoginPopup();
						}
						if(result.data.status==1){
							uni.showToast({
								title:"您的问题已提交！",
								icon:"none"
							})
						}else{
							uni.showToast({
								title:"提交问题失败！",
								icon:"none"
							})
						}
						
					},
					fail(e) {
						uni.hideLoading();
						uni.showToast({
							title:"提交问题失败！",
							icon:"none"
						})
						console.log(e);
					}
				})
			}
		},
		filters:{
	
		}
	}
</script>

<style lang="scss">
	.consult{
		position:relative;
		min-height: 100vh;
		background-color: $light-grey;
	}
	.consult-box{
		padding: 20upx 30upx;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		background:white;
		margin-bottom: 10upx;
		.user{
			display:flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 20upx;
			width: 100%;
		}
		.question{
			font-weight: bold;
			font-size:11px;
			margin-bottom:15rpx;
			display:flex;
			.question-icon{
				font-weight: normal;
				padding:10rpx;
				font-size: 6px;
				border-radius: 50%;
				color:white;
				background:linear-gradient(to right,blue,lightblue);
				margin-right: 20rpx;
			}
		}
		.answer{
			font-size:10px;
			display: flex;
			.answer-icon{
				font-weight: normal;
				padding:10rpx;
				border-radius: 5px;
				font-size: 6px;
				color:white;
				background:linear-gradient(to right,blue,lightblue);
				margin-right: 20rpx;
			}
		}
	}
	.eva-box{
		display: flex;
		padding: 20upx 0;
		.portrait{
			flex-shrink: 0;
			width: 80upx;
			height: 80upx;
			border-radius: 100px;
			background-color: $light-grey;
		}
		.right{
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-base;
			color: $font-color-base;
			padding-left: 26upx;
			
			.con{
				font-size: $font-base;
				color: $font-color-dark;
				padding: 20upx 0;
			}
			.bot{
				display: flex;
				justify-content: space-between;
				font-size: $font-sm;
				color:$font-color-light;
			}
		}
		.empty{
			flex:1;
			text-align: center;
		}
	}
	.question-input{
		width:100%;
		display: flex;
		// grid-template-column: 3fr 1fr;
		position: absolute;
		justify-content: space-between;
		bottom:0;
		background-color: white;
		padding:20rpx;
		.input{
			border-radius: 50px;
			background-color: $light-grey;
			padding:0rpx 20rpx;
			width:70%;
			display:flex;
			align-items: center;
		}
		.btn{
			color:white;
			border-radius: 50px;
			width: 20%;
		}
	}
</style>
