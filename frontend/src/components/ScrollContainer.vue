// ScrollContainer.vue
<template>
  <div class="scroll-wrapper">
    <p>Prev shorten link</p>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ScrollContainer'
});
</script>

<style scoped>
.scroll-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 70vh;
  background-color: white;
  border-radius: 20px;
  padding: 20px;
  box-sizing: border-box;
}
</style>
```