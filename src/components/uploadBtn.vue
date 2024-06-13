<template>
  <v-card-item>
    <v-card-title> 上傳想要辨識的鳥類圖片 </v-card-title>
  </v-card-item>

  <v-card-text>
    <v-file-input v-model="file" label="選擇上傳圖片" prepend-icon="mdi-camera" variant="filled"
      accept="image/*,video/*"></v-file-input>
    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn v-if="!authStore.login_status" color="white" prepend-icon="mdi-alert-circle-outline"
      @click="sendLogin" class="mr-2" style="font-size:18px;">
      <template v-slot:prepend>
        <v-icon color="error"></v-icon>
      </template>
      請登入，才能使用哦，前往登入
    </v-btn>
        <v-btn v-if="authStore.login_status" variant="outlined" color="white" prepend-icon="mdi-logout" @click="onFileChange" style="font-size:15px;">
          開始辨識
          <template v-slot:prepend>
            <v-icon color="green"></v-icon>
          </template>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="nobird" class="ml-15">
      <h2>圖片上辨識不到鳥類</h2>
    </v-row>
    <v-carousel show-arrows="hover" height="450" hide-delimiters>
  <v-carousel-item v-for="(imageUrl, index) in img" :key="index" :src="imageUrl"  @input="refresh.value= $event" >
    <div class="overlay">
      <h2 class="text">辨識結果：{{ identifyStore.bird_names[index] }}</h2>
    </div>
  </v-carousel-item>
</v-carousel>
  </v-card-text>
</template>

<script setup>
import init_bird3 from '@/assets/bird3.png';
import { useIdentifyStore } from '@/services/Identify.js';
import { useAuthStore } from '@/services/Auth.js';
import { useAlertStore } from '@/services/Alert.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const identifyStore = useIdentifyStore();
const authStore = useAuthStore();
const alertStore = useAlertStore();

const img = ref([init_bird3]);
const refresh = ref(0);
const file = ref(null); // 存储选择的文件
const nobird = ref(false);

function sendLogin() {
    router.push('/login');
}
const createJson = () => {
  const jsonData = {
    'username': authStore.username,
    'timestamp': identifyStore.timestamp,
  };
  return JSON.stringify(jsonData);
}
function init(){
  nobird.value = false;
  img.value = [];
  identifyStore.removeState();
}
const onFileChange = async (event) => {
  init();
  if (authStore.username === '') {
    alertStore.callAlert("請先登入才能使用", '注意', 'error');
    return;
  }
  if (file.value === null) {
    alertStore.callAlert("沒有選擇任何圖片", '注意', 'error');
    return;
  }
    try {
      const formData = new FormData();
      await formData.append('file', file.value); // 將文件添加到 FormData
      await formData.append('username', authStore.username); // 將使用者名稱添加到 FormD
      console.log(formData);
      await identifyStore.uploadImage(formData);
      if(identifyStore.timestamp==''){
        nobird.value = true;
        return
      } 
      await identifyStore.getIdentifyImg(createJson());
      await console.log(createJson());
      for (let i = 0; i < identifyStore.image_filenames.length; i++) {
        const result = await identifyStore.getImg(identifyStore.image_filenames[i]);
        img.value[i] = result.imageUrl; 
        refresh.value++;
        console.log(refresh.value);
      }
      file.value = null;
    } catch (error) {
      console.error(error);
    }
  };
</script>
<style>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  color: white; 
  font-size: 24px; 
  text-align: center; 
  padding: 20px; /* 文字間距 */
  background-color: rgba(0, 0, 0, 0.5); /* 半透明黑色背景 */
}
</style>