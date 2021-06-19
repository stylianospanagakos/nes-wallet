<template>
    <div class="nes-container is-rounded with-title my-5" :class="{disabled: disabled}">
        <p class="title">
            <img v-if="iconURL.length" class="nes-avatar is-rounded is-medium" :src="iconURL" style="image-rendering: pixelated;"/>
            {{ title }}
        </p>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: 'Title'
        },
        iconURL: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
</style>