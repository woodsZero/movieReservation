<template>
  <div class="wrap" id="large-header">
    <canvas id="demo-canvas"></canvas>
    <div class="login_box">
      <h3>后台管理</h3>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label prop="name">
          <div class="input-outer">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
              placeholder="请输入用户名"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label prop="pass">
          <div class="input-outer">
            <el-input
              type="password"
              v-model="ruleForm.passWord"
              autocomplete="off"
              placeholder="请输入密码"
              prefix-icon="el-icon-unlock"
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label prop="type">
          <div class="input-outer select-outer">
            <el-select v-model="ruleForm.prop" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="btn-outer">
            <el-button type="primary" round @click="login">登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapMutations } from "vuex";
import api from "../common/js/api";
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        passWord: "",
        prop: ""
      },
      rules: {
        // name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        // pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        // type: [{ required: true, message: "请选择权限", trigger: "blur" }]
      },
      options: [
        {
          value: "0",
          label: "超级管理员"
        },
        {
          value: "1",
          label: "普通管理员"
        }
      ]
    };
  },
  methods: {
    ...mapMutations(["changeToken"]),
    login() {
      api.Login(this.ruleForm)
        .then(res => {
          let data = res.data
          if (res.data.code == 0) {
            this.$message({
              message: data.info,
              type: "success"
            });
            
            let obj = res.data.data
            sessionStorage.setItem("info", JSON.stringify(obj) );
            // console.log(res.data.isAdmin,'tokevn')
            this.changeToken(obj.isAdmin);
            this.$router.push('/wel')
          } else {
            this.$message.error(data.info);
            this.$router.push("/login");
          }
        })
        .catch(err => {
          // console.log(err);
        });
      // this.$axios({
      //   url: "/api/login",
      //   method: "post",
      //   data: this.ruleForm
      // })
      //   .then(res => {
      //     if (res.data.code == 0) {
      //       this.$message({
      //         message: "恭喜你，登录成功",
      //         type: "success"
      //       });
      //       // console.log(res.data.isAdmin)
      //       sessionStorage.setItem('type',res.data.isAdmin)
      //       // this.$store.state.token = res.data.isAdmin
      //       console.log(this.$store)
      //       // this.$store.commit('changeToken',res.data.isAdmin)
      //       this.changeToken(res.data.isAdmin)
      //       // this.$router.push('/wel')
      //     } else {
      //       this.$message.error('用户名或者密码错误');
      //       this.$router.push('/login')
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../assets/css/login.styl'
@import '../assets/css/normalize.styl'
</style>