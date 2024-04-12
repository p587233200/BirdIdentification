<template>
  <v-card class="my-8 ml-5" elevation="16" style="height: 800px; width: 1000px">
    <div class="d-flex justify-center">
      <v-btn-toggle v-model="toggle_one" mandatory shaped >
        <v-btn
          prepend-icon="mdi-export-variant"
          color="white"
          @click="clickUploadBtn"
          width="200"
        >
          <template v-slot:prepend>
            <v-icon color="success"></v-icon>
          </template>
          Upload
        </v-btn>

        <v-btn
          prepend-icon="mdi-map-marker-radius-outline"
          color="white"
          @click="clickGoogleMapBtn"
          width="200"
        >
          <template v-slot:prepend>
            <v-icon color="warning"></v-icon>
          </template>
          Google Map
        </v-btn>
      </v-btn-toggle>
    </div>
    
    <component :is="selectedPageComponent"></component>
  </v-card>
</template>
<script setup>
import UploadBtn from "@/components/uploadBtn.vue";
import GoogleMapBtn from "@/components/googleMapBtn.vue";

// 使用 ref 創建 reactive 狀態
const selectedPage = ref("upload");
const toggle_one = ref(0);

function clickUploadBtn() {
  selectedPage.value = "upload";
}

function clickGoogleMapBtn() {
  selectedPage.value = "googlemap";
}

// 使用 computed 計算屬性根據 selectedPage 返回不同的組件
const selectedPageComponent = computed(() => {
  return selectedPage.value === "upload" ? UploadBtn : GoogleMapBtn;
});
</script>
<style></style>
