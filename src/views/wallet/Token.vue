<template>
    <container :title="data.contract_ticker_symbol" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Balance: {{ data.balance }}</p>
                <small class="d-block text-muted my-2">{{ data.contract_address.truncated }}</small>
            </div>
            <div class="col text-end">
                <action-button>Show History</action-button>
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