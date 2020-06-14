<template>
<div>
  <h3 v-if="isAdmin=='1'">抱歉，亲，您暂未拥有权限管理！</h3>
  <div class="addMan" v-if="isAdmin == '0'">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>添加管理员</h3>
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
      <el-form-item label="手机号" prop="phone" required>
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord" required>
        <el-input type="passWord" v-model="ruleForm.passWord" show-passWord></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="prop" required>
        <el-select v-model="ruleForm.prop" placeholder="请选择权限" style="width:100%">
          <el-option label="超级管理员" value="0"></el-option>
          <el-option label="普通管理员" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        passWord: "",
        prop: null,
        phone:''
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        pass: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      isAdmin:''
    };
  },
  mounted(){
    let obj = JSON.parse(sessionStorage.getItem('info'))
    // console.log(obj,'obj')
    this.isAdmin = obj.isAdmin 
    // console.log(this.isAdmin,'isAdmin')
  },
  methods: {
    submitForm() {
      this.$axios({
        url:'api/addManage',
        params:this.ruleForm
      })
      .then(res=>{
        console.log(res,'res')
        alert(res.data.info)
      })
      .catch(err=>{
        console.log(err,'err')
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="stylus" scoped>
.addMan
    text-align center
    h3
      margin-top 20px
      line-height 100px
      margin-left 10px
      color #333
.el-form
  width 500px
  margin 0 auto
.btn
  display flex
  width 100%
  justify-content space-around
</style>