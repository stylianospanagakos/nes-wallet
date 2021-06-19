<template>
    <i class="nes-icon close" :class="{'is-dark': dark}"></i>
</template>

<script>
export default {
    props: {
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
.nes-icon.close.is-dark::before {
    color: #fff;
}
</style>