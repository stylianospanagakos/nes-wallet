<template>
    <div>
        <div class="text-end">
            <action-button @click="openModal">+ Wallet</action-button>
            <wallet-form-modal ref="walletForm"/>
        </div>
        <div v-if="walletItems.length">
            <input-text
                class="mt-4"
                placeholder="Search name, address"
                v-model="searchTextValue"
            />
            <wallet
                v-for="wallet in filteredWallets"
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
import InputText from '../../components/InputText.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
    computed: {
        ...mapState(['searchText']),
        ...mapGetters(['walletItems']),
        searchTextValue: {
            get() {
                return this.searchText;
            },
            set(value) {
                this.updateSearchText(value);
            }
        },
        filteredWallets() {
            if (this.searchTextValue.length) {
                return this.walletItems.filter(({ name, address }) => {
                    const lowerName = name.toLowerCase(),
                        lowerAddress = address.full.toLowerCase(),
                        lowerSearch = this.searchTextValue.toLowerCase();
                    return lowerName.includes(lowerSearch) ||
                        lowerAddress.includes(lowerSearch);
                });
            }
            return this.walletItems;
        }
    },
    methods: {
        ...mapMutations(['resetForm', 'updateSearchText']),
        openModal() {
            this.resetForm();
            this.$refs.walletForm.$el.showModal();
        }
    },
    components: {
        WalletFormModal,
        Wallet,
        InputText,
        ActionButton
    }
}
</script>
