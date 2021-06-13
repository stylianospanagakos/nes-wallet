import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS, TOKEN_BALANCES, TRANSACTIONS} from '../config/endpoints';
import {MAINNET_IDS} from '../config/supported_chains';
import {formatTokenBalance, formatFiatValue} from '../lib/helpers';
import axios from '../lib/axios';
import { vsprintf } from 'sprintf-js';
import moment from 'moment';

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
                balances: {
                    items: null,
                    total: 0
                },
                transactions: {
                    items: null,
                    visible: false
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
        addBalances({ app }, payload) {
            app.wallet.balances.total = 0;
            app.wallet.balances.items = payload.map(item => {
                app.wallet.balances.total += item.quote;
                return {
                    ...item,
                    balance_formatted: formatTokenBalance(item.balance, item.contract_decimals),
                    quote_formatted: formatFiatValue(item.quote)
                }
            });
        },
        addTransactions({ app }, payload) {
            app.wallet.transactions.items = payload.map(item => {
                return {
                    ...item,
                    type: item.from_address.toLowerCase() === app.wallet.form.address.value.toLowerCase() ? 'Out' : 'In',
                    balance_formatted: formatTokenBalance(item.value, 18),
                    quote_formatted: formatFiatValue(item.quote),
                    created_at: moment.utc(item.block_signed_at).local().format('Do MMM YYYY, HH:mm')
                }
            });
            app.wallet.transactions.visible = true;
        },
        resetWallet({ app }) {
            app.wallet.form.responseError = '';
            app.wallet.balances.items = null;
            app.wallet.balances.total = 0;
            app.wallet.transactions.items = null;
            app.wallet.transactions.visible = false;
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

            // reset wallet attributes
            commit('resetWallet')

            try {
                // get balances
                const balances = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
                commit('addBalances', balances.data.data.items);

                // get transactions if selected
                if (showTransactions) {
                    const transactions = await axios.get(vsprintf(TRANSACTIONS, [chainId, address]));
                    commit('addTransactions', transactions.data.data.items);
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
