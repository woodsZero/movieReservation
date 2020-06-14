<template>
  <div id="app">
  <keep-alive :include="['film']">
   <router-view v-if="isRouterAlive"></router-view>
  </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide(){
    return{
      reload:this.reload
    }
  },
  data(){
    return{
      isRouterAlive:true
    }
  },
  methods: {
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        // console.log(this,'0000000')
        this.isRouterAlive=true
      })
    },
    getLngLatLocation() {
      let _this = this
        AMap.plugin('AMap.CitySearch', function () {
            var citySearch = new AMap.CitySearch();
            citySearch.getLocalCity(function (status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    // 查询成功，result即为当前所在城市信息
                    // console.log('通过ip获取当前城市：', result)
                    // let i = result.city.indexOf('市')
                    // console.log(i)
                    //  let city = result.city.substring(0,i)
                    //  改变vuex中的city信息
                    // _this.$store.dispatch('city',city)
                   
                    // _this.$store.state.userCity = 
                    //逆向地理编码
                    AMap.plugin('AMap.Geocoder', function () {
                        var geocoder = new AMap.Geocoder({
                            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                            city: result.adcode
                        })

                        var lnglat = result.rectangle.split(';')[0].split(',');
                        geocoder.getAddress(lnglat, function (status, data) {
                            if (status === 'complete' && data.info === 'OK') {
                                // result为对应的地理位置详细信息
                                // console.log(data)
                                let district = data.regeocode.addressComponent.district
                                // console.log(district,'ffffff')
                                let city = data.regeocode.addressComponent.city
                                let i = result.city.indexOf('市')
                                city = city.substring(0,i)
                                _this.$store.dispatch('city',{city,district})
                                localStorage.setItem('city',city)
                                // console.log()
                            }
                        })
                    })
                }
            })
        })
    }
  },
  mounted(){
     this.getLngLatLocation();
  }
}
</script>

<style>

</style>
