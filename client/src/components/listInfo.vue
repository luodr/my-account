<template>
  <div id="listInfo">
    <div
      class="info"
      v-for="(item,index) in infos"
      v-bind:key="index"
      @click="onClick($event,item)"
    >
      <div class="icon_div">
        <img :src="getImgUrl(item.detail)" class="icon" />
      </div>
      <div class="info_div">
        <span class="type">{{item.detail}}</span>
        <span class="date">{{ transformDate(item.date)}} {{item.remark}}</span>
      </div>
      <span v-if="item.type=='支出'" class="money">{{item.money}}</span>
      <span v-if="item.type=='收入'" class="addMoney">{{item.money}}</span>
    </div>
  </div>
</template>

<script>


export default {
  name: "listInfo",
  props: ["infos"],
  components: {},

  data() {
    return {
      data: null,
      typeMap: new Map()
    };
  },
  mounted() {},
  methods: {
    onClick(event, data) {
     

      this.$router.push({ path: "/itemInfo", query: data });
    },
    transformDate(d) {
      let date = new Date(d);
      let month = this.addZero(date.getMonth() + 1);
      let day = this.addZero(date.getDate());
      let h = this.addZero(date.getHours());
      let m = this.addZero(date.getMinutes());
      return month + "-" + day + "  " + h + ":" + m;
    },
    addZero(number) {
      if (number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    },
    getImgUrl(type) {
      return require("@/assets/icons/" + this.$typeMap.get(type));
    }
  }
};
</script>

<style>
#listInfo {
  color: black;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;

}
.info {
  width: 90%;
  margin: 0 auto;
  height: 0.9rem;
  border-bottom: #b1abb8 solid 1px;
  position: relative;
  /* top: 0.5rem; */
  font-size: 0.3rem;
}
.icon_div {
  float: left;
}
.icon {
  width: 0.6rem;
  height: 0.6rem;
  display: block;
  /* float: left; */
  position: relative;
  top: 0.2rem;
}
.info_div {
  float: left;
  position: relative;
  left: 0.2rem;
  width: 80%;
}
.info_div span {
  display:block;
  
}
.type {
  /* line-height: 0.6rem; */
  padding-top: 0.15rem;
  position: relative;
  float: left;
}
.date {
  font-size: 0.23rem;
  color: #cdcdcd;
  float: left;
  width: 100%;
  position: absolute;
  bottom: -0.3rem;
}
.money {
  float: right;
  position: absolute;
  z-index: 5;
  right: 0.2rem;
  top: 50%;
  margin-top: -0.15rem;
}
.addMoney {
  float: right;
  position: absolute;
  z-index: 5;
   right: 0.2rem;
  top: 50%;
  margin-top: -0.15rem;
  color: #9378fb;
}
</style>