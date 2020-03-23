<template>
  <!--报表-->
  <div id="report">
    <div id="report_view"></div>
  </div>
</template>

<script>
export default {
  name: "test",
  path: "/test",
  components: {},
  mounted() {
    this.draw();
  },
  data() {
    return { data: null };
  },
  methods: {
    add: function() {
      this.$router.push("/");
    },
    draw: function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(document.getElementById("report_view"));
      let option = {
        series: [
          {
            name: "",
            type: "pie",
            radius: ["40%", "55%"],
            label: {
              formatter: "  {b|{b} }{per|{d}%}  ",
              rich: {
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center"
                },

                per: {
                  color: "#000",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              { value: 335, name: "直达" },
              { value: 310, name: "邮件营销" },
              { value: 234, name: "联盟广告" },
              { value: 135, name: "视频广告" },
              { value: 1048, name: "百度" },
              { value: 251, name: "谷歌" },
              { value: 147, name: "必应" },
              { value: 102, name: "其他" }
            ]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
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