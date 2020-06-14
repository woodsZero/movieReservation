<template>
<div>
  <h3 v-if="isAdmin=='1'">抱歉，亲，您暂未拥有权限管理！</h3>
  <div v-if="isAdmin=='0'">
  <div class="manList">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listTop">
      <el-input placeholder="请输入账号名/手机号" v-model="info" clearable class="userName"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <div class="manTable">
      <template>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"  style="width: 100%">
          <el-table-column prop="aId"  label="ID" width="200"></el-table-column>
          <el-table-column prop="name"  label="用户名" width="200"></el-table-column>
          <el-table-column prop="phone"  label="手机号" width="200"></el-table-column>
          <el-table-column prop="ownTime" label="注册时间" width="200"></el-table-column>
          <el-table-column prop="prop" label="权限" width="150">
            <template slot-scope="scope">
              <span>{{scope.row.prop=='1'?'普通管理员':'超级管理员'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作"  width="170">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination align='center' 
   @size-change="handleSizeChange" 
   @current-change="handleCurrentChange"
   :current-page="currentPage" 
   :page-sizes="[1,3,5,10]" 
   :page-size="pageSize" 
   layout="total, sizes, prev, pager, next, jumper" 
   :total="tableData.length">
</el-pagination>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: "",
      isAdmin:'',
      tableData: [
        {
          name: "",
          time: "",
          prop: "",
          aId:''

        }
      ],
      multipleSelection: [],
        total: 0,
        pageSize:3,
        currentPage:1
    };
  },
  inject: ["reload"],
  methods: {
     //每页条数改变时触发 选择一页显示多少行
     handleSizeChange(val) {
        //  console.log(`每页 ${val} 条`);
         this.currentPage = 1;
         this.pageSize = val;
     },
     //当前页改变时触发 跳转其他页
     handleCurrentChange(val) {
        //  console.log(`当前页: ${val}`);
         this.currentPage = val;
     },
    //按条件查找
    search() {
      if (this.name == "") {
        this.$message({
          message: "请输入关键字",
          type: "error"
        });
      } else {
        this.$axios({
          url: "api/findManage",
          params: {
            wd: this.info
          }
        })
          .then(res => {
            this.tableData = res.data.data;
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    //时间转换
    toTime(n) {
      let date = new Date(n);
      let year = date.getFullYear();
      let month =
        date.getMonth() + 1 >= 10
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() >= 10 ? date.getDate() : "0" + date.getDate();
      let hour =
        date.getHours() >= 10 ? date.getHours() : "0" + date.getHours();
      let minute =
        date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes();
      let second =
        date.getSeconds() >= 10 ? date.getSeconds() : "0" + date.getSeconds();
      return `${year}/${month}/${day} ${hour}:${minute}:${second}`;
    },
    //编辑
    handleEdit(index, row) {
      this.$router.push({
        path: "/manedit",
        query: {
          aId: row.aId
        }
      });
    },
    //删除
    handleDelete(index, row) {
      this.$axios({
        url: "api/delManage",
        params: {
          aId: row.aId
        }
      })
        .then(res => {
          if (res.data.code == 0) {
            this.$message({
              message: res.data.info,
              type: "success"
            });
            this.reload();
          } else {
            this.$message({
              message: "删除失败",
              type: "error"
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    let obj = JSON.parse(sessionStorage.getItem('info'))
    this.isAdmin = obj.isAdmin 
    // console.log(obj,'isadmin')
    this.$axios({
      url: "api/allManage"
    })
      .then(res => {
        console.log(res,'resssss')
        if (res.data.code == 0) {
          let data = res.data.data
          this.tableData = data
        } else {
          this.$message({
            message: "出错啦，请稍后再试",
            type: "error"
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="stylus" scoped>
.listTop
  margin-bottom 20px
.userName
  width 220px
  line-height 40px
.date
  line-height 40px
.listTop
  margin-top 20px 
</style>