// 导入 Vue
import Vue from 'vue'


// // 导入 Button 组件
import
 { Card, 
    PullRefresh,
    Lazyload, 
    Toast,
    Panel,
    Divider,
    Button,
    List,
    Loading,
    Cell,
    CellGroup,
    Notify 

} 
from 'vant'

// // 挂载 Button 组件
Vue.use(Card)
Vue.use(PullRefresh)
Vue.use(Lazyload)
Vue.use(Panel)
Vue.use(Divider)
Vue.use(Button)
Vue.use(List)
Vue.use(Loading)
Vue.use(Cell)
Vue.use(CellGroup)

Vue.prototype.$toast =Toast
Vue.prototype.$notify =Notify
