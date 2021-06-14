<script>
export default {
    methods: {
        getStorageItem(key) {
            const item = localStorage[key];
            return item ? JSON.parse(localStorage[key]) : null;
        },
        saveStorageItem(key, value) {
            const item = this.getStorageItem(key);
            if (item) {
                switch (typeof item) {
                    case 'string':
                    case 'boolean':
                    case 'number':
                        localStorage[key] = JSON.stringify(value);
                        break;
                    default:
                        if (Array.isArray(item)) {
                            item.push(value);
                        } else {
                            item[value.key] = value;
                        }
                        localStorage[key] = JSON.stringify(item);
                }
            } else {
                localStorage[key] = JSON.stringify(value);
            }
        },
        deleteStorageItem(key) {
            localStorage.removeItem(key);
        }
    }
}
</script>