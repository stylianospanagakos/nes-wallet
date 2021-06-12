import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS, TOKEN_BALANCES, TRANSACTIONS} from '../config/endpoints';
import {MAINNET_IDS} from '../config/supported_chains';
import axios from '../lib/axios';
import { vsprintf } from 'sprintf-js';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        app: {
            networks: {},
            loading: true,
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
                    loading: false,
                    responseError: ''
                },
                balances: null,
                transactions: null
            }
        }
    },
    getters: {
        networkOptions({ app }) {
            return Object.keys(app.networks).map(id => {
                return {
                    value: id,
                    title: app.networks[id].label
                }
            });
        },
        wallet({ app }) {
            return app.wallet;
        }
    },
    mutations: {
        addNetworks({ app }, payload) {
            payload.forEach(({chain_id, logo_url, label}) => {
                // for now, we only want to process the mainnet chain ids
                if (MAINNET_IDS.includes(parseInt(chain_id))) {
                    Vue.set(app.networks, chain_id, { logo_url, label });
                }
            });
        },
        updateFormField({ app }, { section, field, payload }) {
            if (typeof payload === 'boolean' || typeof payload === 'string') {
                app[section].form[field] = payload;
            } else {
                app[section].form[field] = {
                    ...app[section].form[field],
                    ...payload
                }
            }
        },
        // updateBalances({ app }, { items, error }) {
        //     if (items) {

        //     }
        //     if (error.length) {
                
        //     }
        // },
        addTransactions({ app }, payload) {
            app.wallet.transactions = payload;
        },
        toggleAppLoading({ app }, payload) {
            app.loading = payload;
        }
    },
    actions: {
        async fetchChains({ commit }) {
            commit('toggleAppLoading', true);

            const response = await axios.get(CHAINS);
            if (!response.error) {
                commit('addNetworks', response.data.data.items);
            }
            commit('toggleAppLoading', false);
        },
        async fetchWalletInfo({ commit }, { chainId, address, showTransactions }) {
            commit('updateFormField', {
                section: 'wallet',
                field: 'loading',
                payload: true
            });

            try {
                // get balances
                const balances = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
                // if (!balances.error) {
                    
                // }

                // get transactions if selected
                if (showTransactions) {
                    const transactions = await axios.get(vsprintf(TRANSACTIONS, [chainId, address]));
                    console.log(balances.data, transactions.data);
                }
            } catch (error) {
                commit('updateFormField', {
                    section: 'wallet',
                    field: 'responseError',
                    payload: error.response.data.error_message
                });
            } finally {
                commit('updateFormField', {
                    section: 'wallet',
                    field: 'loading',
                    payload: false
                });
            }
        }
    },
    modules: {
    }
})
