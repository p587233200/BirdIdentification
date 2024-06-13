<template>
    <v-alert v-if="alertStore.show" :type="alertStore.type" :title="alertStore.title" :text="alertStore.text"></v-alert>
    <v-container fluid class="background-image">
        <v-row class="d-flex justify-center align-center">
            <v-col cols="10" sm="8" md="7" lg="6" xl="5">
                <v-card :loading="waitting" class="d-flex flex-column">
                    <v-card-title class="d-flex justify-center"> 登入</v-card-title>
                    <v-form validate-on="submit" @submit.prevent="login">
                        <v-card-text>
                            <v-row class="d-flex flex-column">
                                <v-row class="d-flex flex-column align-center">
                                    <v-col cols="11" class="py-1">
                                        <v-text-field v-model="username" label="帳號" variant="outlined"
                                            :disabled="disabled" :rules="rules"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="d-flex flex-column align-center">
                                    <v-col cols="11" class="py-0">
                                        <v-text-field v-model="password" label="密碼" variant="outlined" :rules="rules"
                                            :disabled="disabled" type="password"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-row>
                            <v-card-actions>
                                <v-row class="pt-4">
                                    <v-col class="d-flex justify-center">
                                        <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)"
                                            :disabled="disabled" type="submit">
                                            <span style="color: white">登入</span>
                                        </v-btn>
                                        <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)"
                                            :disabled="disabled" @click="goRegisterPage">
                                            <span style="color: white">前往註冊</span>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                            </v-card-actions>
                        </v-card-text>
                    </v-form>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { useAlertStore } from '@/services/Alert.js'
import { useAuthStore } from '@/services/Auth.js';
const router = useRouter();
const alertStore = useAlertStore();
const authStore = useAuthStore();

import { ref, onMounted } from 'vue';

const username = ref("");
const password = ref("");

const disabled = ref(false);
const waitting = ref(false);

const createJson = () => {
    const jsonData = {
        'username': username.value,
        'password': password.value,
    };
    return JSON.stringify(jsonData);
}
const rules = [
    (value) => {
        if (value) return true;
        return '輸入值不得為空';
    },
];
function goRegisterPage() {
    router.push('/register');
}
async function login(event) {
    const result = await event;
    if (result.valid) {
        waitting.value = true;
        disabled.value = true;
        const fetchResult = await authStore.login(createJson());
        console.log(fetchResult.statusCode);
        if (fetchResult.status) {
            setTimeout(() => {
                router.push('/');
                alertStore.callAlert('登入成功!!');
                waitting.value = false;
                disabled.value = false;
            }, 2000);
        } else {
            alertStore.callAlert("帳號密碼錯誤", "出包拉", "error");
            waitting.value = false;
            disabled.value = false;
        }
    }

}
</script>
<style scoped>
/* 背景圖片設定在整個容器背景上 */
.background-image {
    /* 背景圖片填滿整個容器 */
    background-image: url(@/assets/wallpaper.jpeg);
    background-size: cover;
    background-position: center;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>