import api from '@/api'
const product = {
	namespaced:true,
	state : {
		firstCategories : [],
		secondCategories : [],
		thirdCategories : [],
	},
	mutations : {
		setProductCategories(state,data){
			state.firstCategories = data.first;
			state.secondCategories = data.second;
			state.thirdCategories = data.three;
		}
	},
	actions : {
		getProductCategories(context){
			uni.request({
				url:api.getProductCategories,
				success(result) {
					
					if(result.data&&result.data.status==1&&result.data.data){
						context.commit("setProductCategories",result.data.data);
					}
				},
				fail(e) {
					console.log(e)
				}
			})
		}
	}
	
	
}

module.exports = product;


