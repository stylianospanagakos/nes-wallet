<template>
    <container :title="data.name" :iconURL="data.logo_url" :class="{'is-dark': dark}">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Balance: {{ currency }}{{ data.fiat_balance }}</p>
                <small class="d-block nes-text is-primary my-2">Holds {{ data.tokens_count }} Token{{ data.tokens_count === 1 ? '' : 's' }}</small>
                <small class="d-block text-muted">{{ data.address.truncated }}</small>
            </div>
            <div class="col text-end">
                <action-button
                    class="d-inline-block"
                    @click="$router.push({name: 'wallet', params: {wallet: data.uuid}})"
                >View</action-button>
                <action-button
                    class="d-inline-block ms-2"
                    theme="error"
                    @click="$refs[data.key].showModal()"
                >Delete</action-button>
            </div>
        </div>
        <dialog :ref="data.key" class="nes-dialog is-rounded mx-auto my-5" :class="{'is-dark': dark}">
            <p class="nes-text is-error text-center my-3">Are you sure you want to delete this wallet?</p>
            <menu class="dialog-menu mb-0 text-end">
                <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                <action-button class="d-inline-block" theme="error" @click="deleted">Delete</action-button>
            </menu>
        </dialog>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapMutations} from 'vuex';

export default {
    props: {
        data: {
            type: Object,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        dark: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        ...mapMutations(['removeWallet']),
        closeModal() {
            this.$refs[this.data.key].close();
        },
        deleted() {
            this.removeWallet(this.data.key);
        }
    },
    components: {
        Container,
        ActionButton
    }
}
</script>

<style scoped>
    small.d-block {
        word-break: break-all;
    }
    .nes-table {
        table-layout: auto;
        border: 4px solid #212529;
    }
    .nes-table {
        text-align: center;
    }
</style>