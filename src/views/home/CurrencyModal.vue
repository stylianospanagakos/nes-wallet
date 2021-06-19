<template>
    <dialog class="nes-dialog is-rounded mx-auto my-5" :class="{'is-dark': darkTheme}">
        <icon-loading v-if="views.home.form.loading" :dark="darkTheme"/>
        <form v-else @submit.prevent method="dialog">
            <select-input
                placeholder="Currency"
                :options="currencyOptions"
                label-key="currency"
                value-key="currency"
                v-model="currencyValue"
                :dark="darkTheme"
            />
            <menu class="dialog-menu mb-0">
                <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                <action-button class="d-inline-block" @click="clicked">Save</action-button>
            </menu>
        </form>
    </dialog>
</template>

<script>
import IconLoading from '../../components/IconLoading.vue';
import SelectInput from '../../components/SelectInput.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState(['darkTheme', 'currencies', 'views']),
        ...mapGetters(['currencyOptions']),
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
        ...mapActions(['fetchWallet', 'refreshWallets']),
        clicked() {
            if (this.currencyValue !== this.currencies.default) {
                this.refreshWallets(this.currencyValue)
                    .then(() => {
                        this.updateDefaultCurrency(this.currencyValue);
                    }).catch(error => {
                        console.error(error.message);
                    }).finally(() => {
                        this.closeModal();
                    });
            } else {
                this.closeModal();
            }
        },
        closeModal() {
            this.$parent.$refs.currencyModal.$el.close();
        }
    },
    components: {
        IconLoading,
        SelectInput,
        ActionButton
    }
}
</script>