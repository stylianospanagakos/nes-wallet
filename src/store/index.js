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
        updateBalances({ app }, payload) {
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
        updateTransactions({ app }, { items, visible }) {
            app.wallet.transactions.items = items;
            app.wallet.transactions.items = items.map(item => {
                return {
                    ...item,
                    type: item.from_address.toLowerCase() === app.wallet.form.address.value.toLowerCase() ? 'Out' : 'In',
                    balance_formatted: formatTokenBalance(item.value, 18),
                    quote_formatted: formatFiatValue(item.quote),
                    created_at: moment.utc(item.block_signed_at).local().format('MMM Do, YY, HH:mm')
                }
            });
            app.wallet.transactions.visible = visible;
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

            // clean response error message
            commit('updateFormField', {
                section: 'wallet',
                field: 'responseError',
                payload: ''
            });

            try {
                // get balances
                const balances = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
                commit('updateBalances', balances.data.data.items);

                // get transactions if selected
                if (showTransactions) {
                    const transactions = await axios.get(vsprintf(TRANSACTIONS, [chainId, address]));
                    commit('updateTransactions', {items: transactions.data.data.items, visible: true});
                } else {
                    commit('updateTransactions', {items: null, visible: false});
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
