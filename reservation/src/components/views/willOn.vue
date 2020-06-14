<template>
  <section id='coming'>
    <section v-for="(comingItem,index) in comingLists" :key="index">
      <p class="open-date">{{ comingItem.openTime }} {{ comingItem.openTime | toDay(comingItem.openTime)}}</p>
      <ul class="coming">
        <li :class="{'border-bottom': comingItem.movies[comingItem.movies.length-1] != item}" v-for="item in comingItem.movies" :key="item.id">
          <figure class="m-img ml fl pr">
            <img v-lazy="item.poster">
            <div class="play-icon pa" @click="$store.dispatch('a')">
                <img src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png">
            </div>
          </figure>
          <div class="mr">
            <div class="m-buy fr">
                <button class="forward-buy-btn f12">预售</button>
            </div>
            <div class="m-info">
              <router-link :to="{ name: 'detail', params: { id: item.mId }}">
                <div class="m-name">
                  <h2 class="f16 tddd vm fl">{{ item.showName }}</h2>
                  <div class="vm type-3dimax" v-if="item.showMark == 'IMAX3D'"></div>
                  <div class="vm type-imax" v-if="item.showMark == 'IMAX'"></div>
                  <div class="vm type-3d" v-if="item.showMark == '3D'"></div>
                </div>
                <p class="want">{{ item.wantCount }}人想看</p>
                <p>导演：{{ item.director }}</p>
                <p>主演：{{ item.leadingRole }}</p>
                <p>类型：{{item.type}}</p>
              </router-link>
            </div>
          </div>
        </li>       
      </ul>      
    </section>
     <!-- 播放预告视频-->
       <play-video v-if="$store.state.showMask"></play-video>
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';
import playVideo from './playVideo'
export default{
  data(){
    return{
        comingLists:[],
      
    }
  },
  methods: {
  },
  created(){
    this.$axios('/api/willOn')
      .then(res=>{
        let arr = res.data.data
        // 把相同日期上映的电影筛选出来
        let map = {},dest=[];
        for( let i=0;i<arr.length;i++){
          let ai = arr[i];
          if(!map[ai.openTime]){
            dest.push({
              openTime:ai.openTime,
              movies:[ai]
            });
            map[ai.openTime]=ai
          }else{
            for(let j=0;j<dest.length;j++){
              let dj = dest[j];
              if(dj.openTime==ai.openTime){
                dj.movies.push(ai);
                break
              }
            }
          }
        }
        // 对筛选出来的数据进行降序排序
        dest.sort((a,b)=>{
          return Date.parse(a.openTime)-Date.parse(b.openTime)
        })
        this.comingLists=dest
        // console.log(dest,'dest转化后')
      })
      .catch(err=>{
        console.log(err,'我是即将上映的电影页面错误')
      })
  },
  components:{
    playVideo
  }
}
</script>

<style scoped>
.m-info .want{
	color: #fea54c;
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
.coming {
  padding-left: 15px;
  background-color: #fff;
}
.m-info p{
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
	background-image: url('../../assets/images/3d.svg');
}
.type-imax {
	margin-top: 5px;
	width: 27px;
  height: 15px;
	background-image: url('../../assets/images/imax.svg');
}
.type-3dimax {
	margin-top: 5px;
	width: 45px;
	height: 17px;
	background-image: url('../../assets/images/3dimax.svg');
}
.type-3d,
.type-imax,
.type-3dimax {
	margin-left: 5px;
	background-size: 100%;
	background-repeat: no-repeat;
	float: left;
}
.m-img {
	width: 65px;
	height: 92px;
	padding-top: 4px;
	/* float: left; */
}
.m-img img {
	opacity: 0.7;
	transition: opacity .7s ease-in;
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
.forward-buy-btn  {
	border: 1px solid #37b7ff;
	color: #37b7ff;
}

#coming {
  box-sizing: border-box;
  margin-bottom: 10px;
}
#coming li {
  padding-top: 15px;
}
#coming .mr {
  padding-bottom: 16px;
}

.open-date {
  color: #50505a;
  font-size: 13px;
  height: 32px;
  line-height: 32px;
  padding-left: 15px;
  background-color: #f5f5f5;
}
</style>
