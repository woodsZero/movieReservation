<template>
  <section id="movie-detail">
    <header class="mbg pr">
      <figure class="d-cover">
        <img
          :src="detailObj.poster ? `${detailObj.poster}` : 'https://gw.alicdn.com/tps/i1/TB147JCLFXXXXc1XVXXxGsw1VXX-112-168.png'"
          alt
        />
      </figure>
      <article class="d-info">
        <p class="d-name tddd">{{ detailObj.showName }}</p>
        <p class="tddd">{{ detailObj.showNameEn }}</p>
        <p>{{ detailObj.type }}</p>
        <p>{{ detailObj.country }}｜{{ detailObj.duration }}分钟</p>
        <p>{{ detailObj.openTime }}在中国上映</p>
        <div class="full-star pr" v-if="detailObj.remark">
          <div class="score-start" :style="{width: `${detailObj.remark * 10}%`}"></div>
          <span class="score pa">{{ detailObj.remark }}分</span>
        </div>
      </article>
    </header>
    <section v-if="detailObj">
      <section class="intro-block border-1px-bottom">
        <article class="d-intro">
          <p ref="dint" :class="{'hide-something': hideSomething}">{{ detailObj.description }}</p>
          <p class="d-control" @click="controlShowMany">
            <span v-if="hideSomething">展开</span>
            <span v-else>收起</span>
          </p>
        </article>
      </section>
      <section class="ab-photo pr border-1px-bottom">
        <header class="ab-header pa">
          <span class="fb">演职人员</span>
        </header>
        <div class="swiper-container">
          <div class="swiper-wrapper" v-if="detailObj">
            <div class="swiper-slide" v-for="(item,ind) in detailObj.actor" :key="ind">
              <div class="am-img pr">
                <img :src="item.actorImg" alt />
                <div class="am-title pa">
                  <p class="tddd">{{ item.artisteName }}</p>
                  <p>{{ item.profession }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="ab-photo crew-ab-photo pr border-1px-bottom">
        <header class="ab-header pa">
          <span class="fb">剧照</span>
        </header>
        <div class="swiper-container crew-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,inde) in detailObj.filmPhoto" :key="inde">
              <div class="am-img crew-img">
                <img :src="item" alt />
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- 热门评价 -->
      <section id="hot-evaluation">
        <header class="h-e-header">
          <span>热门评价</span>
          <span>(105707条)</span>
        </header>
        <ul>
          <li class="border-1px-bottom evl-item" v-for="(item,index) in lists" :key="index">
            <figure class="he-u-icon fl">
              <img
                src="https://gw.alicdn.com/tps/i3/TB1yeWeIFXXXXX5XFXXuAZJYXXX-210-210.png_100x100.jpg"
                alt
              />
            </figure>
            <section class="he-u-content">
              <div>
                <div class="ib">
                  <span class="he-u-name">{{ item.nickName }}</span>
                  <div class="full-star pr">
                    <div class="score-start" :style="{width: `${item.remark * 10}%`}"></div>
                  </div>
                </div>
                <span class="fr he-u-time">12-05 16:07</span>
              </div>
              <article class="he-u-say">{{ item.content }}</article>
            </section>
          </li>
        </ul>
        <p class="no-more">没有更多了～</p>
        <div style="height: 60px"></div>
      </section>
    </section>
    <section v-else class="no-data">
      <span>暂时没有更多数据～</span>
    </section>
   <back></back>
  </section>
</template>

<script>
import Back from './views/back'
import Swiper from "../../node_modules/swiper/js/swiper";

export default {
  data() {
    return {
      hideSomething: true,
      detailObj: {
      },
      evalLists: [

      ],
      lists:[
          {
              nickName:'cinderellaice',
              remark:8,
              content:'从开头的片头曲就很好听，画面很美，故事很动人。在这个浮躁的社会，还有多少人还记得初心，还能记得当初的坚持呢。可以二刷的好动画。不得不说，日本的动漫在细节的处理上是很用心的，直击人心，有笑点也有泪点，对真实场景的还原度也很高！32个赞👍🏻。'
          },
          {
              nickName:'cinderellaice',
              remark:8,
              content:'从开头的片头曲就很好听，画面很美，故事很动人。在这个浮躁的社会，还有多少人还记得初心，还能记得当初的坚持呢。可以二刷的好动画。不得不说，日本的动漫在细节的处理上是很用心的，直击人心，有笑点也有泪点，对真实场景的还原度也很高！32个赞👍🏻。'
          },
          {
              nickName:'cinderellaice',
              remark:8,
              content:'从开头的片头曲就很好听，画面很美，故事很动人。在这个浮躁的社会，还有多少人还记得初心，还能记得当初的坚持呢。可以二刷的好动画。不得不说，日本的动漫在细节的处理上是很用心的，直击人心，有笑点也有泪点，对真实场景的还原度也很高！32个赞👍🏻。'
          },
          {
              nickName:'cinderellaice',
              remark:8,
              content:'从开头的片头曲就很好听，画面很美，故事很动人。在这个浮躁的社会，还有多少人还记得初心，还能记得当初的坚持呢。可以二刷的好动画。不得不说，日本的动漫在细节的处理上是很用心的，直击人心，有笑点也有泪点，对真实场景的还原度也很高！32个赞👍🏻。'
          },
      ]
    };
  },

  methods: {
    controlShowMany() {
      this.hideSomething = !this.hideSomething;
    },
    initSwiper() {
      this.$nextTick(() => {
        var swiper = new Swiper(".swiper-container", {
          pagination: ".swiper-pagination",
          slidesPerView: "auto",
          centeredSlides: false,
          spaceBetween: 5
        });
      });
    },
    request(){
    let mId=this.$route.params.id
        this.$axios({
          url:'/api/fDetail',
          params:{
            mId
          }
        })
        .then(res=>{
          this.detailObj=res.data.data[0]
           this.initSwiper()
          // console.log(res,'detail中res')
        })
        .catch(er=>{
          console.log(err,'电影详情页错误')
        })
    }
  },
  // keep-alive下要用actived
  mounted(){
    this.request()
  },
  components:{
    Back
  }
};
</script>

<style>
.full-star {
  margin-top: 7px;
  width: 50px;
  height: 10px;
  background-size: auto 100%;
  background-image: url('../assets/images/nostart.svg');
}
.score-start {
	width: 100%;
	height: 100%;
	background-size: auto 100%;
	background-image: url('../assets/images/star.svg');
}

#hot-evaluation {
  background-color: #fff;
  padding-left: 15px;
  box-sizing: border-box;
}
.h-e-header {
  padding: 12px 0;
}
.h-e-header span:first-child {
  color: #000;
  font-size: 16px;
  font-weight: bold;
}
.h-e-header span:last-child {
  color: #666;
}
.evl-item {
  padding-top: 10px;
}
.he-u-icon {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  overflow: hidden;
}
.he-u-icon img {
  width: 100%;
  height: 100%;
}
.he-u-content {
  margin-left: 30px;
  padding-right: 10px;
  box-sizing: border-box;
}
#hot-evaluation .full-star,
.he-u-name {
  display: inline-block;
  vertical-align: middle;
}
#hot-evaluation .full-star {
  margin-top: -1px;
}
.he-u-name {
  max-width: 60px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  color: #000;
  font-weight: bold;
}
.he-u-time {
  color: #666;
  font-size: 10px;
  margin-top: 4px;
}
.he-u-say {
  font-size: 12px;
  line-height: 20px;
  padding: 5px 0 15px;
}
.no-more {
  text-align: center;
  padding: 15px 0 10px;
  font-size: 14px;
  color: #666;
}

.border-1px-bottom {
	border-bottom: 1px solid #d9d9d9;
}
.mbg {
	height: 10rem;
	height: 50vmin;
	background: url('../assets/images/mbg.png') no-repeat;
	background-size: 100% auto;
	padding-left: 15px;
	overflow: hidden;
	box-sizing: border-box;
}
.d-cover {
	position: absolute;
	bottom: 0;
	z-index: 1;
	background: #ccc;
	width: 33.10vmin;
	min-width: 6.25rem;
	min-width: 31.3vmin;
	height: 46.3vmin;
}
.d-cover img {
	width: 100%;
	height: 100%;
}
.d-info {
	display: inline-block;
	margin: 3.8vmin 0 0 37.5vmin;
	color: #fff;
	width: 55%;
}
.d-info p {
	opacity: .8;
	font-size: .26rem;
	line-height: .875rem;
	line-height: 4.4vmin;
	margin-bottom: .375rem;
	margin-bottom: 1.9vmin;
	width: auto;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.d-info p.d-name {
	position: relative;
	font-size: 0.34rem;
	line-height: 1.2rem;
	line-height: 7.5vmin;
	max-height: 3rem;
	max-height: 15vmin;
	overflow-y: hidden;
	margin-bottom: .375rem;
	margin-bottom: 1.9vmin;
	color: #fff;
	opacity: 1;
}
.mbg .full-star {
	margin-top: 6vmin;
}
.mbg .score {
	right: -32px;
	top: 1px;
	color: #fff;
	font-size: 12px;
}
.mbg .full-star {
	width: 70px;
	height: 14px;
}
/* .intro-block {
} */
.d-intro {
	padding: 20px 15px;
	box-sizing: border-box;
	background-color: #fff;
}
.d-intro p {
	word-break: break-word;
	margin-bottom: .75rem;
	margin-bottom: 3.8vmin;
	font-size: .26rem;
	line-height: 1.5rem;
	line-height: 7.5vmin;
	color: #333;
	overflow: hidden;
}
.d-intro p.d-control {
	text-align: center;
	font-size: .34rem;
  border: 1px solid #ccc;
  background: #ccc;
  color: #fff;
}
.ab-photo {
	padding: 15px 15px 25px;
	box-sizing: border-box;
	background-color: #fff;
}
.crew-ab-photo {
	padding: 15px 15px 0px;
}
.ab-header {
	z-index: 1000;
}
.ab-header span {
	font-size: .32rem;
	line-height: 2rem;
	line-height: 10vmin;
	color: #000;
}
.hide-something {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.am-img {
	height: 124px;
}
.crew-img {
	height: 100px;
}
.am-img img{
	height: 100%;
  width: auto;
}
.am-title {
	width: 100%;
}
.am-title p {
	text-align: center;
}
.am-title p:first-child {
	color: #333;
  font-size: 13px;
  line-height: 18px;
}
.am-title p:last-child {
	color: #999;
  font-size: 11px;
  line-height: 14px;
}
#movie-detail .swiper-container {
	height: 202px;
  width: 100%;
  overflow: initial;
  overflow-x: hidden;
}
#movie-detail .crew-swiper-container {
	margin-top: 7px;
	height: 165px;
}
#movie-detail .swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  width: auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
#movie-detail .swiper-slide:nth-child(2n),
#movie-detail .swiper-slide:nth-child(3n) {
    width: auto;
}
.no-data {
	padding: 60px;
	font-size: 16px;
	color: #666;
	text-align: center;
}
</style>

