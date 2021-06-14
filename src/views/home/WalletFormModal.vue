<template>
    <dialog class="nes-dialog is-rounded">
        <icon-loading v-if="form.loading" :iconURL="networkLogo"/>
        <form v-else @submit.prevent method="dialog">
            <input-text
                placeholder="Name"
                v-model="nameValue"
                :error="form.name.error"
            />
            <input-text
                placeholder="Address"
                v-model="addressValue"
                :error="form.address.error"
            />
            <select-input
                placeholder="Network"
                :options="networkOptions"
                label-key="label"
                value-key="chain_id"
                v-model="chainIdValue"
                :error="form.chainId.error"
            />
            <p class="nes-text is-error text-center my-3">{{ form.responseError }}</p>
            <menu class="dialog-menu mb-0">
                <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                <action-button class="d-inline-block" @click="clicked">Save</action-button>
            </menu>
        </form>
    </dialog>
</template>

<script>
import InputText from '../../components/InputText.vue';
import SelectInput from '../../components/SelectInput.vue';
import ActionButton from '../../components/ActionButton.vue';
import IconLoading from '../../components/IconLoading.vue';
import FieldsValidationMixin from '../../mixins/FieldsValidationMixin.vue';
import LocalStorageMixin from '../../mixins/LocalStorageMixin.vue';
import {WALLETS_KEY} from '../../config/local_storage';
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState(['form', 'networks']),
        ...mapGetters(['networkOptions']),
        nameValue: {
            get() {
                return this.form.name.value;
            },
            set(value) {
                this.updateFormField({
                    field: 'name',
                    payload: {
                        value,
                        error: this.isFieldEmpty(value)
                    }
                });
            }
        },
        addressValue: {
            get() {
                return this.form.address.value;
            },
            set(value) {
                this.updateFormField({
                    field: 'address',
                    payload: {
                        value,
                        error: this.isFieldEmpty(value)
                    }
                });
            }
        },
        chainIdValue: {
            get() {
                return this.form.chainId.value;
            },
            set(value) {
                this.updateFormField({
                    field: 'chainId',
                    payload: {
                        value,
                        error: this.isFieldEmpty(value)
                    }
                });
            }
        },
        networkLogo() {
            const chainId = this.form.chainId.value;
            if (chainId) {
                return this.networks[chainId].logo_url;
            }
            return '';
        }
    },
    methods: {
        ...mapMutations(['updateFormField']),
        ...mapActions(['fetchBalance']),
        clicked() {
            if (this.validateForm([
                { field: 'name', value: this.nameValue, rule: this.isFieldEmpty },
                { field: 'chainId', value: this.chainIdValue, rule: this.isFieldEmpty },
                { field: 'address', value: this.addressValue, rule: this.isFieldEmpty }
            ])) {
                this.fetchBalance({
                    name: this.nameValue,
                    chainId: this.chainIdValue,
                    address: this.addressValue
                }).then((response) => {
                    this.saveStorageItem(WALLETS_KEY, response);
                    this.closeModal();
                }).catch(error => {
                    console.error(error.message);
                });
            }
        },
        closeModal() {
            this.$parent.$refs.walletForm.$el.close();
        },
        isFieldEmpty(value) {
            return value.length ? '' : 'Field cannot be empty';
        }
    },
    components: {
        InputText,
        SelectInput,
        ActionButton,
        IconLoading
    },
    mixins: [FieldsValidationMixin, LocalStorageMixin]
}
</script>

<style scoped>
    .nes-dialog {
        top: -45%;
    }
</style>