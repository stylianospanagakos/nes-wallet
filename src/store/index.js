import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    app: {
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
      },
      loading: false
    }
  },
  getters: {
    wallet({ app }) {
      return app.wallet;
    }
  },
  mutations: {
    updateFormField({ app }, { section, field, payload }) {
      if (typeof payload === 'boolean') {
        app[section].form[field] = payload;
      } else {
        app[section].form[field] = {
          ...app[section].form[field],
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
