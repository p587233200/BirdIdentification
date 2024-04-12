<template>
     <v-card-item>
        <v-card-title>
          上傳想要辨識的鳥類圖片
        </v-card-title>
        <v-card-subtitle>
         什麼鳥
        </v-card-subtitle>
      </v-card-item>
  
      <v-card-text>
        <v-file-input
        label="上傳圖片"
        prepend-icon="mdi-camera"
        variant="filled"
        @change="onFileChange"
      ></v-file-input>

      上傳想要辨識的鳥類圖片
      <v-img v-if="imageUrl" :src="imageUrl" contain style="max-width:700px; max-height: 500px;"></v-img>
      </v-card-text>

</template>
<script setup>
const file = ref(null);
const imageUrl = ref(null);

const onFileChange = (event) => {
  // 獲取上傳的圖片檔
  file.value = event.target.files[0];

  // 將圖片轉換成 Data URL 以便預覽
  const reader = new FileReader();
  reader.readAsDataURL(file.value);
  reader.onload = (e) => {
    imageUrl.value = e.target.result;
  };
 
};
</script>