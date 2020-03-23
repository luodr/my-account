import './js/rem.js'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import Vue from 'vue'
import App from './App.vue'
// import router from './router/router.js'
Vue.config.productionTip = false
import VueRouter from 'vue-router'
import router from './router/router'
Vue.use(VueRouter)



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