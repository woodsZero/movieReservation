<template>
    <div id="index">
           <foot-nav></foot-nav>
           <router-view/> 
    </div>
</template>
<script>
import FootNav from './views/footNav'
export default {
    data() {
        return {
            msg:"我是一级路由index"
        }
    },
    components:{
        FootNav
    }
}
</script>
<style scoped>
h1{
    font-size: 0.28rem;
}
</style>
