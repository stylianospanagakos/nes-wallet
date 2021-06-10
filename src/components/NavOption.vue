<template>
    <a
        :href="href"
        class="nes-text"
        :class="[isActive && 'router-link-active is-primary', isExactActive && 'router-link-exact-active']"
        @click="navigate"
      >{{ title }}</a>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
        },
        href: {
            type: String,
            default: '#'
        },
        isActive: {
            type: Boolean,
            default: false
        },
        isExactActive: {
            type: Boolean,
            default: false
        },
        navigate: {
            type: Function,
            required: true
        }
    }
}
</script>

<style scoped>
  a {
    color: inherit;
  }
  a:hover {
      color: #209cee;
      text-decoration: none;
  }
</style>
