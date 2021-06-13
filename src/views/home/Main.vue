<template>
    <div>

    </div>
</template>

<script>
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
    }
}
</script>
