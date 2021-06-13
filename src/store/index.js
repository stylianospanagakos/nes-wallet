import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS, TOKEN_BALANCES} from '../config/endpoints';
import {MAINNET_IDS} from '../config/supported_chains';
// import {formatTokenBalance, formatFiatValue} from '../lib/helpers';
import axios from '../lib/axios';
import { vsprintf } from 'sprintf-js';
// import moment from 'moment';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        networks: {},
        wallets: {},
        loading: true,
        form: {
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
    getters: {
        networkOptions({ networks }) {
            return Object.keys(networks).map(item => {
                return {...networks[item]};
            });
        },
        walletItems({ wallets }) {
            return Object.keys(wallets).map(key => {
                return {...wallets[key]};
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
        updateFormField({ form }, { field, payload }) {
            if (typeof payload === 'boolean' || typeof payload === 'string') {
                form[field] = payload;
            } else {
                form[field] = {
                    ...form[field],
                    ...payload
                }
            }
        },
        resetForm({ form }) {
            form.chainId.value = '';
            form.chainId.error = '';
            form.address.value = '';
            form.address.error = '';
            form.loading = false;
            form.responseError = '';
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
        async fetchBalance({ commit }, { chainId, address }) {
            commit('updateFormField', {
                field: 'loading',
                payload: true
            });

            try {
                await axios.get(vsprintf(TOKEN_BALANCES, [chainId, address]));
            } catch (error) {
                commit('updateFormField', {
                    field: 'loading',
                    payload: false
                });
                commit('updateFormField', {
                    field: 'responseError',
                    payload: error.response.data.error_message
                });
                throw new Error(error.response.data.error_message);
            }
        }
    },
    modules: {
    }
})
