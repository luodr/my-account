<template>
  <!--折线图-->
  <div id="report">
    <div id="line_view" ref="line_view"></div>
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
    // this.$on("columnarRraw", res => {
    //   this.draw();
    // });
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
      var myChart = this.$echarts.init(this.$refs.line_view);
      let days = [];
      let data1 = [];
      let data2 = [];
      let data3 = [];
      //最小显示七条数据
      let max = 7;
      this.data.forEach((value, key) => {
        let income = value.income;
        let expend = value.expend;
        data1[key - 1] = income;
        data2[key - 1] = expend;
        data3[key - 1] = income - expend;
        max = Math.max(max, key);
      });

      for (let i = 0; i < max; i++) {
        days.push(i + 1);
        if (!data1[i]) {
          data1[i] = 0;
        }
        if (!data2[i]) {
          data2[i] = 0;
        }
        if (!data3[i]) {
          data3[i] = 0;
        }
      }
      let option = (option = {
        tooltip: {
          trigger: "axis"
        },
       
       
        xAxis: {
          type: "category",
       
          axisTick: {
            alignWithLabel: true
          },
          data: days
        },
        yAxis: [
          {
            show: false
          }
        ],
        series: [
          {
            name: "支出",
            type: "line",
            stack: "总量",
            color: "#3fa5db",
            data: data2
          },
          {
            name: "收入",
            type: "line",
            stack: "总量",
            color: "#67e0e3",
            data: data1
          },
          {
            name: "结余",
            type: "line",
            stack: "总量",
            color: "#fedc65",
            data: data3
          }
        ]
      });
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style>
#line_view {
  width: 100%;
  height: 5rem;
}
</style>