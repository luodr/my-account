<template>
  <div id="itemInfo_com">
    <top title="详情" :isDelete="true" :item="data"></top>
    <div id="itemeInfo">
      <div class="itemTitleAndMoney">
        <img :src="getImgUrl(data.detail)" class="itemImg" />
        <span class="itemTitle">{{data.detail}}</span>
        <span class="itemMoney">{{data.money}}</span>
      </div>
      <div class="item_detail">
        <span class="itemTitle">类型</span>
        <span class="detail">{{data.type}}</span>
      </div>

      <div class="item_detail">
        <span class="itemTitle">账户</span>
        <span class="detail">无</span>
      </div>
      <div class="item_detail">
        <span class="itemTitle">备注</span>
        <span class="detail">{{data.remark}}</span>
      </div>

      <div id="compile_button" class="cur" @click="onClickCompile">编辑</div>
    </div>
  </div>
</template>

<script>
import top from "./top.vue";
export default {
  name: "add_com",
  path: "/add",

  components: { top },
  data() {
    return {
      data: {
        detail: "",
        money: 0,
        type: "",
        remark: ""
      }
    };
  },

  mounted() {
    if (this.$route.query) {
      this.data = this.$route.query;
    }
  },
  methods: {
    getImgUrl(type) {
      if (type) return require("@/assets/icons/" + this.$typeMap.get(type));
    },
    onClickCompile() {
      this.$router.replace({ path: "/add", query: this.data });
    }
  }
};
</script>

<style>
#itemInfo_com {
  width: 100%;
  margin: 0 auto;
  min-height: 100%;
}
#itemeInfo {
  width: 80%;
  height: 4rem;
  /* background: #fffffd; */
  position: relative;
  top: 1rem;
  margin: 0 auto;
  border-radius: 15px;
  border: #9577fd solid 1px;
}
.itemTitleAndMoney {
  width: 90%;
  height: 1.2rem;
  margin: 0 auto;
  border-bottom: 1px solid #9577fd;
  line-height: 1rem;
  display: flex;
  align-items: center;
}
.itemImg {
  width: 0.8rem;
  height: 0.8rem;
}
.itemTitle {
  position: relative;
  left: 0.3rem;
}
.itemMoney {
  float: right;
  position: absolute;
  right: 0.5rem;
}
.item_detail {
  height: 0.766rem;
  line-height: 0.766rem;
}
.detail {
  float: right;
  position: absolute;
  right: 0.5rem;
  color: #999595;
}

#delete {
  width: 50px;
  height: 50px;
  position: fixed;
  left: 50%;
  bottom: 1rem;
  /* margin-top:-50px; */

  margin-left: -25px;
  background: url(../assets/icons/delete1.png);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 999;
}
#compile_button {
  width: 3rem;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  background: #9577fd;
  border-radius: 25px;
  position: relative;
  margin: 0 auto;

}
</style>