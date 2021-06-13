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

            <transactions v-if="wallet.transactions.visible"/>
        </div>
    </div>
</template>

<script>
import SearchCriteria from './SearchCriteria.vue';
import Balances from './Balances.vue';
import Transactions from './Transactions.vue';
import IconLoading from '../../components/IconLoading.vue';
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
        Transactions,
        IconLoading
    }
}
</script>
