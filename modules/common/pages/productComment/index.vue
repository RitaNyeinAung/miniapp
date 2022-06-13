<template>
  <view class="comment">
    <!--评价筛选-->
	<view class="navigator">
		<u-tabs :list="types" :is-scroll="true" :current="currentType" @change="change" active-color="#d02629"></u-tabs>
	</view>
    <view class="evaluate-filtrate">
      <view class="filtrate-list">
        <view class="list" v-for="(type,index) in types" @click="()=>change(index)" style="opacity: 0;">
          <text  :class="[index==currentType?'action':'']">{{type.name}}</text>
        </view>
      </view>
    </view>
    <view class="evaluate-data">
      <view class="evaluate-list">
        <view class="list" v-for="(item,index) in commentList" >
          <view class="user-info">
            <view class="thumb">
              <image :src="config.image_url+item.user_header" mode=""></image>
            </view>
            <view class="nickname-grade">
              <view class="nickname">
                <text>{{item.nick_name}}</text>
              </view>
              <view class="grade">
                <view class="star">
                  <uni-rate :readonly="true" :value="item.score" style="font-size: 10px;" activeColor="#d02629" size="10"/>
                </view>
                <view class="date">
                  <text>{{item.create_time}}</text>
                </view>
              </view>
            </view>
          </view>
          <view class="content">
            <view class="character">
              <text class="two-omit">{{item.content}}</text>
            </view>
            <view class="attr">
              <text>暂无</text>
            </view>
            <view class="thumb-list">
              <view class="list" v-for="(path,idx) in item.images"
                    @click="onPreview(item.images,idx)"
                    >
                <image :src="config.image_url+path"></image>
              </view>
            </view>
          </view>
        </view>
		<view v-if="commentList.length==0" class="empty" style="margin-top:100px;width: 100%;text-align: center;">暂时没有数据哦</view>
      </view>
    </view>
  </view>
</template>

<script>
import api from '@/api'
import config from '@/config'
export default {
  data() {
    return {
      isVideoShow: false,
	  types:[
		{
			name:"全部"
		},
		{
			name:"好评"
		},
		{
			name:"中评"
		},
		{
			name:"差评"
		},
		{
			name:"有图"
		}
		  
	  ],
      videoContext: '',
	  currentType:0,//当前评论 模式 ，全部，差评，中评 等,
	  currentPage:1,
	  commentList:[],
	  productId:null,
	  totalPages:10000,
	  api,
	  config
    };
  },
  onReady: function (res) {
    this.videoContext = uni.createVideoContext('evaluate-video')
  },
  onLoad(options){
	  this.productId = options.id;
	  this.loadComment(0,this.currentPage,this.productId,'refresh');  
  },
  onReachBottom(){
	 if(this.currentPage>this.totalPages){
		 uni.showToast({
		 	title:"没有数据啦",
			icon:'none'
		 })
	 }else{
		 this.loadComment(this.currentType,this.currentPage,this.productId,'add');
	 }
  },
  methods:{
    /**
     * 图片点击预览
     * @param item
     * @param index
     */
    onPreview(images,index){
      uni.previewImage({
        urls: images,
        indicator: 'number',
        current: index,
        longPressActions: {
          itemList: ['发送给朋友', '保存图片', '收藏'],
          success: function(data) {
            console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    },
    /**
     * 关闭视频点击
     */
    onCloseVideo(){
      this.videoContext.pause();
      this.isVideoShow = false;
    },
	change(index){
		//评论分类 变化
		this.currentType=index;
		this.loadComment(index,1,this.productId,'refresh');
	},
	loadComment(type,page,id,fetch){
		uni.showLoading({
			title:"获取数据中"
		})
		let _this = this;
		uni.request({
			url:api.getProductComment+'?goods_id='+id+'&type='+type+'&status=4&page='+page,
			method:'GET',
			success(result) {								
				if(result.data.data){
						result.data.data.list.map((d)=>{
							d.images = [];
							d.path.forEach((i)=>{
								d.images.push(i.path);
							})
							return d;
						})
						if(fetch == 'add'){
							_this.commentList.concat(result.data.data.list);
							
						}					
						if(fetch == 'refresh'){
							_this.commentList = result.data.data.list	
						}
						_this.totalPages = result.data.data.totalPages;
						_this.currentPage++;																															
				}
				uni.hideLoading()
			},
			fail(e) {
				uni.hideLoading()				
				if(fetch == 'refresh'){
					_this.commentList = []
				}
				console.log(e);
			}
		})
	}
  }
}
</script>

<style scoped lang="scss">
.comment{
  background-color: #f6f6f6;
  
}
.navigator{
	padding: 0 30rpx;
	width: 100%;
	text-align: center;
	position: fixed;
	background:white;
	z-index: 100000;
}

/*评价筛选*/
.evaluate-filtrate{
  padding: 0 30rpx;
  // height: 200rpx;
  background-color: #ffffff;
  border-radius: 0 0 10rpx 10rpx;
  .filtrate-list{
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    padding: 20rpx 0;
    .list{
      display: flex;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      text{
        //display: inline-table;
        padding: 6rpx 30rpx;
        font-size: 24rpx;
        color: #222222;
        background-color: $light-grey;
        border: 1px solid transparent;
        border-radius: 60rpx;
      }
      .action{
        border: 1px solid $main-color;
        color: $main-color;
      }
    }
  }
}
/* 评价 */
.evaluate-data{
  padding: 20rpx 30rpx;
  background-color: #ffffff;
  margin: 20rpx auto;
  border-radius: 10rpx;
  .evaluate-list{
    width: 100%;
    >.list{
      border-bottom: 1px solid #f6f6f6;
    }
    .user-info{
      display: flex;
      align-items: center;
      width: 100%;
      height: 80rpx;
      .thumb{
        width: 60rpx;
        height: 60rpx;
        image{
          width: 100%;
          height: 100%;
          border-radius: 100%;
		  background-color: $light-grey;
        }
      }
      .nickname-grade{
        width: 100%;
        height: 60rpx;
        margin-left: 20rpx;
        .nickname{
          display: flex;
          align-items: center;
          text{
            font-size: 24rpx;
            color: #212121;
          }
        }
        .grade{
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          margin-top: 6rpx;
          .star{
            display: flex;
            align-items: center;
			z-index:10;
            text{
			z-index:10;
              font-size: 24rpx;
              color: $main-color;
            }
          }
          .date{
            display: flex;
            align-items: center;
            text{
              font-size: 24rpx;
              color: #999999;
            }
          }
        }
      }
    }
    .content{
      width: 100%;
      .character{
        display: flex;
        align-items: center;
        padding: 10rpx 0;
        text{
          font-size: 24rpx;
          color: #333333;
        }
      }
      .attr{
        display: flex;
        align-items: center;
        padding: 10rpx 0;
        text{
          font-size: 24rpx;
          color: #CCCCCC;
        }
      }
      .thumb-list{
        display: flex;
        flex-wrap: wrap;
        width: 100%;
        //height: 200rpx;
        margin: 10rpx 0;
        .video-info{
          position: relative;
          width: 220rpx;
          height: 220rpx;
          margin-right: 2%;
          .picture{
            width: 100%;
            height: 100%;
          }
          .shade{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: $light-grey;
            text{
              position: absolute;
              left: 50%;
              top: 50%;
              font-size: 72rpx;
              color: #ffffff;
              transform: translate(-50%,-50%);
            }
          }
        }
        >.list{
          width: 220rpx;
          height: 220rpx;
          margin-right: 2%;
          margin-bottom: 15rpx;
          image{
            width: 100%;
            height: 100%;
			background-color: $light-grey;
          }
        }
        >.list:nth-child(3n){
          margin-right: 0;
        }
      }
    }
  }
}
.video-win{
  .cu-dialog{
    background-color: transparent;
  }
  .bg-img{
    background-color: transparent;
    video{
      width: 100%;
    }
  }
}
</style>