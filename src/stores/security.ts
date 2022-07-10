import { defineStore } from 'pinia';
import { UserProfile } from '../models/user/user.profile';
import { AxiosResponse } from 'axios';
import http, { handleResponse } from '../../http-common';

export type SecurityState = {
    user: UserProfile | null,
    fetched: boolean,
}

export const useSecurityStore = defineStore('security', {
    state: (): SecurityState => ({
        user: null,
        fetched: false
    }),
    getters: {
        isLoggedIn: (state: any) => {
            return state.user != null
        }
    },
    actions: {
        async logout() {
            const logoutResponse = await http.get('/logout');
            if (logoutResponse.status === 200)
                this.user = null;
        },
        async login(user: string, password: string) {
            await this.logout();
            const loginResponse = await http.post('/login', {
                user,
                password
            });
            if (loginResponse.status === 200)
                await this.fetch();

            return this.fetched;
        },
        async fetch() {
            const res = await handleResponse(http.get('/user'));
            if (res.code === 200)
                this.user = res.data;
            this.fetched = true;
        },
        async register(email: string, username: string, password: string) {
            await this.logout();
            const response = await http.post('/register', {
                email,
                username,
                password
            });
            return response.status === 200;
        }
    }
});
