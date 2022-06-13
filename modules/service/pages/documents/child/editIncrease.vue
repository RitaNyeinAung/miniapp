<template>
  <view>
      <view class="ordinary">
          <view class="icon_del">
            <text class="icon" @click="editDelet(data.id)"></text>
          </view>
          <view class="li">
              <label class="txt">公司名称：</label>
              <input type="text" class="uni-input" v-model="data.company_name"/>
          </view>
          <view class="li">
            <label class="txt">税号：</label>
            <input type="text" class="uni-input" v-model="data.ein"/>
          </view>
          <view class="li">
            <label class="txt">开户银行名称：</label>
            <input type="text" class="uni-input" v-model="data.opening_bank"/>
          </view>
          <view class="li">
            <label class="txt">开户银行账号：</label>
            <input type="text" class="uni-input" v-model="data.bank_account"/>
          </view>
          <view class="li"  @click="callingArea">
            <label class="txt">注册地址：</label>
            <u-input type="text" v-model="addressAll" disabled placeholder="请选择所在地址..."></u-input>
            <image class="rightImg" src="@/static/images/common/right-icon.png" alt=""></image>
          </view>
           <view class="li">
              <label class="txt">详细地址：</label>
              <input type="text" class="uni-input" v-model="data.register_address"/>
            </view>
          <view class="li">
            <label class="txt">注册电话：</label>
            <input type="text" class="uni-input" v-model="data.register_tel"/>
          </view>
      </view>
			<view class="footer">
				<button type="warn"  @click="protact(data.id)">确认修改</button>
			</view>
    <u-popup v-model="popupVisible" position="bottom" class="mint-popup-4">
      <view class="picker-toolbar">
        <text class="mint-datetime-action mint-datetime-cancel" @click="cancleaddress">取消</text>
        <text class="mint-datetime-action mint-datetime-confirm" @click="selectaddress">确定</text>
      </view>
      <view class="select">
        <ul class="address-area-tit">
          <li :class="showProv?'active':''" @click="selectedArea('province')">
            {{ prov }}</li>
          <li v-if="choiceCity" :class="showCity?'active':''" @click="selectedArea('city')">
            {{ city }}</li>
          <li v-if="choiceDist" @click="selectedArea('area')" :class="showDist?'active':''">
            {{ dist }}</li>
        </ul>
        <ul class="address-city" v-if="showProv">
          <li v-for="(n, i) in provArr" :key="i" @click="getProvince(n.id, n.name, i)" :class="i==provinceIndex?'selected-li':''">
            {{ n.name }}</li>
        </ul>
        <ul class="address-city" v-if="showCity">
          <li v-for="(n, i) in cityArr" :key="i" @click="getCity(n.id, n.name, i)" :class="i==cityIndex?'selected-li':''">
            {{ n.name }}</li>
        </ul>
        <ul class="address-city" v-if="showDist">
          <li v-for="(n, i) in distArr" :key="i" @click="setCityEnd(n.id, n.name, i)" :class="i==areaIndex?'selected-li':''">{{ n.name }}</li>
        </ul>
      </view>
    </u-popup>
  </view>
</template>
<script>
import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
import config from '@/config.js'
import api from '@/api.js'
export default {
    data () {
        return {
            data: {},
            area: 0,
            value: 0,
            index: 0,
            addressAll:'',
            popupVisible:false,
            choiceProv: false, //省按钮的显示隐藏
            choiceCity: false, // 市按钮的显示隐藏
            choiceDist: false, // 区按钮的显示隐藏
            prov: '请选择', // 选中的省
            city: '请选择', // 选中的市
            dist: '请选择', // 选中的区
            showProv: true, // 省选择的显示隐藏
            showCity: false, // 市选择的显示隐藏
            showDist: false, // 区选择的显示隐藏
            selected: false, // 选中的那个项
            provinceIndex: -1, // 选中态索引
            cityIndex: -1,
            areaIndex: -1,
            streetIndex: -1,
            choiceAreaCon: '请选择地区',
            provArr: '',
            cityArr: '',
            distArr: '',
            prov_id:0,
            city_id:0,
            dist_id:0,
        }
    },
    onLoad(options){
      this.data = uni.getStorageSync("increase");
      this.prov = this.data.prov_name;
      this.city = this.data.city_name;
      this.dist = this.data.dist_name;
      this.addressAll = this.prov+'-'+this.city+'-'+this.dist
      this.prov_id = this.data.prov_id;
      this.city_id = this.data.city_id;
      this.dist_id = this.data.dist_id;
    },
    methods: {
      callingArea() {
        this.popupVisible = true;
        this.showProv = true; // 省选择的显示隐藏
        this.choiceCity = false;// 市选择的显示隐藏
        this.choiceDist = false;// 区选择的显示隐藏
        this.proAjax(0,0);
      },
      cancleaddress() {
        this.popupVisible = false;
      },
      callingadd() {
        this.popup = true;
      },
      selectaddress() {
        this.popupVisible = false;
        if(this.prov==""||this.prov=="请选择") {
          uni.showToast({
            title:'请选择地址',
            icon:'none'
          })
        } else if(this.city==""||this.city=="请选择"){
          uni.showToast({
            title:'请选择地址',
            icon:'none'
          })
        }else if(this.dist==""||this.dist=="请选择" ){
          uni.showToast({
            title:'请选择地址',
            icon:'none'
          })
        }else{
          this.addressAll = this.prov + '-' + this.city + '-' + this.dist;
          this.choiceCity=false;// 市按钮的显示隐藏
          this.choiceArea=false; // 区按钮的显示隐藏
          this.choiceProv=true; // 省按钮的显示隐藏
          this.showProv=true;
          this.prov="请选择"
        }

      },
      proAjax(index, selId) {
        let _this = this;
        uni.request({
          method: "POST",
          url: api.getRegionList,
          data: {id:index,token:uni.getStorageSync("token")},
          success: (res) => {
            let data = res.data.data;
            if(selId == 0) {
              _this.provArr = data;
            } else if(selId == 1) {
              _this.cityArr = data;
            } else if(selId == 2) {
              _this.distArr = data;
            } else if(selId == 3) {
              _this.TownshipArr = data;
            }
          },
          fail: (err)=>{
          }
        });
      },
      protact(id) {
        let _that = this;
        uni.request({
          method: "POST",
          url: api.capitaSave,
          data: {
            id:id,
            company_name:_that.data.company_name,
            ein:_that.data.ein,
            opening_bank:_that.data.opening_bank,
            bank_account:_that.data.bank_account,
            register_address:_that.data.register_address,
            register_tel:_that.data.register_tel,
            prov_id:_that.prov_id,
            city_id:_that.city_id,
            dist_id:_that.dist_id,
            token:uni.getStorageSync('token')
          },
          success(res) {
            if (res.data.status == 1) {
              uni.navigateTo({
                url: '/modules/service/pages/documents/documents'
              })
            }else {
              uni.showToast({
                title: res.data.message
              })

            }
          }, fail(e) {

          }
        })
      },
      editDelet(id) {
        uni.showModal({
          title: '提示',
          content: '确定执行此操作?',
          success: function (res) {
            if (res.confirm) {
              let url = api.capitaDelete +
                  '?id=' + id +
                  '&token=' + uni.getStorageSync('token');
              uni.request({
                url: url,
                success: (res) => {
                  if (res.data.status == 1) {
                    uni.showToast({
                      title: res.data.message
                    });
                    uni.navigateTo({
                      url: '/modules/service/pages/documents/documents'
                    })
                  } else {
                    uni.showToast({
                      title: res.data.message
                    })

                  }
                },
                fail: (res) => {
                  console.log(res);
                }
              })
            } else if (res.cancel) {
              console.log('用户点击取消');
            }
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
          this.showProv = true;
          this.showCity = false;
          this.showDist = false;

        } else if(type == "city") {
          this.cityIndex = -1;
          this.areaIndex = -1;
          this.streetIndex = -1
          this.choiceArea = false;
          this.showProv = false;
          this.showCity = true;
          this.showDist = false;
        }
      },
      getProvince(id, name, index) {
        this.dist = '请选择'; // 选中的区
        this.city = '请选择';
        this.choiceCity = true;
        this.prov = name;
        this.prov_id = id;
        this.showProv = false;
        this.showCity = true;
        this.showArea = false;
        this.cityArr = this.proAjax(this.prov_id, 1);
      },
      getCity(id, name, index) { // 获取城市列表
        this.dist = '请选择'; // 选中的区
        this.choiceDist = true;
        this.city = name;
        this.city_id = id;
        this.showProv = false;
        this.showCity = false;
        this.showDist = true;
        this.districtArr = this.proAjax(this.city_id, 2);
      },
      setCityEnd(id, name, index) { // 区点完以后
        this.dist = name;
        this.dist_id = id;
      },
    }
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
        border-bottom: 1px solid #ccc;
        .txt{
            width: 30%;
            text-align:right;
        }
        input{
          width: 70%;
          border: 0;
        }
        .picker{
          width: 70%;
          border: 0;
        }
      .rightImg {
        width: 24rpx;
        height: 44rpx;
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
  margin-top: 40px;
  height: 450rpx;
  overflow: hidden;
  overflow-y: scroll;
  width: calc(100% + 30px);
  padding-bottom: 30rpx;
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
