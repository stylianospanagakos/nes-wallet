import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.VUE_APP_COVALENT_API_DOMAIN,
    params: {
        key: process.env.VUE_APP_COVALENT_API_KEY
    }
});

instance.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export default instance;