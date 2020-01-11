import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 将存储在localStorage赋值给新的数组中
var step = JSON.parse(localStorage.getItem('step') || '[]')
export default new Vuex.Store({
  state: {
    step: step
  },
  mutations: {
    addShopcar (state, step) {
      var flag = false
      step.id = step.id - 0
      state.step.some(item => {
        if (item.id === step.id) {
          item.count = parseInt(step.count) + item.count
          flag = true
        }
      })
      console.log(step)
      if (!flag) {
        state.step.push(step)
      }
      // 存储数据到locationStorage
      localStorage.setItem('step', JSON.stringify(state.step))
    },
    add (state, id) {
      state.step.forEach(item => {
        if (item.id === id) item.count++
      })
      localStorage.setItem('step', JSON.stringify(state.step))
    },
    jiannum (state, id) {
      state.step.forEach(item => {
        if (item.id === id) item.count--
      })
      localStorage.setItem('step', JSON.stringify(state.step))
    },
    deleteShop (state, id) {
      state.step.some((item, i) => {
        if (item.id === id) {
          state.step.splice(i, 1)
          return true
        }
      })
      localStorage.setItem('step', JSON.stringify(state.step))
    }
  },
  getters: {
    // 商品数目
    getCount (state) {
      var num = 0
      state.step.forEach(item => {
        num += item.count
      })
      return num
    },
    // 每一个商品的数目
    getGoodsnum (state) {
      var num1 = {}
      state.step.forEach(item => {
        num1[item.id] = item.count
      })
      return num1
    },
    allPrice (state) {
      var prices = {
        count: 0,
        p: 0
      }
      console.log(state.step)
      state.step.forEach(item => {
        prices.p += item.count * item.price
      })
      return prices
    },
    isEmpty (state) {
      if (state.step.length === 0) {
        return true
      } else {
        return false
      }
    }
  }
})
