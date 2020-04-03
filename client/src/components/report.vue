<template>
  <!--报表-->
  <div id="report_com">
    <top title="报表"></top>
    <div class="report_option">4.1-4.30</div>
    <div class="report_info">
      <ul>
        <li>
          <div>
            <p class="report_money" :class="consume" @click="clickExpenditure">{{expend.toFixed(2)}}</p>

            <p class="report_moneyType">总支出</p>
          </div>
        </li>
        <li>
          <div>
            <p class="report_money" :class="incomes" @click="clickIncome">{{income.toFixed(2)}}</p>

            <p class="report_moneyType">总收入</p>
          </div>
        </li>
        <li>
          <div>
            <p
              class="report_money"
              :class="surplus"
              @click="clickSurplus"
            >{{(income-expend).toFixed(2)}}</p>

            <p class="report_moneyType">总结余</p>
          </div>
        </li>
      </ul>
    </div>
    <br />
    <div class="show_reportType_div">
      <ul>
        <li class="bz" :class="{click_color:isCake}" @click="clickCakeType(true)">饼图</li>
        <li class="zz" :class="{click_color:isColumnar}" @click="clickCakeType(false)">柱状</li>
      </ul>
    </div>
    <l v-if="!isCake" :data="lines" :startDraw="startDrawline"></l>
    <cake v-if="isCake" :data="cake" :startDraw="startDrawCake"></cake>
    <div class="hr_div"></div>
    <listInfo></listInfo>
  </div>
</template>

<script>
import top from "./top.vue";
import l from "./line.vue";
import cake from "./cake.vue";
import listInfo from "./listInfo.vue";
export default {
  name: "report_com",
  path: "/report",

  components: { l, top, cake, listInfo },
  mounted() {
    ///
    let date = new Date();
    this.getDate(date.getFullYear(), date.getMonth() + 1);
  },
  created() {},
  data() {
    return {
      data: null,
      income: 0,
      expend: 0,
      incomeMap: new Map(),
      expendMap: new Map(),
      surplus: "",
      incomes: "",
      consume: "report_moneyNow",
      cake: [],
      isCake: true,
      isColumnar: false,
      incomeArray: [],
      expendArray: [],
      lines: [],
      startDrawCake: false,
      startDrawline: false
    };
  },
  methods: {
    //获取数据
    getDate(year, month) {
      this.incomeMap.clear();
      this.expendMap.clear();
      this.$axios
        .post("/item/findMonthAndType", {
          year,
          month
        })
        .then(result => {
          if (result.data.code == 1) {
            this.data = result.data.data;
            for (let items of this.data) {
              if (items._id == "收入") {
                this.income = items.allMoney;
                this.getClassify(this.incomeMap, items.items);
                this.incomeArray = items.items;
              } else {
                this.expend = items.allMoney;
                this.expendArray = items.items;
                this.getClassify(this.expendMap, items.items);
              }
            }
            this.clickExpenditure();
          } else if (result.data.code == 3) {
            this.$router.push("/login");
          }
        });
    },
    getClassify(map, array) {
      for (let item of array) {
        if (map.has(item.detail)) {
          let l = map.get(item.detail);
          l.value += item.money;
        } else {
          map.set(item.detail, { name: item.detail, value: item.money });
        }
      }
    },
    mapToArray(map) {
      var list = [];
      map.forEach(value => {
        list.push(value);
      });
      return list;
    },
    //支出
    clickExpenditure() {
      this.consume = "report_moneyNow";
      this.incomes = "";
      this.surplus = "";
      this.cake = this.mapToArray(this.expendMap);
      this.lines = this.incomeArray;
      //重新画图
      this.startDrawCake = !this.startDrawCake;
      this.startDrawline = !this.startDrawline;
    },
    //收入
    clickIncome() {
      this.consume = "";
      this.incomes = "report_moneyNow";
      this.surplus = "";
      this.cake = this.mapToArray(this.incomeMap);
      this.lines = this.expendArray;
      this.startDrawCake = !this.startDrawCake;
      this.startDrawline = !this.startDrawline;
    },
    clickCakeType(is) {
      this.isCake = is;
      this.isColumnar = !is;
      
        this.startDrawCake = !this.startDrawCake;
       console.log("?????");
       
     
    },
    //转账
    clickSurplus() {
      // this.consume = "";
      // this.incomes = "";
      // this.surplus = "report_moneyNow";
    }
  }
};
</script>

<style>
#report_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
.report_option {
  width: 100%;
  height: 0.5rem;
  /* background: #f5f5f7; */
  text-align: center;
  line-height: 0.5rem;
  /* border-bottom: #f5f5f7 solid 1px; */
  /* border-top: #f5f5f7 solid 1px; */
}
.report_info {
  width: 100%;
  height: 1rem;
  background: white;
  text-align: center;

  border-bottom: #f5f5f7 solid 1px;
  border-top: #f5f5f7 solid 1px;
}
.report_info ul li {
  width: 33.33%;
  float: left;
  height: 1rem;
  list-style: none;
  vertical-align: middle;
}
.report_info ul li div {
  position: relative;
  top: 0.2rem;
}

.report_moneyNow {
  color: red;
  font-size: 0.3rem;
}
.report_mone {
  color: black;
  font-size: 0.3rem;
}
.report_moneyType {
  color: #7e7e7f;
  font-size: 0.2rem;
}
.hr_div {
  width: 100%;
  border-bottom: #b1abb8 solid 1px;
}
.show_reportType_div {
  width: 2.4rem;
  height: 25px;
  color: #7f7e7e;
  text-align: center;
  margin: 0 auto;
}
.show_reportType_div ul li {
  list-style: none;
  float: left;
  width: 1.2rem;
}
.click_color {
  color: red;
  border-bottom: red solid 1px;
}
</style>