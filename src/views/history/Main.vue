<template>
    <div>
        <action-button>Back</action-button>
        <icon-loading/>
    </div>
</template>

<script>
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            this.fetchPortfolioHistory({
                chainId: this.wallet.chain_id,
                address: this.wallet.address.full,
                contract: this.$route.params.token,
                symbol: this.$route.params.symbol
            });
        }
    },
    computed: {
        ...mapState(['views']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        },
    },
    methods: {
        ...mapActions(['fetchPortfolioHistory'])
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