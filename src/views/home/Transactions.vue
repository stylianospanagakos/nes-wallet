<template>
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
                    <tr v-for="item in wallet.transactions.items" :key="item.tx_hash">
                        <td>{{ item.type }}</td>
                        <td>{{ item.balance_formatted }}</td>
                        <td>
                            <span :class="`nes-text is-${item.successful ? 'success' : 'error'}`">
                                {{ item.successful ? 'Success' : 'Fail'}}
                            </span>
                        </td>
                        <td>{{ item.created_at }}</td>
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
</template>

<script>
import Container from '../../components/Container.vue';
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters(['wallet']),
    },
    components: {
        Container
    }
}
</script>
