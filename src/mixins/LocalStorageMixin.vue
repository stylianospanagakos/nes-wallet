<script>
export default {
    methods: {
        getStorageItem(key) {
            const item = localStorage[key];
            return item ? JSON.parse(localStorage[key]) : null;
        },
        saveStorageItem(key, value) {
            localStorage[key] = JSON.stringify(value);
        }
    }
}
</script>