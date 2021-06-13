<template>
    <div>
        <div class="text-end">
            <action-button @click="$refs.walletForm.$el.showModal()">+ Wallet</action-button>
            <wallet-form-modal ref="walletForm"/>
        </div>
        <div v-if="walletItems.length">
            <wallet/>
            <wallet/>
            <wallet/>
        </div>
        <div v-else class="text-center my-5">
            <p>You haven't added any wallets yet.</p>
        </div>
    </div>
</template>

<script>
import WalletFormModal from './WalletFormModal.vue';
import Wallet from './Wallet.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapGetters} from 'vuex';

export default {
    created() {
        console.log(this.$refs);
    },
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
    methods: {
        clicked() {
            console.log('test');
        }
    },
    components: {
        WalletFormModal,
        Wallet,
        ActionButton
    }
}
</script>
