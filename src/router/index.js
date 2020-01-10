import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/home/Home.vue'
import Photo from '../components/home/Photo.vue'
import PhotoInfo from '../components/home/PhotoInfo.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/home'},
  {path:'/home',
  component:Home,
  children:[
    {path:'/photo/list',component:Photo},
    {path:'/photo/Info/:id',component:PhotoInfo}
  ]
}
]

const router = new VueRouter({
  routes
})

export default router
