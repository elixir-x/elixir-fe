import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            secure: true,
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {}
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

export default router;
