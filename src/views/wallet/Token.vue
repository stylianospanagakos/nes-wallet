<template>
    <container :title="data.contract_ticker_symbol" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col-md-6">
                <p class="my-0">Balance: {{ data.balance }}</p>
                <small class="d-block text-muted my-2">{{ data.contract_address.truncated }}</small>
                <div>
                    <span class="nes-badge is-splited w-auto">
                        <span class="is-dark w-auto position-relative px-1">erc</span>
                        <span class="is-success w-auto position-relative px-1">20</span>
                    </span>
                    <span class="nes-badge is-splited w-auto ms-3">
                        <span class="is-dark w-auto position-relative px-1">erc</span>
                        <span class="is-success w-auto position-relative px-1">271</span>
                    </span>
                </div>
            </div>
        </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';
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
        Container
    }
}
</script>

<style scoped>
    small.d-block {
        word-break: break-all;
    }
</style>