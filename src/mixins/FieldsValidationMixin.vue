<script>
export default {
    methods: {
        validateForm(fields) {
            let valid = true;

            fields.forEach(({ section, field, value, rule }) => {
                let error = rule(value);

                // update valid value
                valid = valid && !error;

                // update field's error only if it exists
                if (error.length) {
                    this.updateFormField({
                        section,
                        field,
                        payload: {error}
                    });
                }
            });

            return valid;
        }
    }
}
</script>