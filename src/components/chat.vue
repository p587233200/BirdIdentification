<template>
  <v-card
    class="my-8 ml-5 mr-5"
    elevation="16"
    style="height: 800px;width:700px"
  >
    <v-card-item>
      <v-card-title> GPT </v-card-title>
      <v-card-subtitle> 蘑菇蘑菇090 </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <div>
    <p>{{ message }}</p>
  </div>
    
      蘑菇蘑菇
    </v-card-text>
  </v-card>
</template>

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const message = ref('');

onMounted(() => {
  axios.get('http://127.0.0.1:5000/api/data')
    .then(response => {
      message.value = response.data.message;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
</script>
<style></style>
