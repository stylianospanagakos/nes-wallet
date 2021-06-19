<template>
    <div class="nes-field py-2">
        <input
            class="nes-input"
            :class="{'is-error': error.length, 'is-dark': dark}"
            :type="type"
            :placeholder="placeholder"
            :value="value"
            @input="$emit('input', $event.target.value)"
        />
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'text'
        },
        placeholder: {
            type: String,
            default: ''
        },
        value: {
            type: String,
            default: ''
        },
        error: {
            type: String,
            default: ''
        },
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>
