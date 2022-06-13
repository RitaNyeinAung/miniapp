<template>
	<view>
		<con-header :text="text[0]"></con-header>
		<view class="per-center">
			<view class="center-name">
				<label class="label-name">店铺名称：</label>
				<input class="input-data" type="text" placeholder="请输入店铺名称..." v-model="store_name" />
			</view>
			<view class="center-name" @click="callingArea">
				<label class="label-name">所在地区: </label>
				<input class="input-data" type="text" v-model="data.addressAll" disabled placeholder="请选择所在地址..." />
				<img class="rightImg" src="@/static/images/common/right-icon.png" alt="" />
				<!-- <picker mode="multiSelector" @columnchange="bindMultiPickerColumnChange" :value="id" :range="multiArray" range-key="name" class="picker">
				  <view class="picker-input">{{prov_name}}-{{city_name}}-{{dist_name}}</view>
				</picker> -->
			</view>
			<view class="center-name">
				<label class="label-name">详细地址: </label>
				<input class="input-data" type="text" placeholder="请输入详细地址..." v-model="address" />
			</view>
			<view class="center-name">
				<label class="label-name">联系人手机: </label>
				<input class="input-data" type="number" oninput="if(value.length > 11)value=value.slice(0, 11)" placeholder="请输入手机号码..." v-model="mobile" />
			</view>
		</view>
		
		<con-header :text="text[1]"></con-header>
		<view class="per-center">
			<view class="center-name">
				<label class="label-name">姓名: </label>
				<input class="input-data" type="text" placeholder="请输入姓名..." v-model="person_name" />
			</view>
			<view class="center-name">
				<label class="label-name">身份证号码: </label>
				<input class="input-data" type="text" placeholder="请输入身份证号码..." v-model="id_card" oninput="if(value.length > 18)value=value.slice(0, 18)" />
			</view>
		</view>
		
		<con-header :text="text[2]"></con-header>
		<view class="per-center">
			<view class="center-name">
				<label class="label-name">微&nbsp;&nbsp;信: </label>
				<input class="input-data" type="text" placeholder="请输入微信号码" v-model="wechatNum">
			</view>
			<view class="center-name">
				<label class="label-name">支付宝: </label>
				<input class="input-data" type="text" placeholder="请输入支付宝号码" v-model="alipayNum" />
			</view>
			<view class="center-name">
				<label class="label-name">开户行: </label>
				<input class="input-data" type="text" placeholder="请输入银行开户行" v-model="bank_name" />
			</view>
			<view class="center-name">
				<label class="label-name">银行卡: </label>
				<input class="input-data" type="text" placeholder="请输入银行卡号码" v-model="bankNum" />
			</view>
		</view>
		
		<u-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
			<view class="picker-toolbar">
				<text class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</text>
				<text class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</text>
			</view>
			<view class="select">
				<ul class="address-area-tit">
					<li v-model="prov" :class="showProvince?'active':''" @click="selectedArea('province')">
						{{ province }}</li>
					<li v-model="Bcity" v-if="choiceCity" :class="showCity?'active':''" @click="selectedArea('city')">
						{{ city }}</li>
					<li v-model="district" v-if="choiceArea" @click="selectedArea('area')" :class="showArea?'active':''">
						{{ area }}</li>
					<li v-model="Township" v-if="choiceStreet" :class="showStreet?'active':''">
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
		
		<view>
			<button class="button-place" @click="nextinfor">提交以上信息，并填写下一页</button>
		</view>
	</view>
</template>

<script>
	import conHeader from '@/common/conHeader'
	import config from '@/config.js'
	import api from '@/api.js'
	export default {
		data() {
			return {
				text: ['店铺及联系人信息', '身份证信息', '打款帐号'],
				popupVisible: false,
				popup: false,
				store_name: "",
				person_name: "",
				mobile: "",
				id_card: "",
				address: "",
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
	
				choiceProvince: false, // 省按钮的显示隐藏
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
				wechatNum: '',// 微信帐号
				alipayNum: '',// 支付宝帐号
				bank_name:'',//银行户名
				bankNum: '',// 银行卡号
				shopInfo:{},
			}
		},
		components: {
			conHeader
		},
		created(){
			if(uni.getStorageSync('admissionInfo')){
				this.shopInfo =  JSON.parse(uni.getStorageSync('admissionInfo'));
				this.data.addressAll = uni.getStorageSync('kd_address');
				this.provinceId	= this.shopInfo.prov_id;
				this.cityId	= this.shopInfo.city;
				this.areaId = this.shopInfo.dist;
				this.store_name = this.shopInfo.store_name;
				this.person_name = this.shopInfo.person_name;
				this.mobile = this.shopInfo.mobile;
				this.id_card =this.shopInfo.id_card;
				this.address = this.shopInfo.address;
				this.alipayNum =this.shopInfo.alipay_account;
				this.wechatNum = this.shopInfo.wx_account;
				this.bank_name = this.shopInfo.bank_name;
				this.bankNum = this.shopInfo.bank_account;
			}
		},
		methods :{
			nextinfor: function () {
				if (!this.store_name) {
					uni.showToast({
						title: '请输入店铺名',
						icon:'none'
					})
					return;
				}
				if (!this.data.addressAll) {
					uni.showToast({
						title: '请选择地址',
						icon:'none'
					})
					return;
				}
				if (!this.address) {
					uni.showToast({
						title: '请输入地址',
						icon:'none'
					})
					return;
				}
				if (!(/^1[3|4|5|7|8][0-9]{9}$/.test(this.mobile))) {
					uni.showToast({
						title: '请输入正确手机号',
						icon:'none'
					})
					return;
				}
				if (!this.person_name) {
					uni.showToast({
						title: '请输入姓名',
						icon:'none'
					})
					return;
				}
				if (!(/(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.id_card))) {
					uni.showToast({
						title: '请输入正确身份证号',
						icon:'none'
					})
					return;
				}
				if (!this.wechatNum) {
					uni.showToast({
						title: '请输入微信账号',
						icon:'none'
					})
					return;
				}
				if (!this.alipayNum) {
					uni.showToast({
						title: '请输入支付宝账号',
						icon:'none'
					})
					return;
				}
				if (!this.bank_name) {
					uni.showToast({
						title: '请输入开户行',
						icon:'none'
					})
					return;
				}
				if (!/(^[1-9]([0-9]*)$|^[0-9]$)/.test(this.bankNum) || this.bankNum.length<12){
					uni.showToast({
						title: '请输入正确的银行卡号',
						icon:'none'
					})
					return;
				}
        this.shopInfo.prov_id = this.provinceId;
        this.shopInfo.city = this.cityId;
        this.shopInfo.dist = this.areaId;
        this.shopInfo.store_name = this.store_name;
        this.shopInfo.person_name = this.person_name;
        this.shopInfo.mobile = this.mobile;
        this.shopInfo.id_card = this.id_card;
        this.shopInfo.address = this.address;
        this.shopInfo.alipay_account = this.alipayNum;
        this.shopInfo.wx_account = this.wechatNum;
        this.shopInfo.bank_name = this.bank_name;
        this.shopInfo.bank_account = this.bankNum;
        uni.setStorageSync('admissionInfo',JSON.stringify(this.shopInfo));
        uni.setStorageSync('kd_address',this.data.addressAll);
        uni.navigateTo({
          url: '/modules/shopOpen/perShop/proId',
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
				if (this.province == "" || this.province == "请选择") {
					uni.showToast({
						title: '请选择地址',
						icon:'none'
					})
				} else if (this.city == "" || this.city == "请选择") {
					uni.showToast({
						title: '请选择地址',
						icon:'none'
					})
				} else if (this.area == "" || this.area == "请选择") {
					uni.showToast({
						title: '请选择地址',
						icon:'none'
					})
				} else {
					this.data.addressAll = this.province + '-' + this.city + '-' + this.area;
					this.choiceCity = false;// 市按钮的显示隐藏
					this.choiceArea = false; // 区按钮的显示隐藏
					this.choiceStreet = false;
					this.choiceProvince = true; // 省按钮的显示隐藏
					this.showStreet = false;
					this.showProvince = true;
					this.province = "请选择"
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
			this.proAjax(0, 0)
		},
		// onLoad(options){
		//   this.getRegionList();
		// },
		// methods: {
		//   bindPickerChange: function(e) {
		//     this.index = e.detail.value
		//   },
		//   bindMultiPickerColumnChange: function(e) {
		//     let _that = this;
		//     let id = _that.multiArray[e.detail.column][e.detail.value].id;
		//     let name = _that.multiArray[e.detail.column][e.detail.value].name;
		//     switch (e.detail.column) {
		//       case 0: //拖动第1列
		//         uni.request({
		//           method: "POST",
		//           url: api.getRegionList,
		//           data: {id:id},
		//           success(res) {
		//             if (res.data.status == 1) {
		//               _that.multiArray[1] = res.data.data
		//               _that.prov_name = name;
		//               _that.prov_id = id;
		//               _that.city_name = res.data.data[0].name;
		//               _that.city_id = res.data.data[0].id;
		//               uni.request({
		//                 method: "POST",
		//                 url: api.getRegionList,
		//                 data: {id:_that.city_id},
		//                 success(result) {
		//                   if (result.data.status == 1) {
		//                     _that.multiArray[2] = result.data.data
		//                     _that.dist_name = result.data.data[0].name;
		//                     _that.dist_id = result.data.data[0].id;
		//                   }
		//                 }, fail(e) {
		//                 }
		//               })
		//             }
		//           }, fail(e) {
		//           }
		//         })
		//         break
		//       case 1: //拖动第2列
		//         uni.request({
		//           method: "POST",
		//           url: api.getRegionList,
		//           data: {id:id},
		//           success(res) {
		//             if (res.data.status == 1) {
		//               _that.multiArray[2] = res.data.data
		//               _that.city_name = name;
		//               _that.city_id = id;
		//               _that.dist_name = res.data.data[0].name;
		//               _that.dist_id = res.data.data[0].id;
		//             }
		//           }, fail(e) {
		//           }
		//         })
		//         break
		//       case 2: //拖动第2列
		//         _that.dist_name = name;
		//         _that.dist_id = id;
		//         break;
		//     }
		//     _that.$forceUpdate()
		//   },
		//   getRegionList() {
		//     let _that = this;
		//     uni.request({
		//       method: "POST",
		//       url: api.getRegionList,
		//       data: {},
		//       success(res) {
		//         if (res.data.status == 1) {
		//           _that.multiArray[0] = res.data.data
		//         }
		//       }, fail(e) {

		//       }
		//     })
		//   },
		// }
	}
</script>

<style lang="scss">
	.per-center {
	  .center-name {
	    background-color: #fff;
	    border-bottom: 1rpx solid #f1f1f1;
	    height: 90rpx;
	    display: flex;
	    align-items: center;
	    font-size: 28rpx;
	    padding: 0 20rpx;
	    .label-name {
	      width: 180rpx;
	      font-size: 32rpx;
	      color: #bdbdbd;
	    }
	    .input-data {
	      width: 520rpx;
	      height: 88rpx;
	      border: 0;
	      background: #fff;
	      font-size: 28rpx;
	      padding-left: 30rpx;
	      box-sizing: border-box;
	    }
		.rightImg {
			width: 24rpx;
			height: 44rpx;
		}
		// .picker-input {
		// 	width: 520rpx;
		// 	color: #999;
		// 	border: 0;
		// 	background: #fff;
		// 	font-size: 28rpx;
		// 	padding-left: 30rpx;
		// 	box-sizing: border-box;
		// }
	  }
	}
	.button-place {
		margin: 75rpx 20rpx;
		height: 90rpx;
		color: #fff;
		background-color: #d02629;
		border-radius: 90rpx;
		border: 0;
		width: 710rpx;
		outline: none;
		font-size: 32rpx;
	}
	// .picker{
	//   width: 70%;
	//   border: 0;
	// }
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