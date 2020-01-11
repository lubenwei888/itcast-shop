import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '../src/assets/css/golabl.css'

Vue.prototype.$http = axios
// 设置基准地址
axios.defaults.baseURL='http://www.liulongbin.top:3005/'

// 导入按需加载的 vant 组件
import './plugins/vant'

Vue.config.productionTip = false

Vue.filter('dateFormate',function(originVal){
  const dt= new Date(originVal)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1 +'').padStart(2,'0')
  const d=(dt.getDate() +'').padStart(2,'0')

  return `${y}-${m}-${d} `
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
