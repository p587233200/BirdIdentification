<template>
  <v-card-item>
    <v-card-title> GoogleMap </v-card-title>
    <v-card-subtitle> 鳥鳥的出沒點 </v-card-subtitle>
  </v-card-item>

  <v-card-text>
    躲在
    <div id="map" style="height: 600px"></div>
  </v-card-text>
</template>

<script setup>
import { onMounted } from "vue";
let map;

async function initMap() {
  const googleMaps = await loadGoogleMapsScript();
  const { Map, Marker } = googleMaps.maps;

  map = new Map(document.getElementById("map"), {
    center: { lat: 23.453619118898256, lng: 120.57597855792808 },
    zoom: 8,
  });

  // 创建多个标记对象
  const markers = [
    { position: { lat: 23.453619118898256, lng: 120.57597855792808 }, title: 'Marker 1' },
    { position: { lat: 23.5, lng: 120.6 }, title: 'Marker 2' },
    { position: { lat: 23.6, lng: 120.7 }, title: 'Marker 3' },
    // 添加更多标记...
  ];

  // 在地图上循环添加标记
  markers.forEach(markerInfo => {
    new Marker({
      position: markerInfo.position,
      map: map,
      title: markerInfo.title,
    });
  });
}

async function loadGoogleMapsScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCuJPb3zW3oYlV4ZJqrVF2UzC4ahUSf0DA&libraries=places`;
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
