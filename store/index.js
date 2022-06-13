import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api.js'
import product from './product'


Vue.use(Vuex)

function tree(node,list){
	node.children = list.filter((l)=>l.parentid==node.id).map((n)=>{
		return tree(n,list);
	})
	return node;
}

const store = new Vuex.Store({
	state: {
		hasLogin: false,
		userInfo: {},
		token : '',
		showLoginPopup:false,//打开 登录单窗,
		addressList:[],//用户地址
		selectedAddress:null,//已选地址，
		cart:[],
		logo:''
		
	},
	mutations: {
		login(state, data) {
			state.hasLogin = true;
			state.userInfo = data.user;
			state.token = data.access_token;
			uni.setStorage({//缓存用户登陆状态
			    key: 'userInfo',  
			    data: data.user  
			}) 
			uni.setStorage({//缓存用户登陆状态
			    key: 'token',  
			    data: data.access_token  
			}) 
	
		},
		setUserInfo(state,userInfo){
			state.userInfo = userInfo;
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
			uni.removeStorage({
				key:''
			})
		},
		setHasLogin(state,value){
			state.hasLogin = value;
		},
		toggleLoginPopup(state){
			state.showLoginPopup = !state.showLoginPopup;
		},
		closeLoginPopup(state){
			state.showLoginPopup = false;
		},
		// setAddressList(state,list){
		// 	// let addressList = [];
		// 	// addressList = list.filter((l)=>l.parentid==0).map((node)=>{
		// 	// 	return tree(node,list);
		// 	// })
		// 	// uni.setStorageSync("addressList",addressList);
		// },
		setAddressList(state,list){
			state.addressList = list.map((r)=>{
				if(r.status==1){
					r.selected = true;
					state.selectedAddress=r;
					
				}else{
					r.selected = false;
				}
				return r;
			})	
			console.log(state.addressList);
			
		},
		updateCart(state,obj){
		
			if(obj.type=="add"){
				state.cart.push(obj.item)
				state.cart = state.cart;
				console.log(state.cart)
			}
			if(obj.type=="clear"){
				state.cart=[];
			}
		},
		setLogo(state,logo){
			state.logo = logo
		}
		
	},
	actions: {
		asyncGetAddressList(context){
			let addressList = uni.getStorageSync("addressList");
			if(!addressList){
				return
			}
			addressList.forEach((address)=>{
				if(address.status==1){
					address.selected = true;
				}else{
					address.selected = false;
				}
			})
			context.commit('setAddressList',addressList)
			
		}
	},
	modules:{
		product
	}
})

export default store
