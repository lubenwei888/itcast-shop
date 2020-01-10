<template>
  <div class="shopcarbox">
      <van-grid :border="false" :column-num="1" height="auto">
        <van-grid-item>
          <img src="../../../public/shopcar.png" />
          <p>购物车空空如也</p>
          <van-button round type="info" @click="goGoods">去逛逛</van-button>
        </van-grid-item>
      </van-grid>   
      <!-- 底部提交区域 -->
        <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" />
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goGoods() {
      this.$router.push("/goods/list");
    },
    onSubmit(){

    }
  }
};
</script>
<style lang="less" scoped>
.van-grid-item__content img {
  width: 100px;
}
.van-grid-item__content p {
  color: #ccc;
}
.shopcarbox{
    height: 100%;
}
</style>