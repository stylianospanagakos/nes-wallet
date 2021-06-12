<template>
    <div>
        <search-criteria/>

        <icon-loading
            v-if="wallet.form.loading"
            :iconURL="networkLogo"
        />

        <div v-else class="my-5">
            <container title="Balances">
                <div class="row align-items-center">
                    <div class="col">
                        <p class="my-0">Total: $3204.50</p>
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
                            <tr>
                                <td>Fantom (FTM)</td>
                                <td>20.8384</td>
                                <td>$5.79</td>
                                <td class="text-center">
                                    <button type="button" class="nes-btn is-primary" onclick="document.getElementById('dialog-default').showModal();">
                                    View
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>Uniswap V2 (UNI-V2)</td>
                                <td>13.5622</td>
                                <td>$2.45</td>
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

            <container title="TXs">
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

export default {
    data() {
        return {
            expanded: false 
        }
    },
    computed: {
        ...mapState(['app']),
        ...mapGetters(['wallet']),
        networkLogo({ app }) {
            const chainId = app.wallet.form.chainId.value;
            if (chainId) {
                return app.networks[chainId].logo_url;
            }
            return '';
        }
    },
    components: {
        SearchCriteria,
        Container,
        IconLoading
    }
}
</script>
