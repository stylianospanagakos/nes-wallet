<template>
  <div class="p-5 mx-auto" style="max-width: 900px">
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
        :to="{ name: 'protocol' }"
        v-slot="{ href, navigate, isActive, isExactActive }"
        custom
      >
        <nav-option
          :href="href"
          :is-active="isActive"
          :is-exact-active="isExactActive"
          :navigate="navigate"
          title="Protocols"
        />
      </router-link>
    </div>
    <div class="py-5">
      <router-view/>
    </div>
  </div>
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