<template>
	<view class="wrap">
		<view class="top">
			<u-select v-model="show" mode="mutil-column-auto" :list="list" @confirm="confirm" label-name="name" value-name="id"></u-select>
			<u-form
					labelPosition="left"
					:model="model1"
					:rules="rules"
					ref="form1"
					label-width="150"
			>
			
				<u-form-item
						label="收货人"
						prop="address.name"
						borderBottom
						ref="item1"
				>
					<u-input
							v-model="model1.address.name"
							border="none"
							placeholder="请填写收货人姓名"
					></u-input>
				</u-form-item>
				<u-form-item
						label="手机号码"
						prop="address.phone"
						borderBottom					
						ref="item1"
				>
					<u-input
							v-model="model1.address.phone"
							placeholder="请填写收货人手机号"
							border="none"
					></u-input>
				</u-form-item>
				<u-form-item label="收货地址" border="none" prop="address.address_name">
					<u-input v-model="model1.address.address_name" type="select" border="none" placeholder="请选择收货地址" @click="show=true"/>
				</u-form-item>
				<u-form-item
						label="详情地址"
						prop="address.detail"
						borderBottom					
						ref="item1"
				>
					
					<u-input
							v-model="model1.address.detail"
							placeholder="请填写收货人详情地址"
							border="none"
							type="textarea"
					></u-input>
				</u-form-item>
				<u-form-item label="设为默认" prop="address.default">
					<u-switch slot="right" active-color="#d02629" v-model="model1.address.default"></u-switch>
				</u-form-item>
				
			</u-form>
		</view>
		<view class="bottom" style="padding-top:10rpx ;">
			<button :class="['btn']" @click="submit">保存</button>
		</view>
		
		
	</view>
</template>

<script>
	import api from '@/api.js';
	import {mapMutations,mapState,mapActions} from  'vuex';
	export default {
		data() {
			return {
				show: false,
				selector: [1, 2, 3],
				defaultSelect: [0,0],
				first:0,
				second:0,
				third:0,//地址层
				addressList:[],
				multiSelector: [
					[1, 2, 3], 
					[4, 5, 6]
				],
				// 这种情况需要指定range-key为cateName，否则组件不知道该显示对象的哪个属性
				list: [
					
				],
				model1: {
					address: {
						name: '',
						phone: '',
						detail: '',
						default:0,
						address_name:'',
						prov:'',//省
						city:'',//市
						dist:''//区
					},
				},
				rules: {
					'address.name': [
						{
							

							message: '请填写收货姓名',
							trigger: ['blur', 'change'],
							validator:(rule,value,callback)=>{
								return this.model1.address.name != '' 
							},
						}
					],
					'address.phone': [
						{
							message: '请填写手机号',
							trigger: ['blur', 'change'],
							validator:(rule,value,callback)=>{
								return this.model1.address.phone != '' 
							},
						},
						{
							// 自定义验证函数，见上说明
							validator: (rule, value, callback) => {
								// 上面有说，返回true表示校验通过，返回false表示不通过
								// this.$u.test.mobile()就是返回true或者false的
						
								return this.$u.test.mobile(this.model1.address.phone);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change
							trigger: ['change','blur'],
						}
					],
					'address.address_name': [
						{
			
							validator:(rule,value,callback)=>{
								return this.model1.address_name != '' 
							},
							message: '请选择收货地址',
							trigger: ['blur', 'change']
						}
					],
				},
			}
		},
		computed:{
			...mapState(['addressList'])
		},
		methods:{
			...mapMutations(['setAddressList']),
			...mapActions(['asyncGetAddressList']),
			submit(){
				this.$refs.form1.validate(valid => {
					if (valid) {
						uni.showLoading({
							title:"添加中"
						})
						let _this = this;
						uni.request({
							method:"POST",
							url:api.addAddress,
							data:{
								realname:_this.model1.address.name,
								mobile:_this.model1.address.phone,
								prov:_this.model1.address.prov,
								city:_this.model1.address.city,
								dist:_this.model1.address.dist,
								address:_this.model1.address.detail,
								status:_this.model1.address.default?1:0,
								token:uni.getStorageSync("token")
							},
							success(res) {
								uni.hideLoading();
								if(res.data.status==1){
									uni.showToast({
										title:"添加成功"
									})
									_this.model1.address= {
										name: '',
										phone: '',
										detail: '',
										default:0,
										address_name:'',
										prov:'',//省
										city:'',//市
										dist:''//区
									}
									_this.getAddressList("refresh")
									
								}else{
									uni.showToast({
										title:"添加失败",
										icon:"none"
									})
								}
							},
							fail(e) {
								uni.hideLoading();
								console.log(e);
								uni.showToast({
									title:"添加失败",
									icon:"none"
								})
							}
						})
					} else {
						console.log('验证失败');
					}
				});
			},
			generateAddressSelector(){
				
				// let addressList = JSON.parse(uni.getStorageSync("addressList"));
				// if(addressList){
				// 	let half = Math.floor(addressList.length/2);
				// 	this.list=[];
				// 	this.list = addressList.splice(0,half)
				// 	this.list.push(addressList.splice(half))
				// 	return
				// }
				let _this = this;
				uni.request({
					url:api.getAddressList,				
					success(res) {
						
						if(res.data.data){
							let half = Math.floor(res.data.data.length/2);
							_this.list=[];
							_this.list = res.data.data.splice(0,half)
							_this.list.push(res.data.data.splice(half))
						}
					},
					fail(e) {
						console.log(e);
					}
				});
				
				
				
				
				
			},
			
		
						
			confirm(data){
				
				this.model1.address.prov=data[0].value;
				this.model1.address.city=data[1].value;
				this.model1.address.dist=data[2].value;
				this.model1.address.address_name=data[0].label+' '+data[1].label+' '+data[2].label;

			},
			getAddressList(type){
				
				if(type=="refresh"){
					uni.request({
						url:api.getUserAddress,
						data:{
							token:uni.getStorageSync("token")||"-"
						},
						method:"POST",
						success(res) {
							if(res.data.data){														
								uni.setStorageSync("addressList",res.data.data);
								_this.asyncGetAddressList();
							}else{
								uni.setStorageSync("addressList",[]);
								_this.asyncGetAddressList();
							}
						},
						fail(e) {
							console.log(e);
						}
					});
				}
				
				let _this = this;
				_this.asyncGetAddressList();
				console.log(this.selectedAddress);
				
			},
		},
		mounted(){
			this.generateAddressSelector();
			
		},
		onReady() {
			this.$refs.form1.setRules(this.rules);
		}
	}
</script>

<style lang="scss">
	.wrap{
		.top{
			padding:20rpx 30rpx;
		}
		.bottom{
			width: 100%;
			padding:0rpx 30rpx;
			position: fixed;
			bottom:0;
			.btn{
				height: 70upx;
				line-height: 70upx;
				border-radius: 100upx;
				background: $main-color;
				font-size: $font-base + 2upx;
				color: #fff;
				margin: 30upx auto 20upx;
				
				width:100%;
				
			}
			.btn.disabled{
				opacity: 0.3;
				
			}
		}
	}
	
</style>