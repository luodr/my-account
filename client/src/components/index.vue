<template>
  <div id="main">
    <div id="banner">
      <div class="content">
        <div class="banner_top">
          <div>
            <router-link to="/report">
              <img src="../assets/baobiao.png" class="baobiao_icon" />
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
            <li style="border-right: white solid 1px;">{{expend}}</li>
            <li>{{income}}</li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
    <listInfo :infos="data"></listInfo>
    <div id="add" v-on:click="add"></div>
  </div>
</template>

<script>
import listInfo from "./listInfo.vue";

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
    return { data: null, income: 0, expend: 0 };
  },
  methods: {
    add: function() {
      this.$router.push("/add");
    },
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push("/");
    },
    //获取数据
    getDate() {
      let date = new Date();
      this.$axios
        .post("/item/findMonth", {
          year: date.getFullYear(),
          month: date.getMonth()+1
        })
        .then(result => {
          if (result.data.code) {
            this.data = result.data.data;
            if (this.data) {
               this.expend=0;
               this.income=0;
              for (let item of this.data) {
                if (item.type == "支出") {
                  this.expend += item.money;
                } else {
                  this.income += item.money;
                }
              }
            }
          }
        });
    }
  }
};
</script>

<style>
#main {
  /* min-height:100vh; */
  color: white;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
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
  background: url(../assets/voice_guide_00016.png);
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
  width: 0.4rem;
  height: 0.4rem;
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