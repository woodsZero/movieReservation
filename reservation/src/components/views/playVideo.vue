<template>
  <section class="mask video-mask" @click="cancelMask" v-show="$store.state.showMask">
    <div class="video-box pa">
      <div class="v-cover">
        <video
          src="http://cloud.video.taobao.com/play/u/1745440806/p/1/e/6/t/1/d/hd/47897735.mp4"
          ref="video"
          class="v-content"
          poster="https://gw.alicdn.com/i4/TB1onyyOXXXXXcrapXXXXXXXXXX_.jpg"
          controls="controls"
        ></video>
      </div>
      <div class="v-icon pa" @click="videoStar" v-if="showIcon"></div>
    </div>
  </section>
</template>
<script>

export default {
  data() {
    return {
      showIcon: true,
    };
  },
  methods: {
    cancelMask(event) {
      if (event.target.className === "mask video-mask") {
        this.videoStop();
        this.$store.dispatch('cancelM')
      }

    },
    videoStar() {
      this.showIcon = false;
      let video = this.$refs.video;
      video.play();
    },
    videoStop() {
      this.showIcon = true;
      let video = this.$refs.video;
      video.pause();
    }
  },
  mounted() {
    let video = this.$refs.video;
    video.onended = () => {
      this.showIcon = true;
    };
    this.$axios({
      url:''
    })
  }
};
</script>

<style>
.video-box {
  width: 100%;
  height: 200px;
  top: 20%;
  padding: 0 20px;
  box-sizing: border-box;
}
.v-cover {
  height: 100%;
  background-color: #000;
  background-repeat: no-repeat;
  background-size: auto 100%;
  background-position: center;
}
.v-icon {
  width: 90px;
  height: 90px;
  left: 50%;
  top: 50%;
  margin-left: -45px;
  margin-top: -45px;
  background: url("../../assets/images/sprite.png") -2px -2px no-repeat;
}
.v-content {
  width: 100%;
  height: 100%;
}
</style>
