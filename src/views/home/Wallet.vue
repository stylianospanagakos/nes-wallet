<template>
    <container :title="data.name" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: ${{ data.fiat_balance }}</p>
                <small class="d-block nes-text is-primary my-2">Holds {{ tokensLength }} Token{{ tokensLength === 1 ? '' : 's' }}</small>
                <small class="d-block text-muted">{{ data.address.truncated }}</small>
            </div>
            <div class="col text-end">
                <action-button
                    class="d-inline-block"
                    @click="$router.push({name: 'wallet', params: {uuid: data.uuid}})"
                >View</action-button>
                <action-button
                    class="d-inline-block ms-2"
                    theme="error"
                    @click="$refs[data.key].showModal()"
                >Delete</action-button>
            </div>
        </div>
        <dialog :ref="data.key" class="nes-dialog is-rounded mx-auto my-5">
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
        }
    },
    computed: {
        tokensLength() {
            return this.data.tokens.length;
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