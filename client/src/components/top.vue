<template>
  <div id="top_com">
    <div id="com_top">
      <div id="com_titleInfo">
        <!-- 
        <h1 id="add_title" >日常账单</h1>-->
        <div style="position:absolute;top:0px;text-align:center;width:100%;font-size:0.4rem;">
          <h5>{{title}}</h5>
        </div>
        <div style="position:absolute;top:0px;float:left;text-align:left;width:100%">
          <img :src="icon_back_black" class="go_back" @click="onBack" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let icon_back_black=require("@/assets/icons/icon_back_black.png")
export default {
  name: "top",
  components: {},
  props: ["title"],
  mounted() {},
  data() {
    return { data: null,icon_back_black };
  },
  methods: {
    onBack() {
      this.$router.back(-1);
    }
  }
};
</script>

<style>
#com_top {
  background-repeat: no-repeat;
  background-size: cover;
  height: 1rem;

  text-align: center;
}
#com_titleInfo {
  /* background: red; */
  position: relative;
  top: 0.2rem;
  width: 90%;
  margin: 0 auto;
}
#add_title {
  color: #000;
  font-size: 0.3rem;
  /* position: absolute; */
  /* vertical-align: middle; */
  /* display: inline-block; */
  /* float: none; */
}
</style>