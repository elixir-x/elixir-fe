import {
	createRouter,
	createWebHistory,
	NavigationGuardNext,
	RouteRecordRaw
} from "vue-router";

import Login from "../pages/Login.vue";
import Register from "../pages/Register.vue";
import Dashboard from "../pages/Dashboard.vue";
import EmailVerification from "../pages/EmailVerification.vue";
import Home from "../pages/Home.vue";

import DefaultLayout from "../layouts/DefaultLayout.vue";
import DashboardLayout from "../layouts/DashboardLayout.vue";
import HomeLayout from "../layouts/HomeLayout.vue";

import Settings from "../pages/settings/Settings.vue";
import General from "../pages/settings/General.vue";
import Profile from "../pages/settings/Profile.vue";

import { useSessionStore } from "../stores/session";
import { nextTick } from "vue";

const routes: RouteRecordRaw[] = [
	{
		path: "/",
		name: "Home",
		component: Home,
		meta: {
			// layout: HomeLayout
		}
	},
	{
		path: "/login",
		name: "Login",
		component: Login,
		meta: {
			secure: true
		}
	},
	{
		path: "/register",
		name: "Register",
		component: Register
	},
	{
		path: "/email-verification",
		name: "Email Verification",
		component: EmailVerification,
		props: (route) => ({ query: route.query.token })
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: Dashboard,
		meta: {
			secure: true,
			layout: DashboardLayout
		}
	},
	{
		path: "/settings",
		name: "Settings",
		component: Settings,
		meta: {
			secure: true,
			layout: DashboardLayout
		},
		children: [
			{
				path: "",
				name: "Settings",
				component: General
			},
			{
				path: "profile",
				name: "Profile",
				component: Profile
			}
		]
	}
];

const DEFAULT_TITLE = "Elixir - %p";

const router = createRouter({
	history: createWebHistory(),
	routes
});

router.beforeEach(async (to, from, next) => {
	const sessionStore = useSessionStore();
	nextTick().then(
		() =>
			(document.title = (
				(to.meta.title as string) || DEFAULT_TITLE
			).replace("%p", to.name as string))
	);
	if (!sessionStore.fetched && to.meta.secure) await sessionStore.fetch();
	await handleLogout(
		to.path,
		sessionStore.logout,
		sessionStore.isLoggedIn,
		next
	);
	handleRedirect(
		to.path,
		sessionStore.isLoggedIn,
		to.meta.secure as boolean,
		next
	);
});

const handleRedirect = (
	path: string,
	loggedIn: boolean,
	secure: boolean,
	next: NavigationGuardNext
) => {
	if (loggedIn) {
		if (path === "/login") return next("/dashboard");
		else return next();
	} else if (secure && path !== "/login") return next("/login");
	else return next();
};

const handleLogout = async (
	path: string,
	logout: () => Promise<void>,
	loggedIn: boolean,
	next: NavigationGuardNext
) => {
	if (path === "/logout") {
		await logout();
		return next("/");
	}
};

export default router;
