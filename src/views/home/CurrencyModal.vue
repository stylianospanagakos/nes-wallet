<template>
    <dialog class="nes-dialog is-rounded mx-auto my-5">
        <form @submit.prevent method="dialog">
            <select-input
                placeholder="Network"
                :options="networkOptions"
                label-key="label"
                value-key="chain_id"
                v-model="chainIdValue"
                :error="views.home.form.chainId.error"
            />
            <menu class="dialog-menu mb-0">
                <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                <action-button class="d-inline-block" @click="clicked">Save</action-button>
            </menu>
        </form>
    </dialog>
</template>

<script>
import SelectInput from '../../components/SelectInput.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapState, mapMutations, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState(['currencies']),
        chainIdValue: {
            get() {
                return this.currencies.value;
            },
            set(value) {
                this.updateCurrency(value);
            }
        }
    },
    methods: {
        ...mapMutations(['updateCurrency']),
        ...mapActions(['fetchWallet']),
        clicked() {
            
        },
        closeModal() {
            this.$parent.$refs.walletForm.$el.close();
        }
    },
    components: {
        InputText,
        SelectInput,
        ActionButton,
        IconLoading
    }
}
</script>