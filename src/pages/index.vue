<template >
  <topBar />
  <v-container  fluid class="background-image">
    <uploadPage />
    <chat />
  </v-container >
  <AppFooter/>
</template>

<script setup>
  //
</script>

<style>
.content {
  display: flex;
  justify-content: space-between;
}
.background-image {
  /* 背景圖片填滿整個容器 */
  background-image: url(@/assets/moon.jpg);
  background-size: cover;
  background-position: center;
  width: 100%;
  /* height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: ce 100vh;
  }
</style>
