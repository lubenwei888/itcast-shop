






<template>
      <div class="shopcarbox">
        <van-grid v-if="$store.getters.isEmpty" :border="false" :column-num="1" height="auto">
          <van-grid-item>
             <img src="../../../public/shopcar.png" />
            <p>购物车空空如也</p>
            <van-button round type="info" @click="goodlist">去逛逛</van-button>
          </van-grid-item>
        </van-grid>
          <van-card v-else v-for="(item, i) in shopList" :key="item.id" :num="$store.getters.getGoodsnum[item.id]" :price="item.sell_price" :title="item.title" :thumb="item.thumb_path">
            <div slot="footer" >
              <van-stepper @plus='addNum(item.id)' @minus='jian(item.id)' disable-input v-model="$store.getters.getGoodsnum[item.id]" />
              <a href="javascript:;" @click="shanchu(item.id, i)">删除</a>
            </div>
          </van-card>
    <van-submit-bar :price="($store.getters.allPrice.p)*100" button-text="提交订单"/>
    </div>
</template>
<script>
export default {
  data () {
    return {
      inputCount: 1,
      shopList: [],
      goodId: ''
    }
  },
  created () {
    this.shopDetails()
  },
  methods: {
    async shopDetails () {
      var idArr = []
      var huaji = this.$store.state.step
      huaji.forEach(item => idArr.push(item.id))
      // eslint-disable-next-line no-useless-return
      if (idArr.length <= 0) return
      var idStr = idArr.join(',')
      console.log(idStr)
      const { data: res } = await this.$http.get('/api/goods/getshopcarlist/' + idStr)
      console.log(res.message)
      console.log(this.$store.getters.getGoodsnum)
      this.shopList = res.message
    },
    addNum (id) {
      console.log(id)
      this.$store.commit('add', id)
    },
    jian (id) {
      this.$store.commit('jiannum', id)
    },
    shanchu (id, index) {
      this.$store.commit('deleteShop', id)
      this.shopList.splice(index, 1)
    },
    goodlist () {
      this.$router.push('/good/list')
    }
  },
  computed: {
  }
}
</script>
<style lang="less" scoped>
.van-card__price-currency ,.van-card__price-integer{
  color: red
}
.van-grid-item__content p {
  color: #ccc;
}
.shopcarbox{
    height: 100%;
}
</style>
