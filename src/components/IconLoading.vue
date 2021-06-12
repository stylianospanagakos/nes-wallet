<template>
    <div class="my-5 text-center">
        <div v-if="iconURL.length" class="bounce-animation">
            <img class="nes-avatar is-rounded is-large" :src="iconURL" style="image-rendering: pixelated;">
        </div>
        <div v-else class="bounce-animation">
            <i class="nes-icon coin is-large"></i>
        </div>
        <p class="mt-3">Loading...</p>
    </div>
</template>

<script>
export default {
    props: {
        iconURL: {
            type: String,
            default: ''
        }
    }
}
</script>

<style scoped>
    .bounce-animation {
        animation: bound-anim 0.8s 0.0s infinite;
    }

    @keyframes bound-anim {
        0%   { transform: translateY(0); }
        50%  { transform: translateY(-7px); }
        100% { transform: translateY(0); }
    }
</style>