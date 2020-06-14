<template>
  <section id='hot' class="search-hot">
  	<ul class="hotFilm">
  		<li  v-for="(item,index) in hotLists" :key="index" :class="{'border-bottom': hotLists[hotLists.length-1] != item}">
  			<div class="m-img ml fl pr" >
  				<img v-lazy="item.poster">
  				<div class="play-icon pa" @click="$store.dispatch('a')">
  					<img src="https://gw.alicdn.com/tps/TB1PH2uLXXXXXaLaXXXXXXXXXXX-60-60.png" alt="">
  				</div>
			
  			</div>
			<div class="mr border-bottom">
				<div class="m-buy fr">
					<button class="buy-btn f12" @click="$router.push({path:'/cinema'})">购买</button>
					<!-- <button class="forward-buy-btn f12" v-else>预售</button> -->
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
						<div class="full-star pr">
							<div class="score-start" :style="{width: `${item.remark * 10}%`}"></div>
							<span class="score pa">{{ item.remark }}</span>
						</div>
						<p>导演：{{ item.director }}</p>
						<p>主演：{{ item.leadingRole }}</p>
						<p>类型：{{item.type}}</p>
					</div>
				</router-link>		
			</div>
			<!-- <div class="f13 m-act">
				<span class="border-right">1212五折狂欢</span>
				<span class="tddd">1212特惠抢票，名额有限抢完即止</span>
			</div> -->
  		</li> 		
  	</ul>
	  	<!-- 播放预告视频-->
            <play-video v-if="$store.state.showMask"></play-video>
  </section>
</template>

<script>
import { Lazyload } from 'mint-ui';
import PlayVideo from './playVideo'
export default{
  name: 'hot',
  data () {
	  return{
		  hotLists:[]
	  }
  },
  mounted(){
	  this.$axios('/api/hot')
	  .then((res)=>{
		  this.hotLists = res.data.data
		//   let arr=res.data.data
		//   for(let i=0;i<arr.length;i++){
		// 	  if(arr[i].activeType){
		// 		  this.hotLists.push(arr[i])
		// 	  }
		//   }
		//console.log(res,'hot')
	  })
	  .catch((err)=>{
		  console.log(err,'我是hot页面的错误')
	  })
  },
  props: {
  	
  },
  methods: {
  
  },
  components:{
	  PlayVideo
}
}
</script>

<style scoped>
.m-info .wantCount{
	color: #fea54c;
}
#hot {
	box-sizing: border-box;
	margin-bottom: 10px;
	background: #fff;
}
#hot ul{
	padding-left: 12px;
}
#hot li {
	padding-top: 15px;
	/* display: flex; */
}
.m-img {
	width: 65px;
	height: 92px;
	padding-top: 2px;
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
.full-star {
  margin-top: 7px;
  width: 50px;
  height: 10px;
  background-size: auto 100%;
  background-image: url('../../assets/images/nostart.svg');
}
.score-start {
	width: 100%;
	height: 100%;
	background-size: auto 100%;
	background-image: url('../../assets/images/star.svg');
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
</style>
