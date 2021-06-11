import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    wallet: {
      form: {
        chainOptions: [],
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
    updateFormField(state, { section, field, payload }) {
      if (typeof payload === 'boolean') {
        state[section].form[field] = payload;
      } else {
        state[section].form[field] = {
          ...state[section].form[field],
          ...payload
        }
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
