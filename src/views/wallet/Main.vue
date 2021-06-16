<template>
    <div>
        <div v-if="wallet">
            <div class="row">
                <div class="col">
                    <h1>{{ wallet.name }}</h1>
                </div>
                <div class="col text-end">
                    <a @click="$router.push({name: 'home'})">
                        <i class="nes-icon close"></i>
                    </a>
                </div>
            </div>
            <div v-if="details.loading">
                <icon-loading :iconURL="wallet.logo_url"/>
            </div>
            <div v-else-if="details.tokens.length">
                <input-text
                    class="mt-4"
                    placeholder="Search contract name, symbol"
                    v-model="searchTextValue"
                />
                <token
                    v-for="token in filteredTokens"
                    :key="`${token.contract_address}${token.contract_ticker_symbol}`"
                    :data="token"
                />
                <p v-if="!filteredTokens.length" class="text-center my-5">
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
    </div>
</template>

<script>
import InputText from '../../components/InputText.vue';
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
        ...mapState(['details']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        },
        searchTextValue: {
            get() {
                return this.details.searchText;
            },
            set(value) {
                this.updateSearchText({section: 'details', value});
            }
        },
        filteredTokens() {
            if (this.searchTextValue.length) {
                return this.details.tokens.filter(({ contract_name, contract_ticker_symbol }) => {
                    const lowerName = contract_name.toLowerCase(),
                        lowerSymbol = contract_ticker_symbol.toLowerCase(),
                        lowerSearch = this.searchTextValue.toLowerCase();
                    return lowerName.includes(lowerSearch) ||
                        lowerSymbol.includes(lowerSearch);
                });
            }
            return this.details.tokens;
        }
    },
    methods: {
        ...mapMutations(['updateSearchText']),
        ...mapActions(['fetchBalances'])
    },
    components: {
        InputText,
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