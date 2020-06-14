<template>
    <div class="footNav">
      <router-link to="/film" activeClass="colorOne" class="film">电影</router-link>
      <router-link to="/cinema" active-class="colorTwo" class="cinema">影院</router-link>
      <router-link to="/mine" active-class="colorThree" class="mine">我的</router-link>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.footNav {
  width: 100%;
  height: 1.01rem;
  display: flex;
  position: fixed;
  background: #fff;
  border-top: 2px solid #eee;
  bottom: 0;
  left: 0;
  z-index: 999999;
}
 .footNav a{
    flex: 1;
    height: 1.01rem;
    padding-top: 0.65rem;
    background-size: 0.43rem;
    background-position: 50% 0.14rem;
    color:#9c99ad;
    font-size: 0.24rem;
    text-align: center;
 }
.film {
  background: url('../../assets/images/dianying.png') no-repeat;
}
.cinema {
  background: url('../../assets/images/cinema.png') no-repeat;
}
.mine {
  background: url('../../assets/images/mine.png') no-repeat;
}
.footNav .colorOne,.footNav .colorTwo,.footNav .colorThree{
 color: #ff4d64;
 background-size: 0.43rem;
 background-position: 50% 0.14rem;
} 
.colorOne {
  background: url('../../assets/images/dianying-active.png') no-repeat;
}
.colorTwo {
  background: url('../../assets/images/cinema-active.png') no-repeat;
}
.colorThree {
  background: url('../../assets/images/mine-active.png') no-repeat;
}
</style>