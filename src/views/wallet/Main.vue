<template>
    <div>
        <search-criteria/>

        <icon-loading
            v-if="wallet.form.loading"
            :iconURL="networkLogo"
        />

        <p v-else-if="wallet.form.responseError.length" class="nes-text is-error my-3 text-center">
            {{ wallet.form.responseError }}
        </p>

        <div v-else-if="showResponseContainer" class="my-5">
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

            <div class="my-5"></div>

            <container v-if="wallet.transactions.visible" title="TXs">
                <div class="nes-table-responsive">
                    <table class="nes-table is-bordered is-centered">
                        <thead>
                            <tr>
                            <th>Type</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>When</th>
                            <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>In</td>
                                <td>1.3782</td>
                                <td>
                                    <span class="nes-text is-success">Success</span>
                                </td>
                                <td>2 Jun 21, 17:37</td>
                                <td class="text-center">
                                    <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                                        View
                                    </button>
                                    <dialog class="nes-dialog is-rounded" id="dialog-default">
                                        <form method="dialog">
                                            <p class="title">Dialog</p>
                                            <p>Alert: this is a dialog.</p>
                                            <menu class="dialog-menu">
                                            <button class="nes-btn">Cancel</button>
                                            <button class="nes-btn is-primary">Confirm</button>
                                            </menu>
                                        </form>
                                    </dialog>
                                </td>
                            </tr>
                            <tr>
                                <td>Out</td>
                                <td>5.01231</td>
                                <td>
                                    <span class="nes-text is-error">Fail</span>
                                </td>
                                <td>2 Jun 21, 17:37</td>
                                <td class="text-center">
                                    <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                                    View
                                    </button>
                                    <dialog class="nes-dialog is-rounded" id="dialog-default">
                                    <form method="dialog">
                                        <p class="title">Dialog</p>
                                        <p>Alert: this is a dialog.</p>
                                        <menu class="dialog-menu">
                                        <button class="nes-btn">Cancel</button>
                                        <button class="nes-btn is-primary">Confirm</button>
                                        </menu>
                                    </form>
                                    </dialog>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </container>
        </div>
    </div>
</template>

<script>
import SearchCriteria from './SearchCriteria.vue';
import IconLoading from '../../components/IconLoading.vue';
import Container from '../../components/Container.vue';
import {mapState, mapGetters} from 'vuex';
import {formatFiatValue} from '../../lib/helpers';

export default {
    data() {
        return {
            expanded: false 
        }
    },
    computed: {
        ...mapState(['app']),
        ...mapGetters(['wallet']),
        networkLogo() {
            const chainId = this.app.wallet.form.chainId.value;
            if (chainId) {
                return this.app.networks[chainId].logo_url;
            }
            return '';
        },
        showResponseContainer() {
            if (this.wallet.transactions.visible) {
                return this.wallet.balances.items !== null && this.wallet.transactions.items !== null;
            }
            return this.wallet.balances.items !== null;
        },
        totalBalance() {
            return formatFiatValue(this.wallet.balances.total);
        }
    },
    components: {
        SearchCriteria,
        Container,
        IconLoading
    }
}
</script>
