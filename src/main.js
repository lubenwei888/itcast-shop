import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// 导入全局样式文件
import './assets/css/global.css'



Vue.prototype.$http = axios
axios.defaults.baseURL="http://www.liulongbin.top:3005/"
// 导入按需加载的 vant 组件
import './plugins/vant'



// // 注册全局过滤器--时间
// Vue.filter('dateFormate', function (value,arg) {
//   function dateFormat(date, format) {
//     if (typeof date === "string") {
//       var mts = date.match(/(\/Date\((\d+)\)\/)/);
//       if (mts && mts.length >= 3) {
//         date = parseInt(mts[2]);
//       }
//     }
//     date = new Date(date);
//     if (!date || date.toUTCString() == "Invalid Date") {
//       return "";
//     }
//     var map = {
//       "M": date.getMonth() + 1, //月份 
//       "d": date.getDate(), //日 
//       "h": date.getHours(), //小时 
//       "m": date.getMinutes(), //分 
//       "s": date.getSeconds(), //秒 
//       "q": Math.floor((date.getMonth() + 3) / 3), //季度 
//       "S": date.getMilliseconds() //毫秒 
//     };

//     format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
//       var v = map[t];
//       if (v !== undefined) {
//         if (all.length > 1) {
//           v = '0' + v;
//           v = v.substr(v.length - 2);
//         }
//         return v;
//       } else if (t === 'y') {
//         return (date.getFullYear() + '').substr(4 - all.length);
//       }
//       return all;
//     });
//     return format;
//   }
//   return dateFormat(value,arg)
// })

Vue.filter('dateFormate',function(originVal){
  const dt= new Date(originVal)
  const y=dt.getFullYear()
  const m=(dt.getMonth()+1 +'').padStart(2,'0')
  const d=(dt.getDate() +'').padStart(2,'0')

  return `${y}-${m}-${d} `
})


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
