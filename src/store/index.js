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
                    loading: false
                }
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
        addNetwork({ app }, { chain_id, logo_url, label }) {
            Vue.set(app.networks, chain_id, { logo_url, label });
        },
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
        async fetchChains({ commit }) {
            commit('toggleAppLoading', true);

            const response = await axios.get(CHAINS);
            if (!response.error) {
                const { items } = response.data.data;
                items.forEach(item => {
                    // for now, we only want to process the mainnet chain ids
                    if (MAINNET_IDS.includes(parseInt(item.chain_id))) {
                        commit('addNetwork', item);
                    }
                });
            }
            commit('toggleAppLoading', false);
        },
        async fetchWalletInfo({ commit }, { chainId, address, showTransactions }) {
            commit('updateFormField', {
                section: 'wallet',
                field: 'loading',
                payload: true
            });

            // get balances
            const balances = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));

            // get transactions if selected
            if (showTransactions) {
                const transactions = await axios.get(vsprintf(TRANSACTIONS, [chainId, address]));
                console.log(balances.data, transactions.data);
            }
        }
    },
    modules: {
    }
})
