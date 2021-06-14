<template>
    <container :title="data.name" :iconURL="data.logo_url">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: ${{ data.fiat_balance }}</p>
                <small class="text-muted">{{ data.address.truncated }}</small>
            </div>
            <div class="col text-end">
                <button
                    type="button"
                    class="nes-btn is-primary"
                >Show Details</button>
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
    components: {
        Container
    }
}
</script>