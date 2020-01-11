<template>
  <div>
    <!-- 轮播图区域 -->
    <div id="hh">
      <van-swipe :autoplay="3000" indicator-color="#fff">
        <van-swipe-item v-for="item in images" :key="item.id">
          <img v-lazy="item.img" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!-- 六宫格区域 -->
    <van-grid :border="false" :column-num="3">
      <van-grid-item to="/newslist">
        <img src="../../public/menu1.png" />
        <p>新闻资讯</p>
      </van-grid-item>
      <van-grid-item to="/photo/list">
        <img src="../../public/menu2.png" />
        <p>图片分享</p>
      </van-grid-item>
      <van-grid-item to="/good/list">
        <img src="../../public/menu3.png" />
        <p>商品购买</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../public/menu4.png" />
        <p>留言反馈</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../public/menu5.png" />
        <p>视频专区</p>
      </van-grid-item>
      <van-grid-item>
        <img src="../../public/menu6.png" />
        <p>联系我们</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
export default {
  created() {
    this.getpic();
  },
  data() {
    return {
      images: []
    };
  },
  methods: {
    async getpic() {
      const { data: res } = await this.$http.get("/api/getlunbo");
      this.images = res.message;
      console.log(this.images);
    }
  }
};
</script>
<style lang="less" scoped>
#hh {
  height: 200px;
  width: 100%;
  img {
    display: inline-block;
    height: 100%;
    width: 100%;
  }
}
.van-swipe {
  height: 200px;
}
.van-grid-item__content img{
    width: 60px;
}
p{
    font-size: 14px
}
</style>