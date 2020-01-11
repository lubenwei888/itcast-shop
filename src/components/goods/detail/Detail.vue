<template>
    <div>
        <!-- 轮播图 -->
        <div class="box">
            <div class="lunbo">
                <van-swipe :autoplay="3000">
                <van-swipe-item v-for="image in imagesList" :key="image.src">
                <img v-lazy="image" />
                </van-swipe-item>
                </van-swipe>
            </div>
            <div class="detail">
                <span class="phone">{{paramsList.title}}</span>
                <p>市场价：<s>￥{{paramsList.market_price}}</s>销售价：<em>￥{{paramsList.sell_price}}</em></p>
                <div class="num">
                    <i>购买数量</i> <van-stepper async-change
  @change="onChange" v-model="value" min="1" :max="paramsList.stock_quantity" />
                </div>
                <div class="btn">
                    <van-button size="small" type="info">立即购买</van-button>
                    <van-button size="small" type="danger" @click="goToshopCar({id: $route.query.id, count: value, price:paramsList.sell_price})">加入购物车</van-button>
                </div>
            </div>
            <div class="params">
                <div class="tt">商品参数</div>
                <div class="pp">
                    <p>商品货号:{{paramsList.goods_no}}</p>
                    <p>库存情况:{{paramsList.stock_quantity}}</p>
                    <p>上架时间: {{paramsList.add_time}}</p>
                </div>
                <van-button size="large" plain type="info" @click="picParams(paramsList.id)">图文介绍</van-button>
                    <van-button size="large" plain  type="danger" @click="picComment(paramsList.id)">商品评论</van-button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  created () {
    this.getDetail()
    this.getParams()
  },
  data () {
    return {
      value: 1,
      imagesList: [],
      paramsList: {
        title: '',
        sell_price: '',
        market_price: '',
        stock_quantity: '',
        add_time: '',
        goods_no: ''
      }
    }
  },
  methods: {
    async getDetail () {
      var huaji = this.$route.query.id
      const { data: res } = await this.$http.get(`/api/getthumimages/${huaji}`)
      if (res.status !== 0) {
        return false
      }
      this.imagesList = res.message
    },
    async getParams () {
      var id = this.$route.query.id
      const { data: res } = await this.$http.get(`/api/goods/getinfo/${id}`)
      if (res.status !== 0) {
        return false
      }
      this.paramsList = res.message[0]
      console.log(res.message)
    },
    picParams (id) {
      this.$router.push({ path: '/goodsdesc', query: { id: id } })
    },
    picComment (id) {
      this.$router.push({ path: '/goodscomments', query: { id: id } })
    },
    goToshopCar (car) {
      this.$store.commit('addShopcar', car)
      this.$toast.success('添加购物车成功~');

    },
    onChange (value) {
      // 注意此时修改 value 后会再次触发 change 事件
      this.value = value
    }
  }
}
</script>
<style lang="less" scoped>
.box{
    padding: 10px;
}
.lunbo{
    width: 100%;
    height: 232px;
    border: 1px solid #ccc;
    border-radius: 5px;
    img{
        height: 100%;
        display: block;
        margin: 0 auto;
    }
}
.van-swipe{
    width: 100%;
    height: 100%;
}
.detail{
    margin-top: 10px;
    padding: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    .phone{
        font-size:16px;
        border-bottom: 1px solid #ccc
    }
    p{
        color: #8f8f94;
        font-size: 14px;
        margin-left: 10px;
        s{
            margin-right: 15px;
        }
    }
    i{
        font-style: normal;
        margin-right: 10px;
    }
}
em{
    font-style: normal;
    color: #ff0000;
    font-weight: bold;
}
.van-stepper{
    display: inline-block;
}
.num{
     font-size: 14px;
     color: #8f8f94;
     display: flex;
     align-items: center;
     margin-left: 10px;

}
.van-button{
    margin-top: 15px;
    margin-right: 10px;
    border-radius: 5px;
}
.params{
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 15px;
    margin-top: 10px;
    .tt{
        border-bottom: 1px solid #ccc;
        padding-bottom: 10px;
    }
    .pp{
        padding: 15px;
       color:rgb(143, 143, 148);
       font-size: 14px;
        border-bottom: 1px solid #ccc;
    }
}
</style>
