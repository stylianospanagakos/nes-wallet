import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS, TOKEN_BALANCES} from '../config/endpoints';
import {MAINNET_IDS} from '../config/supported_chains';
import {createWallet, createToken} from '../lib/helpers';
import axios from '../lib/axios';
import { vsprintf } from 'sprintf-js';
// import moment from 'moment';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        networks: {},
        wallets: {},
        loading: true,
        home: {
            searchText: '',
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
        details: {
            searchText: '',
            tokens: [],
            loading: false
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
                state[section].form[field] = payload;
            } else {
                state[section].form[field] = {
                    ...state[section].form[field],
                    ...payload
                }
            }
        },
        resetForm(state, payload) {
            const form = state[payload].form;
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
        addWallet(state, payload) {
            Vue.set(state.wallets, payload.key, payload);
        },
        removeWallet(state, payload) {
            Vue.delete(state.wallets, payload);
        },
        updateSearchText(state, { section, value }) {
            state[section].searchText = value;
        },
        addToken({ details }, payload) {
            details.tokens.push(payload);
        },
        resetTokens({ details }) {
            details.tokens = [];
        },
        toggleDetailsLoading(state, payload) {
            state.details.loading = payload;
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
            commit('toggleDetailsLoading', true);
            commit('resetTokens');

            try {
                const { data } = await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
                data.data.items.forEach(item => {
                    commit('addToken', createToken(item));
                });
            } catch (error) {
                console.error(error);
            } finally {
                commit('toggleDetailsLoading', false);
            }
        }
    },
    modules: {
    }
})
