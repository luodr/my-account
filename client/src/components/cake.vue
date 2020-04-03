<template>
  <!--报表-->
  <div id="cake">
    <div id="cake_view" ref="cake_view"></div>
  </div>
</template>

<script>
export default {
  name: "test",
  path: "/test",
  components: {},
  mounted() {
    
  },
  props:["data","startDraw"],
  watch:{
   
   startDraw:function (){
     console.log("??????????");
     
     this.draw();
   }
  },
  data() {
    return {  };
  },
  methods: {
    add: function() {
      this.$router.push("/");
    },
    draw: function() {
      // 基于准备好的dom，初始化echarts实例
      var myChart = this.$echarts.init(this.$refs.cake_view);
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
            data: this.data
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

#cake_view {
  margin: 0 auto;
  width: 100%;
  height: 5rem;
}
</style>