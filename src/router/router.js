import Vue from 'vue'
import VueRouter from 'vue-router'



Vue.use(VueRouter)
import index from '../components/index.vue'
import add from '../components/add.vue'
import test from '../components/test.vue'

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

exports = router;
