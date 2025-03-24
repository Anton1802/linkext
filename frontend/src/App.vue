<script setup lang="ts">
import HomePage from './components/pages/Home/HomePage.vue';
import 'vfonts/Lato.css'
import 'vfonts/FiraCode.css'
import { NNotificationProvider } from 'naive-ui';

</script>

<template>
  <n-notification-provider>
  <HomePage></HomePage>
  </n-notification-provider>
</template>

<style scoped>
  body {
    background-color: #f9f9f9;
  }
</style>
