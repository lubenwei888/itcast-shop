<template>
  <div class="photoInfo_container">
    <!-- 头部标题 -->
    <h4>{{photoInfo.title}}</h4>
    <!-- 发表时间和点击量 -->
    <p class="timeAndClick">
      <span class="time">发表时间: {{photoInfo.add_time | dateFormate('yyyy-MM-dd')}}</span>
      <span class="click">点击: 0</span>
    </p>
    <!-- 缩略图区域 -->
    <ul class="thumbnail_container">
      <li v-for="(item,index) in thumbnail" :key="index">
        <img :src="item.src" alt @click="showThumbnail" />
      </li>
    </ul>
    <!-- 内容详情模块 -->
    <div class="detail_container" v-html="photoInfo.content"></div>
    <!-- 评论模块 -->
  </div>
</template>

<script>
import { log } from "util";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      // 图片Id
      id: this.$route.params.id,
      // 图片详情信息
      photoInfo: {},
      // 缩略图数据
      thumbnail: [],
      // 图片预览数组
      imagePreview: [],
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbnail();
  },
  methods: {
    // 获取图片详情信息
    async getPhotoInfo() {
      const { data: res } = await this.$http.get(
        "/api/getimageInfo/" + this.id
      );
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取图片详情数据失败"
        });
      this.photoInfo = res.message[0];
    },
    // 获取缩略图数据
    async getThumbnail() {
      const { data: res } = await this.$http.get(
        "/api/getthumimages/" + this.id
      );
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取缩略图数据失败"
        });
      this.thumbnail = res.message;
      res.message.forEach(item => {
        this.imagePreview.push(item.src);
      });
    },
    // 展示缩略图
    showThumbnail() {
      ImagePreview(this.imagePreview);
    },
  }
};
</script>

<style lang="less" scoped>
.photoInfo_container {
  padding: 0 5px;
}
h4 {
  font-size: 15px;
  color: #26a2ff;
  text-align: center;
}
.timeAndClick {
  overflow: hidden;
  padding-bottom: 8px;
  font-size: 13px;
  color: #8f8f94;
  border-bottom: 1px solid #9a9a9a;
  .time {
    float: left;
  }
  .click {
    float: right;
  }
}
// 缩略图
.thumbnail_container {
  list-style: none;
  overflow: hidden;
  margin: 10px 0;
  padding: 0 5px;
  li {
    float: left;
    padding: 5px;
    width: 33.3333%;
    box-sizing: border-box;
    img {
      width: 100%;
      height: 100%;
      box-shadow: 1px 0 8px 1px rgba(0, 0, 0, 0.3);
    }
  }
}

</style>