import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS, TOKEN_BALANCES, HISTORICAL_PORTFOLIO, TRANSFERS, TRANSACTIONS} from '../config/endpoints';
import {MAINNET_IDS} from '../config/supported_chains';
import {createWallet, createToken, createHistoryGraphData, createTransfer, createTransaction} from '../lib/helpers';
import axios from '../lib/axios';
import { vsprintf } from 'sprintf-js';
// import moment from 'moment';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        networks: {},
        wallets: {},
        loading: true,
        views: {
            home: {
                searchText: '',
                hideSmall: false,
                form: {
                    name: {
                        value: '',
                        error: ''
                    },
                    chainId: {
                        value: '',
                        error: ''
                    },
                    address: {
                        value: '',
                        error: ''
                    },
                    loading: false,
                    responseError: ''
                }
            },
            wallet: {
                searchText: '',
                hideSmall: false,
                tokens: [],
                loading: false
            },
            history: {
                showCandlestick: false,
                candlestick: [],
                line: [],
                loading: false
            },
            transfers: {
                items: [],
                loading: false
            },
            transactions: {
                items: [],
                loading: false
            }
        }
    },
    getters: {
        networkOptions({ networks }) {
            return Object.keys(networks).map(item => {
                return {...networks[item]};
            });
        },
        walletItems({ wallets }) {
            return Object.keys(wallets).map(key => {
                return {
                    ...wallets[key],
                    key
                };
            });
        }
    },
    mutations: {
        addNetworks(state, payload) {
            payload.forEach(network => {
                // for now, we only want to process the mainnet chain ids
                if (MAINNET_IDS.includes(parseInt(network.chain_id))) {
                    Vue.set(state.networks, network.chain_id, network);
                }
            });
        },
        updateFormField(state, { section, field, payload }) {
            if (typeof payload === 'boolean' || typeof payload === 'string') {
                state.views[section].form[field] = payload;
            } else {
                state.views[section].form[field] = {
                    ...state.views[section].form[field],
                    ...payload
                }
            }
        },
        resetForm(state, payload) {
            const form = state.views[payload].form;
            Object.keys(form).forEach(field => {
                switch (typeof form[field]) {
                    case 'string':
                        form[field] = '';
                        break;
                    case 'boolean':
                        form[field] = false;
                        break;
                    case 'number':
                        form[field] = 0;
                        break;
                    default:
                        if (Array.isArray(form[field])) {
                            form[field] = [];
                        } else {
                            form[field] = {
                                value: '',
                                error: ''
                            }
                        }
                }
            });
        },
        resetView(state, payload) {
            const section = state.views[payload];
            Object.keys(section).forEach(field => {
                switch (typeof section[field]) {
                    case 'string':
                        section[field] = '';
                        break;
                    case 'boolean':
                        section[field] = false;
                        break;
                    case 'number':
                        section[field] = 0;
                        break;
                    default:
                        if (Array.isArray(section[field])) {
                            section[field] = [];
                        } else {
                            section[field] = {}
                        }
                }
            });
        },
        addWallet(state, payload) {
            Vue.set(state.wallets, payload.key, payload);
        },
        removeWallet(state, payload) {
            Vue.delete(state.wallets, payload);
        },
        toggleSmall(state, { section, value }) {
            state.views[section].hideSmall = value;
        },
        updateSearchText(state, { section, value }) {
            state.views[section].searchText = value;
        },
        addToken({ views }, payload) {
            views.wallet.tokens.push(payload);
        },
        updateHistoryGraphs({ views }, { line, candlestick }) {
            views.history.line = line;
            views.history.candlestick = candlestick;
        },
        toggleChart({ views }, payload) {
            views.history.showCandlestick = payload;
        },
        addTransfer({ views }, payload) {
            views.transfers.items.push(payload);
        },
        addTransaction({ views }, payload) {
            views.transactions.items.push(payload);
        },
        toggleViewLoading(state, {view, value}) {
            state.views[view].loading = value;
        },
        toggleAppLoading(state, payload) {
            state.loading = payload;
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
        async fetchWallet({ commit, state }, { name, chainId, address }) {
            commit('updateFormField', {
                section: 'home',
                field: 'loading',
                payload: true
            });

            try {
                const { data } = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
                commit('addWallet', createWallet({
                    ...data.data,
                    name,
                    network: state.networks[chainId] 
                }));
            } catch (error) {
                commit('updateFormField', {
                    section: 'home',
                    field: 'loading',
                    payload: false
                });
                commit('updateFormField', {
                    section: 'home',
                    field: 'responseError',
                    payload: error.response.data.error_message
                });
                throw new Error(error.response.data.error_message);
            }
        },
        async fetchBalances({ commit }, { chainId, address }) {
            commit('resetView', 'wallet');
            commit('toggleViewLoading', {view: 'wallet', value: true});

            try {
                const { data } = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
                data.data.items.forEach(item => {
                    commit('addToken', createToken(item));
                });
            } catch (error) {
                console.error(error);
            } finally {
                commit('toggleViewLoading', {view: 'wallet', value: false});
            }
        },
        async fetchWalletTransactions({ commit }, { chainId, address }) {
            commit('resetView', 'transactions');
            commit('toggleViewLoading', {view: 'transactions', value: true});

            try {
                const { data } = await axios.get(vsprintf(TRANSACTIONS, [chainId, address]) + '?no-logs=true');
                data.data.items.forEach(item => {
                    commit('addTransaction', createTransaction(
                        {
                            ...item,
                            transfer_type: item.to_address === address ? 'IN' : 'OUT',
                            contract_decimals: 18
                        },
                        address
                    ));
                });
            } catch (error) {
                console.error(error);
            } finally {
                commit('toggleViewLoading', {view: 'transactions', value: false});
            }
        },
        async fetchPortfolioHistory({ commit }, { chainId, address, contract, symbol }) {
            commit('resetView', 'history');
            commit('toggleViewLoading', {view: 'history', value: true});

            try {
                const matchCriteria = JSON.stringify({contract_address: contract, contract_ticker_symbol: symbol});
                const { data } = await axios.get(vsprintf(HISTORICAL_PORTFOLIO, [chainId, address]) + '?match=' + matchCriteria);
                commit('updateHistoryGraphs', createHistoryGraphData(data.data.items[0]));
            } catch (error) {
                console.error(error);
            } finally {
                commit('toggleViewLoading', {view: 'history', value: false});
            }
        },
        async fetchContractTransfers({ commit }, { chainId, address, contract }) {
            commit('resetView', 'transfers');
            commit('toggleViewLoading', {view: 'transfers', value: true});

            try {
                const { data } = await axios.get(vsprintf(TRANSFERS, [chainId, address]) + '?contract-address=' + contract);
                data.data.items.forEach(item => {
                    commit('addTransfer', createTransfer(item));
                });
            } catch (error) {
                console.error(error);
            } finally {
                commit('toggleViewLoading', {view: 'transfers', value: false});
            }
        }
    },
    modules: {
    }
})
