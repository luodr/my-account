<template>
  <div id="MessageBox" @click="onMessageBoxClick">
    <div class="message_box" @click.stop>
      <div class="message_title">
        <span>{{item.title}}</span>
        <span class="el-icon-close" style="float:right" @click="onMessageBoxClick"></span>
      </div>
      <div class="messageBox_Info">
        <p>{{item.info}}</p>
      </div>
      <div class="messageBox_bt">
        <div class="message_but el-button" @click="onOKClick">确定</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
#MessageBox {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  z-index: 99;
}
.message_box {
  width: 80%;
  max-width: 300px;

  position: relative;
  top: 30%;
  margin: 0 auto;
  background: white;
}
.message_title {
  width: 90%;
  margin: 0 auto;
  position: relative;
  padding: 10px 10px;
  font-size: 18px;
  line-height: 1;
  color: #303133;
}
.messageBox_Info {
  padding: 5px 10px;
  position: relative;
  color: #606266;
  font-size: 14px;
  width: 90%;
  margin: 0 auto;
}
.messageBox_bt {
  padding: 10px 10px;
  display: flex;
  justify-content: flex-end;
}
.message_but {
  color: #fff;
  cursor: pointer;
  background-color: #409eff;
  border-color: #409eff;
  border-radius: 3px;
  padding: 9px 15px;
  color: white;
}
</style>
<script>
export default {
  name: "MessageBox",
  props: ["item"],
  data: function() {
    return {
      data: {
        title: "标题",
        info: "这里是提示信息",
        fun: function() {}
      }
    };
  },
  mounted(){
      this.data=this.item;
  },
  methods: {
    onMessageBoxClick: function() {
     
     this.$emit("closeMessage",false);
    },
    onOKClick: function() {
      if (this.data) this.data.fun();
    }
  }
};
</script>