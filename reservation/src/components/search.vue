<template>
  <div id="search">
    <van-search v-model="value" show-action placeholder="输入电影名/演员名/导演名" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <ul>
      <li
        v-for="(item,index) in resLists"
        :key="index"
        :class="{'border-bottom': resLists[resLists.length-1] != item}"
      >
        <div class="m-img ml fl pr">
          <img v-lazy="item.poster" />
          <div class="play-icon pa" @click="$store.dispatch('a')">
            <img src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png" alt />
          </div>
        </div>
        <div class="mr border-bottom">
          <div class="m-buy fr">
            <button class="buy-btn f12" v-if="item.activeType">购买</button>
            <button class="forward-buy-btn f12" v-else>预售</button>
          </div>
          <router-link :to="{ name: 'detail', params: { id: item.mId }}">
            <!-- 如果用path路由导航会接收不到params值 -->
            <div class="m-info">
              <div class="m-name">
                <h2 class="f16 tddd vm fl">{{ item.showName }}</h2>
                <div class="vm type-3dimax" v-if="item.showMark == 'IMAX3D'"></div>
                <div class="vm type-imax" v-if="item.showMark == 'IMAX'"></div>
                <div class="vm type-3d" v-if="item.showMark == '3D'"></div>
              </div>
              <div class="full-star pr" v-if="item.activeType">
                <div class="score-start" :style="{width: `${item.remark * 10}%`}"></div>
                <span class="score pa">{{ item.remark }}</span>
              </div>
              <div v-if="!item.activeType">
                <p class="want">{{item.wantCount}}人想看</p>
              </div>
              <p>导演：{{ item.director }}</p>
              <p>主演：{{item.leadingRole}}</p>
              <p>类型：{{ item.type}}</p>
              <!-- <p>上映日期：{{item.openTime}}</p> -->
            </div>
          </router-link>
        </div>
        <!-- <div class="f13 m-act">
				<span class="border-right">1212五折狂欢</span>
				<span class="tddd">1212特惠抢票，名额有限抢完即止</span>
        </div>-->
      </li>
    </ul>
    <!-- 播放预告视频-->
    <play-video v-if="$store.state.showMask"></play-video>
	<back></back>
	<div class="nodata" v-if="resLists==''">未查询到关键词~</div>
  </div>
</template>
<script>
import { Lazyload } from "mint-ui";
import PlayVideo from "./views/playVideo";
import Back from './views/back'
export default {
  data() {
    return {
      value: "",
      wd: "",
	  resLists: [],
	//   havedata:true
    };
  },
  methods: {
    request() {
      // 模糊查询关键字可为电影名或者导演名字或者演员名字进行查询
      this.$axios({
        url: "/api/findKey",
        params: {
          wd: this.wd
        }
      })
        .then(res => {
          this.resLists = res.data.data;
        })
        .catch(err => {
          console.log(err, "搜索页面的错误");
        });
    },
    onSearch() {
      this.wd = this.value;
      this.request();
    }
  },
  mounted() {
    this.wd = this.$route.query.wd;
    this.value = this.wd;
    this.request();
  },
  components: {
	PlayVideo,
	Back
  }
};
</script>
<style lang="" scoped>
.van-search--show-action{
  padding-right: 12px;
}
.van-search{
  background: #efeeee;
}
.van-search__action{
  border: 1px solid #ccc;
}
.nodata{
	text-align: center;
	margin:100px auto;
	font-size: 0.3rem;
}
.m-info .want {
  color: #fea54c;
}
#search {
  box-sizing: border-box;
  margin-bottom: 10px;
  background: #fff;
  padding-bottom: 30px;
}
#search ul {
  padding-left: 12px;
}
#search li {
  padding-top: 15px;
  /* display: flex; */
}
.m-img {
  width: 65px;
  height: 92px;
  padding-top: 4px;
  /* float: left; */
}
.m-img img {
  opacity: 0.7;
  transition: opacity 0.7s ease-in;
}
.m-img img,
.play-icon img {
  width: 100%;
  height: 100%;
}
.play-icon {
  width: 17px;
  height: 17px;
  left: 50%;
  top: 50%;
  margin-left: -8.5px;
  margin-top: -8.5px;
}
.m-act,
.mr {
  margin-left: 76px;
}
.m-act {
  margin-right: 15px;
}
.mr {
  padding: 0 15px 23px 0;
  box-sizing: border-box;
}
.m-buy {
  margin-top: 30px;
}
.buy-btn,
.forward-buy-btn {
  height: 24px;
  width: 45px;
  line-height: 20px;
  text-align: center;
  background-color: #fff;
  outline: none;
  border-radius: 3px;
  font-weight: bold;
}
.buy-btn {
  border: 1px solid #ff4d64;
  color: #ff4d64;
}
.forward-buy-btn {
  border: 1px solid #37b7ff;
  color: #37b7ff;
}
.full-star {
  margin-top: 7px;
  width: 50px;
  height: 10px;
  background-size: auto 100%;
  background-image: url("../assets/images/nostart.svg");
}
.score-start {
  width: 100%;
  height: 100%;
  background-size: auto 100%;
  background-image: url("../assets/images/star.svg");
}
.score {
  right: -21px;
  top: -1px;
  font-size: 10px;
  color: #9c9c9c;
}
.m-info {
  margin-right: 50px;
}
.m-info h2 {
  margin-top: 3px;
  max-width: 68%;
  display: inline-block;
}
.m-info span {
  display: inline-block;
}
/* .m-info p:nth-of-type(1) {
	margin-top: 12px;
} */
/* .m-info p:nth-of-type(2) {
	margin-top: 6px;
} */
.m-info p {
  margin-top: 6px;
}
.m-info p {
  font-size: 13px;
  color: #9c9c9c;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.m-act {
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  margin-top: 8px;
  padding-bottom: 8px;
}
.m-act span:first-child {
  color: #fea54c;
}
.m-act span:last-child {
  color: #9c9c9c;
  text-indent: 8px;
}
.m-act span {
  box-sizing: border-box;
  width: 50%;
  display: inline-block;
}
.m-name {
  height: 20px;
  color: #333;
}
.type-3d {
  margin-top: 5px;
  width: 17px;
  height: 17px;
  background-image: url("../assets/images/3d.svg");
}
.type-imax {
  margin-top: 5px;
  width: 27px;
  height: 15px;
  background-image: url("../assets/images/imax.svg");
}
.type-3dimax {
  margin-top: 5px;
  width: 45px;
  height: 17px;
  background-image: url("../assets/images/3dimax.svg");
}
.type-3d,
.type-imax,
.type-3dimax {
  margin-left: 5px;
  background-size: 100%;
  background-repeat: no-repeat;
  float: left;
}
</style>