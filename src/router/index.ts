import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Login from "@/views/Login.vue";
import Game from "@/components/game";
import Menu from "@/components/menu";
import { authGuard } from "@/services/auth";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/game/:id",
        name: "Game",
        component: Game,
        beforeEnter: authGuard
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "/",
        name: "Menu",
        component: Menu,
        beforeEnter: authGuard
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
