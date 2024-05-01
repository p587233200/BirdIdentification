<template>
  <v-alert v-if="alertStore.show" :type="alertStore.type" :title="alertStore.title" :text="alertStore.text"></v-alert>
  <v-container fluid class="background-image">
    <v-row class="d-flex justify-center">
      <v-col cols="10" sm="8" md="7" lg="6" xl="5">
        <v-card :loading="waitting" class="d-flex flex-column">
          <v-card-title class="d-flex justify-center  "> 註冊 </v-card-title>
          <v-form validate-on="submit" @submit.prevent="login">
            <v-card-text>
              <v-row class="d-flex flex-column">
                <v-row class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-1">
                    <v-text-field v-model='username' label="帳號" variant="outlined" :rules="rules"
                      :disabled="disabled"></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-0">
                    <v-text-field label="密碼" v-model="password1" variant="outlined" type="password" :disabled="disabled"
                      :rules="rules"></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-0">
                    <v-text-field label="請再輸入一次密碼" v-model="password2" variant="outlined" type="password"
                      :disabled="disabled" :rules="rules"></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-if="checkPasswords()" class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-0">
                    <span class="error-message">密碼不一致</span>
                  </v-col>
                </v-row>
              </v-row>
              <v-card-actions>
                <v-row class="pt-4">
                  <v-col class="d-flex justify-center">
                    <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)" type="submit"
                      :disabled="disabled">
                      <span style="color: white">註冊</span>
                    </v-btn>
                    <v-btn variant="elevated" width="250" color="rgba(71, 105,147, 1)" @click="goLoginPage"
                      :disabled="disabled">
                      <span style="color: white">已有帳號</span>
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
import { useAuthStore } from '@/services/Auth.js';
import { useAlertStore } from '@/services/Alert.js';
const router = useRouter();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const disabled = ref(false);
const waitting = ref(false);

const username = ref("");
const password1 = ref("");
const password2 = ref("");


const createJson = () => {
  const jsonData = {
    'username': username.value,
    'password': password1.value,
  };
  return JSON.stringify(jsonData);
}
function checkPasswords() {
  return password1.value !== password2.value;
}
const rules = [
  (value) => {
    if (value) return true;
    return '輸入值不得為空';
  },
];
function goLoginPage() {
  router.push('/login');
}
async function login(event) {
  if (checkPasswords()) {
    alertStore.callAlert('密碼不一致', '出包拉', 'error');
  } else {
    const result = await event;
    console.log(result)
    if (result.valid) {
      waitting.value = true;
      disabled.value = true;
      const fetchResult = await authStore.register(createJson());
      console.log(fetchResult.statusCode);
      if (fetchResult.status) {
        setTimeout(() => {
          router.push('/login');
          alertStore.callAlert(' 註冊成功 ! ! 現在可以使用您的帳號密碼登入摟！！');
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

.error-message {
  color: red;
}
</style>
