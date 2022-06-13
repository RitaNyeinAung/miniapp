<template>
  <view>
      <view class="ordinary">
          <view class="icon_del">
            <text class="icon" @click="editDelet(data.id)"></text>
          </view>
          <view class="li">
              <label class="txt">发票抬头：</label>
            <input type="text" class="uni-input" v-model="data.name"/>
          </view>
      </view>
			<view class="footer">
				<button type="warn"  @click="protact(data.id)">确认修改</button>
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
            title:'编辑普通发票',
            data:{},
        }
    },
    onLoad(options){
      this.data = uni.getStorageSync("invoice_title");
    },
    methods: {
    	protact(id){
        let url = api.invoicesAreRaisedSave+
            '?id='+id+
            '&name='+this.data.name+
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
    	},
    	editDelet(id){
        uni.showModal({
          title: '提示',
          content: '确定执行此操作?',
          success: function (res) {
            if (res.confirm) {
              let url = api.invoicesAreRaisedDelete+
                  '?id='+id+
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
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
          }
        });
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
  .icon_del{
    margin-top: 20rpx;
    height: 80rpx;
    .icon {
      font-size: 30rpx;
      color: #333;
      position: absolute;
      right: 35rpx;
      width: 38rpx;
      height: 47rpx;
      background: url(@/static/images/common/trash.png);
      background-size: 100% 100%;
    }
  }

    .li{
        margin-top: 20rpx;
        height: 80rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        padding: 25rpx;
        .txt{
            width: 20%;
        }
        input{
          width: 80%;
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
