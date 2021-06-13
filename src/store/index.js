import Vue from 'vue'
import Vuex from 'vuex'
import {CHAINS} from '../config/endpoints';
import {MAINNET_IDS} from '../config/supported_chains';
// import {formatTokenBalance, formatFiatValue} from '../lib/helpers';
import axios from '../lib/axios';
// import { vsprintf } from 'sprintf-js';
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
            payload.forEach(({chain_id, logo_url, label}) => {
                // for now, we only want to process the mainnet chain ids
                if (MAINNET_IDS.includes(parseInt(chain_id))) {
                    Vue.set(state.networks, chain_id, { logo_url, label });
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
        }
    },
    modules: {
    }
})
