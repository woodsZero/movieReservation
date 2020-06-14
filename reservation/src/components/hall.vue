<template>
  <div>
    <div id="ltop">
      <a href="javascript:;" class="back" @click="$router.go(-1)">
        <img src="../assets/images/icon_back.png" alt />
      </a>
      <h3>{{hData.hallName}}</h3>
      <!-- <a href="javascript:;" class="register" @click="toRegister">注册</a> -->
    </div>
    <!-- 头部 -->
    <div class="header">
      <h2>{{hData.showName}}</h2>
      <h3>{{hData.showTime}} ({{hData.showVersion}})</h3>
      <!-- <p>{{hData.cinemaName}}</p> -->
    </div>

    <div class="h-tick">
      <span>可选</span>
      <img src="../assets/images/xuanzuo.png" alt />
      <span>已选</span>
      <img src="../assets/images/yixuanzuowei.png" alt />
      <span>不可选</span>
      <img src="../assets/images/bukexuanzuo.png" alt />
    </div>
    <!-- 座位列表 -->
    <div class="seatL">
      <!-- 屏幕位置 -->
      <div class="screen">荧幕位置</div>
      <canvas ref="canvas" :width="canvasW" :height="canvasH" @click="clickSeat"></canvas>
    </div>

    <!-- 底部 -->
    <div class="hallfoot">
      <div class="selectNum">
        <ul>
          <li v-for="item in selectSeat" :key="item.id" @click="removeBind(item.id)">
            <p>{{item.y}}排{{item.x}}座</p>
            <p>{{item.price}}</p>
          </li>
        </ul>
      </div>
      <div class="selector" @click="sureSeat">确认选座￥{{allPrice}}</div>
    </div>
  </div>
</template>
<script>
let seatW = 40;
let seatH = 40;
export default {
  inject: ["reload"],
  data() {
    return {
      canvasW: "",
      canvasH: "",
      seatList: [],
      selectSeat: [],
      hData:{},
      price:0
    };
  },
  computed:{
    allPrice(){
      return this.price*this.selectSeat.length
    }
  },
  methods: {
    sureSeat() {
      if(this.selectSeat==''){
        alert('请选择座位')
        return
      }
      let sel = this.selectSeat
      let arr = this.seatList
     let arr1 = arr.map((value,index)=>{
       for(let i=0;i<sel.length;i++){
         if(value.id==sel[i].id){
           arr[index].isSold = true
         }
       }
       return arr[index]
     })
     this.$axios({
       url:'/api/selSeat',
       params:{
         hId:this.hData.hId,
         arr1:JSON.stringify(arr1)
       }
     })
     .then(res=>{
      //  console.log(res,'res')
      let orderSeat = this.selectSeat
      let hallName = this.hData.hallName
      let cinemaName = this.hData.cinemaName
      let showName = this.hData.showName
      let showVersion = this.showVersion
      let mine = JSON.parse(localStorage.getItem('mineArr'))[0] 
      let uId = mine.uId
      let userName = mine.nickName
      let allPrice = this.allPrice
      let showTime = this.hData.showTime
      let orderTime = new Date()
        orderTime=this.$store.state.timeFormat(orderTime)
      // console.log(mine,'mine')
      let json = {
        uId,
        userName,
        cinemaName,
        hallName,
        showName,
        showVersion,
        showTime,
        allPrice,
        orderTime,
        orderSeat
      }
      // json = JSON.stringify(json)
      // console.log(this,'this')
      let arr=[]
      if(localStorage.getItem('arrOrder')){
          arr=JSON.parse(localStorage.getItem('arrOrder'))
          // console.log(arr,'存储有值arr')
          arr.push(json)
          localStorage.setItem('arrOrder',JSON.stringify(arr))
        }else{
          // console.log('无存储')
          arr.push(json)
          localStorage.setItem('arrOrder',JSON.stringify(arr))
        }
      this.$axios({
        url:'/api/insertOrder',
        params:{
          json
        }
      })
      .then(res=>{
        // console.log(res)
        this.reload()
      })
      .catch(err=>{
        // console.log(err,'err')
      })
      alert('选座成功')
     })
     .catch(err=>{
      //  console.log(err,'选座出错')
     })
      // localStorage.setItem("selectSeat", JSON.stringify(this.selectSeat));
      // console.log(1111111)
      // this.$router.push("/mybuy");
    },
    drawAllImage() {
      const seatData = this.seatList;
      // this.ctx.drawImage()
      seatData.forEach((item, index) => {
        let { isSold, x, y } = item;
        let offsetLeft = (x - 1) * seatW;
        let offsetTop = (y - 1) * seatH;
        if (isSold) {
          this.ctx.drawImage(this.soldImg, offsetLeft, offsetTop, seatW, seatH);
        } else {
          this.ctx.drawImage(
            this.emptyImg,
            offsetLeft,
            offsetTop,
            seatW,
            seatH
          );
        }
      });
    },
    drawSelectImage() {
      let selected = this.selectSeat;
      selected.forEach((item, index) => {
        let { isSold, x, y } = item;
        let offsetLeft = (x - 1) * seatW;
        let offsetTop = (y - 1) * seatH;
        this.ctx.drawImage(this.selectImg, offsetLeft, offsetTop, seatW, seatH);
      });
    },
    removeBind(id) {
      this.removeSeat(id), this.reDraw();
    },
    removeSeat(id) {
      this.selectSeat = this.selectSeat.filter((value, index) => {
        return value.id != id;
      });
    },
    reDraw() {
      this.ctx.clearRect(0, 0, this.canvasW, this.canvasH);
      this.drawAllImage();
      this.drawSelectImage();
    },
    clickSeat(e) {
      // 获取canvas距离边界的位置
      // console.log(e.pageX, e.pageY);
      let offSet = this.$refs.canvas.getBoundingClientRect();
      // console.log(offSet, "offset");
      let pageX = e.pageX - offSet.left;
      let pageY = e.pageY - offSet.top;
      let xPos = Math.ceil(pageX / seatW);
      let yPos = Math.ceil(pageY / seatH);
      // console.log(xPos, yPos);
      // 获取点击到的对象。根据x和y和data中的x和y对比
      let seat = this.seatList.find(item => item.x == xPos && item.y == yPos);
      // console.log(seat)
      // 已经被选的座位不能进行任何操作
      if (seat.isSold) {
        return;
      }
      // 查找当前点击的数据在数组中是否存在
      let selectIndex = this.selectSeat.findIndex(item => item.id == seat.id);
      if (selectIndex > -1) {
        // 数组中有的删除掉
        this.removeSeat(seat.id);
      } else {
        // 数组中没有 添加上
        if (this.selectSeat.length >= 5) {
          alert("不能超过6个");
        } else {
          this.selectSeat.push(seat);
        }
      }
      this.reDraw();
    }
  },
  mounted() {
    // console.log(this.allPrice,'000')
    // let mine = JSON.parse(localStorage.getItem('mineArr'))[0]
    //   console.log(mine,'mine')
    let hId = this.$route.params.hId;
    this.$axios({
      url: "/api/hall",
      params: {
        hId
      }
    })
      .then(res => {
        let data = res.data.data[0];
        // console.log(res,'reee')
        this.price = data.price
        this.seatList = data.seatList;
        // console.log(this.seatList,'挂载')
        this.hData = data
        // console.log(this.seatList,'ssss')
        // console.log(res,'resss')
        this.canvasW = this.seatList[this.seatList.length - 1].x * seatW;
        this.canvasH = this.seatList[this.seatList.length - 1].y * seatH;
        this.ctx = this.$refs.canvas.getContext("2d");
        const emptyImg = new Image();
        const selectImg = new Image();
        const soldImg = new Image();
        let count = 0;
        const loadCallback = () => {
          count++;
          if (count == 3) {
            this.emptyImg = emptyImg;
            this.selectImg = selectImg;
            this.soldImg = soldImg;
            this.drawAllImage();
          }
        };
        emptyImg.onload = loadCallback;
        selectImg.onload = loadCallback;
        soldImg.onload = loadCallback;
        emptyImg.src = require("../assets/images/xuanzuo.png");
        selectImg.src = require("../assets/images/yixuanzuowei.png");
        soldImg.src = require("../assets/images/bukexuanzuo.png");
      })
      .catch(err => {
        console.log(err, "影厅页面错误");
      });

    // this.$axios({
    //   url:""
    // })
  }
};
</script>
<style scoped>
.h-tick {
  border-bottom: 2px solid #ccc;
  margin-bottom: 0.2rem;
  text-align: center;
}
.h-tick span {
  display: inline-block;
}
.h-tick img {
  width: 0.4rem;
  vertical-align: middle;
}
#ltop {
  /* background: #ff4d64; */
  background: #fe0041;
  text-align: center;
  padding-top: 0.35rem;
  padding-bottom: 0.3rem;
  padding-left: 0.34rem;
  /* padding: 0.42rem 0.28rem 0.25rem 0.34rem; */
}
#ltop a {
  float: left;
}

#ltop a img {
  width: 0.24rem;
  height: 0.42rem;
  margin-right: 0.2rem;
}

#ltop h3 {
  display: inline-block;
  font-size: 0.38rem;
  padding-right: 0.84rem;
  color: #fff;
}
/* selectNum  */
.screen {
  position: absolute;
  top: 0;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  font-size: 0.3rem;
  text-align: center;
  border: 2px solid #333;
  border-radius: 0.3rem;
}
.seatL {
  background: #f5f5f5;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  position: relative;
}
.selectNum {
  position: relative;
  overflow-y: hidden;
  overflow-x: auto;
  width: 100%;
  height: 50px;
  display: flex;
}
.selectNum::-webkit-scrollbar {
  display: none;
}
ul {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  background: #fff;
}
ul li {
  width: 84px;
  height: 38px;
  border: 2px solid#ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin: 2px;
}
.selector {
  height: 55px;
  line-height: 55px;
  text-align: center;
  color: #fff;
  background: #fe0041;
  font-size: 18px;
}
.hallfoot {
  width: 100%;
  height: 105px;
  position: fixed;
  left: 0;
  bottom: 0;
}
.header {
  color: #666;
  padding-top: 0.4rem;
  padding-left: 0.4rem;
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #333;
  margin-bottom: 0.3rem;
}
.header h2 {
  font-size: 0.36rem;
  font-weight: bold;
  margin-bottom: 0.3rem;
}
.header h3 {
  font-size: 0.3rem;
}
</style>