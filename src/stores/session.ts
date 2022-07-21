import { defineStore } from "pinia";
import { UserProfile } from "../models/user/user.profile";
import http, { handleResponse } from "../lib/http";

export type SessionState = {
	user: UserProfile | null;
	fetched: boolean;
};

export type UserUpdateProps = {
	email: string;
	username: string;
	password: string;
	confirmPassword: string;
	bio: string;
	profileUrl: string;
	profileBlob: Blob;
};

export const useSessionStore = defineStore("session", {
	state: (): SessionState => ({
		user: null,
		fetched: false
	}),
	getters: {
		isLoggedIn: (state: any) => {
			return state.user != null;
		}
	},
	actions: {
		async logout() {
			const logoutResponse = await http.get("/logout");
			if (logoutResponse.status === 200) this.user = null;
		},
		async login(user: string, password: string) {
			await this.logout();
			const loginResponse = await http.post("/login", {
				user,
				password
			});
			if (loginResponse.status === 200) await this.fetch();

			return this.fetched;
		},
		async fetch() {
			const res = await handleResponse(http.get("/user"));
			if (res.code === 200)
				this.user = {
					...res.data,
					profileUrl: res.data.profileUrl
						? `${
								import.meta.env.ELIXIR_STATIC_BASE_URL
						  }/static/profiles/${res.data.profileUrl}`
						: undefined
				};
			this.fetched = true;
		},
		async register(email: string, username: string, password: string) {
			await this.logout();
			const response = await http.post("/register", {
				email,
				username,
				password
			});
			return response.status === 200;
		},
		update(updateProps: Partial<UserUpdateProps>) {
			this.user = { ...this.user, ...updateProps } as UserProfile;
		},
		clear() {
			this.user = null;
		}
	}
});
