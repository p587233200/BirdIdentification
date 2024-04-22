<template>
  <v-card-item>
    <v-card-title> 上傳想要辨識的鳥類圖片 </v-card-title>
    <v-card-subtitle> 什麼鳥 </v-card-subtitle>
  </v-card-item>

  <v-card-text>
    <v-file-input
      label="上傳圖片"
      prepend-icon="mdi-camera"
      variant="filled"
      @change="onFileChange"
    ></v-file-input>

    上傳想要辨識的鳥類圖片
    <v-img
      v-if="imageUrl"
      :src="imageUrl"
      contain
      style="max-width: 700px; max-height: 500px"
    ></v-img>
  </v-card-text>
</template>

<script setup>
import axios from "axios";

const file = ref(null);
const imageUrl = ref(null);

const onFileChange = (event) => {
  // 獲取上傳的圖片檔
  // file.value = event.target.files[0];
  const formData = new FormData();
  formData.append("image", event.target.files[0]);

  axios
    .post("http://127.0.0.1:5000/api/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("Upload successful", response);

      imageUrl.value = response.data.imageUrl;
      console.log("imageUrl.value", imageUrl.value);

      // 將圖片轉換成 Data URL 以便預覽

      fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          // 將 Blob 轉換為 Data URL 以便預覽

          console.log("blob", blob);
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            console.log("e.target.result", e.target.result);
            imageUrl.value = e.target.result;
          };
        })
        .catch((error) => {
          console.error("Error downloading image", error);
        });
    })
    .catch((error) => {
      console.error("Error uploading image", error);
      // 在這裡處理上傳失敗的情況
    });
  // 將圖片轉換成 Data URL 以便預覽
  const reader = new FileReader();
  reader.readAsDataURL(imageUrl.value);
  reader.onload = (e) => {
    console.log("e.target.result222", e.target.result);
    imageUrl.value = e.target.result;
  };
};
</script>
