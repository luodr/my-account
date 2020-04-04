<template>
  <!--报表-->
  <div id="report">
    <div id="report_view" ref="report_view"></div>
  </div>
</template>

<script>
export default {
  name: "columnar",
  components: {},
  props: ["data"],
  watch: {
    data: function() {
      this.datas = [];
      this.draw();
    }
  },
  mounted() {
    this.draw();
    this.$on("columnarRraw", res => {
      this.draw();
    });
  },
  data() {
    return { datas: [] };
  },
  methods: {
    getDays: function(year, month) {
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    draw: function() {
     
      // 基于准备好的dom，初始化echarts实例
      let days = [];
      let date = new Date();
      this.datas = [];
      for (
        let i = 0;
        i < this.getDays(date.getFullYear(), date.getMonth() + 1);
        i++
      ) {
        days.push(i + 1);
        this.datas.push(0);
      }
      this.data.forEach(value => {
       let d=new Date(value.date);
     
       this.datas[d.getDate()-1]+=value.money;
      });
      var myChart = this.$echarts.init(this.$refs.report_view);
      let option = {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // grid: {
        //     left: '3%',
        //     right: '4%',
        //     bottom: '3%',
        //     containLabel: true
        // },
        xAxis: [
          {
            type: "category",
            data: days,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false
          }
        ],
        series: [
          {
            type: "bar",
            barWidth: "60%",
            data:this.datas
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style>
#report_view {
  width: 100%;
  height: 5rem;
}
</style>