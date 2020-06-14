import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        token:sessionStorage.getItem('token')?sessionStorage.getItem('token'):'',
        timeFormat:function (n) {
            let date = new Date(n)
            let year = date.getFullYear()
            let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
            let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
            let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
            let mi = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
            let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
            return `${year}-${month}-${day}`
        }
    },
    mutations:{
        changeToken(state,token){
            // console.log(state)
            // console.log(token,'ttt')
            state.token = token
            sessionStorage.setItem('token',token)
        }
    }
})
export default store