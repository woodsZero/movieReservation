<template>
  <div class="userList">
    <div class="listTop">
      <el-input placeholder="请输入用户名/手机号" v-model="info" clearable class="userName"></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="userTable">
      <template>
        <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" border style="width: 100%">
          <el-table-column fixed prop="uId" label="ID" width="150"></el-table-column>
          <el-table-column prop="nickName" label="用户名" width="200"></el-table-column>
          <el-table-column prop="phone" label="电话" width="180"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
            <template slot-scope="scope">
                <span>{{scope.row.email?scope.row.email:'暂无'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="joinTime" label="注册时间" width="250"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" width="100" disabled>编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                width="100"
              disabled>删除</el-button>
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
</template>
<script>
export default {
  data() {
    return {
      info: "",
      tableData: [
        {
          uId: "",
          phone: "",
          nickName:'',
          joinTime: "",
          email:''
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
    //查找
    search() {
      // 根据手机号或者用户名查询
      this.$axios({
        url:'api/findUser',
        params: {
            wd: this.info
          }
      })
      .then(res=>{
        // console.log(res,'res')
        this.tableData = res.data.data
      })
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
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    //编辑
   
  },
  //渲染表格
  mounted() {
    this.$axios({
      url: "api/userList"
    })
      .then(res => {
        // console.log(res)
        this.tableData = res.data.data
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
  width 300px
  line-height 40px
.date
  line-height 40px
</style>