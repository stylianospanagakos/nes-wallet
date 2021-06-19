<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1 :class="{'text-white': darkTheme}">Transactions</h1>
                <small class="text-muted">{{ wallet.name }}</small>
            </div>
            <div class="col text-end">
                <a @click="$router.push({name: 'wallet', params: {wallet: wallet.uuid}})">
                    <i class="nes-icon close" :class="{'bg-white': darkTheme}"></i>
                </a>
            </div>
        </div>
        <div v-if="views.transactions.loading">
            <icon-loading :iconURL="wallet.logo_url" :dark="darkTheme"/>
        </div>
        <div v-else-if="views.transactions.items.length">
            <records-table
                class="mt-5"
                :items="views.transactions.items"
                :dark="darkTheme"
            />
        </div>
        <div v-else class="text-center mt-5">
            <p :class="{'text-white': darkTheme}">Apologies, we couldn't fetch token's data.</p>
            <action-button
                @click="fetchWalletTransactions({
                    chainId: wallet.chain_id,
                    address: wallet.address.full
                })"
            >Retry</action-button>
        </div>
    </div>
    <div v-else class="text-center">
        <p class="nes-text is-error" :class="{'text-white': darkTheme}">Invalid wallet.</p>
        <action-button
            class="mb-5"
            @click="$router.push({name: 'home'})"
        >Go Home</action-button>
    </div>
</template>

<script>
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import RecordsTable from '../transfers/RecordsTable.vue';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            this.fetchWalletTransactions({
                chainId: this.wallet.chain_id,
                address: this.wallet.address.full
            });
        }
    },
    computed: {
        ...mapState(['darkTheme', 'views']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        }
    },
    methods: {
        ...mapActions(['fetchWalletTransactions'])
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