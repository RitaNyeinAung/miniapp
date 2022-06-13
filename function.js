

const f = {
	isLogin(){
		let token=uni.getStorageSync('token');
		return token;
	}
}

module.exports = f;