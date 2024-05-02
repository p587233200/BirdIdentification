import { defineStore } from 'pinia';

const IMAGE_BASE64_API = import.meta.env.VITE_APP_IMAGE_BASE64_KEY;
const USER_RECORD_API = import.meta.env.VITE_APP_USER_RECORD_KEY;

export const useIdentifyStore = defineStore({
    id: 'identify',
    persist: {
        key: 'identify',
    },
    state: () => ({
        timestamp: ''
    }),
    actions: {
        async uploadImageBase64(data) {
            try {
                return await fetch(IMAGE_BASE64_API, {
                    method: 'POST',
                    body: data,
                    headers: {
                        'content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (!response.ok || response.status != 200) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.timestamp);
                        this.setTimestamp(data.timestamp);
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
        }, setTimestamp(timestamp) {
            this.timestamp=timestamp;
        },
    },
});