import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Film from '@/components/pages/film'
import Cinema from '@/components/pages/cinema'
import Mine from '@/components/pages/mine'
import City from '@/components/views/city'
import FDetail from '@/components/fDetail'
import CDetail from '@/components/cDetail'
import LogIn from '@/components/login'
import Register from '@/components/register'
import Search from '@/components/Search'
import Hall from '@/components/hall'
import MyBuy from '@/components/myBuy'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Index,
      children:[
        {
          path:'/film',
          name:"Film",
          component:Film
        },
        {
          path:'/cinema',
          name:'Cinema',
          component:Cinema
        },
        {
          path:'/mine',
          name:'Mine',
          component:Mine
        },
        {
          path:'',
          redirect:'/film'
        }
      ]
    },
    {
      path:"/city",
      component:City
    },
    {
      name:'detail',
      path:'/fDetail/:id',
      component:FDetail
    },
    {
      name:"cDetail",
      path:"/cDetail/:cId",
      component:CDetail
    },
    {
      path:'/login',
      component:LogIn
    },
    {
      path:'/register',
      component:Register
    },
    {
      path:"/search",
      component:Search
    },
    {
      name:'Hall',
      path:"/hall/:hId",
      component:Hall
    },
    {
      path:'/mybuy',
      component:MyBuy
    },
    {
      path:'*',
      redirect:'/film'
    }
  ]
})
