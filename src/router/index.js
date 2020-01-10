import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home.vue'
import Photo from '../components/photo/Photo.vue'
import PhotoInfo from '../components/photo/PhotoInfo.vue'
import Member from '../components/member/member.vue'
import Shopcar from '../components/shopcar/shopcar.vue'
import Search from '../components/search/search.vue'
import Newslist from '../components/news/newslist.vue'
import Goodslist from '../components/goods/goodslist.vue'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {
      path: '/home', component: Home,
      // children: [
      //   { path: '/photo/list', component: Photo },
      //   { path: '/photo/Info/:id', component: PhotoInfo }
      // ]
    },
    { path: '/photo/list', component: Photo },
    { path: '/photo/Info/:id', component: PhotoInfo },
    { path: '/member', component: Member },
    { path: '/shopcar', component: Shopcar },
    { path: '/search', component: Search },
    { path: '/newslist', component: Newslist },
    { path: '/goods/list', component: Goodslist },
  ]
})

export default router
