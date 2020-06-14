<template>
  <section id="select-city" class="pf fadeInDown">
    <header class="city-header mint-1px-b pr">
      <span class="fb">选择城市</span>
      <span class="close-city pa" @click="$router.go(-1)">×</span>
    </header>
    <div>
      <mt-index-list>
        <mt-index-section :index="item.first" v-for="(item,inde) in cityList" :key="inde">
          <mt-cell :title="ite" v-for="(ite,ind) in item.city" :key="ind"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      showCityList: true,
      cityList: [
        {
          first:"A",
          city:[
            '安康','安庆'
          ]
      },
      {
        first:"B",
        city:[
          '白城','百色','白山','白银'
        ]
      },
      {
        first:"C",
        city:[
          '沧州','长春','常德','昌吉'
        ]
      }
      ]
    };
  },
  methods: {}
};
</script>

<style>
.mint-indicator-wrapper {
  z-index: 1000;
}
#select-city {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
  background-color: #fff;
}
.city-header {
  height: 46px;
  line-height: 46px;
  text-align: center;
  color: #000;
  font-size: 16px;
  background-color: #fff;
}
.close-city {
  font-size: 28px;
  color: #666;
  display: inline-block;
  height: 46px;
  width: 50px;
  line-height: 38px;
  text-align: center;
  right: 0px;
}
@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0.7;
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}
@keyframes fadeInDown {
  0% {
    opacity: 0.7;
    -webkit-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
}
.fadeInDown {
  -webkit-animation: fadeInDown 0.3s;
  animation: fadeInDown 0.3s;
}
@-webkit-keyframes fadeOutTop {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-50px);
    transform: translateY(-50px);
  }
}
@keyframes fadeOutTop {
  0% {
    opacity: 1;
    -webkit-transform: translateY(0);
    -ms-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateY(-50px);
    -ms-transform: translateY(-50px);
    transform: translateY(-50px);
  }
}
.fadeOutTop {
  -webkit-animation: fadeOutTop 0.35s;
  animation: fadeOutTop 0.35s;
}
</style>
