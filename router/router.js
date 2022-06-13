// router.js
import {RouterMount,createRouter} from 'uni-simple-router';

const router = createRouter({
	platform: process.env.VUE_APP_PLATFORM,  
	routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach((to, from, next) => {
	if(to.meta.loginAuth){
			let token=uni.getStorageSync('token')
			if(token){
				next()
			}else{
				uni.navigateTo({
					url:'/pages/login/login?path='+to.path
				})
			}
		}else{
			next();
		}
	next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
    // console.log('跳转结束')
})

export {
	router,
	RouterMount
}