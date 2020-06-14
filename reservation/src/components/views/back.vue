<template>
    <div>
        <p class="back" @click="$router.push('/film')">返回主页</p>
    </div>
</template>
<script>
export default {

}
</script>
<style lang="" scoped>
.back {
    font-size: 18px;
    color: #fff;
    line-height: 30px;
    text-align: center;
    margin-top: -4px;
    width: 100%;
    height: 30px;
    background: #fe0041;
    position: fixed;
    bottom: 0;
    z-index: 1001;
 }
</style>