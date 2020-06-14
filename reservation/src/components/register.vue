<template>
  <div>
    <div id="rtop">
      <a href="javascript:;" class="back" @click="$router.go(-1)">
        <img src="../assets/images/icon_back.png" alt />
      </a> 
      <h3>注册</h3>
    </div>
    <!-- 空白页腾距离 -->
    <div class="null"></div>
    <!-- 信息输入框 -->
    <van-cell-group>
      <van-field v-model="userName" clearable label="昵称："  />
      <van-field
        v-model="phone"
        clearable
        label="手机号："
        @blur="judgePhone"
      />
      <div class="pass">
        <van-field
          v-model="password"
          type="password"
          label="密码："
          placeholder="输入6-10位含数字字母密码"
          clearable
          @blur="judgeCode"
        />
      </div>
    </van-cell-group>
    <!-- 点击跳转登录页 -->
    <div class="clearfix forget" @click="$router.push('/login')">
         <span>已有账号？点击登录</span>
    </div>
    <div class="btn">
      <button @click="toLog">下一步</button>
    </div>
    <p>
      <van-checkbox v-model="checked" shape="square"></van-checkbox>
      <span class="hhh">我已阅读并同意使用</span> 
      <a href="javascript:;" class="hhh">
        <b>条款和隐私政策</b>
      </a>
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      password: "",
      checked: false,
      phone: "",
      userName: "",
    };
  },
  methods: {
    judgePhone() {
      // 手机号格式判断
      if (this.phone == "") {
        return
      } else {
        let reg = /^1[3456789]\d{9}$/;
        if (!reg.test(this.phone)) {
          alert('请输入正确格式的手机号')
        }else{
          // 查询是否账号已被注册过
          this.$axios({
          url: "/api/verify",
          params: {
            phone: this.phone,
          }
        })
        .then(res=>{
          // console.log(res)
          if(res.data.exist){
            alert('该手机号已注册，请更换手机号或者去登录')
          }
          })
        .catch(err=>{console.log(err,'验证用户状态报错')})
        }
      }
      // console.log(this.phone, "手机号");
    },
    judgeCode() {
      // console.log(this.password, "密码");
      let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,10}$/;
      if(this.password==''){
        return
      }
      if (!reg.test(this.password)) {
        alert('你的密码安全系数较低，请输入6-10位有数字和字母混合组成的密码')
      } 
    },
    toLog() {
      if (!this.checked) {
        alert("阅读并同意使用条款和隐私政策，才能进行下一步哦！");
      } else {
        // 提交用户信息
        let ranNum = parseInt(Math.random()*(10-100)+100) 
        let uId = this.phone+ranNum
        let joinTime = new Date()
        // console.log(joinTime)
        joinTime=this.$store.state.timeFormat(joinTime)
        //  console.log(joinTime)
        //  console.log(uId,'uId')
        this.$axios({
          url:"/api/userRegister",
          method:"post",
          data:{
            uId,
            phone:this.phone,
            nickName:this.userName,
            passWord:this.password,
            joinTime,
            avatarUrl:""
          }
        })
        .then(res=>{
          // console.log(res,'res')
          if(res.data.isok){
            alert('注册成功，跳转登录界面！')
           this.$router.push('/login')
          }
        })
        .catch(err=>{
          console.log(err,'err')
        })
      }
         
    }
  },
  mounted(){
  }
};
/* {
exist: 1,
nickname: "同手同脚098",
hasPassword: true,
code: 200
} */
</script>
<style scoped>
.hhh{
  font-size: 0.24rem;
}
.forget{
      margin-top:0.3rem;
      margin-bottom:0.3rem;
  }
.forget span 
  {
    padding: 0 0.35rem;
    float: right;
    color: #666;
    font-size: 0.24rem;
  }
.prompotCode {
  position: absolute;
  left: 0rem;
  top: 1.6rem;
  color: #fe0041;
  line-height: 0.24rem;
  font-size: 0.28rem;
  z-index: 10;
}

.pass {
  position: relative;
}

.prompot {
  position: absolute;
  left: 0.25rem;
  bottom: 1.2rem;
  /* top: 1.6rem; */
  color: #fe0041;
  line-height: 0.24rem;
  font-size: 0.28rem;
  z-index: 10;
}
#rtop {
  text-align: center;
  background: #fe0041;
  padding-top: 0.35rem;
  padding-bottom: 0.3rem;
  padding-left:0.34rem ;
}
 #rtop a {
    float: left;
 }

#rtop a img {
      width: 0.24rem;
      height: 0.42rem;
      margin-right: 0.2rem;
  }
 #rtop h3 {
    display: inline-block;
    font-size: 0.38rem;
    padding-right: 0.98rem;
    color: #fff;
  }
.null {
  height: 1.12rem;
}

.van-cell-group {
  padding: 0 0.25rem;
  position: relative;
}
.van-cell-group .get-msg {
    color: #fe0041;
    position: absolute;
    right: 1.25rem;
    bottom: 0.65rem;
    z-index: 10;
    font-size: 0.28rem;
  }

 .van-cell-group .van-cell {
    width: 6.15rem;
    padding-left: 0;
    padding-bottom: 0.45rem;
    padding-top: 0.55rem;
    font-size: 0.32rem;
    color: #333;
  }
.van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
  border: none;
}

.van-cell:not(:last-child):after {
  border: none;
}

.van-cell[data-v-8f8a1d9a]::after {
  width: 6rem;
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0;
  bottom: 0;
  left: 0;
  border-bottom: 2px solid #a3a3a3;
  transform: scaleY(0.5);
}

.btn {
  text-align: center;
}
.btn button {
    width: 6rem;
    height: 1rem;
    border: none;
    background: #fe0041;
    color: #ffffff;
    font-size: 0.38rem;
  }

p {
  margin-top: 0.5rem;
  padding: 0 0.75rem;
  text-align: left;
}

.van-checkbox {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 24px;
  border-radius: 0.05rem;
}
</style>