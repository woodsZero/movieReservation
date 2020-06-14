<template>
  <div id="film">
    <!-- 电影页面顶部 -->
    <div class="f-top">
      <div class="area" @click="$router.push('/city')">
        <span class="s-area">{{$store.state.userCity}}</span>
        <img src="../../assets/images/weibiaoti35.png" alt />
      </div>
      <span :class="[flag?'active':'fTop']" @click="flag=true">正在上映</span>
      <span :class="[!flag?'active':'fTop']" @click="flag=false">即将上映</span>
    </div>
    <!-- 正在热映电影 -->
    <my-swiper :swiperImg="swiperImg" v-if="flag"></my-swiper>
    <van-search v-model="value" show-action placeholder="输入电影名/演员名/导演名" @search="onSearch">
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <hot v-if="flag"></hot>

    <will v-if="!flag"></will>
    <!-- {{location}} -->
    <!-- {{$store.state.district}} -->
  </div>
</template>
<script>
import mySwiper from "../views/swiper";
import Hot from "../views/hot";
import Will from "../views/willOn";

export default {
  name: "film",
  data() {
    return {
      value: "",
      flag: true,
      showcity: false,
      ishot: true,
      swiperImg: [
        "https://gw.alicdn.com/tfs/tps/TB1qex6OFXXXXcbXXXXXXXXXXXX-1280-520.jpg",
        "https://gw.alicdn.com/tfs/tps/TB1pre1OFXXXXaGXXXXXXXXXXXX-1280-520.jpg",
        "https://gw.alicdn.com/tfs/tfs/TB1.Zy6OFXXXXbhXpXXXXXXXXXX-1280-520.jpg",
        "https://gw.alicdn.com/tfs/tps/TB1YTkBOpXXXXbLaXXXXXXXXXXX-1280-520.jpg"
      ],
      location: null
    };
  },
  methods: {
    onSearch() {
      this.$router.push({ path: "/search", query: { wd: this.value } });
      // console.log(this.value, "value");
    },
  //  getLocation() {
  //       const self = this
  //       AMap.plugin('AMap.Geolocation', function () {
  //           var geolocation = new AMap.Geolocation({
  //               // 是否使用高精度定位，默认：true
  //               enableHighAccuracy: true,
  //               // 设置定位超时时间，默认：无穷大
  //               timeout: 10000,
  //           })

  //           geolocation.getCurrentPosition()
  //           AMap.event.addListener(geolocation, 'complete', onComplete);
  //           AMap.event.addListener(geolocation, 'error', onError);

  //           function onComplete(data) {
  //               // data是具体的定位信息
  //               console.log('定位成功信息：', data);
  //           }

  //           function onError(data) {
  //               // 定位出错
  //               console.log('定位失败错误：', data);
  //               // 调用ip定位
  //               self.getLngLatLocation();
  //           }
  //       })
  //   },

  },
  mounted() {
     
  },
  components: {
    mySwiper,
    Hot,
    Will
  }
};
</script>
<style>
.van-search--show-action {
  padding-right: 12px;
}
.van-search {
  background: #efeeee;
}
.van-search__action {
  border: 1px solid #ccc;
}
#film {
  padding-bottom: 1.1rem;
}
.area img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}
.s-area {
  display: inline-block;
  font-size: 14px;
  line-height: 0.6rem;
}
.active {
  flex: 1;
  text-align: center;
  font-size: 14px;
  line-height: 0.6rem;
  border-bottom: 2px solid #ff4d64;
  color: #ff4d64;
}
.fTop {
  flex: 1;
  text-align: center;
  font-size: 14px;
  line-height: 0.6rem;
  padding-bottom: 4px;
}
.area {
  flex: 1;
  text-align: center;
}
.f-top {
  display: flex;
  padding-top: 3px;
}
</style>