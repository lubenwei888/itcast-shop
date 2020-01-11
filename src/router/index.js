import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import New from  '../components/news/New.vue'
import Newsdetail from '../components/news/Newsdetail.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',redirect:'/home'},
  {path: '/home',
  component: Home,
  children:[
    { path:'/newslist',component:New },
    { path:'/news/detail',component:Newsdetail},
  ]},
  
]

const router = new VueRouter({
  routes
})

export default router
