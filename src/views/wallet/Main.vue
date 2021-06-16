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
            <div v-else-if="details.tokens.length">
                <token
                    v-for="token in details.tokens"
                    :key="`${token.contract_address}${token.contract_ticker_symbol}`"
                    :data="token"
                />
            </div>
            <div v-else class="text-center mt-5">
                <container title="FTM">
                    <div class="row align-items-center">
                        <div class="col-md-6 text-start">
                            <p class="my-0">Balance: 12313</p>
                            <small class="d-block text-muted my-2">Fiat Value: $12312.42</small>
                            <div class="mt-3">
                                <span class="nes-badge is-splited w-auto">
                                    <span class="is-dark w-auto position-relative px-1">erc</span>
                                    <span class="is-success w-auto position-relative px-1">20</span>
                                </span>
                                <span class="nes-badge is-splited w-auto ms-3">
                                    <span class="is-dark w-auto position-relative px-1">erc</span>
                                    <span class="is-success w-auto position-relative px-1">271</span>
                                </span>
                            </div>
                        </div>
                        <div class="col-md-6 text-end">
                            <action-button class="d-inline-block me-2">Transfers</action-button>
                            <action-button class="d-inline-block" :plain="true">History</action-button>
                        </div>
                    </div>
                </container>
                <p>Apologies, we couldn't fetch your wallet details.</p>
                <action-button
                    @click="fetchBalanceHistory({chainId: wallet.chain_id, address: wallet.address.full})"
                >Retry</action-button>
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
import Container from '../../components/Container.vue';
import Token from './Token.vue';
import {mapState, mapGetters, mapActions} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            // this.fetchBalanceHistory({
            //     chainId: this.wallet.chain_id,
            //     address: this.wallet.address.full
            // });
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
        Container,
        ActionButton,
        IconLoading,
        Token
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