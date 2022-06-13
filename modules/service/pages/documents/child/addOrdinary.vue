<template>
  <view>
      <view class="ordinary">
          <view class="li">
              <label class="txt">发票抬头：</label>
            <input type="text" class="uni-input" v-model="name"/>
          </view>
      </view>
			<view class="footer">
				<button type="warn"  @click="protact()">保存</button>
			</view>
  </view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import config from '@/config.js'
import api from '@/api.js'
export default {
    data () {
        return {
            name:'',
        }
    },
    methods: {
    	protact(){
        let url = api.invoicesAreRaisedAdd+
            '?name='+this.name+
            '&token='+uni.getStorageSync('token');
        uni.request({
          url : url,
          success: (res) => {
            if(res.data.status==1){
              uni.showToast({
                title:res.data.message
              });
              uni.navigateTo({
                url: '/modules/service/pages/documents/documents'
              })
            }
            else{
              uni.showToast({
                title:res.data.message
              })

            }
          },
          fail: (res)=>{
            console.log(res);
          }
        })
    	}
    },
}
</script>
<style lang="scss">
.r{
	float: right;
}
.ordinary{
	width: 100%;
	height: 90%;
    .li{
        margin-top: 20rpx;
        height: 80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #ecebeb;
        padding: 25rpx;
        .txt{
            width: 30%;
          font-size: 30rpx;
        }
        input{
          width: 70%;
          border: 0;
        }

    }
}
.footer{
	width: 100%;
	height: 1rem;
	background: #FFFFFF;
	position: absolute;
	bottom: 60rpx;
	left: 0;
}

</style>
