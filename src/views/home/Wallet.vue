<template>
    <container :title="data.name" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: ${{ data.fiat_balance }}</p>
                <small class="nes-text is-primary">Includes {{ tokensLength }} Token{{ tokensLength === 1 ? '' : 's' }}</small>
                <small class="d-block text-muted my-1">{{ data.address.truncated }}</small>
            </div>
            <div class="col text-end">
                <action-button
                    @click="expanded = !expanded"
                >{{ expanded ? 'Hide' : 'View' }} Details</action-button>
            </div>
        </div>
        <div v-show="expanded" class="nes-table-responsive mt-4">
            <table class="nes-table w-100 is-bordered is-centered m-0">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Amount</th>
                        <th>Balance</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="token in data.tokens" :key="`${token.contract_ticker_symbol}${token.contract_address}`">
                        <td>{{ token.contract_name }} ({{ token.contract_ticker_symbol }})</td>
                        <td>{{ token.balance }}</td>
                        <td>${{ token.quote }}</td>
                        <td>
                            <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                            View
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="text-center mt-4">
                <action-button
                    theme="error"
                    @click="$refs[data.key].showModal()"
                >Delete Wallet</action-button>
                <dialog :ref="data.key" class="nes-dialog is-rounded">
                    <p class="nes-text is-error text-center my-3">Are you sure you want to delete this wallet?</p>
                    <menu class="dialog-menu mb-0">
                        <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                        <action-button class="d-inline-block" theme="error" @click="deleted">Delete</action-button>
                    </menu>
                </dialog>
            </div>
        </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';
import ActionButton from '../../components/ActionButton.vue';

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
    computed: {
        tokensLength() {
            return this.data.tokens.length;
        }
    },
    methods: {
        closeModal() {
            this.$refs[this.data.key].close();
        },
        deleted() {
            console.log('delete');
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
    .nes-table {
        table-layout: auto;
        border: 4px solid #212529;
    }
    .nes-table {
        text-align: center;
    }
</style>