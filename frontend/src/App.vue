<template>
  <div id="app">
    <notifications />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'App'
  })
</script>
