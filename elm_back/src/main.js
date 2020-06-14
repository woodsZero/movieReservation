// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入store
import store from './store'
//引入axios
import axios from 'axios'
Vue.prototype.$axios = axios
axios.defaults.withCredentails = true
//引入elementUI
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入reset文件
import '../src/assets/css/reset.css'

//引入qs
import qs from 'qs'
Vue.prototype.$qs = qs


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
