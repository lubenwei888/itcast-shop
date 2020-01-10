<template>
  <div>
    <!-- 评论区域 -->
    <div class="comment">
      <h4>发表评论</h4>
      <hr />
      <van-cell-group>
        <van-field v-model="inputComment" placeholder="请输入留言" type="textarea" />
      </van-cell-group>
      <van-button type="info" size="large" @click="publishComment">发表评论</van-button>
      
      <!-- 评论内容区域 -->
      <ul>
        <li v-for="(item,index) in commentList" :key="index">
          <div class="title">
            <span v-cloak>第{{index + 1}}楼</span>
            <span v-cloak>用户：{{item.user_name}}</span>
            <span v-cloak>发表时间：{{item.add_time | dateFormate('yyyy-MM-dd')}}</span>
          </div>
          <div class="body" v-cloak>{{item.content == 'undefined' ? '此用户未发表任何内容' : item.content}}</div>
        </li>
      </ul>
      <!-- 加载更多 -->
      <van-button plain hairline type="danger" size="large" @click="getMore">加载更多</van-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      // 获取评论内容的参数，页码,默认值为1
      page:1,
      // 评论内容
      inputComment: "",
      // 评论内容列表
      commentList: []
    };
  },
  created() {
    this.getCommentInfo();
  },
  methods: {
    // 获取评论信息
    async getCommentInfo() {
      const { data: res } = await this.$http.get(
        `/api/getcomments/${this.id}?pageindex=${this.page}`
      );
      if (res.status !== 0) this.$toast.fail('获取评论数据失败')
      // 为防止每次请求的新数据将之前的数据覆盖
      this.commentList = this.commentList.concat(res.message)
    },
    // 点击加载更多，获取更多评论信息
    getMore() {
        // 让页码加1
        this.page ++
        this.getCommentInfo();
    },
    // 发表评论
    async publishComment() {
    // 判断内容是否为空
      if(this.inputComment.trim().length === 0){
          return this.$toast.fail('评论内容不能为空')
      }
      const params = new URLSearchParams();
      params.append("content", this.inputComment.trim());
      const { data: res } = await this.$http.post(
        `/api/postcomment/${this.id}`,
        params
      );
      if (res.status !== 0) return this.$toast.fail('发表评论失败')
      this.$toast.fail('发表评论成功')
      // 拼接一个评论对象
      const cmt = {
          user_name:'匿名用户',
          add_time:new Date(),
          content:this.inputComment.trim()
      }
      // 把拼接的评论对象添加到获取到的评论数组的最前面
      this.commentList.unshift(cmt)
      this.inputComment = "";
    }
  }
};
</script>

<style lang="less" scoped>
// 评论
.comment {
  padding: 0 5px;
  h4 {
    color: #000;
    text-align: left;
  }
  hr {
    border: 0.5px solid #9a9a9a;
  }
  .van-field {
    height: 100px;
    border: 1px solid #ccc;
  }
  .van-button {
    margin: 5px 0;
  }
}
// 评论内容
.title {
  height: 30px;
  background-color: #ccc;
  font-size: 12px;
  line-height: 30px;
  span {
    margin-right: 6px;
  }
}
.body {
  line-height: 35px;
  text-indent: 2em;
  font-size: 12px;
}
[v-cloak]{
    display:none;
}
</style>