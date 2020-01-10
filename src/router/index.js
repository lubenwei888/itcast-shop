import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Member from  '../components/member/member.vue'
import Shopcar from '../components/shopcar/shopcar.vue'
import Search from '../components/search/search.vue'
import Newslist from '../components/news/newslist.vue'
import Photolist from '../components/photo/photolist.vue'
import Goodslist from '../components/goods/goodslist.vue'
Vue.use(VueRouter)



const router = new VueRouter({
  routes:[
    { path: '/', redirect: '/home' },
    {path:'/home',component:Home},
    {path:'/member', component:Member},
    {path:'/shopcar', component:Shopcar},
    {path:'/search', component:Search},
    {path:'/newslist',component: Newslist},
    {path:'/photo/list',component: Photolist},
    {path:'/goods/list',component: Goodslist},
  ]
})

export default router
