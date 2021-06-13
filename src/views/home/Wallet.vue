<template>
    <container title="Test" iconURL="https://www.covalenthq.com/static/images/icons/display-icons/ethereum-eth-logo.png">
        <div class="row align-items-center">
            <div class="col">
                <p class="my-0">Total: $50</p>
                <small class="text-muted">0xF11766c3726f...40b06</small>
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
    components: {
        Container
    }
}
</script>