<template>
    <div class="container-boundaries p-5 mx-auto">
        <div v-if="loading">
            <icon-loading/>
        </div>
        <div v-else-if="networkOptions.length">
            <div id="nav">
                <router-link
                    :to="{ name: 'home' }"
                    v-slot="{ href, navigate, isActive, isExactActive }"
                    exact
                    custom
                >
                    <nav-option
                        :href="href"
                        :is-active="isActive"
                        :is-exact-active="isExactActive"
                        :navigate="navigate"
                        title="Home"
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
        <div v-else class="text-center">
            <p>Apologies, there seems to be an issue with our service at the moment.</p>
            <action-button
                @click="fetchChains"
            >Retry</action-button>
        </div>
    </div>
</template>

<script>
    import NavOption from './components/NavOption.vue';
    import IconLoading from './components/IconLoading.vue';
    import ActionButton from './components/ActionButton.vue';
    import {mapState, mapGetters, mapActions} from 'vuex';

    import "bootstrap/dist/css/bootstrap.min.css"
    import "nes.css/css/nes.min.css";

    export default {
        created() {
            this.fetchChains();
        },
        computed: {
            ...mapState(['loading']),
            ...mapGetters(['networkOptions'])
        },
        methods: {
            ...mapActions(['fetchChains'])
        },
        components: {
            NavOption,
            IconLoading,
            ActionButton
        }
    }
</script>

<style scoped>
    .container-boundaries {
        max-width: 900px;
    }
</style>