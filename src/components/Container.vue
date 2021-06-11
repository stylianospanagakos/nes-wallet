<template>
    <div class="nes-container with-title">
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
        }
    }
}
</script>
