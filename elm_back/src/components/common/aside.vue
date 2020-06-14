<template>
  <div class="aside_wrap">
    <el-container>
      <el-aside width="200px" height="100%">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-video-camera-solid"></i>
                <span>电影管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click="$router.push('/filmlist')">
                  <i class="el-icon-coordinate"></i>
                  电影列表
                  </el-menu-item>
                <el-menu-item index="1-2" @click="$router.push('/filmadd')"> <i class="el-icon-coordinate"></i>添加电影</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span>影院管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1" @click="$router.push('/cinemaList')"><i class="el-icon-apple"></i> 影院列表</el-menu-item>
                <el-menu-item index="2-2" @click="$router.push('/cinemAdd')"><i class="el-icon-apple"></i>添加影院</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-s-custom"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1" @click="$router.push('/userlist')">
                  <i class="el-icon-lollipop"></i>用户列表
                </el-menu-item>
                <!-- <el-menu-item index="3-2" @click="$router.push('/useredit')">
                  <i class="el-icon-lollipop"></i>信息修改
                </el-menu-item> -->
                <!-- <el-menu-item index="3-3" @click="$router.push('/useradd')">
                  <i class="el-icon-lollipop"></i>信息添加
                </el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-unlock"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1" @click="$router.push('/manlist')">
                  <i class="el-icon-key"></i>管理员列表
                </el-menu-item>
                <el-menu-item index="4-2" @click="$router.push('/addman')">
                  <i class="el-icon-key"></i>添加管理员
                </el-menu-item>
                <!-- <el-menu-item index="4-3" @click="$router.push('/manedit')">
                  <i class="el-icon-key"></i>信息修改
                </el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
             <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-s-ticket"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1" @click="$router.push('/orderList')">
                  <i class="el-icon-tickets"></i>订单列表
                </el-menu-item>
                <el-menu-item index="5-2" @click="$router.push('/tuiApply')">
                  <i class="el-icon-tickets"></i>退票申请
                </el-menu-item>
                <!-- <el-menu-item index="4-3" @click="$router.push('/manedit')">
                  <i class="el-icon-key"></i>信息修改
                </el-menu-item> -->
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item index="6">
              <i class="el-icon-message"></i>
              <span slot="title">通知</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-aside>
    </el-container>
  </div>
</template>
<script>
export default {
  data(){
    return{
      type:''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      
    },
    handleClose(key, keyPath) {
      
    },
    
  },
  mounted(){
    // console.log(sessionStorage.getItem('type'))
    this.type = sessionStorage.getItem('type')
    // console.log(this.$store.state.token)
  }
};
</script>
<style lang="stylus" scoped>
.el-menu
  min-height 570px
</style>