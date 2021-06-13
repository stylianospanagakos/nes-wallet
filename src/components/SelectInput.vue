<template>
    <div class="nes-select py-2" :class="{'is-error': error.length}">
        <select required @input="$emit('input', $event.target.value)">
            <option selected disabled :value="null">{{ placeholder }}</option>
            <option
                v-for="option in options"
                :value="option.value"
                :key="option.value"
                :selected="value === option.value"
            >{{ option.title }}</option>
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
        },
        error: {
            type: String,
            default: ''
        }
    }
}
</script>
