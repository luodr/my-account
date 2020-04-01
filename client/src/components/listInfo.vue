<template>
  <div id="listInfo">
    <div
      class="info"
      v-for="(item,index) in infos"
      v-bind:key="index"
      @click="onClick($event,item)"
    >
      <img src="../assets/trade_ico_exp_12.png" class="icon" />
      <div class="info_div">
        <span class="type">{{item.detail}}</span>
        <span class="date">{{ transformDate(item.date)}} {{item.remark}}</span>
        <span v-if="item.type=='支出'" class="money">2</span>
        <span v-if="item.type=='收入'" class="addMoney">2</span>
      </div>
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
      data: null
    };
  },
  methods: {
    onClick(event, data) {
      this.$router.push({ path: "/itemInfo", query: data });
    },
    transformDate(d) {
      let date = new Date(d);
      let month = this.addZero(date.getMonth());
      let day = this.addZero(date.getDate());
      let h = this.addZero(date.getHours());
      let m = this.addZero(date.getMinutes() + 1);
      return month + "-" + day + "  " + h + ":" + m;
    },
    addZero(number) {
      if (number < 10) {
        return "0" + number;
      } else {
        return number;
      }
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
.icon {
  width: 0.8rem;
  height: 0.8rem;
  display: block;
  float: left;
}
.info_div span {
  display: block;
}
.type {
  /* line-height: 0.6rem; */
  padding-top: 7px;
}
.date {
  font-size: 0.23rem;
  color: #cdcdcd;
}
.money {
  float: right;
  position: absolute;
  z-index: 5;
  right: 0.5rem;
  top: 50%;
  margin-top: -0.15rem;
}
.addMoney {
  float: right;
  position: absolute;
  z-index: 5;
  right: 0.5rem;
  top: 50%;
  margin-top: -0.15rem;
  color: #9378fb;
}
</style>