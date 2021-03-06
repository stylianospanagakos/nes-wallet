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
    // this generates a separate chunk (wallet.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "wallet" */ '../views/wallet/Main.vue')
  },
  {
    path: '/wallets/:wallet/transactions',
    name: 'transactions',
    // route level code-splitting
    // this generates a separate chunk (transactions.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "transactions" */ '../views/transactions/Main.vue')
  },
  {
    path: '/wallets/:wallet/tokens/:token/:symbol/history',
    name: 'history',
    // route level code-splitting
    // this generates a separate chunk (history.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "history" */ '../views/history/Main.vue')
  },
  {
    path: '/wallets/:wallet/tokens/:token/:symbol/transfers',
    name: 'transfers',
    // route level code-splitting
    // this generates a separate chunk (transfers.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "history" */ '../views/transfers/Main.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
