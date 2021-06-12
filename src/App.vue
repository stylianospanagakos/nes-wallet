<template>
    <div v-if="app.loading">
        <icon-loading/>
    </div>
    <div v-else-if="networkOptions.length" class="p-5 mx-auto" style="max-width: 900px">
        <div id="nav">
            <router-link
                :to="{ name: 'wallet' }"
                v-slot="{ href, navigate, isActive, isExactActive }"
                exact
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
  <div v-else class="text-center p-5">
      <p>Apologies, there seems to be an issue with our service at the moment.</p>
  </div>
</template>

<script>
    import NavOption from './components/NavOption.vue';
    import IconLoading from './components/IconLoading.vue';
    import {mapState, mapGetters, mapActions} from 'vuex';

    import "bootstrap/dist/css/bootstrap.min.css"
    import "nes.css/css/nes.min.css";

    export default {
        created() {
            this.fetchChains();
        },
        computed: {
            ...mapState(['app']),
            ...mapGetters(['networkOptions'])
        },
        methods: {
            ...mapActions(['fetchChains'])
        },
        components: {
            NavOption,
            IconLoading
        }
    }
</script>