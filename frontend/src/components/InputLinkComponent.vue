<template>
  <div class="input-container">
    <input v-model="urlToShorten" type="text" placeholder="Enter a URL" />
    <button class="shorten-btn" @click="requestShortLink">Shorten</button>
  </div>
</template>

<script lang="ts">
import { notify } from '@kyvg/vue3-notification';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'InputLinkComponent',
  props: {
    shortLink: String,
    isModalVisible: Boolean,
  },
  emits: ['shorten'],
  setup(_, { emit }) {
    const urlToShorten = ref("");

    const validateUrl = async (url: string): Promise<boolean> => {
      const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(:\d+)?(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=%]*)?$/;
      return urlPattern.test(url);
    };

    const requestShortLink = async () => {
      if (!urlToShorten.value) {
        notify({
          type: "error",
          title: "Empty URL",
          text: "Please enter a URL!",
        });
        return;
      }

      if (!(await validateUrl(urlToShorten.value))) {
        notify({
          type: "error",
          title: "Invalid URL",
          text: "Please enter a valid URL!",
        });
        urlToShorten.value = '';
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

        notify({
          type: "warning",
          title: "Warning",
          text: "Request sent successfully! Please wait a moment.",
        });

        const data = await response.json();

        let count = 0
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('shortLink')) {
            count++
          }
        })

        localStorage.setItem(`shortLink${count+1}`, JSON.stringify(data));

        emit('shorten', data.shorten);

        urlToShorten.value = '';
      } catch (error) {
        console.error(error);
        notify({
          type: "error",
          title: "An error occurred",
          text: error instanceof Error ? error.message : "An error occurred while shortening the URL.",
        });
      }
    };

    return {
      urlToShorten,
      requestShortLink,
    };
  },
});
</script>

<style scoped>
@import "../assets/input-link.css";
</style>