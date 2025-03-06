<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const linkData = computed(() => {
  switch(route.name) {
    case "home":
      return {
          to: "/history",
          text: "History"
        };
 
    case "history":
      return {
          to: "/",
          text: "Home"
        };
  }
})
</script>

<template>
    <header>
      <div class="header-logo">
        <h1 class="header-title">LinkExt</h1>
      </div>
      <nav class="header-nav">
        <router-link :to="linkData?.to || '/'" class="header-link">{{  linkData?.text }}</router-link>
      </nav>
    </header>
</template>

<style scoped>
@import "../assets/header.css"
</style>