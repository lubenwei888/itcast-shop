<template>
  <div>
    <h3>{{newsdetail[0].title}}</h3>
    <p class="description">
      <span>发表时间: {{newsdetail[0].add_time | dateFormate}}</span>
      <span class="number">点击次数: {{newsdetail[0].click}}</span>
    </p>
    <div v-html="newsdetail[0].content" class="content"></div>
    <div class="comments">
      <h4>发表评论</h4>
      <hr />
      <div class="commentbox">
        <form>
          <textarea placeholder="请输入留言" v-model="inputValue"></textarea>
          <van-button type="info" @click="pushComments">发表评论</van-button>
        </form>
        <ul v-for="(item,i) in commentInfo" :key="i" class="commentsList">
          <li>
            <div class="list-first">
              <span>第{{i + 1}}楼</span>
              <span>用户: {{item.user_name}}</span>
              <span>发表时间: {{item.add_time | dateFormate}}</span>
            </div>
            <p>{{item.content}}</p>
          </li>
        </ul>
        <van-button type="danger" hairline plain @click="moreLoadingList">加载更多</van-button>
      </div>
    </div>
  </div>
</template>

<script>
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
      indexNum: 1
    };
  },
  created() {
    this.getDetailInfo();
    this.getCommentinfo();
  },
  methods: {
    async getDetailInfo() {
      // const id=window.location.hash()
      const id = this.$route.query.id;
      const { data: res } = await this.$http.get("/api/getnew/" + id);
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取数据失败" });
      }
      this.newsdetail = res.message;
    },
    async getCommentinfo() {
      const id = this.$route.query.id;
      const { data: res } = await this.$http.get(
        `/api/getcomments/${id}?pageindex=` + this.indexNum
      );
      if (res.status !== 0) {
        return this.$notify({ type: "danger", message: "获取数据失败" });
      }
      this.commentInfo = res.message;
      //    console.log(res)
    },
    async pushComments() {
      const id = this.$route.query.id;
      const { data: res } = await this.$http.post(
        "/api/postcomment/" + id,
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
      const id = this.$route.query.id;
      this.indexNum++;
      const{data:res}= await this.$http.get(`/api/getcomments/${id}?pageindex=`+ this.indexNum )
        this.commentInfo=this.commentInfo.concat(res.message)
    }
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
.comments {
  padding: 0 10px;
  h4 {
    font-weight: 700;
  }
  textarea {
    display: block;
    border: 2px solid #eee;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    padding: 10px 10px;
  }
  .van-button {
    margin-top: 5px;
    width: 100%;
  }
}
.commentsList {
  margin-top: 10px;
  li {
    font-size: 12px;
    p {
      text-indent: 2em;
    }
  }
  li .list-first {
    background-color: #ccc;
    height: 30px;
    line-height: 30px;
    span {
      margin-right: 5px;
    }
  }
}
</style>