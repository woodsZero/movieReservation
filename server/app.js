const express=require('express');
const bodyParser=require('body-parser');
const session=require('express-session');



const app=express();
app.use(express.static('./static'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.set('trust proxy', 1) // trust first proxy

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
const  router=require('./controller/router')

console.log("成功运行在localhost:8088")

// 前台接口===============================
// hot热映电影的渲染和即将上映电影的渲染
app.get('/hot',router.showHot)
app.get('/willOn',router.willOn)
// 电影详情
app.get('/fDetail',router.findFDetail)
// 验证用户是否已注册
app.get('/verify',router.verify)
// 用户注册接口
app.post('/userRegister',router.userRegister)
//用户登录接口
app.post('/userLogin',router.userLogin)
// 模糊查询数据
app.get('/findKey',router.findKey)
// 影院页面展示,全部区域的影院
app.get('/cinemaAll',router.cinemaAll)
// 查询特定区域电影院
app.get('/cinemaArea',router.cinemaArea)
// 影院详情页接口
app.get('/cinemaDetail',router.cinemaDetail)
//影厅接口
app.get('/hall',router.operHall)
// 选座接口
app.get('/selSeat',router.selSeat)
// 订单存储
app.get('/insertOrder',router.insertOrder)
// 用户订单查询
app.get('/userOrder',router.userOrder)
// 退票
app.get('/tuiPiao',router.tuiPiao)
// 用户申请
app.get('/applyTui',router.applyTui)
// 后台管理接口==================================
app.post('/login',router.login);//登录
app.use('/',router.defaultRouter);
// 退出登录
app.get('/exit',router.exit)
// 查询所有电影
app.get('/allFilm',router.findFilm)
// 根据_id查询电影
app.get('/filmE',router.filmE)
// 编辑电影接口
app.get('/filmEdit',router.filmEdit)
// 封面上传
app.get('/upPoster',router.doPost)
// 添加电影接口
app.get('/insertFilm',router.insertFilm)
// 删除电影接口
app.get('/delFilm',router.delFilm)
// 模糊查询影院
app.get('/findCinema',router.findCinema)
// 根据_id查询影院
app.get('/cinemaE',router.cinemaE)
// 编辑影院接口
app.get('/cinemaEdit',router.cinemaEdit)
// 添加影院
app.get('/insertCinema',router.insertCinema)
// 删除影院
app.get('/delCinema',router.delCinema)
// 查询用户列表
app.get('/userList',router.userList)
// 模糊查询用户
app.get('/findUser',router.findUser)
// 管理员管理
app.get('/allManage',router.allManage)
// 订单列表渲染
app.get('/renderOrder',router.renderOrder)
// 搜索查询订单
app.get('/findOrder',router.findOrder)

// 查看用户申请
app.get('/findApply',router.findApply)
// 处理用户申请
app.get('/operApply',router.operApply)
//管理员的增删改查

app.get('/addManage',router.addManage);
app.get('/delManage',router.delManage);
app.get('/updateManage',router.updateManage);
app.get('/findManage',router.findManage);
// 用户的增删改查
// app.get('/addUser',router.addUser);
// app.get('/delUser',router.delUser);
// app.get('/updateUser',router.updateUser);
// app.get('/findUser',router.findUser);
// //通知
// app.get('/addNews',router.addNews);
// app.get('/delNews',router.delNews);
// app.get('/updateNews',router.updateNews);
// app.get('/findNews',router.findNews);
// // 设备
// app.get('/addDevice',router.addDevice);
// app.get('/delDevice',router.delDevice);
// app.get('/updateDevice',router.updateDevice);
// app.get('/findDevice',router.findDevice);

// app.get('/exit',router.exit)


app.listen(8088);
