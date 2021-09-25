import axios from "axios";
const appkey = '1210900889_1631443786693';
const instance = axios.create({
    baseURL: 'https://mallapi.duyiedu.com/goods',
    params: {
        appkey
    }
})

export default instance;