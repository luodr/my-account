<template>
  <div id="login_com">
    <top></top>
    <div class="login_div">
      <div class="login_title">
        <h3>注册/登录</h3>
      </div>
      <div class="input_div">
        <div class="iconAndInput">
          <!-- <img class="login_icon" src="../assets/phone.png" /> -->
          <input placeholder="请输入手机号" v-model="PhoneNumber" class="login_input" />
        </div>
      </div>
      <div class="input_div">
        <div class="iconAndInput">
          <!-- <img class="login_icon" src="../assets/securityCode.png" /> -->
          <input placeholder="验证码" v-model="securityCode" class="login_input" />
        </div>
        <div class="getCodeBT" @click="getCode">{{hint}}</div>
      </div>
      <div class="login_bt" @click="login">登录</div>
    </div>
    <div class="toast" v-show="toastShow">{{toastText}}</div>
  </div>
</template>

<script>
import top from "../components/top";
import Vue from "vue";
export default {
  name: "login",
  components: { top },

  mounted() {},
  data() {
    return {
      hint: "获取验证码",
      send: false,
      toastText: "",
      toastShow: false,
      endTIme: 0,
      PhoneNumber: "",
      securityCode: ""
    };
  },
  methods: {
    onBack() {
      this.$router.back(-1);
    },
    getCode() {
      if (!this.checkPhone(this.PhoneNumber)) {
        this.toast("请输入正确的手机号码");
      } else if (!this.send) {
        this.$axios
          .post("/login/send", {
            PhoneNumber: this.PhoneNumber
          })
          .then(response => {
            if (response.data.code == 1) {
              this.toast("获取验证码成功");
              this.send = true;
              this.endTIme = Date.now() + 1000 * 60;
              let interval = setInterval(() => {
                let now = Date.now();
                if (this.endTIme <= now) {
                  this.send = false;
                  this.hint = "获取验证码";
                  clearInterval(interval);
                } else {
                  let m = parseInt((this.endTIme - now) / 1000);
                  this.hint = `已发送(${m})秒`;
                }
              }, 1000);
            } else {
              this.toast("获取失败!请稍后重试");
            }
          })
          .catch(error => {
            this.toast("获取失败!请稍后重试");
          });
      }
    },
    login() {
      if (!this.checkPhone(this.PhoneNumber)) {
        this.toast("请输入正确的手机号码");
      } else if (!this.securityCode) {
        this.toast("请输入验证码");
      } else {
        this.$axios
          .post("/login/verify", {
            PhoneNumber: this.PhoneNumber,
            securityCode: this.securityCode
          })
          .then(response => {
            if (response.data.code == 1) {
              Vue.prototype.$user = response.data.data;
              this.toast("登录成功!");
              this.$router.push("/index");
            } else {
              this.toast("验证码错误!");
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    toast(str) {
      let v = this;
      v.toastText = str;
      v.toastShow = true;
      setTimeout(function() {
        v.toastShow = false;
      }, 1000);
    },
    checkPhone(phone) {
      if (!/^1[3456789]\d{9}$/.test(phone)) {
        return false;
      }
      return true;
    }
  }
};
</script>

<style>
#login_com {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100%;
}
.login_title {
  width: 85%;
  margin: 0 auto;
}
.input_div {
  height: 1.2rem;
  border-bottom: #a4a4a4 solid 1px;
  width: 85%;
  margin: 0 auto;
  position: relative;
}
.login_icon {
  height: 0.7rem;

  width: 0.7rem;
}
.login_input {
  border-style: none none none none; /*  上 右 下  左 */
  outline: 0;
  width: 150px;
  background-color: transparent;
}
.getCodeBT {
  width: 100px;
  line-height: 0.6rem;
  border-radius: 5px;
  text-align: center;
  color: #9378fb;
  float: right;
  position: relative;
  top: 0.25rem;
  vertical-align: middle;
  border: 1px solid #9378fb;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.iconAndInput {
  float: left;
  align-items: center;
  display: flex;

  height: 1.2rem;
}
.login_bt {
  height: 1rem;
  width: 60%;

  margin: 0 auto;
  position: relative;
  top: 1.5rem;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  background: linear-gradient(#72b7fc);
  text-align: center;
  line-height: 1rem;
  font-size: 0.4rem;
  border-radius: 15px;
}
.login_div {
  position: relative;
  top: 0.5rem;
}
.toast {
  position: fixed;
  z-index: 2000;
  left: 50%;
  top: 60%;
  transition: all 0.5s;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  -o-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  border-radius: 5px;
  color: #fff;
  background: rgba(17, 17, 17, 0.5);
  height: 45px;
  line-height: 45px;
  padding: 0 15px;
}
</style>