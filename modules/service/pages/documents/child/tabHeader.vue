<template>
  <view>
      <view class="content">
          <view :class="{active: sortHead == index}" v-for="(item, index) in sortData" :key="index" @click = "proSort(index)" class="txt">{{item}}</view>
      </view>
  </view>
</template>
<script>
export default {
  data () {
      return {
          sortHead:this.tabdata,
      }
  },
  methods:{
    proSort(index){
        if(this.sortHead == index)return;
        this.sortHead = index;
        this.$emit("sortCon",index);
      }
  },
  props:{
      sortData:"",
      tabdata:''
  }
}
</script>
<style lang="scss">
.content{
    background-color: #fff;
    display: flex;
    border-bottom: 1rpx solid #CBCBCB;
    .txt{
        display: flex;
        height: 50rpx;
        padding: 20rpx 0;
        margin:6rpx;
        justify-content: center;
        align-items: center;
        flex:1;
    }
    .active{
        color: #d02629;
        border-bottom: 3rpx solid #d02629;
    }
}
</style>
