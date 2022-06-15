import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';

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
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
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

router.beforeEach((to, from, next) => {
    if (to.meta.secure && to.path !== '/login') {
        // TODO: handle login
        return next('/login');
    }
    return next();
});

export default router;
