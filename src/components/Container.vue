<template>
    <div class="nes-container with-title" :class="{disabled: disabled}">
      <p class="title">{{ title }}</p>
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