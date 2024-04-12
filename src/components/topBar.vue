<template>
    <v-app-bar color="blue-lighten-4">
        <v-toolbar-title>
            <v-avatar size="80">
                <img :src="topBar_bird"  class="logo" alt="Logo" @click="backMain" />
            </v-avatar>
        </v-toolbar-title>
        <v-row>
            <v-col class="d-flex justify-end" cols="12">
                <!-- <v-row class="d-flex justify-end mr-3">
                     <a class="mr-5 d-flex align-center"></a>
                    <v-btn
                        variant="outlined"
                        class="mr-2"
                        color="rgba(70, 105,147, 1)"
                        @click="admin"                      
                    >
                        管理員
                    </v-btn>
                    <v-btn
                        variant="outlined"
                        color="rgba(70, 105,147, 1)"
                        @click="logout"
                    >
                        登出
                    </v-btn>
                </v-row>  -->
                <v-row class="d-flex justify-end mr-3">
                     <v-btn 
                        variant="outlined"
                        color="rgba(70, 105,147, 1)"
                        prepend-icon="mdi-account-circle"
                        @click="sendLogin"
                    >
                    <template v-slot:prepend>
                        <v-icon color="success"></v-icon>
                    </template>
                        登入
                    </v-btn>
                    <v-btn  variant="outlined"
                     color="rgba(70, 105,147, 1)"
                     prepend-icon="mdi-account-plus-outline"
                     @click="sendRegister">
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
// import { useRouter } from '@/router';
// import { computed, onBeforeMount } from 'vue';
// import { useAuthStore } from '@/store/Auth.js';
// import { useAlertStore } from '@/store/Alert.js';
// const authStore = useAuthStore();
// const alertStore = useAlertStore();
// const route = useRoute();
const router = useRouter();
// const loginButton = computed(() => route.name === 'login');

function sendLogin() {
    router.push('/login');
}

function sendRegister() {
    router.push('/register');
}

// function admin() {
//     router.push('/admin/posts');
// }

// function logout() {
//     backMain();
//     authStore.removeAuth();
//     alertStore.callAlert('登出!');
// }

function backMain() {
    router.push('/');
}
// onBeforeMount(() => {
//     if (authStore.token != null) {
//         authStore.verify();
//     }
// });
</script>
<style>
.logo {
  width: 80px; /* 調整圖片的寬度 */
  height: auto; /* 讓高度按比例自動調整 */
}
</style>