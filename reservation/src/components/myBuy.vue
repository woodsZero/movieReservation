<template>
  <div>
    <div id="buytop">
      <a href="javascript:;" class="back" @click="$router.go(-1)">
        <img src="../assets/images/icon_back.png" alt />
      </a>
      <h3>我的订单</h3>
      <!-- <a href="javascript:;" class="register" @click="toRegister">注册</a> -->
    </div>
    <ul>
      <li v-for="item in order" :key="item._id">
        <h2 class="filmName">{{item.showName}}</h2>
        <p>订单号：{{item.oId}}</p>
        <p class="cinema">影院：{{item.cinemaName}}</p>
        <p>场次：{{item.showTime}}</p>  
        <p>位置：{{item.hallName}}<span v-for="ite in item.orderSeat" :key="ite.id">({{ite.y}}排{{ite.x}}座)</span> </p>
        <p>数量：{{item.orderSeat.length}}张</p>
        <p>总价：<span class="money">￥{{item.allPrice}}</span></p>
        <p v-if="item.state=='1'" class="tuipiao"><button class="buy-btn f12 " @click="tuipiao(item.oId)">退票</button></p>
        <p v-if="item.state=='2'" class="tuipiao"><button class="buy-btn f12 " style="width:1.4rem">处理中</button></p>
        <p v-if="item.state=='3'" class="tuipiao"><button class="buy-btn f12 " style="width:1.4rem">退票失败</button></p>
        <p v-if="item.state=='0'" class="tuipiao"><button class="buy-btn f12 " style="width:1.4rem">已退票</button></p>
       
      </li>
    </ul>
    <back></back>
  </div>
</template>
<script>
import Back from './views/back'
export default {
  inject: ["reload"],
  data() {
    return {
      order:[],
    };
  },
  components:{
    Back
  },
  methods:{
    tuipiao(id){
      this.$axios({
        url:'api/applyTui',
         params:{
          oId:id
        }
      })
      .then(res=>{
        alert(res.data.info)
        this.reload()
        // console.log(res,'ress')
      })
      .catch(err=>{
        console.log(err,'err')
      })
      // this.$axios({
      //   url:'/api/tuiPiao',
      //   params:{
      //     _id:id
      //   }
      // })
      // .then(res=>{
      //   // console.log(res,'res')
      //   alert('退票成功')
      //   this.reload();
      // })
      // .catch(err=>{
      //   console.log(err,'errr')
      // })
    }
  },
  mounted(){
    let mine = JSON.parse(localStorage.getItem('mineArr'))[0] 
    let uId = mine.uId
    this.$axios({
      url:'/api/userOrder',
      params:{
        uId
      }
    })
    .then(res=>{
      let data = res.data.data
      this.order = data
      // console.log(res,'res')
    })
    .catch(err=>{
      consle.log(err,'err')
    })
  }
};
</script>
<style scoped>

.money{
  color: #ff4d64;
}
.tuipiao{
  /* text-align: right; */
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  /* float: right; */
  /* margin-top: ; */
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
#buytop {
  /* background: #ff4d64; */
  background: #fe0041;
  text-align: center;
  padding-top: 0.35rem;
  padding-bottom: 0.3rem;
  padding-left: 0.34rem;
  /* padding: 0.42rem 0.28rem 0.25rem 0.34rem; */
}
#buytop a {
  float: left;
}

#buytop a img {
  width: 0.24rem;
  height: 0.42rem;
  margin-right: 0.2rem;
}

#buytop h3 {
  display: inline-block;
  font-size: 0.38rem;
  padding-right: 0.84rem;
  color: #fff;
}
ul{
  margin-top:0.3rem ;
}
li{
  border-bottom:1px solid #ccc ;
  padding-bottom: 0.2rem;
  padding-top: 0.2rem;
  padding-left: 0.3rem;
  position: relative;
}
li h2{
  font-size: 0.3rem;
  font-weight: bold;
  line-height: 0.34rem;
  margin-bottom: 0.2rem;
}
li p{
  font-size: 0.26rem;
  color: #a0a0a0;
  line-height: 0.35rem;
}
</style>