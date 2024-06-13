<template>
  <v-card-item>
    <v-card-title> BirdMap </v-card-title>
    <v-card-subtitle> 鳥鳥的出沒點 </v-card-subtitle>
    <v-btn v-if="!authStore.login_status" color="white" prepend-icon="mdi-alert-circle-outline"
      @click="sendLogin" class="mr-2" style="font-size:18px;">
      <template v-slot:prepend>
        <v-icon color="error"></v-icon>
      </template>
      沒有登入，無法得知你的資料呦，前往登入
    </v-btn>
  </v-card-item>
  <v-card-text>
    <div v-if="authStore.login_status" id="map" style="height: 600px"></div>
  </v-card-text>
</template>

<script setup>
import { useIdentifyStore } from '@/services/Identify.js';
import { useAuthStore } from '@/services/Auth.js';
import { onMounted } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();
const GoogleMAP_API = import.meta.env.VITE_APP_GOOGLE_API_KEY;
const identifyStore = useIdentifyStore();
const authStore = useAuthStore()
function sendLogin() {
  router.push('/login');
}
const createJson = () => {
  const jsonData = {
    'username': authStore.username
  };
  return JSON.stringify(jsonData);
}

async function initMap() {
  const googleMaps = await loadGoogleMapsScript();
  let result = null;
  const { Map, Marker } = googleMaps.maps;
  if (authStore.login_status) {
    result = await identifyStore.GetRecord(createJson());
  }
  let birdNames = [];
  let latitude = [];
  let longitude = [];
  let observationDate = [];
  if (result !== null) {
    const separatedData = result.data.map(item => {
      birdNames = item.bird_names;
      latitude = item.latitude;
      longitude = item.longitude;
      observationDate = item.observation_date;
      return {
        birdNames,
        latitude,
        longitude,
        observationDate
      };
    });
    let map = new Map(document.getElementById("map"), {
      center: { lat: 23.453619118898256, lng: 120.57597855792808 }, title: 'title',
      zoom: 8,
    });
    separatedData.forEach(data => {
      const latitude = data.latitude;
      const longitude = data.longitude;
      const marker = new Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        icon: {
          url: './src/assets/bird.png',
          scaledSize: new google.maps.Size(40, 40) // 設定圖片大小
        },
        animation: google.maps.Animation.DROP,
        title: data.birdNames,
      });
      let infowindow = new google.maps.InfoWindow({
        content: ` <h6 style="color: black;">辨識鳥類名稱：${data.birdNames}</h6>
        <h6 style="color: black;">圖片拍攝時間：${data.observationDate}</h6>
        <h6 style="color: black;">經度：${data.longitude}</h6>
        <h6 style="color: black;">緯度：${data.latitude}</h6>`
        ,
      });
      marker.addListener('click', e => {
        infowindow.open(map, marker);
      });
    });
  }
}
async function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleMAP_API}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(window.google);
    };
    script.onerror = (error) => {
      reject(error);
    };
    document.head.appendChild(script);
  });
}

onMounted(() => {
  initMap();
});
</script>
