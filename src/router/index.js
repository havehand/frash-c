import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home";
import Classify from "@/views/Classify";
import Shopping from "@/views/Shopping";

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function goBack(){
    this.back = true;
    this.go(-1);
}

Vue.use(VueRouter);

const routes = [
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [
            {
                path: 'classify',
                name: "Classify",
                component: Classify
            },
            {
                path: 'shopping',
                component: Shopping,
                name: 'Shopping'
            }
        ]
    },
    {
        path: '*',
        redirect: {name: 'Home'}
    },
    {
        path: '/search',
        name: "Search",
        component: ()=>import("@/views/Search"),
    }
]

const router = new VueRouter({
    routes
})

export default router