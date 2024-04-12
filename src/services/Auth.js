import { defineStore } from 'pinia';
import { useAlertStore } from '@/store/Alert.js';
// import { VITE_APP_API_URL } from '@/config.js';

async function login_fetch() {}

export const useAuthStore = defineStore({
    id: 'auth',
    persist: {
        key: 'auth',
    },
    state: () => ({
        token: null,
        department: null,
        admin: false,
        exp: 0,
    }),
    actions: {
        verify() {
            const alertStore = useAlertStore();
            try {
                const nowTime = Date.now() / 1000;
                if (nowTime >= this.exp) {
                    this.removeAuth();
                    return true;
                }
                return false;
            } catch (error) {
                alertStore.callAlert(error.message, 'error');
                this.removeAuth();
                return false;
            }
        },
        async login(data) {
            const alertStore = useAlertStore();
            try {
                return await fetch('http://auth.course-forum.ian-shen.live/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: {
                        'content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (!response.ok || response.status != 200) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        this.setAuth(data.token, data.department, data.identify, data.exp);
                        alertStore.callAlert('登入成功');
                        return { status: true, statusCode: 200};
                    })
                    .catch((error) => {
                        return { status: false, statusCode: error };
                    });
            } catch (error) {
                console.log(error);
            }
        },
        setAuth(token, department, identify, exp) {
            this.department = department;
            this.token = token;
            if (identify === 'admin') {
                this.admin = true;
            } else {
                this.admin = false;
            }
            this.exp = exp;
        },
        removeAuth() {
            this.department = null;
            this.token = null;
            this.admin = false;
            this.exp = 0;
        },
    },
});
