<template>
    <div class="py-2">
        <button
            v-if="!loading"
            type="button"
            :class="`nes-btn ${!plain ? 'is-' + theme : ''}`"
            :disabled="disabled"
            @click="click"
        >
            <slot></slot>
        </button>
        <button
            v-else
            type="button"
            :class="`nes-btn ${!plain ? 'is-' + theme : ''}`"
        >
            Loading...
        </button>
    </div>
</template>

<script>
export default {
    props: {
        theme: {
            type: String,
            default: 'primary'
        },
        plain: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        click() {
            if (!this.disabled) {
                this.$emit('click');
            }
        }
    }
}
</script>