<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1>Transactions</h1>
                <small class="text-muted">{{ wallet.name }}</small>
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
        <div v-else-if="views.transactions.items.length">
            <div class="nes-table-responsive mt-5">
                <table class="nes-table is-bordered is-centered">
                    <thead>
                        <tr>
                            <th>When</th>
                            <th>Status</th>
                            <th>Address</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="transfer in views.transfers.items" :key="transfer.tx_hash">
                            <td>{{ transfer.block_signed_at }}</td>
                            <td>
                                <span class="nes-badge">
                                    <span :class="`is-${ transfer.successful ? 'success' : 'error' }} w-auto`">
                                        {{ transfer.successful ? 'Success' : 'Fail' }}
                                    </span>
                                </span>
                            </td>
                            <td>{{ transfer.display_address }}</td>
                            <td>
                                <span :class="`nes-text is-${transfer.transfer_type === 'IN' ? 'success' : 'error'}`">
                                    {{ transfer.amount }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div v-else class="text-center mt-5">
            <p>Apologies, we couldn't fetch token's data.</p>
            <action-button
                @click="fetchWalletTransactions({
                    chainId: wallet.chain_id,
                    address: wallet.address.full
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
            this.fetchWalletTransactions({
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
        }
    },
    methods: {
        ...mapActions(['fetchWalletTransactions'])
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