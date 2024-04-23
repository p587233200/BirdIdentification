<template>
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
                                        <v-text-field label="帳號" variant="outlined"></v-text-field>
                                    </v-col>
                                </v-row>
                                <v-row class="d-flex flex-column align-center">
                                    <v-col cols="11" class="py-0">
                                        <v-text-field label="密碼" variant="outlined" type="password"></v-text-field>
                                    </v-col>
                                </v-row>

                            </v-row>
                            <v-card-actions>
                                <v-row class="pt-4">
                                    <v-col class="d-flex justify-center">
                                        <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)"
                                            type="submit">
                                            <span style="color: white">登入</span>
                                        </v-btn>
                                        <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)"
                                            @click="sendRegister">
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
import moon_jpg from '@/assets/moon.jpg';
import { useRouter } from 'vue-router';
const router = useRouter();
function sendRegister() {
    router.push('/register');
}

async function login(event) {
    waitting.value = true;
    disabled.value = true;
    const result = await event;
    if (result.valid) {
        const fetchResult = await authStore.login(loginData);
        console.log(fetchResult.statusCode);
        if (fetchResult.status) {
            router.push('/home');
        } else {
            alertStore.callAlert('帳號密碼錯誤', 'error');
        }
    }
    waitting.value = false;
    disabled.value = false;
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