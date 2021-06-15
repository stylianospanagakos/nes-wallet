<template>
    <container :title="data.contract_ticker_symbol" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col-md-8">
                <p class="my-0">Balance: {{ data.balance }}</p>
                <small class="d-block text-muted my-2">{{ data.contract_address.truncated }}</small>
            </div>
            <div v-if="data.history.line.length" class="col-md-4 text-end">
                <line-graph
                    width="200px"
                    label="Balance"
                    :data="data.history.line"
                    main-color="#5578eb"
                    alt-color="#e1edd9"
                />
            </div>
            <div v-else class="col-md-4 text-end">
                <p class="nes-text is-disabled">No data</p>
            </div>
        </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';
import LineGraph from '../../components/graphs/LineGraph.vue';
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
        LineGraph
    }
}
</script>

<style scoped>
    small.d-block {
        word-break: break-all;
    }
</style>