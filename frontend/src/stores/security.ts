import { defineStore } from 'pinia';
import { UserProfile } from '../models/user/user.profile';
import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import http from '../../http-common';

export type SecurityState = {
    user: UserProfile | null,
}

export const useSecurityStore = defineStore('security', {
    state: (): SecurityState => ({
        user: null,
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
            try {
                await http.post('/login', {
                    user,
                    password
                });
                http.get('/user')
                    .then(response => this.user = this.handleResponse(response));
                return true;
            } catch (e) {
                console.log(e);
                return false;
            }
        },
        async register(email: string, username: string, password: string) {
            this.logout();
            try {
                await http.post('/register', {
                    email,
                    username,
                    password
                });
                return true;
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
