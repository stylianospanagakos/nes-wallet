<template>
    <div class="py-2">
        <label class="m-0">
            <input
                type="checkbox"
                class="nes-checkbox"
                :class="{'is-dark': dark}"
                :checked="value"
                @change="$emit('input', $event.target.checked)"
            />
            <span>{{ label }}</span>
          </label>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: Boolean,
            default: false
        },
        dark: {
            type: Boolean,
            default: false
        }
    }
}
</script>
