import axios from 'axios'
import qs from 'qs'
import router from '../../router'
//开发环境
console.log(process.env,'EEEEEE') //development
let http = axios.create({
   // baseURL:'/api',
    baseURL:process.env.API_ROOT,
    transformRequest:[function(data){
        return qs.stringify(data)
    }]
})
//请求拦截器
http.interceptors.request.use(
    config=>{
        if(sessionStorage.getItem('token')){
            config.headers.token = sessionStorage.getItem('token')
        }
        return config
    },
    error=>{
        return Promise.reject(error)
    }
)
//响应拦截器
http.interceptors.response.use(
    config=>{
        if(config.data.code == 3){
            router.push('/userlist')
        }else{
            console.log(config,'response')
            return config
        }
    },
    err=>{
        console.log(err)
    }
)
export default http