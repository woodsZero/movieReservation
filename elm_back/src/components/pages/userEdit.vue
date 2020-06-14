<template>
  <div class="editUser">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>信息修改</el-breadcrumb-item>
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
        <el-radio v-model="ruleForm.sex" label="0" disabled>男</el-radio>
        <el-radio v-model="ruleForm.sex" label="1" disabled>女</el-radio>
      </el-form-item>
      <el-form-item label="手机号" prop="tel">
        <el-input v-model.number="ruleForm.tel"></el-input>
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idx">
        <el-input v-model="ruleForm.idx" disabled></el-input>
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
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
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
        pass: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        tel: [
          {
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
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { type: "email", message: "请输入正确的邮箱地址", trigger: "blur" }
        ],
        des: [{ required: true, message: "请填入备注", trigger: "blur" }]
      },
      id: this.$route.query.id
    };
  },
  mounted() {
    this.$axios({
      url: "api/findUser",
      params: {
        id: this.id
      }
    })
      .then(res => {
        this.ruleForm = res.data.data[0]
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "api/updateUser",
            params: {
              id: this.id
            }
          })
            .then(res => {
              if(res.data.code==0){
                this.$message({
                  message:'更新成功',
                  type:'success'
                })
                this.$router.push('/userlist')
              }else{
                this.$message({
                  message:'出错啦，请稍后再试',
                  type:'error'
                })
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.editUser
  text-align center
  h3
    margin-top 20px
    line-height 100px
    margin-left 10px
    color #333
.el-form
  width 500px
  margin 20px auto
.btn
  display flex
  width 100%
  justify-content space-around
</style>