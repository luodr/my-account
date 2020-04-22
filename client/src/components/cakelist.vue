<template>
  <div id="listInfo">
    <div
      class="cakeListInfo"
      v-for="(item,index) in cakeMap"
      v-bind:key="index"
      @click="onClick($event,item[1].items)"
    >
      <span class="proportion">{{(item[1].value/allMoney*100).toFixed(2)}}%</span>
      <div class="icon_div">
        <img :src="getImgUrl(item[1].name)" class="cakelistIcon" />
      </div>
      <div class="info_div">
        <span class="cakelistType">{{item[1].name}}</span>
      </div>
      <span class="cakeListMoney">{{Number(item[1].value ).toFixed(2)}}</span>
      <!-- <img :src="next" class="cakeImg" /> -->
    </div>
    
  </div>
</template>

<script>
// import vue from "vue";
let mdtp_ic_chevron_right_black_24dp = require("@/assets/icons/mdtp_ic_chevron_right_black_24dp.png");
export default {
  name: "cakelist",
  path: "/cakelist",
  props: ["cakeMap", "allMoney"],
  components: {},

  data() {
    return {
      next:mdtp_ic_chevron_right_black_24dp
    };
  },
  mounted() {},
  watch: {},
  methods: {
    onClick(event, data) {
      // this.$router.push({ path: "/itemInfo", query: data });
      //  alert(data);
    },

    getImgUrl(type) {
      return require("@/assets/icons/" + this.$typeMap.get(type));
    }
  }
};
</script>

<style>
.proportion {
  text-align: center;
  z-index: 100;
  float: left;
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  line-height: 1rem;
  width: 200px;
}
.cakelistType {
  position: relative;
  line-height: 0.9rem;
  float: left;
}
.cakelistIcon {
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  /* float: left; */
  position: relative;
  top: 0.15rem;
}
.cakeListInfo {
  width: 95%;
  /* margin: 0 auto; */
  height: 0.9rem;
  border-bottom: #b1abb8 solid 1px;
  position: relative;
  left: 5%;
  /* top: 0.5rem; */
  font-size: 0.3rem;
}
.cakeListMoney {
  float: right;
  position: absolute;
  z-index: 5;
  right: 0.5rem;
  top: 50%;
  margin-top: -0.15rem;
}
.cakeImg {
  width: 0.5rem;
  height: 0.5rem;
  float: right;
  /* line-height: 0.9; */
  position: relative;
  top: 0.23rem;
}
</style>