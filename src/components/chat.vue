<template>
  <v-card class="my-8 ml-3 mr-5" elevation="16" style="height: 800px;width:700px">
    <v-card-item>
      <v-card-title>
        <div style="padding: 0 3px;"> <!-- 左右各 20px 的間距 -->
          <iframe src="https://hf.co/chat/assistant/661b759bab999160f9b709cc" width="670" height="800"
            frameborder="0"></iframe>
        </div>
      </v-card-title>
      <v-card-subtitle></v-card-subtitle>
    </v-card-item>

    <v-card-text>
    </v-card-text>
  </v-card>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const message = ref('');

// onMounted(() => {
//   axios.get('http://127.0.0.1:5000/api/data')
//     .then(response => {
//       message.value = response.data.message;
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
// });
</script>
<style></style>
