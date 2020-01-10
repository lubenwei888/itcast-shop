import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './assets/css/global.css'


Vue.prototype.$http = axios
axios.defaults.baseURL="http://www.liulongbin.top:3005/"
// 导入按需加载的 vant 组件
import './plugins/vant'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
