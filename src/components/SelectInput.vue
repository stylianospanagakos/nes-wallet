<template>
    <div class="nes-select py-2" :class="{'is-error': error.length, 'is-dark': dark}">
        <select required :value="value" @input="$emit('input', $event.target.value)">
            <option selected disabled :value="null">{{ placeholder }}</option>
            <option
                v-for="option in options"
                :value="option[valueKey]"
                :key="option[valueKey]"
                :selected="value === option[valueKey]"
            >{{ option[labelKey] }}</option>
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
        },
        labelKey: {
            type: String,
            required: true
        },
        valueKey: {
            type: String,
            required: true
        },
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>
