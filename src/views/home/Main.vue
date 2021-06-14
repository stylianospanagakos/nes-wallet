<template>
    <div>
        <div class="text-end">
            <action-button @click="openModal">+ Wallet</action-button>
            <wallet-form-modal ref="walletForm"/>
        </div>
        <div v-if="walletItems.length">
            <wallet
                v-for="wallet in walletItems"
                :key="wallet.key"
                :data="wallet"
            />
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
import {mapGetters, mapMutations} from 'vuex';

export default {
    created() {
        console.log(localStorage);
    },
    computed: {
        ...mapGetters(['walletItems'])
    },
    methods: {
        ...mapMutations(['resetForm']),
        openModal() {
            this.resetForm();
            this.$refs.walletForm.$el.showModal();
        }
    },
    components: {
        WalletFormModal,
        Wallet,
        ActionButton
    }
}
</script>
