import { createRouter, createWebHistory, NavigationGuardNext, RouteRecordRaw } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Dashboard from '../pages/Dashboard.vue';
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
});

const handleRedirect = (path: string, loggedIn: boolean, secure: boolean, next: NavigationGuardNext) => {
    if (loggedIn) {
        if (path === '/login')
            return next('/dashboard');
    } else if (secure)
        return next('/login');
    else return next();
}

export default router;
