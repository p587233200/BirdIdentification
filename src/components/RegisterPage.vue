<template>
  <v-container>
    <v-alert v-if="alertStore.show" :type="alertStore.type">{{ alertStore.text }}</v-alert>
    <v-alert
      v-if="passwordsMismatch"
      text="密碼不一致!"
      title="Error"
      type="error"
    ></v-alert>
    <v-row class="d-flex justify-center">
      <v-col cols="10" sm="8" md="7" lg="6" xl="5">
        <v-card :loading="waitting" class="d-flex flex-column">
          <v-card-title class="d-flex justify-center  "> 註冊 </v-card-title>
          <v-form validate-on="submit" @submit.prevent="login">
            <v-card-text>
              <v-row class="d-flex flex-column">
                <v-row class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-1">
                    <v-text-field
                      label="帳號"
                      variant="outlined"
                      :rules="rules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-0">
                    <v-text-field
                      label="密碼"
                      v-model="password1"
                      variant="outlined"
                      type="password"
                      :rules="rules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="d-flex flex-column align-center">
                  <v-col cols="11" class="py-0">
                    <v-text-field
                      label="請再輸入一次密碼"
                      v-model="password2"
                      variant="outlined"
                      type="password"
                      :rules="rules"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row
                  v-if="password1 !== password2"
                  class="d-flex flex-column align-center"
                >
                  <v-col cols="11" class="py-0">
                    <span class="error-message">密碼不一致</span>
                  </v-col>
                </v-row>
              </v-row>
              <v-card-actions>
                <v-row class="pt-4">
                  <v-col class="d-flex justify-center">
                    <v-btn
                      variant="elevated"
                      width="250"
                      color="rgba(71, 105,147, 1)"
                      type="submit"
                    >
                      <span style="color: white">完成註冊</span>
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
import { useAlertStore } from '@/services/Alert.js';
const alertStore = useAlertStore();

const password1 = ref("");
const password2 = ref("");

function checkPasswords() {
  return password1.value !== password2.value;
}
const rules = [
    (value) => {
        if (value) return true;
        return '輸入值不得為空';
    },
];
async function login(event) {
  if (checkPasswords()) {
    alertStore.callAlert('密碼不一致', 'error');
  } else {
    passwordsMismatch.value = false;
    waitting.value = true;
    disabled.value = true;
    const result = await event;
    if (result.valid) {
      const fetchResult = await authStore.login(loginData);
      console.log(fetchResult.statusCode);
      if (fetchResult.status) {
        router.push("/home");
      } else {
        alertStore.callAlert("帳號密碼錯誤", "error");
      }
    }
    waitting.value = false;
    disabled.value = false;
  }
}
</script>
<style>
.error-message {
  color: red;
}
</style>
