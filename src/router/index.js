import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home.vue'
import Member from  '../components/member/member.vue'
import Shopcar from '../components/shopcar/shopcar.vue'
import Search from '../components/search/search.vue'
import Index from '../components/index/index.vue'
Vue.use(VueRouter)



const router = new VueRouter({
  routes:[
    { path: '/', redirect: '/home' },
    {path:'/home',redirect: '/index',component:Home,children:[
      {path:'/member', component:Member},
      {path:'/shopcar', component:Shopcar},
      {path:'/search', component:Search},
      {path:'/index', component:Index},
    ]}
  ]
})

export default router
