import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS} from '../api/endpoints';
import axios from '../lib/axios';

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
            loading: true
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
        },
        toggleAppLoading({ app }, payload) {
            app.loading = payload;
        }
    },
    actions: {
        async fetchChains() {
            const response = await axios.get(CHAINS);
            console.log(response);
        }
    },
    modules: {
    }
})
