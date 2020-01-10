<template>
  <div class="box">
    <!-- 头部区域 -->
      <van-nav-bar
        class="head"
        title="黑马程序员.vant"
        :left-text="flagText"
        :left-arrow="flag"
        @click-left="onClickLeft"
        fixed
      />
    <!-- 中间内容 -->

      <transition mode="out-in">
        <router-view></router-view>
     </transition>

     
    <!-- 底部区域 -->
      <van-tabbar v-model="active" v-show="flagshop" route>
        <van-tabbar-item name="0" icon="wap-home" to="/home">首页</van-tabbar-item>
        <van-tabbar-item name="1" icon="friends" to="/member">会员</van-tabbar-item>
        <van-tabbar-item name="2" icon="shopping-cart" info="5" to="/shopcar">购物车</van-tabbar-item>
        <van-tabbar-item name="3" icon="search" to="/search">搜索</van-tabbar-item>
      </van-tabbar>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 底部栏默认选中
      active: "0",
      // 返回按钮默认隐藏
      flag:false,
      flagText:'返回',
      flagshop:true
    };
  },
  created() {
    this.flag=this.$route.path === '/home'? false:true
  },
  methods: {
      onClickLeft(){
          this.$router.go(-1)          
      },     
  },
  watch: {
    "$route.path":function(newVal){
      if(newVal === "/home"){
        this.flag=false
        this.flagText=''
      }else{
        this.flag=true
        this.flagText='返回'
      }
    },
    "$route.path":function(newval){
      if(newval=== "shopcar"){
        this.flagshop=false
      }else{
        this.flagshop=true
      }
    }
  },
};
</script>
<style lang="less" scoped>
.head{
    height: 40px;
    line-height: 40px;
    background-color: #1989fa;
  }
  .van-ellipsis{
      color: #fff;
      font-size: 14px;
  }
  .van-nav-bar__text{
      color: #fff;
  }
  .van-nav-bar__arrow{
      color: #fff !important
  }
  .box{
      padding:40px 0 50px 0;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
  }

  .v-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
  }
  .v-enter-active{
    transition: all .5s ease;   
  }
  .v-leave-active{
    transition: all .5s ease;   
    // position: absolute;
  }
  .v-move{ 
    transition: all 0.5s ease;
  }

  // .anmimate-box{
    // position: absolute;
    // top: 0px;
    // bottom: 0px;
    // width: 100%;
    // height: 100%;
    // overflow: hidden;
// }
</style>