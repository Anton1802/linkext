<template>
    <div class="scroll-wrapper">
      <div class="scroll-content">
        <div v-for="(item, index) in items" :key="index" class="scroll-item">
          <p class="url_original">Original URL: <a @click="copyToClipboard(item.original_url)" class="link">{{ item.original_url }}</a></p>
          <p class="url_shorten">Shortened URL: <a @click="copyToClipboard(item.shorten_url)" class="link">{{ item.shorten_url }}</a></p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { notify } from "@kyvg/vue3-notification";
import { defineProps } from "vue";
  
  defineProps<{
    items: { 
      original_url: string,
      shorten_url: string
    }[];
  }>();

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    notify({
      type: "success",
      title: "Success",
      text: "Copied to clipboard!",
    })
  }
  </script>
  
  <style scoped>
  .url_original {
    font-style: italic;
    text-wrap: nowrap;
  }

  .url_shorten {
    font-style: italic;
    text-wrap: nowrap;
  }

  .link {
    color: blue;
    text-decoration: none;
    text-decoration: none;
    cursor: pointer;
  }

  .link:hover {
    text-decoration: underline;
  }

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
    border: 1px solid gray;
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
    width: auto;
    display: inline-block;
  }

    @media (max-width: 575px) {
        .scroll-item {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        width: 250px;
        font-size: 0.6rem;
        display: inline-block;
    }  

    .scroll-content {
      width: 250px;
    }
    }
  </style>
  