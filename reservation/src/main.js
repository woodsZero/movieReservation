// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入仓库
import store from './store'
// 引入自适应屏幕js
import './assets/js/rem.js'
// 引入通用样式
import './assets/css/common.css'
// 引入vant框架 ui框架
import Vant from 'vant'
import  'vant/lib/index.css'

// 引入mint-ui
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

// 引入axios并挂载在原型链上
import axios from 'axios'
// 引入swiper样式
import '../node_modules/swiper/css/swiper.min.css'
// import '../node_modules/swiper/js/swiper'
Vue.prototype.$axios = axios
// 引入qs模块并挂载在原型链
import qs from 'qs'
Vue.prototype.$qs = qs
// 引入api接口并挂载在原型链（暂不引用）

// 引入filter过滤器，并定义全局过滤（暂不实现）

// 创建全局过滤器
import  filter  from './filter/index'
// Vue.filter('toDay',filter.toDay)
// Vue.filter('toDay',filter.toUpper)
for(let i in filter){
  Vue.filter(i,filter[i])
  // console.log(i,'iiii')
  // console.log(filter,'filter')
}
Vue.use(Mint)
Vue.use(Vant)
Vue.config.productionTip = false
// console.log(7777777)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// console.log(7777777)
