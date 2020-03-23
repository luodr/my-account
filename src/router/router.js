import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)
import index from '../components/index.vue'
import add from '../components/add.vue'
import report from '../components/report.vue'
import line from '../components/line.vue'
const routes = [

    {
        path: '/', component: index, alias: '/index'
    },
    { path: '/add', component: add },
    { path: '/report', component: report },
    { path: '/line', component: line },






]
const router = new VueRouter({
    // mode: 'history',
    routes
})
export default router;
// exports= router;