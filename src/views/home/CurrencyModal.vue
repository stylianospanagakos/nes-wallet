<template>
    <dialog class="nes-dialog is-rounded mx-auto my-5">
        <form @submit.prevent method="dialog">
            <select-input
                placeholder="Currency"
                :options="currencies.items"
                label-key="currency"
                value-key="currency"
                v-model="currencyValue"
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
        currencyValue: {
            get() {
                return this.currencies.value;
            },
            set(value) {
                this.updateCurrencyValue(value);
            }
        }
    },
    methods: {
        ...mapMutations(['updateDefaultCurrency', 'updateCurrencyValue']),
        ...mapActions(['fetchWallet']),
        clicked() {
            this.updateDefaultCurrency(this.currencyValue);
            this.closeModal();
        },
        closeModal() {
            this.$parent.$refs.currencyModal.$el.close();
        }
    },
    components: {
        SelectInput,
        ActionButton
    }
}
</script>