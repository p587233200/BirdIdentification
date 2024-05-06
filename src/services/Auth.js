import { defineStore } from 'pinia';
import { useIdentifyStore } from '@/services/Identify.js';

const identifyStore = useIdentifyStore();
const LOGIN_API = import.meta.env.VITE_APP_LOGIN_API_KEY;
const REGISTER_API = import.meta.env.VITE_APP_REGISTER_API_KEY;
const GET_ALL_USERS_API = import.meta.env.VITE_APP_GETALLUSER_API_KEY;

export const useAuthStore = defineStore({
    id: 'auth',
    persist: {
        key: 'auth',
    },
    state: () => ({
        login_status: false,
        username: ''
    }),
    actions: {
        async login(loginData) {
            try {
                return await fetch(LOGIN_API, {
                    method: 'POST',
                    body: loginData,
                    headers: {
                        'content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (!response.ok || response.status != 201) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.message);
                        this.setAuth(data.username);
                        return { status: true, statusCode: 200 };
                    })
                    .catch((error) => {
                        return { status: false, statusCode: error };
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async register(data) {
            try {
                return await fetch(REGISTER_API, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (!response.ok || response.status != 201) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        return { status: true, statusCode: 200 };
                    })
                    .catch((error) => {
                        return { status: false, statusCode: error };
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async checkUsername(username) {
            try {
                const registeredUsernames = await fetch(GET_ALL_USERS_API)
                    .then((response) => response.json())
                    .then((users) => users.map((user) => user.username));
                // 檢查是否存在重複的username
                if (registeredUsernames.includes(username)) {
                    return { status: true, statusCode: 409 };
                } else {
                    return { status: false, statusCode: 200 };
                }
            } catch (error) {
                console.error(error);
                return { status: false, statusCode: 500 };
            }
        },
        setAuth(username) {
            this.login_status = true;
            this.username = username;
        },
        removeAuth() {
            this.login_status = false;
            this.username = '';
            identifyStore.removeState();
        },
    },
});