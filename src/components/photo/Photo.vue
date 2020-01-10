<template>
  <div>
    <!-- 图片tab区域 -->
    <van-tabs v-model="categoryId" @click="categoryChange">
      <van-tab
        :title="item.title"
        v-for="(item,index) in photoCategoryList"
        :key="index"
        :name="item.id"
      ></van-tab>
    </van-tabs>
    <!-- 图片列表区域 -->
    <ul class="photo_container">
      <router-link v-for="(item,index) in photoList" :key="index" class="img_list" :to="'/photo/Info/'+item.id" tag="li">
        <van-image width="100%" height="100%" :src="item.img_url" lazy-load>
          <template v-slot:loading>
            <van-loading type="spinner" size="20" />
          </template>
        </van-image>
        <div class="desc_container">
          <p class="photo_title">{{item.title}}</p>
          <p class="photo_zhaiyao">{{item.zhaiyao}}</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
import { log } from "util";
export default {
  data() {
    return {
      // 当前被激活的标签，默认值为0
      categoryId: 0,
      // 图片分类列表
      photoCategoryList: [],
      // 图片列表区域
      photoList: []
    };
  },
  created() {
    this.getPhotoCategory();
    this.categoryChange(0);
  },
  methods: {
    // 获取图片分类数据
    async getPhotoCategory() {
      const { data: res } = await this.$http.get("/api/getimgcategory");
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取图片分类数据失败"
        });
      res.message.unshift({ title: "全部", id: 0 });
      this.photoCategoryList = res.message;
    },
    // 获取图片列表数据
    async categoryChange(cateId, title) {
      const { data: res } = await this.$http.get("/api/getimages/" + cateId);
      if (res.status !== 0)
        return this.$notify({
          type: "danger",
          message: "获取图片列表数据失败"
        });
      this.photoList = res.message;
    }
  }
};
</script>

<style lang="less" scoped>
.van-tab__text {
  color: #7d7e80;
}
.photo_container {
  padding: 0 10px;
}
.img_list {
  position: relative;
  margin: 10px 0;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
}
.desc_container {
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 10px;
  width: 100%;
  height: 75px;
  font-size: 12px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.4);
}
.photo_title {
  width: 335px;
  margin: 5px 0;
}
.photo_zhaiyao {
  width: 335px;
  margin: 5px 0;
}
</style>