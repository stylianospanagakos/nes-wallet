<template>
    <div>
        <div class="row align-items-center">
            <div class="col">
                <action-button class="d-inline-block" theme="success" @click="openCurrencyModal">
                    {{ currencySymbol }} {{ currencies.default }}
                </action-button>
                <currency-modal ref="currencyModal"/>
                <action-button class="d-inline-block ms-2" :plain="true" @click="toggleDarkTheme">
                    {{ darkTheme ? 'Dark' : 'Light' }} Theme
                </action-button>
            </div>
            <div class="col">
                <div class="text-end">
                    <action-button @click="openWalletModal">+ Wallet</action-button>
                    <wallet-form-modal ref="walletForm"/>
                </div>
            </div>
        </div>
        <div v-if="walletItems.length">
            <input-text
                class="mt-4"
                placeholder="Search name, address"
                :dark="darkTheme"
                v-model="searchTextValue"
            />
            <div class="text-end mt-4">
                <check-box label="Hide small balances" :dark="darkTheme" v-model="hideSmallValue"/>
            </div>
            <wallet
                v-for="(wallet, index) in filteredBalanceWallets"
                :key="wallet.key"
                :class="index === 0 ? 'mt-4 mb-5' : ''"
                :data="wallet"
                :currency="currencySymbol"
                :dark="darkTheme"
            />
            <p v-if="!filteredBalanceWallets.length" class="text-center my-5" :class="{'text-white': darkTheme}">
                No wallets found for '{{ searchTextValue }}'.
            </p>
        </div>
        <div v-else class="text-center my-5" :class="{'text-white': darkTheme}">
            <p>You haven't added any wallets yet.</p>
        </div>
    </div>
</template>

<script>
import CurrencyModal from './CurrencyModal.vue';
import WalletFormModal from './WalletFormModal.vue';
import Wallet from './Wallet.vue';
import CheckBox from '../../components/CheckBox.vue';
import InputText from '../../components/InputText.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    mounted() {
        this.interval = setInterval(() => {
            this.refreshWallets()
                .then()
                .catch(error => console.error(error));
        }, 60000);
    },
    destroyed() {
        clearInterval(this.interval);
        this.interval = null;
    },
    data() {
        return {
            interval: null
        }
    },
    computed: {
        ...mapState(['darkTheme', 'currencies', 'views']),
        ...mapGetters(['currencySymbol', 'walletItems']),
        searchTextValue: {
            get() {
                return this.views.home.searchText;
            },
            set(value) {
                this.updateSearchText({section: 'home', value});
            }
        },
        hideSmallValue: {
            get() {
                return this.views.home.hideSmall;
            },
            set(value) {
                this.toggleSmall({section: 'home', value});
            }
        },
        filteredSearchWallets() {
            if (this.searchTextValue.length) {
                return this.walletItems.filter(({ name, address }) => {
                    const lowerName = name.toLowerCase(),
                        lowerAddress = address.full.toLowerCase(),
                        lowerSearch = this.searchTextValue.toLowerCase();
                    return lowerName.includes(lowerSearch) || lowerAddress.includes(lowerSearch);
                });
            }
            return this.walletItems;
        },
        filteredBalanceWallets() {
            if (this.hideSmallValue) {
                return this.filteredSearchWallets.filter(({ fiat_balance }) => {
                    return parseFloat(fiat_balance) > 1;
                });
            }
            return this.filteredSearchWallets;
        }
    },
    methods: {
        ...mapMutations(['toggleDarkTheme', 'resetForm', 'updateSearchText', 'toggleSmall', 'updateCurrencyValue']),
        ...mapActions(['refreshWallets']),
        openCurrencyModal() {
            this.resetForm('home');
            this.updateCurrencyValue(this.currencies.default);
            this.$refs.currencyModal.$el.showModal();
        },
        openWalletModal() {
            this.resetForm('home');
            this.$refs.walletForm.$el.showModal();
        }
    },
    components: {
        CurrencyModal,
        WalletFormModal,
        Wallet,
        CheckBox,
        InputText,
        ActionButton
    }
}
</script>
