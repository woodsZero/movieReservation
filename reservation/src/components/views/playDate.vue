<template>
	<section class="play-date">
		<section v-for="(item,index) in $store.state.schedules" :key="index">
			<div class="line" v-if="item.timeType==1">
				<span class="ll le vm"></span>
				<i class="ic md vm"></i>
				<em class="lef">上午场</em>
				<span class="lr le vm"></span>
			</div>
			<div class="line" v-if="item.timeType==2">
				<span class="ll le vm"></span>
				<i class="ic nd vm"></i>
				<em class="lef">下午场</em>
				<span class="lr le vm"></span>
			</div>
			<div class="line" v-if="item.timeType==3">
				<span class="ll le vm"></span>
				<i class="ic ad vm"></i>
				<em class="lef">晚上场</em>
				<span class="lr le vm"></span>
			</div>
			<ul class="pdate">
				<li v-for="(ite,ind) in item.movies" :key="ind">
					<div class="pd pd-l fl">
						<div>
							<em class="fb">{{ite.showTime}}</em>
							<span class="fo f1">{{ite.showVersion}}</span>
						</div>
						<div>
							<span class="fo f2">{{ite.endTime}} 散场</span>
							<span class="fo f3">{{ite.hallName}}</span>
						</div>
					</div>
					<div class="pd pd-r fr pr">
						<div class="pr-l">
							<em class="fb prf">¥{{ite.price}}</em>
							<span class="fo f4">¥38</span>
							<span class="label-mod label-orange">新人专享</span>
						</div>
						<button class="buy-btn f12 pa" @click="$router.push({name:'Hall',params:{hId:ite.hId}})">购买</button>
					</div>
				</li>
			</ul>
		</section>

		<div style="height: 60px;"></div>
	</section>
</template>

<script>
export default{
	props: {
		dataNum: {
			type: Number,
			default: 0
		}
	},
	created(){
		// let map = {},dest=[];
        // for( let i=0;i<arr.length;i++){
        //   let ai = arr[i];
        //   if(!map[ai.openTime]){
        //     dest.push({
        //       openTime:ai.openTime,
        //       movies:[ai]
        //     });
        //     map[ai.openTime]=ai
        //   }else{
        //     for(let j=0;j<dest.length;j++){
        //       let dj = dest[j];
        //       if(dj.openTime==ai.openTime){
        //         dj.movies.push(ai);
        //         break
        //       }
        //     }
        //   }
        // }
        // // 对筛选出来的数据进行降序排序
        // dest.sort((a,b)=>{
        //   return Date.parse(a.openTime)-Date.parse(b.openTime)
        // })
        // this.comingLists=dest
        // console.log(dest,'dest转化后')
	}
}
</script>

<style scoped>
.label-mod.label-orange {
	background: #ff8625;
    border-color: #ff8625;
    color: #fff;
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
.play-date {
	background-color: #fff;
	padding-bottom: 10px;
}
.line {
	text-align: center;
	margin-top: 10px;
}
.lef {
	color: #999;
	font-weight: 400;
	font-size: 10px;
	margin-right: 1.5%;
}
.le {
	display: inline-block;
	width: 35%;
	border-bottom: 2px dashed #d7d7d7;
}
.ic {
	display: inline-block;
	width: 16px;
	height: 16px;
	border-radius: 100%;
	background-size: 90%;
	background-position: center center;
	background-repeat: no-repeat;
	margin-left: 1.5%;
}
.md {
	background-image: url('../../assets/images/md.svg');
	background-color: #b8dcf6;
}
.nd {
	background-image: url('../../assets/images/nd.svg');
	background-color: #faccaa;
}
.ad {
	background-image: url('../../assets/images/ad.svg');
	background-color: #cac1f8;
}
.pd, 
.pr-l {
	display: inline-block;
	width: 45%;
}
.pd div:nth-of-type(2) {
	margin-top: 2px;
}
.pdate li {
	height: 65px;
	padding: 15px 10px 10px 15px;
	border-bottom: 1px solid #ebebeb;
}
.pdate li:last-child {
	border-bottom: 0px;
}
.pdate em {
	font-size: 18px;
}
.pdate .buy-btn {
	left: 59%;
	bottom: 21px;
}
.fo {
	font-size: 12px;
	color: #999;
}
.f1 {
	margin-left: 22px;
}
.f3 {
	margin-left: 10px;
}
.f4 {
	display: block;
	text-decoration: line-through;
	margin: 2px 0;
}
.pr-l {
	text-align: right;
}
.prf {
	color: #fd2c32;
}
</style>

