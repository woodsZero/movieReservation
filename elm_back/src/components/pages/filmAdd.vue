<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>电影管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加电影</el-breadcrumb-item>
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
          <el-col :span="4">
            <el-form-item label="上传封面">
              <el-upload
                class="avatar-uploader"
                action="api/upPoster.action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 10}"
            v-model="form.description"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">点击添加</el-button>
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
      imageUrl: "",
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
        mId:'',
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
        description: "",
        imageUrl: ""
      }
    };
  },
  methods: {
    // 时间转换
    toTime(n) {
      let date = new Date(n);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      // let hour =
      //   date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      // let minute =
      //   date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      // let second =
      //   date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      return `${year}-${month}-${day}`;
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      // console.log(file)
      console.log(res,'res')
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // }
    onSubmit() {
      this.form.imageUrl = this.imageUrl;
      this.form.openTime = this.toTime(this.form.openTime)
      let timestamp = Date.parse(new Date());
      let a = parseInt(timestamp)
      let ranNum = parseInt(Math.random()*(10-100)+100)
      this.form.mId = String(a+ranNum) 
      this.$axios({
        url: "api/insertFilm",
        params: {
          form: this.form
        }
      })
        .then(res => {
          alert(res.data.info)
        })
        .catch(err => {
          console.log(err,'出错啦！')
        });
      
    }
  },
  mounted() {
    
  }
};
</script>
<style scoped>
.form {
  margin-top: 20px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  /* width: 100px; */
  height: 100px;
  display: block;
}
</style>
