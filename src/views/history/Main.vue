<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1>{{ $route.params.symbol }}</h1>
                <small class="text-muted">{{ wallet.name }}</small>
            </div>
            <div class="col text-end">
                <a @click="$router.push({name: 'wallet', params: {wallet: wallet.uuid}})">
                    <i class="nes-icon close"></i>
                </a>
            </div>
        </div>
        <div v-if="views.history.loading">
            <icon-loading :iconURL="wallet.logo_url"/>
        </div>
        <div v-else-if="showGraphs">
            
        </div>
        <div v-else class="text-center mt-5">
            <p>Apologies, we couldn't fetch token's data.</p>
            <action-button
                @click="fetchPortfolioHistory({
                    chainId: wallet.chain_id,
                    address: wallet.address.full,
                    contract: $route.params.token,
                    symbol: $route.params.symbol
                })"
            >Retry</action-button>
        </div>
    </div>
    <div v-else class="text-center">
        <p class="nes-text is-error">Invalid wallet.</p>
        <action-button
            class="mb-5"
            @click="$router.push({name: 'home'})"
        >Go Home</action-button>
    </div>
</template>

<script>
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            this.fetchPortfolioHistory({
                chainId: this.wallet.chain_id,
                address: this.wallet.address.full,
                contract: this.$route.params.token,
                symbol: this.$route.params.symbol
            });
        }
    },
    computed: {
        ...mapState(['views']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        },
        showGraphs() {
            return this.views.history.line.length && this.views.history.candlestick.length;
        }
    },
    methods: {
        ...mapActions(['fetchPortfolioHistory'])
    },
    components: {
        ActionButton,
        IconLoading
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