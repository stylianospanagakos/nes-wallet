<template>
    <div class="nes-select py-2">
        <select :value="value" @input="$emit('input', $event.target.value)">
            <option disabled :value="null">{{ placeholder }}</option>
            <option :v-for="option in options" :value="option.id" :selected="value === option.id">{{ option.value }}</option>
        </select>
    </div>
</template>

<script>
export default {
    props: {
        placeholder: {
            type: String,
            default: 'Select Option'
        },
        options: {
            type: Array,
            default: () => []
        },
        value: {
            type: String,
            default: ''
        }
    }
}
</script>
