<template>
  <div>
    <div id="ltop">
      <a href="javascript:;" class="back" @click="$router.go(-1)" >
        <img src="../assets/images/icon_back.png" alt />
      </a>
      <h3>登录</h3>
      <!-- <a href="javascript:;" class="register" @click="toRegister">注册</a> -->
    </div>
    <!-- 空白页腾距离 -->
    <div class="null"></div>
    <!-- 信息输入框 -->
    <van-cell-group>
      <van-field
        v-model="userPhone" 
        clearable
        label="手机号："
      />
      <van-field v-model="password" type="password" label="密码："  clearable/>
    </van-cell-group>
    <!-- 点击跳转注册页 -->
    <div class="clearfix forget" @click="$router.push('/register')"><span>没有账号？点击免费注册</span></div>
    <div class="btn"><button @click="logIn">登录</button></div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            userPhone:'',
            password:''
        }
    },
    methods:{
      logIn(){
        if(this.userPhone==''||this.password==''){
          alert('请填入必传参数')
        }else{
          this.$axios({
            url:'/api/userLogin',
            method:'post',
            data:{
              phone:this.userPhone,
              passWord:this.password
            }
          })
          .then(res=>{
            alert(res.data.info)
            if(res.data.isok){ 
              let mineArr=[]
              let info=res.data.userInfo
              let obj={
               nickName:info.nickName,
               avatarUrl:info.avatarUrl,
               uId:info.uId
             }
             mineArr.push(obj)
            //  sessionStorage.setItem("", JSON.stringify(obj) );
             localStorage.setItem('mineArr',JSON.stringify(mineArr))
             this.$router.push('/mine')
            }  
              
          })
          .catch(err=>{
            console.log(err,'登录页面的错误')
          })
        }
       
      }
    }
};
</script>
<style scoped>

#ltop{
  /* background: #ff4d64; */
  background: #fe0041;
  text-align: center;
  padding-top: 0.35rem;
  padding-bottom: 0.3rem;
  padding-left:0.34rem ;
  /* padding: 0.42rem 0.28rem 0.25rem 0.34rem; */
}
 #ltop a {
    float: left;
 }

#ltop a img {
      width: 0.24rem;
      height: 0.42rem;
      margin-right: 0.2rem;
  }
  

 #ltop h3 {
    display: inline-block;
    font-size: 0.38rem;
    padding-right: 0.84rem;
    color: #fff;
  }

  


.null {
  height:1.89rem;
}
.van-cell-group{
  margin: auto;
  padding: 0 0.25rem;
}
 .van-cell-group .van-cell{
    width :6.15rem;
    padding-left: 0;
    padding-bottom: 0.45rem;
    padding-top:0.55rem;
    font-size: 0.32rem;
    color:#333;
 }
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after
    {border:none}
.van-cell:not(:last-child):after
    {border:none}
.van-cell[data-v-10d9df09]::after
   {
    width:6rem;
    position: absolute;
    box-sizing: border-box;
    content: ' ';
    pointer-events: none;
    right: 0;
    bottom: 0;
    left: 0;
    border-bottom: 2px solid #a3a3a3;
    transform: scaleY(.5); 
   }  
.forget{
    margin-top:0.3rem;
    margin-bottom:0.3rem;
 }
.forget span {
    padding: 0 0.35rem;
    float: right;
    color: #666;
    font-size: 0.24rem;
}
.btn
    {text-align:center}
.btn button{
    width:6rem;
    height:1rem;
    border:none ;
    /* background:#ff4d64; */
    background: #fe0041;
    color:#ffffff;
    font-size:0.38rem;
    border-radius:0.05rem;
} 
       
</style>