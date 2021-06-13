<template>
    <dialog class="nes-dialog is-rounded">
        <form method="dialog">
            <input-text
                placeholder="Address"
                v-model="addressValue"
                :error="form.address.error"
            />
            <menu class="dialog-menu">
                <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                <action-button class="d-inline-block" @click="clicked">Save</action-button>
            </menu>
        </form>
    </dialog>
</template>

<script>
import InputText from '../../components/InputText.vue';
import ActionButton from '../../components/ActionButton.vue';
import {mapState, mapMutations} from 'vuex';

export default {
    computed: {
        ...mapState(['form']),
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
        ActionButton
    }    
}
</script>

<style scoped>
    .nes-dialog {
        top: -45%;
    }
</style>