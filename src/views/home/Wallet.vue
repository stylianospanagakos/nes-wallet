<template>
    <container :title="data.name" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: ${{ data.fiat_balance }}</p>
                <small class="d-block text-muted my-1">{{ data.address.truncated }}</small>
            </div>
            <div class="col text-end">
                <button
                    type="button"
                    class="nes-btn is-primary"
                    @click="expanded = !expanded"
                >{{ expanded ? 'Hide' : 'Show' }} Details</button>
            </div>
        </div>
    </container>
</template>

<script>
import Container from '../../components/Container.vue';

export default {
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            expanded: false
        }
    },
    components: {
        Container
    }
}
</script>

<style scoped>
    small.d-block {
        word-break: break-all;
    }
</style>