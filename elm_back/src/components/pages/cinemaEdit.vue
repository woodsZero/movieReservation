<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>影院管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑影院</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="影院名">
              <el-input v-model="form.cinemaName" placeholder="请输入影院名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="联系电话">
              <el-input v-model="form.phone" placeholder="联系电话"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="城市">
              <el-input v-model="form.city" placeholder="城市"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="地区">
              <el-input v-model="form.regionName" placeholder="地区"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="类型">
              <el-input v-model="form.showMark" placeholder="类型"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="详细地址">
              <el-input v-model="form.address" placeholder="详细地址"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交修改</el-button>
          <el-button @click="$router.go(-1)">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [
        {
          value: 1,
          label: "正在上映"
        },
        {
          value: 0,
          label: "即将上映"
        }
      ],
      form: {
        cinemaName:'',
        phone:'',
        city:'',
        regionName:'',
        showMark:'',
        address:''
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      let _id = this.$route.query._id
      
     
      console.log(JSON.stringify(this.form),'转变') 
      this.$axios({
        url:'api/cinemaEdit',
        params:{
          _id,
          form:JSON.stringify(this.form) 
        }
      })
      .then(res=>{
        // console.log(res)
        let data = res.data
        alert(data.info)
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  mounted(){
    let _id = this.$route.query._id
    console.log(_id)
    this.$axios({
      url:'api/cinemaE',
      params:{
        _id
      }
    })
    .then(res=>{
      // console.log(res,'ressss')
      let data = res.data.data[0]
      let form = this.form
       for (let key in form) {
        form[key]=data[key]
      }
      this.form = form
      // console.log(form,'form') 
    })
    .catch(err=>{
      console.log(err,'err')
    })
  }
};
</script>
<style scoped>
.form {
  margin-top: 20px;
}
</style>
