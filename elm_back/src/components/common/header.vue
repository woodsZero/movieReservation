<template>
  <div class="header_wrap">
    <el-header style="height:80px">
      <div>
        <img src="../../assets/img/yingyuan.jpg" alt="" title="" class="logo" />
      </div>
      <h3 class="wel">在线订票后台管理系统</h3>
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="50" :src="circleUrl" fit:cover style="margin-top:15px"></el-avatar>
        </span>
        <span class="nickName">{{name}}</span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-fork-spoon">个人信息</el-dropdown-item>
          <el-dropdown-item icon="el-icon-chicken" @click.native="edit">修改信息</el-dropdown-item>
          <el-dropdown-item @click.native="out" icon="el-icon-food">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name:'',
      circleUrl: require("../../assets/img/photo.jpg")
    };
  },
  methods: {
    edit() {
      this.$router.push('/manedit')
    },
    out() {
      this.$axios({
        url: "/api/exit"
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: '退出成功',
              type: "success"
            });
          }
          sessionStorage.removeItem('info')
          sessionStorage.removeItem('token')
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created(){
    let info = JSON.parse(sessionStorage.getItem('info')) 
    this.name = info.name
  }
};
</script>
<style lang="stylus" scoped>
@import '../../assets/css/header.styl'
.nickName{
  height 80px
  line-height 80px
  display inline-block
}
</style>