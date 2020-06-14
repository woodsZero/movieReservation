<template>
  <div class="addUser">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>信息添加</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="right"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio v-model="ruleForm.sex" label="0">男</el-radio>
        <el-radio v-model="ruleForm.sex" label="1">女</el-radio>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model.number="ruleForm.tel"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idx">
        <el-input v-model="ruleForm.idx"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="des">
        <el-input
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 5}"
          placeholder="请输入内容"
          v-model="ruleForm.des"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        pass: "",
        sex: "",
        tel: "",
        email: "",
        idx: "",
        des: "",
        time: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }],
        tel: [
          {
            type: "number",
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          {
            pattern: /^0{0,1}(13[0-9]|15[7-9]|153|156|18[7-9])[0-9]{8}$/,
            message: "手机号格式不对",
            trigger: "blur"
          }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "blur" }],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        idx: [
          { required: true, message: "请填写证件号码", trigger: "blur" },
          {
            pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
            message: "证件号码格式有误！",
            trigger: "blur"
          }
        ],
        des: [{ required: true, message: "请填入备注", trigger: "blur" }]
      }
    };
  },
  methods: {
    //添加
    submitForm(formName) {
      this.ruleForm.time = new Date().getTime();
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "api/addUser",
            params: this.ruleForm
          })
            .then(res => {
              if (res.data.code == 0) {
                this.$message({
                  message: res.data.info,
                  type: "success"
                });
                this.$router.push('./userlist')
              } else {
                this.$message({
                  message: '出错啦，请稍后再试',
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="stylus" scoped>
.addUser
  h3
    margin-top 20px
    line-height 100px
    margin-left 10px
    color #333
.el-form
  width 500px
  margin 20px auto
.el-radio
  margin-left 20px
.btn
  display flex
  width 100%
  justify-content space-around
</style>