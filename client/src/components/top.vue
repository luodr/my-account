<template>
  <div id="top_com">
    <div id="com_top">
      <div id="com_titleInfo">
        <!-- 
        <h1 id="add_title" >日常账单</h1>-->
        <div style="position:absolute;top:0px;text-align:center;width:100%;font-size:0.4rem;">
          <h5>{{title}}</h5>
        </div>
        <div style="position:absolute;top:0px;float:left;text-align:left;width:100%">
          <img :src="icon_back_black" class="go_back" @click="onBack" />
        </div>
        <div class="delete-icon" @click="onDeleteClick" v-if="isDelete">
          <i class="el-icon-delete"></i>
        </div>
      </div>
    </div>
    <MessageBox v-if="showMessageBox" v-on:closeMessage="closeMessageBox" :item="massageBox"></MessageBox>
  </div>
</template>

<script>
let icon_back_black = require("@/assets/icons/icon_back_black.png");
import MessageBox from "./MessageBox";
export default {
  name: "top",
  components: { MessageBox },
  props: ["title", "isDelete", "item"],
  mounted() {},
  data() {
    return {
      data: null,
      icon_back_black,
      showMessageBox: false,
      massageBox: {
        title: "删除",
        info: "你确定要删除这条记录吗?",
        fun: () => {
          this.deleteRequest();
        }
      }
    };
  },
  methods: {
    onBack() {
      this.$router.back(-1);
    },
    closeMessageBox() {
      this.showMessageBox = false;
    },
    onDeleteClick() {
      this.showMessageBox = true;
    },
    deleteRequest() {
      this.$axios
        .post("/item/romeve", {
          _id: this.item._id
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
#com_top {
  background-repeat: no-repeat;
  background-size: cover;
  height: 1rem;

  text-align: center;
}
#com_titleInfo {
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
.delete-icon {
  float: right;
  color: #9577fd;
  width: 0.5rem;
  height: 0.5rem;
  position: relative;
  text-align: center;
  
}
</style>