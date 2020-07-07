import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)
import index from '../components/index.vue'
import add from '../components/add.vue'
import report from '../components/report.vue'

import itemInfo from '../components/itemInfo.vue'
import login from '../components/login.vue'
const routes = [

    {
        path: '/', component: index, alias: '/index',
        meta: { index: 0 },
    },
    { path: '/add', component: add, meta: { index: 1 }, name: "add" },
    { path: '/report', component: report, meta: { index: 1 } },

    { path: '/itemInfo', component: itemInfo, meta: { index: 1 }, name: "itemInfo" },
    { path: '/login', component: login, meta: { index: 1 } },
]
const router = new VueRouter({
    mode: 'history',
    routes
})
router.beforeEach((to, from, next) => {
    // 让页面回到顶部
    document.documentElement.scrollTop = 0
    // 调用 next()，一定要调用 next 方法，否则钩子就不会被销毁
   next()
})
export default router;
// exports= router;