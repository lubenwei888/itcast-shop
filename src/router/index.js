import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../components/home.vue'
import Photo from '../components/photo/Photo.vue'
import PhotoInfo from '../components/photo/PhotoInfo.vue'
import Member from '../components/member/member.vue'
import Shopcar from '../components/shopcar/shopcar.vue'
import Search from '../components/search/search.vue'
import Newslist from '../components/news/newslist.vue'
import Newsdetail from '../components/news/newsdetail.vue'
import Goodslist from '../components/goods/GoodList.vue'
import Goodsdesc from '../components/goods/goodsdesc.vue'
import googsDetail from '../components/goods/detail/Detail.vue'
import Goodscomments from '../components/comment/comment.vue'
import AddGoods from '../components/search/addGoods.vue'

Vue.use(VueRouter)


const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    {path: '/home', component: Home},
    { path: '/photo/list', component: Photo },
    { path: '/photo/Info/:id', component: PhotoInfo },
    { path: '/member', component: Member },
    { path: '/shopcar', component: Shopcar },
    { path: '/search', component: Search },
    { path: '/newslist', component: Newslist },
    { path: '/news/detail', component: Newsdetail},
    { path: '/good/list', component: Goodslist },
    { path: '/goodsdesc', component: Goodsdesc },
    { path: '/good/detail', component: googsDetail },
    { path: '/goodscomments', component: Goodscomments },
    { path: '/addgoods', component: AddGoods },
  ]
})

export default router
