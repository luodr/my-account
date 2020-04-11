<template>
  <div id="add_com">
    <top title="日常账单"></top>
    <div id="recordType">
      <ul>
        <li :class="{click_color:expenditure}" v-on:click="clickExpenditure">
          <span class="cur">支出</span>
        </li>
        <li :class="{click_color:income}" v-on:click="clickIncome">
          <span class="cur">收入</span>
        </li>
        <li :class="{click_color :transfer}" v-on:click="clickTransfer">
          <span class="cur">转账</span>
        </li>
      </ul>
      <!-- </div> -->
    </div>
    <br />
    <div id="money_div">
      <span class="money_type">{{detail}}</span>
      <span class="money_money">{{money}}</span>
    </div>
    <br />
    <div id="types">
      <ul>
        <li v-for="(item,index) in icons" v-bind:key="index" @click="clickType(item.detail)">
          <div>
            <img class="cur" :src="getImgUrl(item.icon)" />

            <br />
            <span class="typeIconName">{{item.detail}}</span>
          </div>
        </li>
      </ul>
    </div>
    <div id="inputInfo">
      <datetimePicker
        class="date_div"
        v-on:picker="getdatetimePickerInfo"
        :timestamp="timestamp"
        :remarkValue="remarkValue"
      ></datetimePicker>
      <div class="counter" v-if="isShowCounter">
        <div class="counter_left">
          <ul>
            <li
              class="ripple cur"
              v-for="(item,index) in counterItem"
              v-bind:key="index"
              @click="clickCounter($event)"
            >{{item}}</li>

            <li class="ripple">
              <img :src="calc_delete" class="calc_delete cur"  @click="clickDelete" />
            </li>
          </ul>
        </div>
        <div class="counter_right">
          <ul>
            <li class="ripple cur" @click="clickCounter($event)">+</li>
            <li class="ripple cur" @click="clickCounter($event)">-</li>
            <li class="ripple cur" id="ok" @click="clickOk">{{ok?"确定":"="}}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datetimePicker from "./datetimePicker.vue";
import top from "./top.vue";
import icons from "../config/icon";

let calc_delete = require("@/assets/icons/calc_delete.png");
export default {
  name: "add_com",
  path: "/add",

  components: { datetimePicker, top },
  data() {
    return {
      data: null,
      expenditure: true,
      income: false,
      transfer: false,
      remarkValue: "",
      detail: "餐饮",
      type: "支出",
      money: 0.0,
      isShowCounter: true,
      counterItem: [1, 2, 3, 4, 5, 6, 7, 8, 9, ".", 0],
      countDot: 0,
      dot: false,
      nowMoney: 0,
      calc_delete,
      nums: [],
      icons: icons.expend,
      operators: [],
      last: 0,
      ok: true,
      timestamp: new Date().getTime(),
      remark: ""
    };
  },
  mounted() {
    if (this.$route.query) {
      //如果是修改
      this.data = this.$route.query;
      if (this.data._id) {
        this.remarkValue = this.data.remark;
        this.type = this.data.type;
        this.getdatetimePickerInfo(
          new Date(this.data.date).getTime(),
          this.remark
        );
        if (this.type == "支出") {
          this.clickExpenditure();
        } else {
          this.clickIncome();
        }
        this.detail = this.data.detail;
        this.money = this.data.money;
      }
    }
  },
  methods: {
    //支出
    clickExpenditure() {
      this.expenditure = true;
      this.income = false;
      this.transfer = false;
      this.type = "支出";
      this.icons = icons.expend;
      this.detail = "餐饮";
    },
    getImgUrl(icon) {
      return require("@/assets/icons/" + icon);
    },
    //收入
    clickIncome() {
      this.expenditure = false;
      this.income = true;
      this.transfer = false;
      this.icons = icons.income;
      this.type = "收入";
      this.detail = "薪资";
    },
    //转账
    clickTransfer() {
      //暂时不需要转账记录
      // this.expenditure = false;
      // this.income = false;
      // this.transfer = true;
      // this.type = "转账";
    },
    clickType(detail) {
      this.detail = detail;
    },
    //键盘点击
    clickCounter(event) {
      var el = event.currentTarget;
      let num = el.innerHTML;

      if (!/^\d+$/.test(num)) {
        // this.money = this.money + "" + num;
        switch (num) {
          case ".":
            if (this.nowMoney.toString().indexOf(".") == -1) {
              if (this.nowMoney == 0 || this.nowMoney == "") {
                this.nowMoney = 0 + ".";
              } else {
                this.nowMoney = this.nowMoney + ".";
              }
            }
            break;
          case "+":
            this.pushNum();
            if (this.last == "+" || this.last == "-") {
              this.operators.pop();
            }
            this.operators.push("+");
            break;
          case "-":
            this.pushNum();
            if (this.last == "+" || this.last == "-") {
              this.operators.pop();
            }
            this.operators.push("-");
            break;
        }
      } else {
        //不能超过小数点后两位
        if (
          this.nowMoney.toString().indexOf(".") > -1 &&
          this.nowMoney.toString().split(".")[1].length >= 2
        ) {
          return;
        }
        if (
          this.nowMoney != "0." &&
          Number(this.nowMoney) == 0 &&
          Number(num) != 0
        ) {
          this.nowMoney = num;
        } else {
          if (this.nowMoney == "0") {
            this.nowMoney = Number(this.nowMoney + num);
          } else {
            this.nowMoney = this.nowMoney + "" + num;
          }
        }
      }
      this.last = num;

      //  this.money=this.money+""+num;
      this.joint();
    },
    joint() {
      //拼接字符串
      let index = 0;
      this.money = "";
      for (let l = 0; l < this.nums.length; l++) {
        this.money = this.money + "" + this.nums[l];
        if (l < this.operators.length)
          this.money = this.money + this.operators[index++];
      }
      // if (this.nowMoney != 0){
      this.money = this.money + "" + this.nowMoney;
      //}
      this.isOK();
    },
    //点击删除
    clickDelete() {
      if (this.nowMoney == 0 || this.nowMoney == "") {
        if (this.operators.length >= this.nums) {
          this.operators.pop();
        } else {
          this.nowMoney = this.nums.pop();
        }
      } else {
        this.nowMoney = this.nowMoney.substr(0, this.nowMoney.length - 1);
      }
      this.joint();
    },
    //点击确定
    clickOk() {
      this.pushNum();
      this.money = "";
      this.isOK();
      let index = 0;
      for (let l = 0; l < this.nums.length; l++) {
        if (l == 0) {
          this.money = Number(this.nums[l]);
        } else {
          switch (this.operators[l - 1]) {
            case "+":
              this.money += Number(this.nums[l]);
              break;
            case "-":
              this.money -= Number(this.nums[l]);
              break;
          }
        }
      }
      this.nums = [];
      this.operators = [];
      this.nowMoney = this.money + "";

      if (this.ok && this.money != 0) {
        console.log(this.data._id);

        //是否修改
        if (this.data && this.data._id) {
          this.modification();
        } else {
          this.addRequest();
        }
      }
    },
    modification() {
      this.$axios
        .post("/item/modify", {
          _id: this.data._id,
          type: this.type,
          detail: this.detail,
          money: this.money,
          date: this.timestamp,
          // phoneNumber: this.$user.phoneNumber,
          remark: this.remark
        })
        .then(result => {
          // alert("????");
          if (result.data.code == 1) {
            this.$router.replace({
              path: "/itemInfo",
              query: {
                _id: this.data._id,
                type: this.type,
                detail: this.detail,
                money: this.money,
                date: this.timestamp,
                remark: this.remark
              }
            });
          } else if (result.data.code == 3) {
            this.$toLogin(this);
          }
        });
    },
    pushNum() {
      //把数字放进数组
      if (this.nowMoney == 0 || this.nowMoney == "0.") {
        return;
      }
      if (this.last == ".")
        this.nowMoney = this.nowMoney.substr(0, this.nowMoney.length - 1);
      this.nums.push(this.nowMoney);
      this.nowMoney = 0;
    },
    calculator_hide() {
      //this.isShowCounter = false;
    },
    calculator_show() {
      this.isShowCounter = true;
    },
    isOK() {
      //是显示确定还是等于
      if (this.money.indexOf("+") > -1 || this.money.indexOf("-") > -1) {
        this.ok = false;
      } else {
        this.ok = true;
      }
    },
    getdatetimePickerInfo(timestamp, remark) {
      this.timestamp = timestamp;
      this.remark = remark;
    },
    addRequest() {
      this.$axios
        .post("/item/add", {
          type: this.type,
          detail: this.detail,
          money: this.money,
          date: this.timestamp,
          // phoneNumber: this.$user.phoneNumber,
          remark: this.remark
        })
        .then(result => {
          // alert("????");
          if (result.data.code == 1) {
            this.data = result.data.data;
            this.$router.back(-1);
          } else if (result.data.code == 3) {
            this.$toLogin(this);
          }
        });
    }
  }
};
</script>

<style>
#add_com {
  width: 100%;

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
  max-width: 450px;
  height: 5rem;
  position: absolute;
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