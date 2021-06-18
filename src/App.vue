<template>
    <div class="container-boundaries p-5 mx-auto">
        <div v-if="loading">
            <icon-loading/>
        </div>
        <div v-else-if="networkOptions.length">
            <div v-if="false" id="nav">
                <router-link
                    :to="{ name: 'home' }"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                    exact
                    custom
                >
                    <nav-option
                        :href="href"
                        :is-active="isActive"
                        :is-exact-active="isExactActive"
                        :navigate="navigate"
                        title="Home"
                    />
                </router-link> |
                <router-link
                    :to="{ name: 'protocol' }"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                    custom
                >
                    <nav-option
                        :href="href"
                        :is-active="isActive"
                        :is-exact-active="isExactActive"
                        :navigate="navigate"
                        title="Protocols"
                    />
                </router-link>
            </div>
            <div>
                <router-view/>
            </div>
        </div>
        <div v-else class="text-center">
            <p>Apologies, there seems to be an issue with our service at the moment.</p>
            <action-button
                @click="fetchChains"
            >Retry</action-button>
        </div>
    </div>
</template>

<script>
    import NavOption from './components/NavOption.vue';
    import IconLoading from './components/IconLoading.vue';
    import ActionButton from './components/ActionButton.vue';
    import LocalStorageMixin from './mixins/LocalStorageMixin.vue';
    import {WALLETS_KEY, DEFAULT_CURRENCY} from './config/local_storage';
    import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

    import "bootstrap/dist/css/bootstrap.min.css"
    import "nes.css/css/nes.min.css";

    export default {
        created() {
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
            ...mapState(['wallets', 'currencies', 'loading']),
            ...mapGetters(['networkOptions'])
        },
        methods: {
            ...mapMutations(['addWallet', 'updateDefaultCurrency']),
            ...mapActions(['fetchChains'])
        },
        mixins: [LocalStorageMixin],
        components: {
            NavOption,
            IconLoading,
            ActionButton
        }
    }
</script>

<style scoped>
    .container-boundaries {
        max-width: 900px;
    }
</style>