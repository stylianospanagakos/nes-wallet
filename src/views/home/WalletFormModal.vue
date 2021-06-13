<template>
    <dialog class="nes-dialog is-rounded">
        <form method="dialog">
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
import {mapState, mapGetters, mapMutations} from 'vuex';

export default {
    computed: {
        ...mapState(['form']),
        ...mapGetters(['networkOptions']),
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
        }
    },
    methods: {
        ...mapMutations(['updateFormField']),
        clicked() {
            this.closeModal();
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
        ActionButton
    }    
}
</script>

<style scoped>
    .nes-dialog {
        top: -45%;
    }
</style>