import './js/rem.js'
import axios from "axios"
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios


import Vue from 'vue'
import App from './App.vue'
// import router from './router/router.js'
Vue.config.productionTip = false

import router from './router/router'
import typeMap from "./config/iconsType"

Vue.prototype.$typeMap = typeMap;
console.log(typeMap);



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

