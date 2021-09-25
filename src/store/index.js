import Vue from "vue";
import Vuex from "vuex";
import api from "@/api/index";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goodsList: [],
        sideList: [],
        goodsListIndex: 2,
        goodsListType: "",
        goodsListTotal: 0,
        counterMap: {}
    },
    mutations: {
        setSideList(state, title){
            api.getSideList(
                {
                    type: title
                }
            ).then((res)=>{
                state.sideList = res.data;
                state.goodsListType = state.sideList[0];
                api.getGoodsList({
                    type: state.sideList[0],
                    page: 1,
                    size: 10,
                }).then((res)=>{
                    state.goodsList = res.data.list;
                });
            })
        },
        setGoodsList(state, type){
            state.goodsListType = type;
            api.getGoodsList({
                type: type,
                page: 1,
                size: 10,
            }).then((res)=>{
                console.log(res);
                state.goodsList = res.data.list;
                state.goodsListTotal = res.data.total;
            });
        },
        pullGoodsList(state){
            api.getGoodsList({
                type: state.goodsListType,
                page: state.goodsListIndex,
                sortType: 'price-up',
                size: 10,
            }).then((res)=>{
                state.goodsListTotal = res.data.total;
                if (state.goodsList.length >= res.data.total){
                    return 0;
                }else{
                    for (let item of res.data.list){
                        state.goodsList.push(item);
                    }
                }
            });
        },
        resetGoodsList(state){
            state.goodsList = [];
        },
        sortGoodsList(state, type){
            if (type === 'all'){
                state.goodsList.sort(()=>{
                    return Math.random() - 0.5;
                })
            }else if(type === 'sale'){
                for (let i = 0; i < state.goodsList.length - 1; ++i){
                    for (let j = i + 1; j < state.goodsList.length; ++j){
                        if (state.goodsList[i].sale < state.goodsList[j].sale){
                            let temp = state.goodsList[j];
                            state.goodsList[j] = state.goodsList[i];
                            state.goodsList[i] = temp;
                        }
                    }
                }
            }else if (type === 'price-up'){
                for (let i = 0; i < state.goodsList.length - 1; ++i){
                    for (let j = i + 1; j < state.goodsList.length; ++j){
                        if (state.goodsList[i].price > state.goodsList[j].price){
                            let temp = state.goodsList[j];
                            state.goodsList[j] = state.goodsList[i];
                            state.goodsList[i] = temp;
                        }
                    }
                }
            }else if (type === 'price-down'){
                for (let i = 0; i < state.goodsList.length - 1; ++i){
                    for (let j = i + 1; j < state.goodsList.length; ++j){
                        if (state.goodsList[i].price < state.goodsList[j].price){
                            let temp = state.goodsList[j];
                            state.goodsList[j] = state.goodsList[i];
                            state.goodsList[i] = temp;
                        }
                    }
                }
            }
        },
        setCounterMap(state, map){
            state.counterMap = map;
        },
        storageChange(state, {id, value}){
            if (state.counterMap[id]){
                if ((value === -1 && state.counterMap[id] === 1)|| value === -Infinity){
                    Vue.delete(state.counterMap, id)
                }else {
                    Vue.set(state.counterMap, id, state.counterMap[id] + value);
                }
            }else {
                Vue.set(state.counterMap, id, 1)
            }
            localStorage.setItem('goods', JSON.stringify(state.counterMap));
        }
    }

})