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
import {mapGetters} from 'vuex';

export default {
    created() {
        if (this.wallet) {
            console.log('exists');
        }
    },
    computed: {
        ...mapGetters(['walletItems']),
        wallet() {
            return this.walletItems.find(item => item.uuid === this.$route.params.uuid);
        }
    },
    methods: {},
    components: {
        ActionButton
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