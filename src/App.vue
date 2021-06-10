<template>
  <div id="nav">
    <router-link
      :to="{ name: 'home' }"
      v-slot="{ href, navigate, isActive, isExactActive }"
      custom
    >
      <nav-option
        :href="href"
        :is-active="isActive"
        :is-exact-active="isExactActive"
        :navigate="navigate"
        title="Wallet"
      />
    </router-link> |
    <router-link
      :to="{ name: 'about' }"
      v-slot="{ href, navigate, isActive, isExactActive }"
      custom
    >
      <nav-option
        :href="href"
        :is-active="isActive"
        :is-exact-active="isExactActive"
        :navigate="navigate"
        title="About"
      />
    </router-link>
  </div>
  <router-view/>
</template>

<script>
  import NavOption from './components/NavOption.vue';

  import "bootstrap/dist/css/bootstrap.min.css"
  import "nes.css/css/nes.min.css";

  export default {
    components: {
      NavOption
    }
  }
</script>