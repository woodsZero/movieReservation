<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>编辑电影</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item label="电影名">
              <el-input v-model="form.showName" placeholder="请输入电影名"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5">
            <el-form-item label="英文名">
              <el-input v-model="form.showNameEn" placeholder="请输入英文名"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="5">
            <el-form-item label="评分" v-if="form.activeType">
              <el-input v-model="form.remark" placeholder="评分"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="出品城市">
              <el-input v-model="form.country" placeholder="城市"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="时长">
              <el-input v-model="form.duration" placeholder="时长"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="类型">
              <el-input v-model="form.type" placeholder="类型"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <el-form-item label="导演">
              <el-input v-model="form.director" placeholder="导演"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="演员">
              <el-input v-model="form.leadingRole" placeholder="演员"></el-input>
              <!-- <span>分钟</span> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="电影状态">
          <el-select v-model="form.activeType" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上映时间">
          <el-col :span="8">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.openTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="电影介绍">
          <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 10}" v-model="form.description"></el-input>
        </el-form-item>
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
        showName: "",
        showNameEn: "",
        remark: "",
        country: "",
        openTime: "",
        activeType: 1,
        duration: "",
        type: "",
        director: "",
        leadingRole: "",
        description: ""
      }
    };
  },
  methods: {
    onSubmit() {
      // console.log("submit!");
      let _id = this.$route.query._id
      // console.log(this.form,'form')
      // let obj =
      // for
     this.form.openTime =this.$store.state.timeFormat(this.form.openTime)
      // console.log(JSON.stringify(this.form),'转变') 
      this.$axios({
        url:'api/filmEdit',
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
    // console.log(_id)
    this.$axios({
      url:'api/filmE',
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
