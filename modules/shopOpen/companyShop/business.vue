<template>
	<view class="business">
		<view class="hd">
			<view class="title fl">店铺经营信息 </view>
		</view>
		<ul class="per-center">
			<li>
				<text> 商家账号：</text><u-input type="text" placeholder="请输入商家账号" v-model="shop_account"></u-input>
			</li>
			<li>
				<a href="javascript:;" @click="levChoose">
					<text> 店铺等级:</text>
					<text v-model="level_id">{{toke}}</text>
					<image class="rightImg" src="@/static/images/common/right-icon.png" alt=""></image>
				</a>
				<u-popup v-model="popupVisible1" position="bottom" class="tol">
					<view class="picker-toolbar">
						<text class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</text>
						<text class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</text>
					</view>
					<ul>
						<li class="l" v-for="(levels,index) in level" @click="choose(index)" :key="index">
							商家等级：{{levels.level_name}}
						</li>
					</ul>
				</u-popup>
			</li>
			<li>
				<a href="javascript:;" @click="chokes">
					<text> 开店时长:</text>
					<text v-model="shop_long">{{year}}</text>
					<image class="rightImg" src="@/static/images/common/right-icon.png" alt=""></image>
				</a>
				<u-popup v-model="popupVisible3" position="bottom" class="tol">
					<view class="picker-toolbar">
						<text class="mint-datetime-action mint-datetime-cancel" @click="can">取消</text>
						<text class="mint-datetime-action mint-datetime-confirm" @click="sel">确定</text>
					</view>
					<ul class="time-length">
						<li class="l" v-for="(n,index) in years" @click="choke(index)" :key="index">
							开店时长：{{n}}
						</li>
					</ul>
				</u-popup>
			</li>
		</ul>
		<view class="hd">
			<view class="title fl">店铺分类 </view>
		</view>
		<ul class="per-center">
			<li class="listHead">
				<a href="javascript:;" @click="divides">
					<text> 店铺分类:</text>
					<text v-model="shop_class">{{divide}}</text>
					<image class="rightImg" src="@/static/images/common/right-icon.png" alt=""></image>
				</a>
			</li>
			<u-popup v-model="popupVisible2" position="bottom" class="tol">
				<view class="picker-toolbar">
					<text class="mint-datetime-action mint-datetime-cancel" @click="cancl">取消</text>
					<text class="mint-datetime-action mint-datetime-confirm" @click="select">确定</text>
				</view>
				<ul>
					<li class="l" v-for="(datas,index) in data" @click="chose(index)" :key="index">
						{{datas.sc_name}}
					</li>
				</ul>
			</u-popup>
		</ul>
		<view class="hd">
			<view class="title fl">经营分类 </view>
		</view>
		<ul class="per-center">
			<view class="little-hint"><i>*</i> 绑定分类后才有对应的分类规格</view>
			<li class="listHead" v-for="(item,index) in goods_class" :key="index">
				<i class="delete" v-if="goods_class.length !=1" @click="del(index)"></i>
				<a href="javascript:;" @click="management(index)">
					<text> 经营分类:</text>
					<text class="content">{{item.content}}</text>
					<image class="rightImg" src="@/static/images/common/right-icon.png" alt=""></image>
				</a>
				<u-popup v-model="item.popupVisible" position="bottom" class="tol">
					<view class="picker-toolbar">
						<text class="mint-datetime-action mint-datetime-cancel" @click="manageCancl(index)">取消</text>
						<text class="mint-datetime-action mint-datetime-confirm" @click="manageSelect(index)">确定</text>
					</view>
					<view class="select">
						<ul class="address-area-tit">
							<li 
								:class="showProvince?'active':''" 
								@click="selectedArea('province',index)">
								{{ province }}</li>
							<li  
								v-if="choiceCity" 
								:class="showCity?'active':''"
								@click="selectedArea('city',index)">
								{{ city }}</li>
							<li  
								v-if="choiceArea" 
								:class="showArea?'active':''">
							{{ area }}</li>
						</ul>
					</view>
					<ul class="goods-list" v-if="showProvince">
						<li 
							v-for="(n, i) in item.data" 
							:key="i"
							@click="getProvince(n.id,n.class_name,index)"
							:class="i==provinceIndex?'selected-li':''">
              {{ n.class_name }}</li>
					</ul>
					<ul class="goods-list" v-if="showCity">
						<li 
							v-for="(n, i) in item.data" 
							:key="i"
							@click="getCity(n.id,n.class_name,index)"
							:class="i==cityIndex?'selected-li':''">
              {{ n.class_name }}</li>
					</ul>
					<ul class="goods-list" v-if="showArea">
						<li 
							v-for="(n, i) in item.data" 
							:key="i"
							@click="setCityEnd(n.id,n.class_name,index)"
							:class="i==cityIndex?'selected-li':''">
              {{ n.class_name }}</li>
					</ul>
				</u-popup>
			</li>
		</ul>
		<view class="add-category" @click="addCategory">选择增加类目</view>
		<view class="button" @click="nextinfor">提交申请</view>
		<view class="p">店铺经营类目为商城产品分类，请根据实际运营情况添加一个或多个经营类目</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				shop_account: "",
				level_id: "",
				shop_long: "",
				data:'',
				shop_class: "",
				sc_bail: '',
				popupVisible1: false,
				popupVisible2: false,
				popupVisible3: false,
				selected: '',
				level: '',
				toke: "",
				toke_id:'',
				divide: '',
				year: '',
				years: ["1年", "2年", "3年", "4年", "5年", "6年", '7年', '8年', '9年'],
				goods_class:[],
				choiceProvince: false, // 省按钮的显示隐藏
				choiceCity: false, // 市按钮的显示隐藏
				choiceArea: false, // 区按钮的显示隐藏
				province: '请选择',    // 选中的省
				city: '请选择', // 选中的市
				area: '请选择', // 选中的区
				street:'请选择',//选中的街道
				showProvince: true, // 省选择的显示隐藏
				showCity: false, // 市选择的显示隐藏
				showArea: false, // 区选择的显示隐藏
				showStreet:false,//街道的显示隐藏
				provinceId: 0, // 选中的省id
				cityId: 0, // 选中的市id
				areaId: 0, // 选中的区id
				streetId:'',
				provinceIndex: -1, // 选中态索引
				cityIndex: -1,
				areaIndex: -1,
				streetIndex:-1,
				goods_data:'',
			}
		},
		methods:{
			del(index){
				this.goods_class.splice(index,1);
			},
			//经营分类
			getGoodsClass(index,status){
				let _this = this;
				uni.request({
          method: "POST",
          url: api.getFirstId,
          data: {
            token:uni.getStorageSync("token")
          },
					success: (res) => {
						if(index ==='1'){
							_this.goods_data = res.data.data;
							_this.goods_class.push({popupVisible:false,content:'',data:_this.goods_data,class_id:''});
						}else if(index === '2'){
							_this.goods_class[status].data = res.data.data;
						}else{
							_this.goods_class[index].data = res.data.data;
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			selectedArea(type,index) { // 按钮点击
					if (type == "province") {
						this.provinceId = 0;
						this.cityId = 0;
						this.areaId = 0;
						this.getGoodsClass(index,'0');
						this.cityIndex = -1;
						this.areaIndex = -1;
						this.streetIndex=-1
						
						this.choiceCity = false;
						this.choiceArea = false;
						this.choiceStreet=false,
						
						this.showProvince = true;
						this.showCity = false;
						this.showArea = false;
						this.showStreet=false;
					   
					} else if (type == "city") {
						this.cityId = 0;
						this.areaId = 0;
						this.proAjax(this.provinceId,index);
						this.cityIndex = -1;
						this.areaIndex = -1;
						this.streetIndex=-1
						this.choiceArea = false;
						this.choiceStreet=false;
						
						this.showProvince = false;
						this.showCity = true;
						this.showArea = false;
						this.showStreet=false;
					} 
				},
				//获取二级
				getProvince (id, name, index) {
					this.provinceId = id;
					this.proAjax(this.provinceId,index);
					this.Bcity = '请选择';
					this.area = '请选择';
					this.city = '请选择';
					this.choiceCity = true;
					this.province = name;
					this.showProvince = false;
					this.showCity = true;
					this.showArea = false;
					this.showStreet=false;
					
				},
				//获取三级
				getCity (id, name, index) { 
					this.cityId = id;
					this.proAjax(this.cityId, index);
					this.area = '请选择', 
					this.choiceArea = true;
					this.city = name;
					this.showProvince = false;
					this.showCity = false;
					this.showArea = true;
					this.showStreet=false;
				},
				//三级分类点完后
				 setCityEnd(id, name, index) {
					this.area = name;
					this.areaId = id;
				},
				//获取下级分类
				proAjax(id,index){
					let _this = this;
					uni.request({
            method: "POST",
            url: api.nextClassId,
            data: {
              fid:id,
              token:uni.getStorageSync("token")
            },
						success: (res) => {
							_this.goods_class[index].data = res.data.data;
						},
						fail: (res)=>{
							console.log(res);
						}
					})
				},
			manageCancl(i){
				this.goods_class[i].popupVisible = false;
				this.choiceCity=false;
				this.choiceArea=false;
				this.choiceStreet=false;
				this.choiceProvince=true;
				this.showStreet = false;
				this.showProvince=true;
				this.showCity = false; 
				this.showArea = false;
				this.province="请选择"
			},
			manageSelect(index){
				if(this.province==""||this.province=="请选择") {
					uni.showToast({
						title:'请选择分类',
						icon:'none'
					})
				} else if(this.city==""||this.city=="请选择"){
					uni.showToast({
						title:'请选择分类',
						icon:'none'
					})
				}else if(this.area==""||this.area=="请选择" ){
					uni.showToast({
						title:'请选择分类',
						icon:'none'
					})
				}else{
					if(this.provinceId == ''|| this.cityId == '' || this.areaId == ''){
						this.goods_class[index].popupVisible = false;
						return;
					}
					this.goods_class[index].content = this.province + '-' + this.city + '-' + this.area;
					this.goods_class[index].class_id = {one_class:this.provinceId,two_class:this.cityId,three_class:this.areaId};
					this.choiceCity=false;
					this.choiceArea=false;
					this.choiceStreet=false;
					this.choiceProvince=true;
					this.showStreet = false;
					this.showProvince=true;
					this.showCity = false; 
					this.showArea = false;
					this.province="请选择"
				}
				this.goods_class[index].popupVisible = false;
			},
			management(index){
				this.goods_class[index].popupVisible = true;
				this.getGoodsClass('2',index);
			},
			//添加一个经营分类
			addCategory(){
				this.goods_class.push({popupVisible:false,content:'',data:this.goods_data,class_id:''});
			},
			shopAjax() {
				let _this = this;
				uni.request({
          method: "POST",
          url: api.storeClasses,
          data: {
            token:uni.getStorageSync("token")
          },
					success: (res) => {
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						if(res.data.status == 1) {
							_this.data = res.data.data.class;
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			levelAjax() {
				let _this = this;
				uni.request({
          method: "POST",
          url: api.getShopLevel,
          data: {
            token:uni.getStorageSync("token")
          },
					success: (res) => {
						uni.showToast({
							title:res.data.message,
							icon:'none'
						})
						if(res.data.status == 1) {
							_this.level = res.data.data
						}
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			nextinfor: function() {
				let class_id = [];
				for (let key in this.goods_class) {
					if (this.goods_class[key].class_id) {
						class_id.push(this.goods_class[key].class_id)
					}
				}
				if(this.shop_account == '') {
					uni.showToast({
						title:'请填写商家账号',
						icon:'none'
					})
					return;
				}
				if(this.toke == '') {
					uni.showToast({
						title:'请选择店铺等级',
						icon:'none'
					})
					return;
				}
				if(this.year == '') {
					uni.showToast({
						title:'请选择开店时长',
						icon:'none'
					})
					return;
				}
				if(this.divide == '') {
					uni.showToast({
						title:'请选择店铺分类',
						icon:'none'
					})
					return;
				}
				if(class_id.length ==0){
					uni.showToast({
						title:'请选择经营分类',
						icon:'none'
					})
					return;
				}
				let _this = this;
				uni.request({
          method: "POST",
          url: api.perfectInfo,
          data: {
            shop_account:_this.shop_account,
            level_id:_this.toke_id,
            shop_long:_this.shop_long,
            shop_class:_this.divide,
            sc_bail:_this.sc_bail,
            class:_this.class_id,
            store_id:uni.getStorageSync('shop_ID'),
            token:uni.getStorageSync("token")
          },
					success: (res) => {
            if(res.data.status == 1) {
              uni.navigateTo({
                url: '/modules/shopOpen/settledAgreementSuc',
                fail(e) {
                  console.log(e)
                }
              })
            }else{
              uni.showToast({
                title:res.data.message,
                icon:'none'
              })
            }
					},
					fail: (res)=>{
						console.log(res);
					}
				})
			},
			chokes() {
				this.popupVisible3 = true;
			},
			choke(index) {
				this.year = this.years[index];
				this.shop_long = this.years[index].substring("年",1);
				this.popupVisible3 = false;
			},
			can() {
				this.popupVisible3 = false;
			},
			sel() {
				this.popupVisible3 = false;
			},
			choose(index) {
				this.toke = this.level[index].level_name;
				this.toke_id = this.level[index].id;
				this.popupVisible1 = false;

			},
			chose(index) {
				this.divide = this.data[index].sc_name;
				this.sc_bail = this.data[index].sc_bail;
				this.popupVisible2 = false;
			},
			divides() {
				this.popupVisible2 = true;
			},
			levChoose() {
				this.popupVisible1 = true;
			},
			cancleaddress() {
				this.popupVisible1 = false;
			},
			cancl() {
				this.popupVisible2 = false;
			},
			select() {
				this.popupVisible2 = false;
			},
			selectaddress() {
				this.popupVisible1 = false;
			}
		},
		mounted() {

		},
		created(){
			this.shopAjax();
			this.levelAjax();
		},
		
	}
</script>

<style lang="scss">
	.business{
		background-color:#f1f1f1;
		position:absolute;
	}
	.hd {
		padding: 20rpx;
		.title {
			border-left: 6rpx solid #d02629;
			padding-left: 20rpx;
			font-size: 32rpx;
			color: #111111;
		}
	}
	.per-center {
		li {
			background-color: #fff;
			border-bottom: 2rpx solid #F1F1F1;
			height: 100rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			span {
				width: 200rpx;
				font-size: 32rpx;
				color: #BDBDBD
			}
			.mint-datetime-action{
				color: #ff8000;
			}
			u-input {
				width: 500rpx;
				// height: 90rpx;
				border: 0;
				font-size: 28rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
			}
		}
		.mint-datetime-action{
				color: #ff8000;
			}
		.little-hint{
			margin: 0;
			i{
				font-style:normal;
				color: red;
			}
		}
		.listHead {
			margin-bottom: 10rpx;
			position: relative;
			.delete{
				background: url(@/static/images/common/delect01.png) no-repeat;
				background-size: 100% 100%;
				display: block;
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: 50rpx;
				top: 0;
			}
			.select{
				padding:20rpx;
				.address-area-tit{
					padding: 0;
					box-shadow: none;
					border-bottom: 0;
					line-height: 82rpx;
					height: 82rpx;
					li{
						padding: 0 20rpx;
						height: 80rpx;
						width: 33%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						text-align: center;
						font-size: 24rpx;
						display: inline-block;
						border-bottom: 2rpx solid #ccc;
					}
					li.active {
						border-bottom: 2rpx solid #ff8000;
						color: #ff8000;
					}
				}
			}
		}
		.addList {
			height: 150rpx;
			background-color: #F1F1F1;
			// div {
			// 	margin: 20rpx 0 50rpx;
			// 	border: 1rpx solid #C2C2C2;
			// 	width: 100%;
			// 	height: 75rpx;
			// 	font-size: 32rpx;
			// 	display: flex;
			// 	justify-content: center;
			// 	align-items: center;
			// 	color: #7C7C7C
			// }
		}
		a {
			width: 10000% !important;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			u-input {
				width: 500rpx;
				height: 90rpx;
				border: 0;
				font-size: 28rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
			}
		}
		.content{
			display: block;
		}
		.rightImg {
			width: 24rpx;
			height: 44rpx;
		}
		.time-length {
			height: 470rpx;
			overflow-y: scroll;
		}
		.goods-list{
			margin-top: 20rpx;
			height:450rpx;
			overflow-y: scroll;
			li{
				height: 60rpx;
				padding: 0 70rpx;
				line-height: 60rpx;
				font-size: 24rpx;
			}
			li.selected-li {
				color: #ff8000;
			}
		}
	}
	.tol {
		width: 100%;
	}
	.add-category{
		margin: 20rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		font-size: 30rpx;
		color: #666;
		border: 2rpx solid #c2c2c2;
	}
	.button {
		margin: 75rpx 20rpx 0;
		height: 90rpx;
		color: #fff;
		background-color: #d02629;
		border-radius: 90rpx;
		border: 0;
		width: 710rpx;
		outline: none;
		font-size: 32rpx;
		line-height:80rpx;
		text-align:center;
	}
	
	.p {
		padding: 20rpx;
		margin: 30rpx 0 40rpx;
		font-size: 24rpx;
		color: #959595;
		text-align: left;
	}
	.picker-toolbar{
		height:80rpx;
	}
	.mint-popup-4{
		width: 100%;	
	}
	.u-drawer-left{
		width: 100% !important;
		padding: 20rpx;
		height:700rpx;
		box-sizing: border-box;
		bottom:0;
		margin-top:560rpx;
	}
	.mint-datetime-action{
		color: #ff8000;
		width: 50%;
		text-align: center;
		line-height: 80rpx;
		font-size: 32rpx;
	}
	.mint-datetime-confirm {
	  float: right;
	}
	.mint-datetime-cancel {
	  float: left;
	}
	// wl-16569 13.9.2021 
</style>
