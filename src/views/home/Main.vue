<template>
    <div>
        <wallet/>
    </div>
</template>

<script>
import Wallet from './Wallet.vue';
import {mapGetters} from 'vuex';

export default {
    computed: {
        ...mapGetters(['walletItems']),
        networkLogo() {
            const chainId = this.wallet.form.chainId.value;
            if (chainId) {
                return this.app.networks[chainId].logo_url;
            }
            return '';
        }
    },
    components: {
        Wallet
    }
}
</script>
