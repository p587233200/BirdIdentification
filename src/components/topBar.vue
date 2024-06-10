<template>
    <v-alert v-if="alertStore.show" :type="alertStore.type" :title="alertStore.title" :text="alertStore.text"></v-alert>
    <v-app-bar color="blue-lighten-4">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="topBar_bird" class="logo" alt="Logo" @click="backMain" />
            </v-avatar>
        </v-toolbar-title>
        <v-row>
            <v-col class="d-flex justify-end" cols="12">
                <v-row v-if="authStore.login_status" class="d-flex justify-end mr-3">
                    <a class="mr-5 d-flex align-center"></a>
                    <v-btn color="rgba(70, 105,147, 1)" prepend-icon="mdi-account-circle" @click="admin" class="mr-2"
                        style="font-size:18px;">
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>
                        會員帳號：{{ authStore.username }}
                    </v-btn>
                    <v-btn variant="outlined" color="rgba(70, 105,147, 1)" prepend-icon="mdi-logout" @click="logout"
                        class="mr-2" style="font-size:18px;">
                        登出
                        <template v-slot:prepend>
                            <v-icon color="warning"></v-icon>
                        </template>
                    </v-btn>
                </v-row>
                <v-row v-else='authStore.login_status' class="d-flex justify-end mr-3">
                    <v-btn variant="outlined" color="rgba(70, 105,147, 1)" prepend-icon="mdi-account-circle"
                        class="mr-2" style="font-size:18px;" @click="sendLogin" data-testid="login-button">
                        <template v-slot:prepend>
                            <v-icon color="success"></v-icon>
                        </template>
                        登入
                    </v-btn>
                    <v-btn variant="outlined" color="rgba(70, 105,147, 1)" prepend-icon="mdi-account-plus-outline"
                        class="mr-2" style="font-size:18px;" @click="sendRegister" data-testid="register-button">
                        <template v-slot:prepend>
                            <v-icon color="warning"></v-icon>
                        </template>
                        註冊
                    </v-btn>
                </v-row>
            </v-col>
        </v-row>
    </v-app-bar>
</template>

<script setup>
import topBar_bird from '@/assets/topBar_bird.png';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/services/Auth.js';
import { useAlertStore } from '@/services/Alert.js';
const authStore = useAuthStore();
const alertStore = useAlertStore();
const router = useRouter();

function sendLogin() {
    router.push('/login');
}

function sendRegister() {
    router.push('/register');
}

function logout() {
    backMain();
    authStore.removeAuth();
    alertStore.callAlert('登出!!');
}

function backMain() {
    router.push('/');
}
</script>
<style>
.logo {
    width: 80px;
    height: auto;
}
</style>