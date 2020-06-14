<template>
  <div class="mine">
    <!-- 顶部登录 -->
      <div class="top">
        <a href="javascript:;" class="set" @click="logout">
          <img src="../../assets/images/set.png" alt />
        </a>
        <h3>个人中心</h3>
        <a href="javascript:;" class="news">
          <span></span>
          <img src="../../assets/images/news.png" alt />
        </a>
        <div class="circle">
          <div class="user-img">
            <!-- https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2244063246,4023985987&fm=26&gp=0.jpg -->
            <img :src="`${avatarUrl?avtarUrl:require('../../assets/images/photo.jpg')}`" alt="头像"/>
            <!-- <img src="../../assets/images/photo.jpg" alt /> -->
          </div>
        </div>
        <p class="nickname">
              <span class="tolog" @click="$router.push('/login')" v-if="!showNick">点击登录</span>
              <span class="tolog" v-if="showNick">{{nickName}}</span>
           </p>
        <div>
        </div>   
      </div>
    <section class="me">
      <mt-cell
		  title="我的收藏"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
    <!-- <div class="box"></div> -->
    <div @click="$router.push('/mybuy')">
    <mt-cell
		  title="我的电影票"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
    </div>
		
    <!-- <div class="box"></div> -->
		<mt-cell
		  title="帮助中心"
		  to="/no"
		  is-link
		  value="">
		</mt-cell>
	</section>
    <!-- 小缝隙盒子 -->
    
    
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  data() {
    return {
      showNick: false,
      nickName: "",
      avatarUrl: ""
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("mineArr");
      this.reload();
    }
  },
  mounted() {
    let arr = JSON.parse(localStorage.getItem("mineArr"));
    if (arr) {
      this.showNick = true;
      this.nickName = arr[0].nickName;
      this.avatarUrl = arr[0].avatarUrl;
    } else {
      this.showNick = false;
    }
  }
};
</script>
<style scoped>
.me .mt-cell{
  margin-bottom: 0.25rem;
}
.nickname{
  width: 3.6rem;
  height: 1.78rem;
  line-height: 1.78rem;
  color: #efeeee;
  position: absolute;
  left: 2.6rem;
  bottom: 0.3rem;
  text-align: left;
}
.mine {

  background-color:#efeeee;
}
.top {
  background: #fe0041;
  text-align: center;
  height: 3.6rem;
  padding-top: 0.42rem;
  position: relative;
  display: flex;
  margin-bottom: 0.25rem;
}
.top a {
  flex: 1;
}
.top a:nth-of-type(1) {
  text-align: left;
  padding-left: 0.28rem;
}
.top a:nth-of-type(2) {
  text-align: right;
  padding-right: 0.28rem;
}

.top .news img {
  width: 0.53rem;
  height: 0.47rem;
}
.top .set img {
  width: 0.5rem;
  height: 0.5rem;
}
.top h3 {
  display: inline-block;
  font-size: 0.42rem;
  color: #fff;
}
.top .circle {
  position: absolute;
  left: 0.3rem;
  bottom: 0.3rem;
  text-align: center;
}
.top .circle .user-img {
  width: 1.78rem;
  height: 1.78rem;
  border: 3px solid #fff;
  border-radius: 50%;
}
.top .circle .user-img img {
  width: 1.78rem;
  height: 1.78rem;
  border-radius: 50%;
}
.nickname .tolog {
  width: 100%;
  display: inline-block;
  font-size: 0.33rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 空白盒子小缝隙 */
.box {
  height: 0.15rem;
  background-color: #efeeee;
}
/* 我的订单 */
.my-order {
  background: #fafafa;
}
.my-order .ordertop {
  height: 1.25rem;
  border-bottom: 1px solid #b3b3b3;
  padding-left: 0.46rem;
  padding-right: 1.26rem;
}
.my-order .ordertop h2 {
  float: left;
  font-size: 0.33rem;
  line-height: 1.25rem;
}
.my-order .ordertop h3 {
  float: right;
  font-size: 0.33rem;
  color: #999;
  line-height: 1.25rem;
}

/*收货地址管理*/
.address {
  height: 1.28rem;
  font-size: 0.33rem;
  color: #999;
  padding-left: 0.44rem;
  line-height: 1.28rem;
  background: #fafafa;
}
</style>