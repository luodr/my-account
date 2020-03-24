<template>
  <div id="add_com">

    














    <top title="日常账单"></top>
    <div id="recordType">
      <ul>
        <li :class="{click_color:expenditure}" v-on:click="clickExpenditure">支出</li>
        <li :class="{click_color:income}" v-on:click="clickIncome">收入</li>
        <li :class="{click_color :transfer}" v-on:click="clickTransfer">转账</li>
      </ul>
      <!-- </div> -->
    </div>
    <br />
    <div id="money_div">
      <span class="money_type">{{type}}</span>
      <span class="money_money">{{money}}</span>
    </div>
    <br />
    <div id="types">
      <ul>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/wucan.png" />
            <br />
            <span class="typeIconName">晚餐</span>
          </div>
        </li>
      </ul>
    </div>
<div id="inputInfo">
      <datetimePicker
        class="date_div"
        v-on:calculator_hide="calculator_hide"
        v-on:calculator_show="calculator_show"
      ></datetimePicker>
      <div class="counter" v-if="isShowCounter">
        <div class="counter_left">
          <ul>
            <li
              class="ripple"
              v-for="(item,index) in counterItem"
              v-bind:key="index"
              @click="clickCounter($event)"
            >{{item}}</li>

            <li class="ripple">
              <img src="../assets/calc_delete.png" class="calc_delete" />
            </li>
          </ul>
        </div>
        <div class="counter_right">
          <ul>
            <li class="ripple" @click="clickCounter($event)">+</li>
            <li class="ripple" @click="clickCounter($event)">-</li>
            <li class="ripple" id="ok">=</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datetimePicker from "./datetimePicker.vue";
import top from "./top.vue";

export default {
  name: "add_com",
  path: "/add",

  components: { datetimePicker, top },
  data() {
    return {
      expenditure: true,
      income: false,
      transfer: false,
      type: "餐饮",
      money: 0.0,
      isShowCounter: true,
      counterItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0],
      countDot: 0
    };
  },
  methods: {
    //支出
    clickExpenditure() {
      this.expenditure = true;
      this.income = false;
      this.transfer = false;
    },
    //收入
    clickIncome() {
      this.expenditure = false;
      this.income = true;
      this.transfer = false;
    },
    //转账
    clickTransfer() {
      this.expenditure = false;
      this.income = false;
      this.transfer = true;
    },
    //键盘点击
    clickCounter(event) {
      var el = event.currentTarget;
      let num = el.innerHtML;
      //  this.money=this.money+""+num;
    },
    calculator_hide() {
      //this.isShowCounter = false;
    },
    calculator_show() {
      this.isShowCounter = true;
    }
  },

  goBack() {
    // window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
  }
};
</script>

<style>
#add_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
}
#recordType {
  width: 50%;
  margin: 0 auto;
  height: 0.5rem;
}
#recordType ul li {
  list-style: none;
  float: left;
  width: 33.333%;
  font-size: 0.3rem;
  text-align: center;
}
.click_color {
  color: red;
  border-bottom: red solid 1px;
}
#money_div {
  width: 100%;
  background: #819bfa;
  height: 1.2rem;
}
.money_type {
  font-size: 0.4rem;
  line-height: 1.2rem;
  position: relative;
  left: 0.3rem;
  color: white;
}
.money_money {
  font-size: 0.4rem;
  line-height: 1.2rem;
  float: right;
  position: relative;
  right: 0.3rem;
  color: #dcdcdf;
}
#types ul li {
  list-style: none;
  width: 25%;
  float: left;
  text-align: center;
}
#types ul li img {
  width: 0.7rem;
  height: 0.7rem;
}
.typeIconName {
  font-size: 0.3rem;
  line-height: 0.6rem;
}
#inputInfo {
  background: white;
  width: 100%;
  max-width: 600px;
  height: 5rem;
  position:absolute;
  bottom: 0;

  /* max-height: 50%; */
  /* margin-top: -5rem; */
}
.date_div {
  width: 100%;
  background: white;

  height: 1rem;
  vertical-align: middle;
  border-bottom: #c3c0c0 solid 1px;
}
.counter {
  width: 100%;
  height: 4rem;
  vertical-align: middle;
}
.counter_left {
  width: 80%;
  display: inline-block;
}
.counter_left ul li {
  width: 33.333%;
  text-align: center;
  line-height: 1rem;
  height: 1rem;
  float: left;
  list-style: none;
}
.counter_right {
  width: 20%;
  display: inline-block;
}
#ok {
  line-height: 2rem;
  height: 2rem;
  background: linear-gradient(#72b7fc, #9577fd);
}
.counter_right ul li {
  list-style: none;
  line-height: 1rem;
  height: 1rem;
  text-align: center;
  width: 100%;
  float: left;
}
.calc_delete {
  width: 0.5rem;
  height: 0.5rem;
  display: inline-block;
  vertical-align: middle;
}
</style>