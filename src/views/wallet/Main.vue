<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1 :class="{'text-white': !lightTheme}">Tokens</h1>
                <small class="text-muted">{{ wallet.name }}</small>
            </div>
            <div class="col text-end">
                <a @click="$router.push({name: 'home'})">
                    <i class="nes-icon close" :class="{'bg-white': !lightTheme}"></i>
                </a>
            </div>
        </div>
        <div v-if="views.wallet.loading">
            <icon-loading :iconURL="wallet.logo_url" :dark="!lightTheme"/>
        </div>
        <div v-else-if="views.wallet.tokens.length">
            <input-text
                class="mt-4"
                placeholder="Search contract name, symbol"
                v-model="searchTextValue"
                :dark="!lightTheme"
            />
            <div class="row align-items-center mt-4">
                <div class="col">
                    <action-button
                        theme="success"
                        @click="$router.push({name: 'transactions', params: {wallet: wallet.uuid}})"
                    >Wallet TXs</action-button>
                </div>
                <div class="col text-end">
                    <check-box label="Hide small balances" v-model="hideSmallValue" :dark="!lightTheme"/>
                </div>
            </div>
            <token
                v-for="token in filteredBalanceTokens"
                :key="`${token.contract_address}${token.contract_ticker_symbol}`"
                :wallet="wallet"
                :data="token"
                :currency="currencySymbol"
                :dark="!lightTheme"
            />
            <p v-if="!filteredBalanceTokens.length" class="text-center my-5" :class="{'text-white': !lightTheme}">
                No tokens found for '{{ searchTextValue }}'.
            </p>
        </div>
        <div v-else class="text-center mt-5">
            <p :class="{'text-white': !lightTheme}">Apologies, we couldn't fetch your wallet details.</p>
            <action-button
                @click="fetchBalances({chainId: wallet.chain_id, address: wallet.address.full})"
            >Retry</action-button>
        </div>
    </div>
    <div v-else class="text-center">
        <p class="nes-text is-error" :class="{'text-white': !lightTheme}">Invalid wallet.</p>
        <action-button
            class="mb-5"
            @click="$router.push({name: 'home'})"
        >Go Back</action-button>
    </div>
</template>

<script>
import InputText from '../../components/InputText.vue';
import CheckBox from '../../components/CheckBox.vue';
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import Token from './Token.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            this.fetchBalances({
                chainId: this.wallet.chain_id,
                address: this.wallet.address.full
            });
        }
    },
    computed: {
        ...mapState(['lightTheme', 'views']),
        ...mapGetters(['currencySymbol', 'walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        },
        searchTextValue: {
            get() {
                return this.views.wallet.searchText;
            },
            set(value) {
                this.updateSearchText({section: 'wallet', value});
            }
        },
        hideSmallValue: {
            get() {
                return this.views.wallet.hideSmall;
            },
            set(value) {
                this.toggleSmall({section: 'wallet', value});
            }
        },
        filteredSearchTokens() {
            if (this.searchTextValue.length) {
                return this.views.wallet.tokens.filter(({ contract_name, contract_ticker_symbol }) => {
                    const lowerName = contract_name.toLowerCase(),
                        lowerSymbol = contract_ticker_symbol.toLowerCase(),
                        lowerSearch = this.searchTextValue.toLowerCase();
                    return lowerName.includes(lowerSearch) ||
                        lowerSymbol.includes(lowerSearch);
                });
            }
            return this.views.wallet.tokens;
        },
        filteredBalanceTokens() {
            if (this.hideSmallValue) {
                return this.filteredSearchTokens.filter(({ fiat_balance }) => {
                    return parseFloat(fiat_balance) > 1;
                });
            }
            return this.filteredSearchTokens;
        }
    },
    methods: {
        ...mapMutations(['updateSearchText', 'toggleSmall']),
        ...mapActions(['fetchBalances'])
    },
    components: {
        InputText,
        CheckBox,
        ActionButton,
        IconLoading,
        Token
    }
}
</script>

<style scoped>
    h1 {
        font-size: 1.7rem;
    }
    i.nes-icon.close {
        transform: scale(2);
    }
</style>