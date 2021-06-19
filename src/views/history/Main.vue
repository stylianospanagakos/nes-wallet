<template>
    <div v-if="wallet">
        <div class="row">
            <div class="col">
                <h1 :class="{'text-white': !lightTheme}">History</h1>
                <small class="text-muted">{{ $route.params.symbol }}</small>
            </div>
            <div class="col text-end">
                <a @click="$router.push({name: 'wallet', params: {wallet: wallet.uuid}})">
                    <close-icon :dark="!lightTheme"/>
                </a>
            </div>
        </div>
        <div v-if="views.history.loading">
            <icon-loading :iconURL="wallet.logo_url"/>
        </div>
        <div v-else-if="showGraphs">
            <div class="row align-items-center mt-5">
                <div class="col">
                    <p class="nes-text m-0" :class="{'text-white': !lightTheme}">
                        Change:
                        <span :class="`nes-text ${percentageChange > 0 ? 'is-success' : percentageChange < 0 ? 'is-error' : ''}`">
                            {{ percentageChange.toFixed(2) }}%
                        </span>
                    </p>
                </div>
                <div class="col text-end">
                    <check-box label="Candlestick Chart" v-model="showCandlestick" :dark="!lightTheme"/>
                </div>
            </div>
            <div v-if="showCandlestick">
                <candle-chart
                    label="Balance"
                    :data="views.history.candlestick"
                />
            </div>
            <div v-else>
                <line-graph
                    label="Balance"
                    :data="views.history.line"
                />
            </div>
        </div>
        <div v-else class="text-center mt-5">
            <p>Apologies, we couldn't fetch token's data.</p>
            <action-button
                @click="fetchPortfolioHistory({
                    chainId: wallet.chain_id,
                    address: wallet.address.full,
                    contract: $route.params.token,
                    symbol: $route.params.symbol
                })"
            >Retry</action-button>
        </div>
    </div>
    <div v-else class="text-center">
        <p class="nes-text is-error">Invalid wallet.</p>
        <action-button
            class="mb-5"
            @click="$router.push({name: 'home'})"
        >Go Home</action-button>
    </div>
</template>

<script>
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import CloseIcon from '../../components/CloseIcon.vue';
import CheckBox from '../../components/CheckBox.vue';
import LineGraph from '../../components/graphs/LineGraph.vue';
import CandleChart from '../../components/graphs/CandleChart.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

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
        ...mapState(['lightTheme', 'views']),
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.wallet);
        },
        showGraphs() {
            return this.views.history.line.length && this.views.history.candlestick.length;
        },
        showCandlestick: {
            get() {
                return this.views.history.showCandlestick;
            },
            set(value) {
                this.toggleChart(value);
            }
        },
        percentageChange() {
            if (this.showGraphs) {
                const itemsLength = this.views.history.line.length;
                const last = parseFloat(this.views.history.line[itemsLength - 1].y);
                const first = parseFloat(this.views.history.line[0].y);
                const difference = last - first;
                if (difference === 0) {
                    return 0;
                } else if (difference > 0) {
                    return (difference / first) * 100
                } else {
                    const decrease = first - last;
                    return -(decrease / first) * 100
                }
            }
            return null;
        }
    },
    methods: {
        ...mapMutations(['toggleChart']),
        ...mapActions(['fetchPortfolioHistory'])
    },
    components: {
        ActionButton,
        IconLoading,
        CloseIcon,
        CheckBox,
        LineGraph,
        CandleChart
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