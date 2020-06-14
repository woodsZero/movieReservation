const db = require('../model/db')
const getHash = require('../model/md').getHash;
const ObjectId = require('mongodb').ObjectId
const manage = 'manage';//管理员集合名称
const user = 'user';//用户集合名称
const films = 'films';//电影
const cinema = 'cinema'//影院集合
const hall = 'hall'//影厅集合
const order = 'order'//订单集合
const apply = 'apply'//申请集合
const comment = 'comment'
//引入fs模块用来读取文件夹，文件
const fs = require('fs');
//引入formidable模块
const formidable = require('formidable');
//引入时间模块
const sd = require('silly-datetime');
//引入路径模块
const path = require('path');

function errMongo(res) {
    var json = {
        isok: false,
        code: 1,
        info: "数据库错误，请联系后端"
    }
    res.send(json);
}
function doPost(req, res){
    console.log(111)
    var form = new formidable.IncomingForm();
    form.uploadDir = './public/temp';
    form.parse(req, (err, filed, files) => {
        if (err) {
            errMongo(res);
            return;
        } else {
            console.log(files, 'files')
            console.log(filed, 'filed')
            //得到时间
            var time = sd.format(new Date(), 'YYYYMMDDHHmm');
            //生成随机数
            var ran = parseInt(Math.random() * (9999 - 1000) + 1000);
            //找到文件后缀名
            var extname = path.extname(files.file.name);
            //拼接新路径
            var newPath = 'public'+ '\\' + 'uploads' + '\\' +  '\\' + time + ran + extname;
            //找到老路径
            var oldPath = files.file.path;//'\'是转义字符
            console.log(newPath,'新路径')
            console.log(oldPath,'老路径')

            fs.rename(oldPath, newPath, (err) => {
                //rename方法,老路径temp作为临时文件夹存在，如果上传失败，文件会存在temp中，如果成功，temp中不会存放文件，新路径uploads中会保存
                if (err) {
                    errMongo(res);
                    return;
                } else {//res.render('') 单引号下面的一定是存在的文件名，找不到就会报错，不能当成简单地字符串输出
                    // res.redirect('/' + filed.aidAlbum);
                    var json = {
                        isok: true,
                        code: 0,
                        info: "上传成功",
                        data: newPath
                    }
                    res.send(json)
                }
            });
        }
    })

}
// 时间格式
function timeFormat() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1 >= 10 ? date.getMonth() + 1 : "0" + (date.getMonth() + 1)
    let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()
    let h = date.getHours() >= 10 ? date.getHours() : '0' + date.getHours()
    let mi = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes()
    let s = date.getSeconds() >= 10 ? date.getSeconds() : '0' + date.getSeconds()
    return `${year}-${month}-${day} ${h}:${mi}:${s}`
}
// 热映电影详情页 
function findFDetail(req, res) {
    var query = req.query;
    db.find(films, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 查询所有电影
function findFilm(req,res){
    db.find(films,{},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// // 所有热映电影的查看
function showHot(req, res) {
    db.find(films, {activeType:1}, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 即将上映
function willOn(req, res) {
    db.find(films, {activeType:0}, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 注册前验证用户是否已经注册过账号
function verify(req,res){
    let query = req.query
    let userstate=0
    db.find(user,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        // 这里不能写成if(result==[])
        // 可以写成result.lenth
        if(result==''){
            userstate=0
        }else{
            userstate=1
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            exist:userstate
        }
        res.send(json)
    })
}
// user用户注册
function userRegister(req,res){
    let body = req.body
    db.insert(user,body,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        let json={
            isok: true,
            code: 0,
            info: "注册成功"
        }
        res.send(json)
    })
}
// user用户登录
function userLogin(req,res){
    let body = req.body
    let query = {
        phone:body.phone
    }
    db.find(user,query,(err,result)=>{
        if (result.length == 0) {
            // console.log(11111)
            var json = {
                isok: false,
                code: 2,
                info: "该账号不存在"
            }
            res.send(json);
            return;
        }
        let userinfor = result[0]
        if(body.passWord==result[0].passWord){
            var json = {
                isok: true,
                code: 0,
                info: "登录成功",
                userInfo:{
                    nickName:userinfor.nickName,
                    avatarUrl:userinfor.avatarUrl,
                    uId:userinfor.uId
                }
            }
            // req.session.name = body.nickName;
            
            res.send(json)
        }
        else{
            var  json = {
              isok: false,
              code: 2,
              info: "账号密码错误，登录失败"
         }
         res.send(json)
      }
    })
}
// 模糊查询关键字
function findKey(req,res){
    // console.log(req.query,'req.query')
    let query = {}
    let reg = new RegExp(req.query.wd)
    // if(req.query.wd){基础模糊查询
    //     query['showName'] = new RegExp(req.query.wd)
    //     // query['director'] = new RegExp(req.query.wd)
    //     db.find(films,query,(err,result)=>{
    //         console.log(result,'result')
    //         var json = {
    //             isok: true,
    //             code: 0,
    //             info: "查询成功",
    //             data: result
    //         }
    //         res.send(json)
    //     })
    // }
    db.find(films,{$or:[
        {showName:{$regex:reg}},
        {director:{$regex:reg}},
        {leadingRole:{$regex:reg}}
    ]},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
        isok: true,
        code: 0,
        info: "查询成功",
        data: result
    }
        res.send(json)
    })
}
// 查询城市的所有电影院
function cinemaAll(req,res){
    // console.log(req.query,'query')
    let query = req.query
    db.find(cinema,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 查询区域电影院
function cinemaArea(req,res){
    let query = req.query
    db.find(cinema,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 影院详情页查询
function cinemaDetail(req,res){
    // console.log(req.query,'query')
    let query = req.query
    db.find(cinema,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })

}
// 影厅接口
function operHall(req,res){
    let query = req.query
    // console.log(query,'query')
    db.find(hall,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 选座接口
function selSeat(req,res){
    var query = req.query;
   let arr =  JSON.parse(query.arr1)
   console.log(arr,'arr')
    var tiao = {
        hId: query.hId
    }
    var newV = {
        $set: {
            seatList:arr
        }
    }
    db.update('updateOne',hall, tiao, newV, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })
}
// 订单存储
function insertOrder(req,res){
    let a=req.query 
    let query = JSON.parse(a.json)
    query.state = '1' 
    query.oId = new Date().getTime() + '' + Math.floor(Math.random() * (9999 - 1000) + 1000)
    db.insert(order, query, (err, result) => {
                if (err) {
                    errMongo(res);
                    return;
                }
                var json = {
                    isok: true,
                    info: '添加成功',
                    code: 0,
                }
                res.send(json)
            })   
}
// 用户订单查询
function userOrder(req,res){
    let query=req.query
    
    db.find(order, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 退票申请
function applyTui(req,res){
    let oId = req.query.oId
    let tiao = {
        oId
    }
    let newV = {
        $set:{
            state:'2'
        }
    }
    // 更改订单的状态
    db.update('updateOne',order,tiao,newV,(err,result)=>{
        if(err){
            errMongo(res)
            return
        }
        // 添加到申请列表
        db.find(order,tiao,(error,result1)=>{
            // console.log(result1,'result1')
            result1 = result1[0]
            let obj = {
                oId:result1.oId,
                uId:result1.uId,
                userName:result1.userName,
                cinemaName:result1.cinemaName,
                hallName:result1.hallName,
                showName:result1.showName,
                showTime:result1.showTime,
                orderTime:result1.orderTime,
                state:result1.state,
                allPrice:result1.allPrice,
                operate:'0',
                orderSeat:result1.orderSeat
            }
            db.insert(apply,obj,(er,resu)=>{
                if(er){
                    errMongo(res)
                    return
                }
                var json = {
                    isok: true,
                    code: 0,
                    info: '申请成功'
                }
                res.send(json);
            })
        })
       
    })
}
// 用户退票
function tuiPiao(req,res){
    let _id = req.query._id
    let query = {
        _id:ObjectId(_id)
    }
    // console.log(query)
    db.deleteInfo('deleteOne', order, query, (err, result) => {
                if (err) {
                    errMongo(res);
                    return;
                }
                var json = {
                    isok: true,
                    code: 0,
                    info: '删除成功'
                }
                res.send(json);
        })
}
// 根据—_id查询电影
function filmE(req,res){  
    let _id = req.query._id
    let query = {
        _id:ObjectId(_id)
    }
    db.find(films,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// film的编辑接口
function filmEdit(req,res){
    // console.log(req.query,'query')
    let query = req.query;
    let _id =req.query._id
    
    let obj =  JSON.parse(query.form)
     var tiao = {
        _id : ObjectId(_id)
     }
    //  console.log(obj,'obj')
    // //  console.log(tiao,'tiao')
    //  var newV = {
    //      $set: {
    //          showName:obj.showName,
    //          showNameEn:obj.showNameEn,
    //          remark:obj.remark,
    //          country:obj.country,
    //          openTime:obj.openTime,
    //          activeType:obj.activeType,
    //          duration:obj.duration,
    //          type:obj.type,
    //          director:obj.director,
    //          leadingRole:obj.leadingRole,
    //          description:obj.description
    //      }
    //  }
    // 之前遇到这个误区，怎么否更新不了，因为obj本身是个对象，$set后面多了花括号，把obj当成了字段
    // var newV = {
        // $set:{
            // obj
        // /}
    // }
    var newV = {
        $set:obj
    }
    
    db.update('updateOne',films,tiao,newV,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })
    
}
// 添加电影接口
function insertFilm(req,res){
    // console.log(req.query,'query')
    let form  = req.query.form
    let query = JSON.parse(form)
    db.insert(films,query,(err,result)=>{
        if(err){
            errMongo(res)
        }
        return
    })
    var json = {
        isok: true,
        info: "添加成功",
        code: 0
    };
    res.send(json);
}
// 删除电影接口
function delFilm(req,res){
    let _id =req.query._id
    let tiao= {
        _id:ObjectId(_id)
    }
    db.deleteInfo('deleteOne',films,tiao,(err,result)=>{
        if(err){
            errMongo(res)
            return
        }
        var json = {
            isok: true,
            code: 0,
            info: '删除成功'
        }
        res.send(json);
    })
}
// 模糊查询影院
function findCinema(req,res){
    // let query = {}
    let reg = new RegExp(req.query.wd)
    db.find(cinema,{$or:[
        {city:{$regex:reg}},
        {cinemaName:{$regex:reg}},
        {regionName:{$regex:reg}}
    ]},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
        isok: true,
        code: 0,
        info: "查询成功",
        data: result
    }
        res.send(json)
    })
}
// 编辑影院接口
function cinemaEdit(req,res){
    let query = req.query;
    let _id =req.query._id
    let obj =  JSON.parse(query.form)
     var tiao = {
        _id : ObjectId(_id)
     }
     var newV = {
        $set:obj
    }
    db.update('updateOne',cinema,tiao,newV,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })
}
// 编辑电影之前进行查询
function cinemaE(req,res){
    let _id = req.query._id
    let query = {
        _id:ObjectId(_id)
    }
    db.find(cinema,query,(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 添加影院接口
function insertCinema(req,res){
    let form  = req.query.form
    let query = JSON.parse(form)
    db.insert(cinema,query,(err,result)=>{
        if(err){
            errMongo(res)
        }
        return
    })
    var json = {
        isok: true,
        info: "添加成功",
        code: 0
    };
    res.send(json);
}
// 删除影院
function delCinema(req,res){
    let _id =req.query._id
    let tiao= {
        _id:ObjectId(_id)
    }
    db.deleteInfo('deleteOne',cinema,tiao,(err,result)=>{
        if(err){
            errMongo(res)
            return
        }
        var json = {
            isok: true,
            code: 0,
            info: '删除成功'
        }
        res.send(json);
    })
}
// 用户查询
function userList(req,res){
    db.find(user,{},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 模糊查询用户
function findUser(req,res){
    let reg = new RegExp(req.query.wd)
    db.find(user,{$or:[
        {nickName:{$regex:reg}},
        {phone:{$regex:reg}}
    ]},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
        isok: true,
        code: 0,
        info: "查询成功",
        data: result
    }
        res.send(json)
    })
}
// 管理员列表
function allManage(req,res){
    db.find(manage,{},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 渲染订单列表
function renderOrder(req,res){
    db.find(order,{},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
// 搜索查询订单
function findOrder(req,res){
    let reg = new RegExp(req.query.wd)
    db.find(order,{$or:[
        {userName:{$regex:reg}},
        {oId:{$regex:reg}}
    ]},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
        isok: true,
        code: 0,
        info: "查询成功",
        data: result
    }
        res.send(json)
    })
}
// 渲染申请列表
function findApply(req,res){
    db.find(apply,{},(err,result)=>{
        if(err){
            errMongo(res)
            return
        }
        console.log(result,'resu')
        var json = {
            isok: true,
            code: 0,
            info: "查询成功",
            data: result
        }
        res.send(json)
    })
}
//更改订单状态即处理退票申请
function operApply(req,res){
    let oId = req.query.oId
    let type = req.query.type
    let tiao = {
        oId
    }
    if(type=='1'){
        let newV = {
            $set:{
                operate:'1'
            }
        }
        db.update('updateOne',apply,tiao,newV,(err,result)=>{
            if(err){
                errMongo(res)
                return
            }
            db.update('updateOne',order,tiao,{$set:{state:'0'}},(er,resu)=>{
                if(er){
                    errMongo(res)
                    return
                }
                var json = {
                    isok: true,
                    code: 0,
                    info: "已同意"
                }
                res.send(json)
            })
        })
    }
    if(type == '2'){
        let newt = {
            $set:{
                operate:'2'
            }
        }
        db.update('updateOne',apply,tiao,newt,(err,result)=>{
            if(err){
                errMongo(res)
                return
            }
            db.update('updateOne',order,tiao,{$set:{state:'3'}},(er,resu)=>{
                if(err){
                    errMongo(res)
                    return
                }
                var json = {
                    isok: true,
                    code: 0,
                    info: "已驳回"
                }
                res.send(json)
            })
            
        })
    }
}

//默认路径
function defaultRouter(req, res, next) {
    // console.log(req.session.username,'name')
    if (req.session.username) {
        // console.log(11111)
        next();
    } else {
        var json = {
            isok: false,
            code: -1,
            info: '亲，请先登录'
        }
        res.send(json)
    }
}

//登录
function login(req, res) {
    // console.log(1111111)
    const body = req.body;//name pass type 0-超管 1-普管 2-user
    // console.log(body,'body')
    let query = {
        name:body.name,
        prop:body.prop
    }
    db.find(manage,query,(err,result)=>{
        // console.log(result,'result')
        if (result.length == 0) {
            var json = {
                isok: false,
                code: 2,
                info: "该账号不存在或者权限错误"
            }
            res.send(json);
            return;
        }
        let info = result[0]
        if(body.passWord==result[0].passWord){
            var json = {
                isok: true,
                code: 0,
                info: "登录成功",
                data:{
                    name:info.name,
                    isAdmin:info.prop,
                    aId:info.aId
                }
            }
            // console.log(body.name,'bodyname')

            req.session.username = body.name;
            // console.log(req.session.username,'req.user')
            req.session.isAdmin = json.data.isAdmin;
            res.send(json)
        }
        else{
            var  json = {
              isok: false,
              code: 2,
              info: "账号密码错误，登录失败"
         }
         res.send(json)
      }
    })
}
//退出登录
function exit(req, res) {
    delete req.session.username;
    var json = {
        isok: true,
        info: "退出成功",
        code: 0
    }
    res.send(json)
}
// 普通管理员的增删改查
// 添加管理员
function addManage(req, res) {
    var query = req.query;
    const t1 = {
        phone: query.phone
    }
    db.find(manage, t1, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        if (result.length == 0) {//可以创建
            if (!query.name || !query.passWord || !query.prop || !query.phone) {
                var json = {
                    isok: false,
                    info: '缺少必填参数',
                    code: 4,
                }
                res.send(json)
                return;
            }
            // passWord:getHash(query.passWord),
            t2 = {
                aId: new Date().getTime() + '' + Math.floor(Math.random() * (999999 - 10000) + 100000),
                name: query.name,
                phone:query.phone,
                passWord:query.passWord,
                prop: query.prop,
                ownTime: timeFormat()
            };
            db.insert(manage, t2, (err, result) => {
                if (err) {
                    errMongo(res);
                    return;
                }
                var json = {
                    isok: true,
                    info: '添加成功',
                    code: 0,
                }
                res.send(json)
            })
        } else {//此账号已存在
            var json = {
                isok: false,
                code: 2,
                info: "此账号已存在"
            }
            res.send(json)
        }
    })
}
// 删除管理员
function delManage(req, res) {
    var query = req.query;
    db.deleteInfo('deleteOne', manage, query, (err, result) => {
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            code: 0,
            info: '删除成功'
        }
        res.send(json);
    })
}
// 编辑管理员
function updateManage(req, res) {
    var query = req.query;// {id:123}
    // console.log(query.ruleForm,'query')
    let ruleForm = JSON.parse(query.ruleForm)
    // console.log(query,'query')
    var tiao = {
        aId: query.aId
    }
    var newV = {
        $set: ruleForm
    }
    // console.log(query)
    db.update('updateOne',manage, tiao, newV, (err, result) => {
        console.log(err)
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
            isok: true,
            info: "更新成功",
            code: 0
        };
        res.send(json);
    })

}
// 搜索管理员
function findManage(req, res) {
    let reg = new RegExp(req.query.wd)
    db.find(manage,{$or:[
        {name:{$regex:reg}},
        {phone:{$regex:reg}}
    ]},(err,result)=>{
        if (err) {
            errMongo(res);
            return;
        }
        var json = {
        isok: true,
        code: 0,
        info: "查询成功",
        data: result
    }
        res.send(json)
    })
}


module.exports = {
    showHot,
    willOn,
    findFDetail,
    verify,
    userRegister,
    userLogin,
    findKey,
    cinemaAll,
    cinemaArea,
    cinemaDetail,
    operHall,
    selSeat,
    insertOrder,
    userOrder,
    tuiPiao,
    findFilm,
    filmE,
    filmEdit,
    insertFilm,
    delFilm,
    findCinema,
    cinemaEdit,
    cinemaE,
    insertCinema,
    delCinema,
    userList,
    findUser,
    findManage,
    renderOrder,
    findOrder,
    applyTui,
    findApply,
    addManage,
    delManage,
    updateManage,
    allManage,
    operApply,
    login,
    defaultRouter,
    exit,
    doPost
}