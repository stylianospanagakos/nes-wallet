<template>
    <container :title="data.contract_ticker_symbol" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col-md-6">
                <p class="my-0">Balance: ${{ data.fiat_balance }}</p>
                <small class="d-block text-muted my-2">Tokens: {{ data.balance }}</small>
                <div v-if="data.erc_codes">
                    <span v-for="code in data.erc_codes" :key="code" class="nes-badge is-splited w-auto me-3">
                        <span class="is-dark w-auto position-relative px-1">erc</span>
                        <span class="is-success w-auto position-relative px-1">{{ code }}</span>
                    </span>
                </div>
            </div>
            <div class="col-md-6 text-end">
                <action-button
                    class="d-inline-block me-2"
                    @click="$router.push({name: 'transfers', params: {wallet: wallet.uuid, token: data.contract_address.full, symbol: data.contract_ticker_symbol}})"
                >Transfers</action-button>
                <action-button
                    class="d-inline-block"
                    :plain="true"
                    @click="$router.push({name: 'history', params: {wallet: wallet.uuid, token: data.contract_address.full, symbol: data.contract_ticker_symbol}})"
                >History</action-button>
            </div>
        </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapMutations} from 'vuex';

export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        wallet: {
            type: Object,
            required: true
        }
    },
    methods: {
        ...mapMutations(['removeWallet']),
        closeModal() {
            this.$refs[this.data.key].close();
        },
        deleted() {
            this.removeWallet(this.data.key);
        }
    },
    components: {
        Container,
        ActionButton
    }
}
</script>

<style scoped>
    small.d-block {
        word-break: break-all;
    }
</style>