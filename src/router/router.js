import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)
import index from '../components/index.vue'
import add from '../components/add.vue'
import report from '../components/report.vue'
import line from '../components/line.vue'
const routes = [

    {
        path: '/', component: index, alias: '/index',
        meta: { index: 0},
    },
    { path: '/add', component: add,  meta: { index: 1 } },
    { path: '/report', component: report ,  meta: { index: 1 }},
    { path: '/line', component: line,  meta: { index: 1 } },






]
const router = new VueRouter({
    // mode: 'history',
    routes
})
export default router;
// exports= router;