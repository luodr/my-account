<template>
  <div id="add_com">
    <div id="add_top">
      <div id="add_titleInfo">
        <!-- 
        <h1 id="add_title" >日常账单</h1>-->
        <div style="position:absolute;top:0px;text-align:center;width:100%;font-size:0.4rem;">
          <h5>日常账本</h5>
        </div>
        <div style="position:absolute;top:0px;float:left;text-align:left;width:100%">
          <router-link to="/">
            <img src="../assets/icon_back_black.png" class="go_back" />
          </router-link>
        </div>
      </div>
    </div>
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
     
        <datetimePicker class="date_div"></datetimePicker>
      
    </div>
  </div>
</template>

<script>
import datetimePicker from "./datetimePicker.vue";

export default {
  name: "add_com",
  path: "/add",
  components: { datetimePicker },
  data() {
    return {
      expenditure: true,
      income: false,
      transfer: false,
      type: "餐饮",
      money: "0.00"
    };
  },
  methods: {
    clickExpenditure() {
      this.expenditure = true;
      this.income = false;
      this.transfer = false;
    },
    clickIncome() {
      this.expenditure = false;
      this.income = true;
      this.transfer = false;
    },
    clickTransfer() {
      this.expenditure = false;
      this.income = false;
      this.transfer = true;
    }
  },
  goBack() {
    window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
  }
};
</script>

<style>
#add_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}
#add_top {
  background-repeat: no-repeat;
  background-size: cover;
  height: 1rem;

  text-align: center;
}
#add_titleInfo {
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
  background: cornflowerblue;
  width: 100%;
  height: 5rem;
  position: absolute;
  bottom: 0;
  /* max-height: 50%; */
  max-width: 600px;
}
.date_div {
  width: 100%;
  background: white;
  height: 1rem;
  vertical-align:middle;

}
</style>