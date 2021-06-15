<template>
    <div>
        <div v-if="wallet">
            <div class="row">
                <div class="col">
                    <h1>{{ wallet.name }}</h1>
                </div>
                <div class="col text-end">
                    <a @click="$router.push({name: 'home'})">
                        <i class="nes-icon close"></i>
                    </a>
                </div>
            </div>
            <div v-if="details.loading">
                <icon-loading :iconURL="wallet.logo_url"/>
            </div>
        </div>
        <div v-else class="text-center">
            <p class="nes-text is-error">Invalid wallet.</p>
            <action-button
                class="mb-5"
                @click="$router.push({name: 'home'})"
            >Go Back</action-button>
        </div>
    </div>
</template>

<script>
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            this.fetchBalanceHistory({
                chainId: this.wallet.chain_id,
                address: this.wallet.address.full
            });
        }
    },
    computed: {
        ...mapState(['details']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.uuid);
        }
    },
    methods: {
        ...mapActions(['fetchBalanceHistory'])
    },
    components: {
        ActionButton,
        IconLoading
    }
}
</script>

<style scoped>
    h1 {
        font-size: 1.7rem;
    }
    i.nes-icon.close {
        transform: scale(2);
    }
</style>