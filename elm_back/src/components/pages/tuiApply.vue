<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/wel' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>退票申请</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="listTop">
      <el-input placeholder="请输入订单号/用户名" v-model="info" clearable class="userName"></el-input>
      <el-button type="primary" @click="search">查询</el-button>
    </div>
    <div class="userTable">
      <template>
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          border
          style="width: 100%"
        >
          <el-table-column prop="oId" label="订单号" width="150"></el-table-column>
          <el-table-column prop="userName" label="用户名" width="100"></el-table-column>
          <el-table-column prop="cinemaName" label="影院名" width="250"></el-table-column>
          <el-table-column prop="hallName" label="影厅" width="90"></el-table-column>
          <el-table-column prop="orderSeat" label="座位" width="150">
            <template slot-scope="scope">
              <div>
                <span v-for="item in scope.row.orderSeat" :key="item.id">{{item.y}}排{{item.x}}座</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="orderTime" label="购票时间" width="160"></el-table-column>
          <el-table-column prop="showTime" label="电影开场时间" width="150"></el-table-column>
          <el-table-column prop="allPrice" label="总价" width="80">
            <template slot-scope="scope">
              <span>￥{{scope.row.allPrice}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <div v-if="scope.row.operate=='0'">
                <el-button size="mini" @click="agree(scope.row.oId)" width="100">同意</el-button>
                <el-button size="mini" type="danger" @click="sayNo(scope.row.oId)" width="100">驳回</el-button>
              </div>
              <div v-if="scope.row.operate=='1'">已同意</div>
              <div v-if="scope.row.operate=='2'">已驳回</div>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-pagination
        align="center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1,3,5,10]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: "",
      tableData: [],
      multipleSelection: [],
      total: 0,
      pageSize: 3,
      currentPage: 1
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

    //查找
    search() {
      if (this.info == "") {
        this.$message({
          message: "请输入查询条件",
          type: "warning"
        });
      } else {
        this.$axios({
          url: "api/findCinema",
          params: {
            wd: this.info
          }
        })
          .then(res => {
            let data = res.data.data;

            this.tableData = data;
          })
          .catch(err => {
            console.log(err, "err");
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
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    },
    //同意申请
    agree(oId) {
      this.$axios({
        url:'api/operApply',
        params:{
          type:'1',
          oId
        }
      })
      .then(res=>{
        alert(res.data.info)
        this.reload()
      })
      .catch(err=>{
        console.log(err,'同意操作出错')
      })
    },
    //驳回申请
    sayNo(oId) {
      this.$axios({
              url:'api/operApply',
              params:{
                type:'2',
                oId
              }
            })
            .then(res=>{
              alert(res.data.info)
              this.reload()
            })
            .catch(err=>{
              console.log(err,'驳回操作出错')
            })
    }
  },
  //渲染表格
  mounted() {
    this.$axios({
      url: "api/findApply"
    })
      .then(res => {
        let data = res.data.data;
        this.tableData = data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
.el-table_1_column_2 {
  text-align: center;
}
.listTop {
  margin-top: 10px;
}
.el-table td {
  padding: 10px 0;
}
.el-table_1_column_2 .cell {
  text-align: center;
}
.listTop {
  margin-bottom: 20px;
}
.userName {
  width: 300px;
  line-height: 40px;
}
.date {
  line-height: 40px;
}
th {
  text-align: center;
}
.el-table_1_column_3 {
  text-align: center;
}
</style>
