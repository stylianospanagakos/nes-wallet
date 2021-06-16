import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/wallets/:wallet',
    name: 'wallet',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/wallet/Main.vue')
  },
  {
    path: '/wallets/:wallet/tokens/:token/history',
    name: 'history',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/wallet/Main.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
