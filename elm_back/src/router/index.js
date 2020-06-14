import Vue from 'vue'
import Router from 'vue-router'
const Login = ()=>Promise.resolve(import ('../components/login'))
const Index = ()=>Promise.resolve(import ('../components/index'))
const Wel = ()=>Promise.resolve(import ('../components/pages/wel.vue'))
const addMan = ()=>Promise.resolve(import ('../components/pages/manageAdd.vue'))
const manageList = ()=>Promise.resolve(import('../components/pages/manageList.vue'))
const manageEdit = ()=>Promise.resolve(import('../components/pages/manageEdit.vue'))
const userAdd = ()=>Promise.resolve(import('../components/pages/userAdd.vue'))
const userList = ()=>Promise.resolve(import('../components/pages/userList.vue'))
const userEdit = ()=>Promise.resolve(import('../components/pages/userEdit.vue'))
const filmEdit = ()=>Promise.resolve(import('../components/pages/filmEdit.vue'))
const filmList = ()=>Promise.resolve(import('../components/pages/filmList.vue'))
const filmAdd = ()=>Promise.resolve(import('../components/pages/filmAdd.vue'))
const cinemaEdit = ()=>Promise.resolve(import('../components/pages/cinemaEdit.vue'))
const cinemaList = ()=>Promise.resolve(import('../components/pages/cinemaList.vue'))
const cinemaAdd = ()=>Promise.resolve(import('../components/pages/cinemaAdd.vue'))
const orderList = ()=>Promise.resolve(import('../components/pages/orderList.vue'))
const tuiApply = ()=>Promise.resolve(import('../components/pages/tuiApply.vue'))
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      component:Login
    },
    {
      path:'/index',
      component:Index,
      children:[
        {
          path:'/wel',
          component:Wel
        },
        {
          path:'/addman',
          component:addMan
        },
        {
          path:'/manlist',
          component:manageList
        },
        {
          path:'/manedit',
          component:manageEdit
        },
        {
          path:'/useradd',
          component:userAdd
        },
        {
          path:'/userlist',
          component:userList
        },
        {
          path:'/useredit',
          component:userEdit
        },
        {
          path:'/filmadd',
          component:filmAdd
        },
        {
          path:'/filmlist',
          component:filmList
        },
        {
          path:'/filmedit',
          component:filmEdit
        },
        {
          path:'/cinemAdd',
          component:cinemaAdd
        },
        {
          path:'/cinemaList',
          component:cinemaList
        },
        {
          path:'/cinemaEdit',
          component:cinemaEdit
        },
        {
          path:'/orderList',
          component:orderList
        },
        {
          path:'/tuiApply',
          component:tuiApply
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})
