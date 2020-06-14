<template>
  <div class="swiper-container" id="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item,index) in swiperImg" :key="index">
        <img class="img" :src="item" />
      </div>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "../../../node_modules/swiper/js/swiper";
export default {
  name: "swiper",
  data() {
    return {
      imgurl: [],

    };
  },
  methods:{
    mySwiper(){
            var swiper = new Swiper(".swiper-container", {
                spaceBetween: 30,
                centeredSlides: true,
                loop: true,
                autoplay: {
                delay: 3000,
                disableOnInteraction: false
                },
                pagination: {
                el: ".swiper-pagination",
                clickable: true,
                }
            })
    },
    init(){
          this.$nextTick(()=>{
              this.mySwiper();
            })
          }
  },
   mounted() {
    this.init()
  },
  props: ["swiperImg"]
};
</script>

<style>
img {
  width: 100%;
  height: auto;
}
#swiper .swiper-pagination-bullet {
  background: #e5e8e8;
  opacity: 1;
}
#swiper .swiper-pagination-bullet-active {
  background: #ff5733;
}
</style>