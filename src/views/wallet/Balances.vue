<template>
    <container title="Balances">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: ${{ totalBalance }}</p>
            </div>
            <div class="col text-end">
                <button
                    type="button"
                    class="nes-btn is-primary"
                    @click="expanded = !expanded"
                >{{ expanded ? 'Hide' : 'Expand' }} Details</button>
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
                    <tr v-for="item in wallet.balances.items" :key="item.contract_address">
                        <td>{{ item.contract_name }} ({{ item.contract_ticker_symbol }})</td>
                        <td>{{ item.balance_formatted }}</td>
                        <td>${{ item.quote_formatted }}</td>
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
import {mapGetters} from 'vuex';
import {formatFiatValue} from '../../lib/helpers';

export default {
    data() {
        return {
            expanded: false 
        }
    },
    computed: {
        ...mapGetters(['wallet']),
        totalBalance() {
            return formatFiatValue(this.wallet.balances.total);
        }
    },
    components: {
        Container
    }
}
</script>
