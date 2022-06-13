import Vue from 'vue'
import store from './store'
import App from './App'

import Json from './Json' //测试用数据

import share from './common/share.js'
/**
 *  因工具函数属于公司资产, 所以直接在Vue实例挂载几个常用的函数
 *  所有测试用数据均存放于根目录json.js
 *  
 *  css部分使用了App.vue下的全局样式和iconfont图标，有需要图标库的可以留言。
 *  示例使用了uni.scss下的变量, 除变量外已尽量移除特有语法,可直接替换为其他预处理器使用
 */
import uView from 'uview-ui';
Vue.use(uView);
// import OtpInput from "@bachdgvn/vue-otp-input";
// Vue.component("v-otp-input", OtpInput);

const msg = (title, duration=1500, mask=false, icon='none')=>{
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showToast({
		title,
		duration,
		mask,
		icon
	});
}
const json = type=>{
	//模拟异步请求数据
	return new Promise(resolve=>{
		setTimeout(()=>{
			resolve(Json[type]);
		}, 500)
	})
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}


Vue.config.productionTip = false
Vue.prototype.$fire = new Vue();
Vue.prototype.$store = store;
Vue.prototype.$api = {msg, json, prePage};

import {router,RouterMount} from './router/router.js'  //路径换成自己的
Vue.use(router)

App.mpType = 'app'

const app = new Vue({
    ...App
})

import Login from './modules/common/components/Login'


Vue.mixin(share)

Vue.component("login",Login)
app.$mount()