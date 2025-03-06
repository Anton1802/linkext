<template>
    <div class="scroll-wrapper">
      <div class="scroll-content">
        <div v-for="(item, index) in items" :key="index" class="scroll-item">
          {{ item }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { defineProps } from "vue";
  
  defineProps<{
    items: string[];
  }>();
  </script>
  
  <style scoped>
  .scroll-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;
    height: 60vh;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  .scroll-content {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding-right: 5px;
  }
  
  .scroll-item {
    padding: 10px;
    border-bottom: 1px solid #ddd;
    width: 700px;
  }

    @media (max-width: 575px) {
        .scroll-item {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        width: 280px;
    }  
    }
  </style>
  