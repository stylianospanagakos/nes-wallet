<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1>Transfers</h1>
                <small class="text-muted">ERC20 {{ $route.params.symbol }}</small>
            </div>
            <div class="col text-end">
                <a @click="$router.push({name: 'wallet', params: {wallet: wallet.uuid}})">
                    <i class="nes-icon close"></i>
                </a>
            </div>
        </div>
        <div v-if="views.transfers.loading">
            <icon-loading :iconURL="wallet.logo_url"/>
        </div>
        <div v-else-if="views.transfers.items.length">
            <records-table
                class="mt-5"
                :items="views.transfers.items"
            />
        </div>
        <div v-else class="text-center mt-5">
            <p>Apologies, we couldn't fetch token's data.</p>
            <action-button
                @click="fetchContractTransfers({
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
import RecordsTable from './RecordsTable.vue';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            this.fetchContractTransfers({
                chainId: this.wallet.chain_id,
                address: this.wallet.address.full,
                contract: this.$route.params.token
            });
        }
    },
    computed: {
        ...mapState(['views']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        }
    },
    methods: {
        ...mapActions(['fetchContractTransfers'])
    },
    components: {
        ActionButton,
        IconLoading,
        RecordsTable
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