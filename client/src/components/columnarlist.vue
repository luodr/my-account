<template>
  <div id="listInfo">
    <div id="colu_title">
      <ul class="columnarli">
        <li>日</li>
        <li>支出</li>
        <li>收入</li>
        <li>结余</li>
      </ul>
    </div>
    <el-collapse
      v-for="(item,index) in sort"
      v-bind:key="index"
      class="columnarlistInfo"
      @click="onClick($event,item[1].items)"
      style="border-top:none;"
      accordion
    >
      <el-collapse-item>
        <template slot="title">
          <ul class="columnarli">
            <li>{{item.month}}月{{item.day}}日</li>
            <li>{{item.expend}}</li>
            <li style="color:#9378fb">{{item.income}}</li>
            <li>{{item.income-item.expend}}</li>
          </ul>
        </template>
        <div v-for="(detail,index) in item.items" v-bind:key="index" @click="onClick($event,detail)">
          <!-- <div class="columnarItem">
            <img :src="getImgUrl(item.detail)" />
            <span>{{item.detail}}</span>
            <span class="co_money">{{item.money}}</span>
          </div>-->
          <div class="columnarItem">
            <img :src="getImgUrl(detail.detail)" class="icon" />

            <div class="info_div">
              <span class="type">{{detail.detail}}</span>
              <span class="date">{{ transformDate(detail.date)}} {{detail.remark}}</span>
            </div>
            <span v-if="detail.type=='支出'" class="money" style="position: relative; ">{{detail.money}}</span>
            <span v-if="detail.type=='收入'" class="addMoney" style="position: relative;">{{detail.money}}</span>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
// import vue from "vue";
let mdtp_ic_chevron_right_black_24dp = require("@/assets/icons/mdtp_ic_chevron_right_black_24dp.png");
export default {
  name: "cakelist",
  path: "/cakelist",
  props: ["columnarMap", "allMoney"],
  components: {},
  watch: {
    columnarMap: function() {
      this.init();
    }
  },
  data() {
    return {
      next: mdtp_ic_chevron_right_black_24dp,
      sort: []
    };
  },
  mounted() {
    this.init();
  },

  methods: {
    init() {
      //初始化数据并排序
      this.sort = [];
      this.columnarMap.forEach((value, key) => {
        this.sort.push(key);
      });
      this.sort.sort((val1, val2) => {
        return val1 - val2;
      });
      this.sort.forEach((value, key) => {
        this.sort[key] = this.columnarMap.get(value);
      });
    },
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
.columnarlistInfo {
  width: 95%;
  /* margin: 0 auto; */

  border-bottom: #b1abb8 solid 1px;
  position: relative;
  left: 5%;
  /* top: 0.5rem; */
  font-size: 0.3rem;
}
.columnarli {
  width: 100%;
}
.columnarli li {
  list-style: none;
  float: left;
  width: 25%;
  text-align: center;
}
.columnarItem {
  height: 0.9rem;
  position: relative;
  top: 0.2rem;
}
.columnarItem img {
  width: 0.6rem;
  height: 0.6rem;
  /* display: block; */
  float: left;
  position: relative;
  top: 0.15rem;
}
.co_money {
  float: right;
  position: relative;
  right: 0.5rem;
}
#colu_title {
  height: 0.7rem;
  line-height: 0.7rem;
  background: #efeff0;
}
#colu_title ul {
  width: 90%;
  position: relative;
  left: 5%;
}
</style>