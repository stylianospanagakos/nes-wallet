<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1>Tokens</h1>
                <small class="text-muted">{{ wallet.name }}</small>
            </div>
            <div class="col text-end">
                <a @click="$router.push({name: 'home'})">
                    <i class="nes-icon close"></i>
                </a>
            </div>
        </div>
        <div v-if="views.wallet.loading">
            <icon-loading :iconURL="wallet.logo_url"/>
        </div>
        <div v-else-if="views.wallet.tokens.length">
            <input-text
                class="mt-4"
                placeholder="Search contract name, symbol"
                v-model="searchTextValue"
            />
            <div class="text-end mt-4">
                <check-box label="Hide small balances" v-model="hideSmallValue"/>
            </div>
            <token
                v-for="(token, index) in filteredBalanceTokens"
                :key="`${token.contract_address}${token.contract_ticker_symbol}`"
                :class="index === 0 ? 'mt-3 mb-5' : ''"
                :wallet="wallet"
                :data="token"
            />
            <p v-if="!filteredBalanceTokens.length" class="text-center my-5">
                No tokens found for '{{ searchTextValue }}'.
            </p>
        </div>
        <div v-else class="text-center mt-5">
            <p>Apologies, we couldn't fetch your wallet details.</p>
            <action-button
                @click="fetchBalances({chainId: wallet.chain_id, address: wallet.address.full})"
            >Retry</action-button>
        </div>
    </div>
    <div v-else class="text-center">
        <p class="nes-text is-error">Invalid wallet.</p>
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
        ...mapState(['views']),
        ...mapGetters(['walletItems']),
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