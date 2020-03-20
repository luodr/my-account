import './js/rem.js'


import Vue from 'vue'
import App from './App.vue'
// import router from './router/router.js'
Vue.config.productionTip = false
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import index from './components/index.vue'
import add from './components/add.vue'
import test from './components/test.vue'

const routes = [

    {
        path: '/', component: index, alias: '/index'
    },
    { path: '/add', component: add },
    { path: '/test', component: test }


]
const router = new VueRouter({
    // mode: 'history',
    routes
})


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