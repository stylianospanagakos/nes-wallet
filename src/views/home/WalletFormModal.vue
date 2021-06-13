<template>
    <dialog class="nes-dialog is-rounded">
        <form method="dialog">
            <p class="title">Rounded dialog</p>
            <p>Alert: this is a dialog.</p>
            <menu class="dialog-menu">
                <action-button class="d-inline-block mx-2" :plain="true" @click="closeModal">Cancel</action-button>
                <action-button class="d-inline-block" @click="clicked">Save</action-button>
            </menu>
        </form>
    </dialog>
</template>

<script>
import ActionButton from '../../components/ActionButton.vue';

export default {
    methods: {
        clicked() {
            this.closeModal();
        },
        closeModal() {
            this.$parent.$refs.walletForm.$el.close();
        }
    },
    components: {
        ActionButton
    }    
}
</script>