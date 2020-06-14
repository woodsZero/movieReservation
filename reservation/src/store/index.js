// 引入vue核心库
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
// 使用
Vue.use(Vuex)

const Store = new Vuex.Store({
    state: {
        showMask: false,
        userCity: '北京',
        district: '鹿邑县',
        mId: '0',
        selFilm: {},
        schedules: [],
        // cinemalist:[],
        timeFormat: function (n) {
            let date = new Date(n)
            let year = date.getFullYear()
            let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
            let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
            let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
            let mi = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
            let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
            return `${year}-${month}-${day} ${h}:${mi}:${s}`
        },
    },
    mutations: {
        changeMask(state) {
            state.showMask = true
        },
        cancelMask(state) {
            state.showMask = false
        },
        changeCity(state, position) {
            state.userCity = position.city
            state.district = position.district
            // console.log(city,'commit中city')
        },
        // changeCinema(state,cinemalist){
        //     state.cinemaList=cinemalist
        // }
        changeMID(state, { mId, selFilm }) {
            state.mId = mId,
            state.selFilm = selFilm
            // console.log(selFilm, 'self')
            let arr = selFilm.schedules
            let map = {}, dest = [];
            for (let i = 0; i < arr.length; i++) {
                let ai = arr[i];
                if (!map[ai.timeType]) {
                    dest.push({
                        timeType: ai.timeType,
                        movies: [ai]
                    });
                    map[ai.timeType] = ai
                } else {
                    for (let j = 0; j < dest.length; j++) {
                        let dj = dest[j];
                        if (dj.timeType == ai.timeType) {
                            dj.movies.push(ai);
                            break
                        }
                    }
                }
            }
            // 对筛选出来的数据进行降序排序
            dest.sort((a, b) => {
                return Date.parse(a.showTime) - Date.parse(b.showTime)
            })
            state.schedules = dest
            // console.log(dest, 'dest转化后')
        }
    },
    actions: {
        // 控制预告播放遮罩层
        a({ commit }) {
            commit('changeMask')
        },
        cancelM({ commit }) {
            commit('cancelMask')
        },
        city({ commit }, position) {
            // console.log(city,'actions中city')
            commit('changeCity', position)
            // console.log(position,'kkkkkk')
        },
        cinema({ commit }, cinemalist) {
            commit('changeCinema', cinemalist)
        },
        changgeMid({ commit }, { mId, selFilm }) {
            commit('changeMID', { mId, selFilm })
        }
    },
    getters: {

    },
    modules: {

    }
})
export default Store