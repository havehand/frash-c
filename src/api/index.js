import axios from "@/axios/index";
import URL from "@/URL/index"

export default {
    getSideList(params){
        return axios.get(URL.getSide, {params});
    },
    getGoodsList(params){
        return axios.get(URL.getGoodsList, {params});
    },
    likeSearch(params){
        return axios.get(URL.linkSearch, {params});
    },
    search(params){
        return axios.get(URL.search, {params});
    },
    getGoodsByIds(params){
        return axios.get(URL.getGoodsByIds, {params});
    }
}
