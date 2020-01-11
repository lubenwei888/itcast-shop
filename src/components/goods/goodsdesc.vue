<template>
    <div id="qqq">
        <h1 class="title" v-html="tt">{{tt}}</h1>
        <hr>
        <div id="hh" v-html="hh">{{hh}}</div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      hh: {},
      tt: ''
    }
  },
  created () {
    this.getDesc()
  },
  methods: {
    async getDesc () {
      var id = this.$route.query.id
      const { data: res } = await this.$http.get(`/api/goods/getdesc/${id}`)
      console.log(res.message[0])
      this.hh = res.message[0].content
      this.tt = res.message[0].title
    }
  }
}
</script>
<style lang='less' scoped>
#hh{
    overflow: hidden;
}
h1{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
}
</style>
