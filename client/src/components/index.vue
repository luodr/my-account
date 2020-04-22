<template>
  <div id="main">
    <div class="container"></div>
    <div id="banner">
      <div class="content">
        <div class="banner_top">
          <div>
            <span @click="drawer = true" class="el-icon-setting setting_icon cur"></span>

            <router-link to="/report">
              <!-- <img :src="baobiao_png" class="baobiao_icon" /> -->
              <span class="el-icon-pie-chart baobiao_icon cur"></span>
            </router-link>
          </div>
        </div>

        <div class="bannerbottom">
          <ul class="month_title">
            <li>本月支出</li>
            <li>本月收入</li>
            <li></li>
          </ul>
          <ul class="month_info">
            <li style="border-right: white solid 1px;">{{Number(expend).toFixed(2)}}</li>
            <li>{{Number(income ).toFixed(2)}}</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <listInfo :infos="data"></listInfo>
    <div id="add" class="cur" v-on:click="add"></div>

    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      :size="size"
      :wrapperClosable="true"
      :with-header="false"
      :modal-append-to-body="false"
      class="drawer"
      :modal="true"
    >
      <br />

      <div class="message_but el-button" @click="toLogin" v-if="!isLogin">点我登录</div>
      <br />
      <br />
      <br />
      <br />

      <span v-if="isLogin">啥也没有先占位</span>
    </el-drawer>
  </div>
</template>

<script>
import listInfo from "./listInfo.vue";

let baobiao_png = require("@/assets/icons/baobiao.png");
export default {
  name: "index",
  path: "/",

  components: {
    listInfo
  },
  mounted() {
    this.getDate();
  },
  data() {
    return {
      data: null,
      income: 0,
      expend: 0,
      baobiao_png,
      drawer: false,
      direction: "ltr",
      isLogin: false,
      size: "50%"
    };
  },
  methods: {
    add: function() {
      this.$router.push("/add");
    },
    toLogin: function() {
      this.$router.push("/login");
    },
    handleClose(done) {
      done();
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    setExpendAndIncome() {
      if (this.data) {
        this.expend = 0;
        this.income = 0;
        for (let item of this.data) {
          if (item.type == "支出") {
            this.expend += item.money;
          } else {
            this.income += item.money;
          }
        }
      }
    },
    //获取数据
    getDate() {
      let date = new Date();
      this.$axios
        .post("/item/findMonth", {
          year: date.getFullYear(),
          month: date.getMonth() + 1
        })
        .then(result => {
          if (result.data.code == 1) {
            this.data = result.data.data;
            this.isLogin = true;
            this.setExpendAndIncome();
          } else if (result.data.code == 3) {
            //没登陆,使用测试数据
            this.data = this.$testInfo.indexData;
            this.setExpendAndIncome();
          }
        })
        .catch(() => {
          //链接不上服务器,使用测试数据
          this.data = this.$testInfo.indexData;
          this.setExpendAndIncome();
        });
    }
  }
};
</script>

<style>
#main {
  min-height: 100vh;
  color: white;
  width: 100%;
  
  margin: 0 auto;
  /* min-height: 100%; */
  /* background: url(../assets/banner.png); */
}

#banner {
  background: linear-gradient(#72b7fc, #9577fd);
  background-repeat: no-repeat;
  background-size: cover;
  height: 3rem;
  text-align: center;
}
#add {
  width: 50px;
  height: 50px;
  position: fixed;
  left: 50%;
  bottom: 1rem;
  /* margin-top:-50px; */
  margin-left: -25px;
  background: url(../assets/icons/voice_guide_00016.png);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 999;
}
.banner_top {
  height: 1.2rem;
}

.bannerbottom ul li {
  width: 49%;
  float: left;

  list-style: none;
}
.month_info {
  position: relative;
  top: 0.3rem;
  /* font-size: 0.3rem; */
  vertical-align: middle;
}
.banner_top div {
  width: 95%;
  position: relative;
  top: 0.5rem;
}
.baobiao_icon {
  float: right;
  width: 0.8rem;
  height: 0.8rem;
  color: white;
}
.setting_icon {
  float: left;
  width: 0.8rem;
  height: 0.8rem;
  color: white;
  position: relative;
  left: 0.5rem;
}
.drawer {
  color: black;
  position: absolute;
  z-index: 999;
  text-align: center;
}
.el-drawer__container {
  background: rgba(0, 0, 0, 0.5);
}
/* }
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
} */
</style>