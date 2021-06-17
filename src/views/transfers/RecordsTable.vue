<template>
    <div class="nes-table-responsive">
        <table class="nes-table is-bordered is-centered">
            <thead>
                <tr>
                    <th>When</th>
                    <th>Status</th>
                    <th>Address</th>
                    <th>Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.tx_hash">
                    <td>{{ item.block_signed_at }}</td>
                    <td>
                        <span class="nes-badge">
                            <span :class="`is-${ item.successful ? 'success' : 'error' } w-auto`">
                                {{ item.successful ? 'Success' : 'Fail' }}
                            </span>
                        </span>
                    </td>
                    <td>{{ item.display_address }}</td>
                    <td>
                        <span v-if="!parseFloat(item.amount)" :class="`nes-text`">
                            {{ item.amount }}
                        </span>
                        <span v-else :class="`nes-text is-${item.transfer_type === 'IN' ? 'success' : 'error'}`">
                            {{ item.amount }}
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            default: () => []
        }
    }
}
</script>