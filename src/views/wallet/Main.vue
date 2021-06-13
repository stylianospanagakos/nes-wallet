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
            <balances/>

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
import Balances from './Balances.vue';
import IconLoading from '../../components/IconLoading.vue';
import Container from '../../components/Container.vue';
import {mapState, mapGetters} from 'vuex';

export default {
    computed: {
        ...mapState(['app']),
        ...mapGetters(['wallet']),
        networkLogo() {
            const chainId = this.wallet.form.chainId.value;
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
        }
    },
    components: {
        SearchCriteria,
        Balances,
        Container,
        IconLoading
    }
}
</script>
