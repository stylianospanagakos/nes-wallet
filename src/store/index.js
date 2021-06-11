import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wallet: {
      form: {
        chainId: {
          value: '',
          error: ''
        },
        address: {
          value: '',
          error: ''
        },
        showTransactions: false,
        loading: false
      }
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
