<template>
    <container :title="data.name" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: ${{ data.fiat_balance }}</p>
                <small class="d-block text-muted my-1">{{ data.address.truncated }}</small>
            </div>
            <div class="col text-end">
                <button
                    type="button"
                    class="nes-btn is-primary"
                    @click="expanded = !expanded"
                >{{ expanded ? 'Hide' : 'Show' }} Details</button>
            </div>
        </div>
        <div v-show="expanded" class="nes-table-responsive mt-4">
            <table class="nes-table is-bordered is-centered">
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>History</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="token in data.tokens" :key="token.contract_address">
                        <td>{{ token.contract_name }} ({{ token.contract_ticker_symbol }})</td>
                        <td>{{ token.balance }}</td>
                        <td>${{ token.quote }}</td>
                        <td class="text-center">
                            <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                            View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            expanded: false
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