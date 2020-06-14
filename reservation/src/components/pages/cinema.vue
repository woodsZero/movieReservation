<template>
  <section id="cinema">
    <div class="top">
      <div class="area" @click="$router.push('/city')">
        <span class="s-area">{{$store.state.userCity}}</span>
        <img src="../../assets/images/weibiaoti35.png" alt />
      </div>
      <!-- <div class="area">
        <span class="s-area">{{regionName}}</span>
        <img src="../../assets/images/weibiaoti35.png" alt />
      </div>-->
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="option" @click.native="findSpecial" />
      </van-dropdown-menu>
    </div>
    <cinema-con :cinemaList="cinemaList"></cinema-con>
  </section>
</template>
<script>
const CinemaCon = () => import("../views/cinemaCon");

export default {
  data() {
    return {
      cinemaList: [],
      city:'',
      value: 0,
      option: [
        { text: '全部区域', value: 0 },
      ],
    };
  },
  components: {
    CinemaCon
  },
  methods:{
    // 统计这个地区影院有多少个，格式化界面
    getSame(arr){
      let obj = {}
      for(let i=0;i<arr.length;i++){
        var item = arr[i].regionName
        obj[item] = (obj[item]+1) || 1
      }
      let option = this.option
      for(var key in obj){
        let json = {}
        json['text'] = key+`(${obj[key]})`
        json['value'] = key
        option.push(json)
      }
    },
    findSpecial(){
      // console.log(this.value,'value')
      let city = this.city
      // 调取接口查询影院集合
      if(this.value == 0){
         this.$axios({
        url: "/api/cinemaAll",
        params: {
          city
        }
      })
      .then(res=>{
        
        this.cinemaList = res.data.data;
      })
      .catch(err=>{
        console.log('err')
      })
      }else{
        let regionName = this.value
        this.$axios({
          url:'/api/cinemaArea',
          params:{
            city,
            regionName
          }
        })
        .then(res=>{
          this.cinemaList = res.data.data
          // console.log(res,'res')
        })
        .catch(err=>{
          console.log(err,'errrr')
        })
      }
    }
  },
  mounted() {
    this.city = localStorage.getItem("city");
    let city = this.city
    // console.log(city,'city')
    if (this.value == 0) {
      this.$axios({
        url: "/api/cinemaAll",
        params: {
          city
        }
      })
        .then(res => {
          // console.log(res.data,'res.dta')
          this.cinemaList = res.data.data;
          // 统计有多少区
          let  cinemaList= this.cinemaList
          this.getSame(cinemaList)
        })
        .catch(err => {
          console.log(err, "影院页面错误");
        });
    }
  }
};
</script>
<style scoped>
#cinema{
  background: rgb(245, 245, 245);
}
.area img {
  width: 16px;
  height: 16px;
  /* font-size: 15px; */
  vertical-align: middle;
}
.s-area {
  display: inline-block;
  font-size: 15px;
  line-height: 0.6rem;
}

.area {
  /* flex: 1; */
  width: 50%;
  float: left;
  height: 50px;
  line-height: 50px;
  text-align: center;
}
.top {
  /* display: flex; */
  width: 100%;
  border-bottom: 1px solid #ebebeb;
  background: #fff;
  /* padding: 8px 0; */
  position: fixed;
  z-index: 99;
  top: 0;
  
}
</style>