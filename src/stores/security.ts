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
        logout() {
            this.user = null;
        },
        async login(user: string, password: string) {
            this.logout();
            const loginResponse = await http.post('/login', {
                user,
                password
            });
            if (loginResponse.status === 200)
                await this.fetch();
        },
        async fetch() {
            const res = await handleResponse(http.get('/user'));
            if (res.success)
                this.user = res.data;
            this.fetched = true;
        },
        async register(email: string, username: string, password: string) {
            this.logout();
            try {
                const response = await http.post('/register', {
                    email,
                    username,
                    password
                });
                return response.status === 200;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        handleResponse(response: AxiosResponse) {
            const data = response.data;
            if(response.statusText !== "OK") {
                if (response.status === 401) {
                    this.logout();
                    location.reload();
                }
                const error = (data && data.error) || response.statusText;
                return Promise.reject(error);
            }
            return data.data;
        }
    }
});
