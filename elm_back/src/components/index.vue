<template>
  <div class="main">
    <v-header></v-header>
    <el-container>
      <v-aside></v-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import vHeader from "./common/header";
import vAside from "./common/aside";
export default {
  components: {
    vHeader,
    vAside
  }
};
</script>
<style lang="stylus" scoped>
.main
  .el-main
    background-color #E9EEF3
    color #333
</style>