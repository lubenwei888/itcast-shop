<template>
  <div>
    <h3>{{newsdetail[0].title}}</h3>
    <p class="description">
      <span>发表时间: {{newsdetail[0].add_time | dateFormate}}</span>
      <span class="number">点击次数: {{newsdetail[0].click}}</span>
    </p>
    <div v-html="newsdetail[0].content" class="content"></div>
    <!-- 评论模块 -->
    <comment-box :id="id"></comment-box>
  </div>
</template>

<script>
// 导入评论子组件
import comment from '../comment/comment.vue'

export default {
  data() {
    return {
      newsdetail: [
        {
          title: "",
          add_time: "",
          click: "",
          content: ""
        }
      ],
      commentInfo: [],
      inputValue: "",
      indexNum: 1,
      id:this.$route.query.id
    };
  },
  created() {
    this.getDetailInfo();
    this.getCommentinfo();
  },
  methods: {
    async getDetailInfo() {
      const { data: res } = await this.$http.get("/api/getnew/" + this.id);
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取数据失败" });
      }
      this.newsdetail = res.message;
    },
    async getCommentinfo() {
      const { data: res } = await this.$http.get(
        `/api/getcomments/${this.id}?pageindex=` + this.indexNum
      );
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取数据失败" });
      }
      this.commentInfo = res.message;
      //    console.log(res)
    },
    async pushComments() {
      const { data: res } = await this.$http.post(
        "/api/postcomment/" + this.id,
        "content=" + this.inputValue
      );
      // console.log(res)
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "评论失败" });
      }
      this.$notify({ type: "success", message: "评论成功" });
      this.getCommentinfo();
      this.inputValue = "";

      return false;
    },
    async moreLoadingList() {
      this.indexNum++;
      const{data:res}= await this.$http.get(`/api/getcomments/${this.id}?pageindex=`+ this.indexNum )
        this.commentInfo=this.commentInfo.concat(res.message)
    }
  },
  components:{
    'comment-box':comment
  }
};
</script>

<style lang="less" scoped>
.number {
  float: right;
}
.description {
  color: #1989fa;
  border-bottom: 2px solid #eee;
  font-size: 14px;
  padding: 10px;
  margin: 0 10px;
}
h3 {
  color: #1989fa;
  font-size: 16px;
  padding: 10px;
  text-align: center;
}
.content {
  padding: 0 10px;
  color: #535353;
}

</style>