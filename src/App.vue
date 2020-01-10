<template>
  <div class="box">
    <!-- 头部区域 -->
    <header>
      <van-nav-bar
        class="head"
        title="黑马程序员.vant"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        fixed
      />
    </header>
    <main>
      <router-view></router-view>
    </main>
    <!-- 底部区域 -->
    <footer>
      <van-tabbar v-model="active">
        <van-tabbar-item name="0" icon="wap-home" to="/home">首页</van-tabbar-item>
        <van-tabbar-item name="1" icon="friends" to="/member">会员</van-tabbar-item>
        <van-tabbar-item name="2" icon="shopping-cart" info="5" to="/shopcar">购物车</van-tabbar-item>
        <van-tabbar-item name="3" icon="search" to="/search">搜索</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 底部栏默认选中
      active: "0"
    };
  },
  created() {
  },
  methods: {
      onClickLeft(){
          this.$router.go(-1)          
      },
      
  },
  computed: {
      getUrlRouter(){
         const url= window.location.href()
         console.log(url);               
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
  }
</style>