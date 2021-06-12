<template>
    <div class="nes-field">
        <input
            class="nes-input"
            :class="{'is-error': error.length}"
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
        }
    }
}
</script>
