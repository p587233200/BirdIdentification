import { defineStore } from 'pinia';

const IDENTIFY_IMAGE_API = import.meta.env.VITE_APP_IDENTIFY_IMAGE_KEY;
const USER_RECORD_BYTIMESTAMP_API = import.meta.env.VITE_APP_USER_RECORD_KEY;
const GET_IMG_API = import.meta.env.VITE_APP_GET_IMG_KEY
const MAP_RECORD_API = import.meta.env.VITE_APP_MAP_RECORD_KEY

export const useIdentifyStore = defineStore({
    id: 'identify',
    persist: {
        key: 'identify',
    },
    state: () => ({
        timestamp: '',
        bird_names: [],
        image_filenames: ''
    }),
    actions: {
        async GetRecord(json) {
            try {
                return await fetch(MAP_RECORD_API, {
                    method: 'POST',
                    body: json,
                    headers: {
                        'content-Type': 'application/json',
                    },
                })
                    .then((response) => {
                        if (!response.ok || response.status != 201) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        return { status: true, statusCode: 200,data:data};
                    })
                    .catch((error) => {
                        return { status: false, statusCode: error };
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async getImg(path) {
            try {
                const imageBlob = await fetch(GET_IMG_API + path).then(response => response.blob());
                const imageUrl = URL.createObjectURL(imageBlob); // 將 Blob 轉換為 URL
        
                return { status: true, imageUrl:imageUrl }; // 返回圖片的 URL
            } catch (error) {
                console.error(error);
                return { status: false, statusCode: 500 };
            }
        },
        async uploadImage(data) {
            try {
                return await fetch(IDENTIFY_IMAGE_API, {
                    method: 'POST',
                    body: data,
                })
                    .then((response) => {
                        // if (!response.ok || response.status === 400) console.log(response.json().message);
                        if (!response.ok || response.status != 201) throw new Error(response.status);
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data.timestamp);
                        console.log(data.message);
                        this.setTimestamp(data.timestamp);
                        return { status: true, statusCode: 200};
                    })
                    .catch((error) => {
                        return { status: false, statusCode: error };
                    });
            } catch (error) {
                console.log(error);
            }
        },
        async getIdentifyImg(data) {
            try {
                return await fetch(USER_RECORD_BYTIMESTAMP_API, {
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
                        console.log(data.bird_names);
                        this.setResult(data.bird_names, data.image_filenames);
                        console.log(data.image_filenames);
                        console.log(data.message);
                        return { status: true, statusCode: 200 };
                    })
                    .catch((error) => {
                        return { status: false, statusCode: error };
                    });
            } catch (error) {
                console.log(error);
            }
        }, setTimestamp(timestamp) {
            this.timestamp = timestamp;
        }, setResult(bird_names, image_filenames) {
            this.bird_names = bird_names;
            this.image_filenames = image_filenames;
        }, removeState() {
            this.bird_names = '';
            this.timestamp = '';
            this.image_filenames=[];
        },
    },
});