function toDay(d){
    let date =new Date(Date.parse(d))
    let week = ''
    switch(date.getDay()){
        case 0:
            week='周日';
            break;
        case 1:
            week='周一';
            break;
        case 2:
            week='周二';
            break;
        case 3:
            week='周三';
            break;
        case 4:
            week='周四';
            break;
        case 5:
            week='周五';
            break;
        case 6:
            week='周六';
            break;
    }
    return week
}
function timeFormat(n){
    let date = new Date(n)
    let year = date.getFullYear()
    let month = date.getMonth()+1 >=10 ? date.getMonth()+1 : "0" +( date.getMonth()+1)
    let day = date.getDate() >=10 ? date.getDate() : "0"+ date.getDate()
    let h = date.getHours()
    let mi = date.getMinutes()
    let s  = date.getSeconds()  
    return `${year}-${month}-${day} ${h}:${mi}:${s}`
}
export default{
    toDay,
    timeFormat,
}