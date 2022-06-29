import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from "vue-router";

import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';

import DefaultLayout from '../layouts/DefaultLayout.vue';
import DashboardLayout from '../layouts/DashboardLayout.vue';

import { useSecurityStore } from "../stores/security";


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
            layout: DashboardLayout
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
    const securityStore = useSecurityStore();
    handleRedirect(to.path, securityStore.isLoggedIn, to.meta.secure as boolean, next);
    next();
});

const handleRedirect = (path: string, loggedIn: boolean, secure: boolean, next: NavigationGuardNext) => {
    // if (loggedIn) {
    //     if (path === '/login')
    //         return next('/dashboard');
    //     else return next();
    // } else if (secure && path !== '/login')
    //     return next('/login');
    // else return next();
}

export default router;
