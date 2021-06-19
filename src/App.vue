<template>
    <div class="h-100" :class="{'is-dark': !lightTheme}">
        <div class="container-boundaries p-5 mx-auto">
            <div v-if="loading">
                <icon-loading :dark="!lightTheme"/>
            </div>
            <div v-else-if="networkOptions.length">
                <router-view/>
            </div>
            <div v-else class="text-center">
                <p :class="{'text-white': !lightTheme}">Apologies, there seems to be an issue with our service at the moment.</p>
                <action-button
                    @click="fetchChains"
                >Retry</action-button>
            </div>
        </div>
    </div>
</template>

<script>
    import IconLoading from './components/IconLoading.vue';
    import ActionButton from './components/ActionButton.vue';
    import LocalStorageMixin from './mixins/LocalStorageMixin.vue';
    import {LIGHT_THEME, DEFAULT_CURRENCY, WALLETS_KEY} from './config/local_storage';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

    import "bootstrap/dist/css/bootstrap.min.css"
    import "nes.css/css/nes.min.css";

    export default {
        created() {
            const theme = this.getStorageItem(LIGHT_THEME);
            if (theme) {
                this.toggleLightTheme(theme);
            }

            // get default currency
            const currency = this.getStorageItem(DEFAULT_CURRENCY);
            if (currency) {
                this.updateDefaultCurrency(currency);
            }

            // get wallets
            const wallets = this.getStorageItem(WALLETS_KEY);
            if (!wallets) {
                this.saveStorageItem(WALLETS_KEY, {});
            } else {
                Object.keys(wallets).forEach(key => {
                    this.addWallet(wallets[key]);
                });
            }

            // fetch available networks
            this.fetchChains();
        },
        watch: {
            lightTheme(newValue) {
                this.saveStorageItem(LIGHT_THEME, newValue);
            },
            wallets: {
                handler(newItems) {
                    this.saveStorageItem(WALLETS_KEY, newItems);    
                },
                deep: true
            },
            'currencies.default'(newValue) {
                this.saveStorageItem(DEFAULT_CURRENCY, newValue);
            }
        },
        computed: {
            ...mapState(['lightTheme', 'wallets', 'currencies', 'loading']),
            ...mapGetters(['networkOptions'])
        },
        methods: {
            ...mapMutations(['toggleLightTheme', 'addWallet', 'updateDefaultCurrency']),
            ...mapActions(['fetchChains'])
        },
        mixins: [LocalStorageMixin],
        components: {
            IconLoading,
            ActionButton
        }
    }
</script>

<style>
    .is-dark {
        background: #212529;
    }
    .container-boundaries {
        max-width: 900px;
    }
</style>