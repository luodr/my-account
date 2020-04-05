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
// Vue.prototype.$axios.defaults.baseURL = 'https://47.94.83.108:8080'
Vue.prototype.$axios.defaults.withCredentials = true;
Vue.prototype.$axios.defaults.baseURL = '/api'
import Vue from 'vue'
import App from './App.vue'
// import router from './router/router.js'
Vue.config.productionTip = false

import router from './router/router'
import typeMap from "./config/iconsType"

// import 'element-ui/lib/theme-chalk/index.css';
Vue.prototype.$typeMap = typeMap;

import { DatePicker, TimePicker, Collapse, Drawer, CollapseItem, } from 'element-ui';
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Collapse.name, Collapse);
Vue.component(Drawer.name, Drawer);
Vue.component(CollapseItem.name, CollapseItem);
new Vue({
  el: '#app',
  router,
  // 注入到根实例中
  components: { App },

  render: h => h(App),
  // router
}).$mount('#app')

// import r from './js/rem.js';
// r();

