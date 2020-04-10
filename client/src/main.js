import './js/rem.js'
import axios from "axios"
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.prototype.$axios = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': "application/json;charset=utf-8"
  }
});
// Vue.prototype.$axios.defaults.withCredentials = true;
// Vue.prototype.$axios.defaults.baseURL = 'https://47.94.83.108:8080' + '/api';
Vue.prototype.$axios.defaults.baseURL = '/api';
// Vue.prototype.$axios.defaults.baseURL = '/api'
import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

import router from './router/router'
import typeMap from "./config/iconsType"
import testInfo from "./config/testInfo"
Vue.prototype.$typeMap = typeMap;
Vue.prototype.$testInfo = testInfo;


import { DatePicker, TimePicker, Collapse, Drawer, CollapseItem, Message  } from 'element-ui';
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Collapse.name, Collapse);
Vue.component(Drawer.name, Drawer);
Vue.component(CollapseItem.name, CollapseItem);
Vue.prototype.$message = Message;


new Vue({
  el: '#app',
  router,
  // 注入到根实例中
  components: { App },

  render: h => h(App),

}).$mount('#app')

Vue.prototype.$toLogin=function(_this){
  _this.$message({
    message: "请登录",
    type: "warning",
    center: true,
    customClass: "massege",
    duration:1000
  });
  _this.$router.replace("/login");
}


