<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="head">黑马程序员.vant</div>
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
      active:'0'
    };
  }
};
</script>
<style lang="less" scoped>
</style>