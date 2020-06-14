<template>
  <div class="editMan">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>信息修改</el-breadcrumb-item>
    </el-breadcrumb>
    <h3>修改</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="right"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input type="password" v-model="ruleForm.password" disabled></el-input>
      </el-form-item>
      <el-form-item label="权限" prop="prop">
        <el-select v-model="ruleForm.prop" placeholder="请选择权限" style="width:100%">
          <el-option label="超级管理员" value="0"></el-option>
          <el-option label="普通管理员" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <div class="btn">
          <el-button type="primary" @click="submitForm()">提交</el-button>
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
        passWord: "",
        prop: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        passWord: [{ required: true, message: "请输入用户名", trigger: "blur" }]
      },
      aId:this.$route.query.aId
    };
  },
  mounted() {
    this.$axios({
      url: "api/findManage",
      params: {
        aId: this.aId
      }
    })
      .then(res => {
        // this.ruleForm = res.data.data[0]
        let data = res.data.data[0]
      let form = this.ruleForm
       for (let key in form) {
        form[key]=data[key]
      }
      // form.passWord=getHasform.pass)
      this.ruleForm = form
        console.log(this.ruleForm,'ruleform')
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submitForm() {
      console.log(this.ruleForm,this.aId)
          this.$axios({
              url:'api/updateManage',
              params:{
                aId:this.aId,
                ruleForm:JSON.stringify(this.ruleForm) 
              }
          })
          .then(res=>{
              // console.log(res)
              alert(res.data.info)
          })
          .catch(err=>{
              console.log(err)
          })
    },
  }
};
</script>
<style lang="stylus" scoped>
.editMan
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