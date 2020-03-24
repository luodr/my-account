<template>
  <!--报表-->
  <div id="report_com">
    <top title="报表"></top>
    <div class="report_option">3.1-3.31</div>
    <div class="report_info">
      <ul>
        <li>
          <div>
            <p class="report_money report_moneyNow">322.00</p>

            <p class="report_moneyType">总支出</p>
          </div>
        </li>
        <li>
          <div>
            <p class="report_money">322.00</p>

            <p class="report_moneyType">总支出</p>
          </div>
        </li>
        <li>
          <div>
            <p class="report_money">322.00</p>

            <p class="report_moneyType">总支出</p>
          </div>
        </li>
      </ul>
    </div>
    <cake></cake>

    <div class="hr_div"></div>
    <listInfo></listInfo>
  </div>
</template>

<script>
import top from "./top.vue";
import cake from "./cake.vue";
import listInfo from "./listInfo.vue";
export default {
  name: "report_com",
  path: "/report",

  components: { top, cake, listInfo },
  mounted() {},
  data() {
    return { data: null };
  },
  methods: {}
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
</style>