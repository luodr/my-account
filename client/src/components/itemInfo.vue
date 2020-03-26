<template>
  <div id="itemInfo_com">
    <top title="详情"></top>
    <div id="itemeInfo">
      <div class="itemTitleAndMoney">
        <img src="../assets/wucan.png" class="itemImg" />
        <span class="itemTitle">晚餐</span>
        <span class="itemMoney">666</span>
      </div>
      <div class="item_detail">
        <span class="itemTitle">类型</span>
        <span class="detail">支出</span>
      </div>

      <div class="item_detail">
        <span class="itemTitle">账户</span>
        <span class="detail">无</span>
      </div>
      <div class="item_detail">
        <span class="itemTitle">备注</span>
        <span class="detail">吃了好吃的</span>
      </div>
    </div>
   <div id="delete" v-on:click="onDeleteClick"></div>
  </div>
</template>

<script>
import top from "./top.vue";

export default {
  name: "add_com",
  path: "/add",

  components: { top },
  data() {
    return {};
  },
  methods: {
    onDeleteClick(){
      //删除之后返回上一页
     this.$router.back(-1);
    }
  }
};
</script>

<style>
#itemInfo_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
}
#itemeInfo {
  width: 80%;
  height: 3.5rem;
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
  background: url(../assets/delete1.png);
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 999;
}
</style>