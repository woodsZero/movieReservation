<template>
  <div>
     <!-- <div id="chartColumn" style="width: 100%; height: 400px;">
    </div> -->
    <h2>欢迎使用，祝您使用愉快！</h2>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      chartColumn: null
    };
  },
  mounted() {
    // this.drawLine();
  },
  methods: {
    // drawLine() {
    //   this.chartColumn = echarts.init(document.getElementById("chartColumn"));

    //   this.chartColumn.setOption({
    //     title: { text: "用户注册走势图" },
    //     tooltip: {},
    //     xAxis: {
    //       type: "category",
    //       data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    //     },
    //     yAxis: {
    //       type: "value"
    //     },
    //     series: [
    //       {
    //         data: [820, 932, 901, 934, 1290, 1330, 1320],
    //         type: "line"
    //       }
    //     ]
    //   });
    // }
  }
};
</script>
<style scoped>
  h2{
    font-size: 20px;
  }
</style>