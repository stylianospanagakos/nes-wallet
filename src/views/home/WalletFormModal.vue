<template>
    <dialog class="nes-dialog is-rounded mx-auto my-5">
        <icon-loading v-if="views.home.form.loading" :iconURL="networkLogo"/>
        <form v-else @submit.prevent method="dialog">
            <input-text
                placeholder="Name"
                v-model="nameValue"
                :error="views.home.form.name.error"
            />
            <input-text
                placeholder="Address"
                v-model="addressValue"
                :error="views.home.form.address.error"
            />
            <select-input
                placeholder="Network"
                :options="networkOptions"
                label-key="label"
                value-key="chain_id"
                v-model="chainIdValue"
                :error="views.home.form.chainId.error"
            />
            <p class="nes-text is-error text-center my-3">{{ views.home.form.responseError }}</p>
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
import {mapState, mapGetters, mapMutations, mapActions} from 'vuex';

export default {
    computed: {
        ...mapState(['views', 'networks']),
        ...mapGetters(['networkOptions']),
        nameValue: {
            get() {
                return this.views.home.form.name.value;
            },
            set(value) {
                this.updateFormField({
                    section: 'home',
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
                return this.views.home.form.address.value;
            },
            set(value) {
                this.updateFormField({
                    section: 'home',
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
                return this.views.home.form.chainId.value;
            },
            set(value) {
                this.updateFormField({
                    section: 'home',
                    field: 'chainId',
                    payload: {
                        value,
                        error: this.isFieldEmpty(value)
                    }
                });
            }
        },
        networkLogo() {
            const chainId = this.views.home.form.chainId.value;
            if (chainId) {
                return this.networks[chainId].logo_url;
            }
            return '';
        }
    },
    methods: {
        ...mapMutations(['updateFormField']),
        ...mapActions(['fetchWallet']),
        clicked() {
            if (this.validateForm([
                { section: 'home', field: 'name', value: this.nameValue, rule: this.isFieldEmpty },
                { section: 'home', field: 'chainId', value: this.chainIdValue, rule: this.isFieldEmpty },
                { section: 'home', field: 'address', value: this.addressValue, rule: this.isFieldEmpty }
            ])) {
                this.fetchWallet({
                    name: this.nameValue,
                    chainId: this.chainIdValue,
                    address: this.addressValue
                }).then(() => {
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