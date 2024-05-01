import { defineStore } from 'pinia';
// import { useAlertStore } from '@/services/Alert.js';

const LOGIN_API = import.meta.env.VITE_APP_LOGIN_API_KEY;
const REGISTER_API = import.meta.env.VITE_APP_REGISTER_API_KEY;
// const alertStore = useAlertStore();

async function login_fetch() { }
export const useAuthStore = defineStore({
    id: 'auth',
    persist: {
        key: 'auth',
    },
    state: () => ({
        login_status: false,
        username:''
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
                        if (!response.ok || response.status != 200) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        // console.log(loginData.json().username);
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
        setAuth(username) {
            this.login_status = true;
            this.username=username;
        },
        removeAuth() {
            this.login_status = false;
            this.username='';
        },
    },
});