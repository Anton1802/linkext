<template>
  <div id="app">
    <header>
      <h1 class="header-title">URL Shortener</h1>
    </header>
    <div class="container">
      <div class="welcome-container">
        <h1 class="welcome">Welcome to the URL Shortener</h1>
      </div>
      <div class="input-container">
        <input v-model="urlToShorten" type="text" placeholder="Enter a URL" />
        <button class="shorten-btn" @click="requestShortLink">Shorten</button>
      </div>
    </div>
    <footer>
      <p class="footer-text">© 2025 URL Shortener | All Rights Reserved</p>
    </footer>

    <Modal :shortLink="shortLink" :isModalVisible="isModalVisible" @close="closeModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Modal from './components/Modal.vue';

export default defineComponent({
  name: 'App',
  components: {
    Modal,
  },
  setup() {
    const urlToShorten = ref('');
    const shortLink = ref('');
    const isModalVisible = ref(false);

    const validateUrl = (url: string): boolean => {
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
      return urlPattern.test(url);
    };

    const requestShortLink = async () => {
      if (!urlToShorten.value) {
        alert("Please enter a URL!");
        return;
      }

      if (!validateUrl(urlToShorten.value)) {
        alert("Please enter a valid URL!");
        return;
      }

      try {
        const response = await fetch(import.meta.env.VITE_APP_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: urlToShorten.value }),
        });

        const data = await response.json();
        shortLink.value = data.shorten; 

        isModalVisible.value = true;

        urlToShorten.value = '';
      } catch (error) {
        console.error(error);
        alert("Failed to shorten URL. Please try again.");
      }
    };

    const closeModal = () => {
      isModalVisible.value = false;
    };

    return {
      urlToShorten,
      shortLink,
      isModalVisible,
      requestShortLink,
      closeModal,
    };
  },
});
</script>