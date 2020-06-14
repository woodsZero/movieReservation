<template>
	<section id="cm-detail">
		<header class="cm-d-header">
			<div>
				<p class="tddd fb f16">{{ cinemaData.cinemaName }}</p>
				<p class="tddd f13 c6">{{ cinemaData.address }}</p>
			</div>
		</header>
		<!-- <section class="cm-welfare cm-d-welfare">
			<span class="label-mod label-orange">新人专享</span>
			<span class="label-mod">新人特惠，名额有限抢完即止</span>
		</section> -->
		<section class="film-info">
			<film-con :lists="filmLists"></film-con>
			<div class="sel-film">
				<p class="fb">{{ $store.state.selFilm.showName }}</p>
				<div class="full-sta pr cm-star">
					<div class="score-star" :style="{width:`${$store.state.selFilm.remark*10}%`}"></div>
					<span class="score pa">{{ $store.state.selFilm.remark }}</span>
				</div>
			</div>
			<!-- <div class="sel-date pr">
				<ul @click="selectDateTab">
					<li :data-num="item.num" v-for="(item,index) in palyDate" :key="index">
						<span :data-num="item.num">{{ item.date}}</span>
						<span :data-num="item.num" class="font-icon">惠</span>
					</li>
				</ul>
				<span class="move pa" :style="{left: `${105*selDateNum}px`}"></span>
			</div> -->
			<div class="tips">温馨提示:开场前15分钟关闭在线售票</div>
		</section>
		<playDate></playDate>
        <back></back>
	</section>
</template>

<script>
// import { mapMutations } from 'vuex'
import filmCon from './views/filmCon'
import playDate from './views/playDate'
import Back from './views/back'
export default{
	data () {
		return {
			filmLists: [],
			itemId: 0,
			selDateNum: 0,
			cinemaData: {},
			selFilm: {},
			palyDate: [
				{date: '今天 12-15', num: 0},
				{date: '明天 12-16', num: 1},
				{date: '后天 12-17', num: 2},
				{date: '周五 12-18', num: 3}
			]
		}
	},
	components: {
		filmCon,
        playDate,
        Back
	},
	watch: {
		// itemId () {
		// 	let id = this.$store.state.mId
		// 	// console.log(111)
		// 	this.selFilm = this.getDataById(this.filmLists,id)
		// }
	},
	methods: {
	// 	...mapMutations([
	// 	  'pushLoadStack',
	// 	  'completeLoad',
	// 	  'showCityList',
	// 	  'updateAreaData'
	// 	]),
		// requestData (url, fn) {
		// //   this.pushLoadStack()
		//   this.$http.get(url).then(fn).then(this.completeLoad)
		// },
		// http://localhost:9090/movie/cinema_detail
		
		selectDateTab (event) {
			let num = +event.target.getAttribute('data-num')
			this.selDateNum = num
		}
	},
	created () {
		let cId = this.$route.params.cId
		this.$axios({
			url:'/api/cinemaDetail',
			params:{
				cId
			}
			})
		.then(res=>{
			let data = res.data.data[0]
			// console.log(data,'data')
			this.filmLists = data.shows
			this.cinemaData = data
			// this.$store.state.selFilm = this.filmLists[0]
			let mId = this.filmLists[0].mId
			let selFilm = this.filmLists[0]
			this.$store.dispatch('changgeMid',{mId,selFilm})
			// console.log(this.$store.state.selFilm,'选找那个电影')
		})
		.catch(err=>{
			console.log(err,'我是影院详情页错误')
		})
	}
}
</script>

<style>
.full-sta {
  margin-top: 7px;
  width: 50px;
  height: 10px;
  background-size: auto 100%;
  background-image: url('../assets/images/nostart.svg');
}
.score-star {
	width: 100%;
	height: 100%;
	background-size: auto 100%;
	background-image: url('../assets/images/star.svg');
}
#cm-detail {
	background: #fff;
	height: 100%;
}
.cm-d-header {
	padding: 13px 0 0 15px;
	box-sizing: border-box;
}
.cm-d-header>div {
	padding: 0 15px 13px 0;
	border-bottom: 1px solid #ebebeb;
}
.cm-d-header p:last-child {
	margin-top: 6px;
	color: #666;
}
.cm-d-welfare {
	padding: 0 15px 15px;
	margin-top: 15px;
}
.cm-d-welfare::after {
	content: '>';
	float: right;
	font-size: 16px;
	color: #999;
	font-weight: 100;
	transform: scaleY(1.3);
	line-height: 15px;
}
.film-info {
	background-color: #4685a4;
}
.sel-film {
	text-align: center;
	background-color: #fff;
	padding: 5px 0;
	border-bottom: 1px solid #ebebeb;
}
.sel-film p {
	font-size: 16px;
}
.cm-star {
	display: inline-block;
	margin: 3px 0 0 -29px;
	height: 15px;
	width: 73px;
}
.cm-star .score {
	right: -24px;
	font-size: 13px;
	top: 1px;
}
.sel-date {
	width: 100%;
	overflow: hidden;
	overflow-x: scroll;
}
.sel-date ul {
	width: 480px;
}
.sel-date li {
	float: left;
	width: 100px;
	height: 40px;
	line-height: 40px;
	background-color: #fff;
	font-size: 13px;
	color: #555;
	padding-left: 5px;
}
.font-icon {
	color: #fff;
	height: 20px;
	border-radius: 3px;
	background-color: #ff9201;
	margin-left: 5px;
}
.sel-date .move {
	width: 105px;
	transition: left .3s ease-in-out;
}
.tips {
	padding: 5px 15px;
	font-size: 12px;
	color: #ffa101;
    text-align: left;
    background-color: #fbf9e4;
    border-top: 1px solid #fbeccd;
    border-bottom: 1px solid #fbeccd;
}
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar {
	height: 0;
	background-color: transparent;
}
</style>

