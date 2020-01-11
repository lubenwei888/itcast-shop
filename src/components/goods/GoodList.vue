<template>
    <div>
        <div class="gooditem">
            <div class="goods" v-for="item in goodList" :key="item.id" @click="getDetail(item.id)">
                <div class="pic">
                    <img :src="item.img_url" alt="图片无法正常显示">
                </div>
                <div class="title">
                    <h1>{{item.title}}</h1>
                </div>
                <div class="ccc">
                    <div class="div_gray">
                    <span>￥{{item.sell_price}}</span>
                    <s>￥{{item.market_price}}</s>
                </div>
                <div class="hot">
                    <span class="hot1">热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </div>
                </div>
            </div>
            <!-- 加载更多 -->
    <p v-if="currentPageMsg === 0" class="nomore">没有更多了</p>
    <van-button plain hairline type="danger" size="large" @click="getMore" v-else>加载更多</van-button>
        </div>
    </div>
</template>
<script>
export default {
  created () {
    this.getGoodList()
  },
  data () {
    return {
      // 页码
      pageIndex: 1,
      goodList: [],
      // 每次获取的当前页的数组长度
      currentPageMsg: 0
    }
  },
  methods: {
    async getGoodList () {
      const { data: res } = await this.$http.get(`/api/getgoods?pageindex=${this.pageIndex}`)
      console.log(res)
      if (res.status !== 0) {
        return
      }
      this.currentPageMsg = res.message.length
      this.goodList = this.goodList.concat(res.message)
    },
    getDetail (id) {
      this.$router.push({ path: '/good/detail', query: { id: id } })
    },
    // 加载更多
    getMore () {
      this.pageIndex++
      this.getGoodList()
    }
  }
}
</script>
<style lang="less" scoped>
.gooditem{
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    justify-content: space-between;
    box-sizing: border-box;
    .goods{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 10px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        width: 48%;
        min-height: 294px;
        img{
            width: 100%;
            max-width: 300px;
            max-height: 300px;
        }
        h1{
            font-size: 14px;
            color: #000;
            text-align: left;
        }
        .div_gray{
            width: 100%;
            span{
                color: #ff0000;
                margin-right: 15px;
            }
            s{
                color: #323233
            }
        }
        .hot{
            display: flex;
            justify-content: space-between;
            width: 100%;
            .hot1{
                color:rgb(50, 50, 51);
            }
        }
    }
}
.ccc{
    box-sizing: border-box;
    background-color: rgb(238, 238, 238);
    padding: 10px;
}
.title{
    padding: 10px;
    margin: 10px 0 10px 0
}
.pic{

    text-align: center;
}
.nomore {
    width: 100%;
    text-align: center;
    font-size: 13px;
    color: #969799;
  }
</style>
