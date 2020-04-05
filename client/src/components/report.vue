<template>
  <!--报表-->
  <div id="report_com">
    <top title="报表"></top>
    <div class="report_option">
      <div class="block">
        <el-date-picker
          v-model="choose"
          type="month"
          align="center"
          clear-icon="false"
          placeholder="选择月"
          :editable="false"
        ></el-date-picker>
      </div>
    </div>
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
    <columnar v-if="!isCake" :data="columnars"></columnar>
    <cake v-if="isCake" :data="cake"></cake>
    <div class="hr_div" v-if="isCake" ></div>
    <cakelist v-if="isCake" :cakeMap="this.cakeMap" :allMoney="allMoney"></cakelist>
    <columnarlist v-if="!isCake" :columnarMap="this.columnarMap" ></columnarlist>
  </div>
</template>

<script>
import top from "./top.vue";
import columnar from "./columnar.vue";
import cake from "./cake.vue";
import cakelist from "./cakelist";
import columnarlist from "./columnarlist";
export default {
  name: "report_com",
  path: "/report",

  components: { columnar, top, cake, cakelist, columnarlist },
  mounted() {
    this.getDate(this.choose.getFullYear(), this.choose.getMonth() + 1);
  },
  created() {},
  watch: {
    choose: function() {
      this.getDate(this.choose.getFullYear(), this.choose.getMonth() + 1);
    }
  },

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
      cakeMap: null,
      columnars: [],
      choose: new Date(),
      allMoney: 0,
      columnarMap: new Map()
    };
  },
  methods: {
    //重置数据
    resetData() {
      this.income = 0;
      this.expend = 0;
      this.incomeArray = [];
      this.expendArray = [];
      this.incomeMap = new Map();
      this.expendMap = new Map();
      this.columnarMap = new Map();
    },
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
            //重置数据
            this.resetData();
            for (let items of this.data) {
              if (items._id == "收入") {
                this.income = items.allMoney;
                this.getClassify(this.incomeMap, items.items);
                this.incomeArray = items.items;
                this.setColumnarMap(items.items);
              } else {
                this.expend = items.allMoney;
                this.expendArray = items.items;
                this.getClassify(this.expendMap, items.items);
                this.setColumnarMap(items.items);
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
          l.items.push(item);
        } else {
          map.set(item.detail, {
            name: item.detail,
            value: item.money,
            items: [item]
          });
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
      this.columnars = this.expendArray;
      this.allMoney = this.expend;
      this.setCakeMap();
    },
    //收入
    clickIncome() {
      this.consume = "";
      this.incomes = "report_moneyNow";
      this.surplus = "";
      this.cake = this.mapToArray(this.incomeMap);
      this.columnars = this.incomeArray;
      this.setCakeMap();

      this.allMoney = this.income;
    },
    clickCakeType(is) {
      this.isCake = is;
      this.isColumnar = !is;

      if (this.isCake) {
        this.$emit("cakeRraw");
      } else {
        this.$emit("columnarRraw");
      }
    },
    setCakeMap() {
      if (this.consume != "") {
        this.cakeMap = this.expendMap;
      } else {
        this.cakeMap = this.incomeMap;
      }
    },
    //转账
    clickSurplus() {
      // this.consume = "";
      // this.incomes = "";
      // this.surplus = "report_moneyNow";
    },
    setColumnarMap(array) {
      for (let item of array) {
        let d = new Date(item.date);
        let income = 0;
        let expend = 0;
        item.type == "收入" ? (income = item.money) : (expend = item.money);
        if (this.columnarMap.has(d.getDate())) {
          let obj = this.columnarMap.get(d.getDate());
          obj.income += income;
          obj.expend += expend;
          obj.items.push(item);
        } else {
          this.columnarMap.set(d.getDate(), {
            income,
            expend,
            month:d.getMonth()+1,
            items: [item]
          });
        }
      }
    }
  }
};
</script>

<style>
#report_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  height: 100vh;
}
.report_option {
  /* width: 10%; */
  height: 1rem;
  /* background: #f5f5f7; */
  text-align: center;
  line-height: 0.5rem;
  margin: 0 auto;

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
  color: #9378fb;
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
.el-input__inner {
  border: none;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 2.5rem;
}
.click_color {
  color: #9378fb;
  border-bottom: #9378fb solid 1px;
}
</style>