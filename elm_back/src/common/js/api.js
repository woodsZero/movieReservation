import http from './config'
let getUrl = {}
getUrl.Login = (data)=>{
    //在登录页面调用这个方法，传入data
    // console.log(data,'data')
    return http.post(`/login`,data)
}
export default getUrl