import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import EmailVerification from "../pages/EmailVerification.vue";
import Home from "../pages/Home.vue";

import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import HomeLayout from "../layouts/HomeLayout.vue";

import { useSecurityStore } from "../stores/security";


const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            // layout: HomeLayout
        }
    },
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
        path: '/email-verification',
        name: 'EmailVerification',
        component: EmailVerification,
        props: true,
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
