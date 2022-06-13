<template>
	<view class="addInfo">
		<view class="hd">
			<view class="title fl">开户银行信息</view>
		</view>
		<ul class="per-center">
			<li>
				<text class="span"> 店铺名称</text><u-input type="text" placeholder="请输入店铺名称..." v-model="store_name"></u-input>
			</li>
			<li>
				<text class="span"> 公司名称</text><u-input type="text" placeholder="请输入公司名称..." v-model="company_name"></u-input>
			</li>
			<li @click="callingArea">
				<!-- <a href="javascript:;">-->
				<text class="span"> 所在地区:</text>
				<u-input type="text" v-model="data.addressAll" disabled placeholder="请选择所在地址..."></u-input>
				<image class="rightImg" src="@/static/images/common/right-icon.png" alt=""></image>
				<!--</a>-->
			</li>
			<li>
				<text class="span"> 详细地址:</text><u-input type="text" placeholder="请输入详细地址..." v-model="address"></u-input>
			</li>
			<li>
				<text class="span"> 公司电话:</text><u-input type="tel" placeholder="请输入公司电话..." v-model="company_mobile"></u-input>
			</li>
			<li>
				<text class="span"> 注册资金:</text><u-input type="tel" placeholder="请输入注册资金..." v-model="registered_capital"></u-input>
			</li>
			<li>
				<text class="span"> 联系人姓名:</text><u-input type="text" placeholder="请输入真实姓名" v-model="name"></u-input>
			</li>
			<li>
				<text class="span"> 联系人手机:</text><u-input type="tel" placeholder="请输入联系人电话..." v-model="mobile"></u-input>
			</li>
		</ul>
		<u-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
			<view class="picker-toolbar">
				<text class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</text>
				<text class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</text>
			</view>
			<view class="select">
				<ul class="address-area-tit">
					<li :class="showProvince?'active':''" @click="selectedArea('province')">
						{{ province }}</li>
					<li v-if="choiceCity" :class="showCity?'active':''" @click="selectedArea('city')">
						{{ city }}</li>
					<li v-if="choiceArea" @click="selectedArea('area')" :class="showArea?'active':''">
						{{ area }}</li>
					<li v-if="choiceStreet" :class="showStreet?'active':''">
						{{ street }}</li>
				</ul>
				<ul class="address-city" v-if="showProvince">
					<li v-for="(n, i) in addressPlace" :key="i" @click="getProvince(n.id, n.name, i)" :class="i==provinceIndex?'selected-li':''">
						{{ n.name }}</li>
				</ul>
				<ul class="address-city" v-if="showCity">
					<li v-for="(n, i) in cityArr" :key="i" @click="getCity(n.id, n.name, i)" :class="i==cityIndex?'selected-li':''">
						{{ n.name }}</li>
				</ul>
				<ul class="address-city" v-if="showArea">
					<li v-for="(n, i) in districtArr" :key="i" @click="setCityEnd(n.id, n.name, i)" :class="i==areaIndex?'selected-li':''">{{ n.name }}</li>
				</ul>
				<ul class="address-city" v-if="showStreet">
					<li v-for="(n, i) in TownshipArr" :key="i" @click="setStreetEnd(n.id, n.name, i)" :class="i==streetIndex?'selected-li':''">{{ n.name }}</li>
				</ul>
			</view>
		</u-popup>
		<view @click="nextinfor" class="nextbtn">提交以上信息，并填写下一页</view>
	</view>
</template>

<script>
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		
		data(){
			return {
				config,
				store_name:'',
				company_name: "",
				company_mobile: "",
				registered_capital: "",
				name: '',
				mobile: "",
				address: '',
				popupVisible: false,
				popup: false,
				prov: '',
				cityArr: '',
				Bcity: '',
				district: '',
				districtArr: '',
				Township: '',
				TownshipArr: '',
				addressPlace: '',
				data: {
					name: '',
					phone: '',
					address1: '',
					addressAll: '',
					addAll: '',
					Det: '',
					addressa: '',
					value: 0
				},
				choiceProvince: false, //省按钮的显示隐藏
				choiceCity: false, // 市按钮的显示隐藏
				choiceArea: false, // 区按钮的显示隐藏
				choiceStreet: false,
				province: '请选择', // 选中的省
				city: '请选择', // 选中的市
				area: '请选择', // 选中的区
				street: '请选择', //选中的街道
				showProvince: true, // 省选择的显示隐藏
				showCity: false, // 市选择的显示隐藏
				showArea: false, // 区选择的显示隐藏
				showStreet: false, //街道的显示隐藏
				provinceId: '', // 选中的省id
				cityId: '', // 选中的市id
				areaId: '', // 选中的区id
				selected: false, // 选中的那个项
				provinceIndex: -1, // 选中态索引
				cityIndex: -1,
				areaIndex: -1,
				streetIndex: -1,
				choiceAreaCon: '请选择地区',
				shopInfo:{}
			}
		},
		methods:{
			nextinfor: function() {
				if(!this.store_name){
					uni.showToast({
						title:'请填写公司名称',
						icon:'none'
					})
					return;
				}
				if(!this.company_name){
					uni.showToast({
						title:'请填写公司名称',
						icon:'none'
					})
					return;
				}
				if(!this.address){
					uni.showToast({
						title:'请填写详细地址',
						icon:'none'
					})
					return;
				}
				if(!(/^((0\d{2,3}-?)?\d{7,8}|(1[3584]\d{9}))$/.test(this.company_mobile))){
					uni.showToast({
						title:'请填写正确的电话',
						icon:'none'
					})
					return;
				}
				if(!this.registered_capital){
					uni.showToast({
						title:'请填写正确注册资金',
						icon:'none'
					})
					return;
				}
				if(!this.name){
					uni.showToast({
						title:'请填写联系人名称',
						icon:'none'
					})
					return;
				}
				if(!(/^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/.test(this.mobile))){
					uni.showToast({
						title:'请填写正确的手机号',
						icon:'none'
					})
					return;
				}
				this.shopInfo.store_name = this.store_name;
				this.shopInfo.company_name = this.company_name;
				this.shopInfo.prov_id = this.provinceId;
				this.shopInfo.city = this.cityId;
				this.shopInfo.dist = this.areaId;
				this.shopInfo.address = this.address;
				this.shopInfo.company_mobile = this.company_mobile;
				this.shopInfo.registered_capital = this.registered_capital;
				this.shopInfo.name = this.name;
				this.shopInfo.mobile = this.mobile;
				uni.setStorageSync('admissionInfo',JSON.stringify(this.shopInfo));
				uni.setStorageSync('kd_address',this.data.addressAll);
				uni.navigateTo({
					url: '/modules/shopOpen/companyShop/companyPhotos',
					fail(e) {
						console.log(e)
					}
				})
			},
			callingArea() {
				this.popupVisible = true;
			},
			cancleaddress() {
				this.popupVisible = false;
			},
			callingadd() {
				this.popup = true;
			},
			selectaddress() {
				this.popupVisible = false;
				if(this.province==""||this.province=="请选择") {
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})	
				} else if(this.city==""||this.city=="请选择"){
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
				}else if(this.area==""||this.area=="请选择" ){
					uni.showToast({
						title:'请选择地址',
						icon:'none'
					})
				}else{
					this.data.addressAll = this.province + '-' + this.city + '-' + this.area;
					this.choiceCity=false;// 市按钮的显示隐藏
					this.choiceArea=false; // 区按钮的显示隐藏
					this.choiceStreet=false;
					this.choiceProvince=true; // 省按钮的显示隐藏
					this.showStreet = false;
					this.showProvince=true;
					this.province="请选择"
				}
				
			},
			proAjax(index, selId) {
					let url = api.getRegionList+
						'?parent_id='+index+
						'&id='+index+
						'&token='+uni.getStorageSync('token');
					let _this = this;
					uni.request({
						url : url,
						success: (res) => {
							let data = res.data.data;
							if(selId == 0) {
								_this.addressPlace = data;
							} else if(selId == 1) {
								_this.cityArr = data;
							} else if(selId == 2) {
								_this.districtArr = data;
							} else if(selId == 3) {
								_this.TownshipArr = data;
							}
						},
						fail: (err)=>{			
						}
					});
			},
			selectedArea(type) { // 按钮点击
				if(type == "province") {
					this.cityIndex = -1;
					this.areaIndex = -1;
					this.streetIndex = -1

					this.choiceCity = false;
					this.choiceArea = false;
					this.choiceStreet = false,

					this.showProvince = true;
					this.showCity = false;
					this.showArea = false;
					this.showStreet = false;

				} else if(type == "city") {
					this.cityIndex = -1;
					this.areaIndex = -1;
					this.streetIndex = -1
					this.choiceArea = false;
					this.choiceStreet = false;

					this.showProvince = false;
					this.showCity = true;
					this.showArea = false;
					this.showStreet = false;
				} 
			},

			getProvince(id, name, index) {
				this.Bcity = '请选择', // 选中的市
				this.area = '请选择', // 选中的区
				this.city = '请选择';
				this.choiceCity = true;
				this.province = name;
				this.provinceId = id;
				this.showProvince = false;
				this.showCity = true;
				this.showArea = false;
				this.showStreet = false;
				this.cityArr = this.proAjax(this.provinceId, 1);
			},
			getCity(id, name, index) { // 获取城市列表
				this.area = '请选择', // 选中的区
				this.choiceArea = true;
				this.city = name;
				this.cityId = id;
				this.showProvince = false;
				this.showCity = false;
				this.showArea = true;
				this.showStreet = false;
				this.districtArr = this.proAjax(this.cityId, 2);
			},
			setCityEnd(id, name, index) { // 区点完以后
				this.area = name;
				this.areaId = id;
			},				
		},
		mounted() {

		},
		created(){
			this.proAjax(0, 0);
			if(uni.getStorageSync('admissionInfo')){
				this.shopInfo =  JSON.parse(uni.getStorageSync('admissionInfo'));
				this.store_name = this.shopInfo.store_name;
				this.company_name = this.shopInfo.company_name;
				this.data.addressAll = uni.getStorageSync('kd_address');
				this.provinceId = this.shopInfo.prov_id;
				this.cityId	= this.shopInfo.city;
				this.areaId	= this.shopInfo.dist;
				this.address = this.shopInfo.address;
				this.company_mobile = this.shopInfo.company_mobile;
				this.registered_capital = this.shopInfo.registered_capital;
				this.name = this.shopInfo.name;
				this.mobile = this.shopInfo.mobile;
			}
		},
		
	}
</script>

<style lang="scss">
	.addInfo{
		background-color:#f1f1f1;
		height:100%;
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
			height: 90rpx;
			display: flex;
			align-items: center;
			font-size: 28rpx;
			padding: 0 20rpx;
			.span {
				width: 100px;
				font-size: 32rpx;
				color: #BDBDBD;
			}
			u-input {
				width: 520rpx;
				// height: 90rpx;
				border: 0;
				background: #fff;
				font-size: 28rpx;
				padding-left: 30rpx;
				box-sizing: border-box;
			}
			
		}
		// li:nth-of-type(2) input{padding-left: 35rpx;}
		// a {
		// 	width: 100%;
		// 	height: 100%;
		// 	display: flex;
		// 	align-items: center;
		// 	justify-content: space-between;
		// }
		.rightImg {
			width: 24rpx;
			height: 44rpx;
		}
	} 
	.nextbtn {
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
	.mint-popup-bottom {
		width: 100%;
		padding: 20rpx;
		height:700rpx;
		box-sizing: border-box;
		.select {
			padding: 20rpx 0;
			select {
				padding-left: 10rpx;
				border: 1rpx solid #d9d9d9;
				width: 24%;
				height: 50rpx;
				background: #fff;
				outline: none;
				option {
					color: #333;
					text-align: center;
				}
			}
		}
	}
	
	#address-mask {
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .4);
		position: absolute;
		left: 0;
		top: 0;
	}
	
	#address-area {
		width: 100%;
		height: 320px;
		overflow: hidden;
		position: absolute;
		left: 0;
		bottom: 0;
		background: #fff;
		box-shadow: 0 -4px 7px rgba(255, 255, 255, .6);
	}
	
	.address-area-tit {
		border-bottom: 1px solid #ccc;
		line-height: 40px;
		box-shadow: 0px 1px 2px rgba(23, 43, 135, .2);
	}
	
	#address-mask ul,
	li {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	
	.address-area-tit {
		padding: 0;
		box-shadow: none;
		margin-bottom:20rpx;
		border-bottom: 0;
		height: 41px;
	}
	
	.address-area-tit li {
		cursor: pointer;
		position: relative;
		left: 0;
		top: 1px;
		height: 40px;
		padding: 0 20rpx;
		width: 33%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		font-size: 12px;
		display: inline-block;
		border-bottom: 1px solid #ccc;
	}
	
	.address-area-tit li.active {
		border-bottom: 1px solid #ff8000;
		color: #ff8000;
	}
	
	.address-city {
		margin-top: 10px;
		height: 450rpx;
		overflow: hidden;
		overflow-y: scroll;
		width: calc(100% + 30px);
	}
	
	.address-city li {
		padding: 0 35px;
		line-height: 30px;
		font-size: 12px;
		cursor: pointer;
	}
	
	.address-city li.selected-li {
		color: #ff8000;
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
</style>
