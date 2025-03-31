<template>
  <section class="urlbox">
    <h1>Paste the URL to be shortened</h1>
    <n-form :size="'large'">
      <n-form-item>
        <n-input status="error" style="text-align: start; margin-right: 2px" :autofocus="true"
          placeholder="Enter the link here" v-model:value="store.originalUrl" :feedback="urlError" />
        <n-button type="error" :focusable="true" style="background-color: #e12524;" @click="handleShorten">
          Shorten URL
        </n-button>
      </n-form-item>
    </n-form>
    <p style="text-align: center;">LinkExt is a free tool to shorten URLs and generate short links
      URL shortener allows to create a shortened link making it easy to share
    </p>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NForm, NFormItem, NButton, NInput, useNotification } from 'naive-ui';
import { useSharedStore } from '../../../stores/store';
import axios from 'axios';

export default defineComponent({
  name: "UrlBoxComponent",
  components: {
    NForm,
    NFormItem,
    NButton,
    NInput
  },
  setup() {
    const notification = useNotification();
    const urlError = ref("");
    const store = useSharedStore()

    const validateUrl = () => {
      const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/;
      urlError.value = urlPattern.test(store.originalUrl ?? '') ? "" : "Please enter a valid URL.";
    };

    const handleShorten = async (e: MouseEvent) => {
      try {
        validateUrl();
        if (urlError.value) {
          notification["error"]({
            content: 'Error',
            meta: "Please enter a valid URL.",
            keepAliveOnHover: true,
            duration: 2500
          })

          return
        }

        const response = await axios.post(import.meta.env.VITE_APP_API_URL, {
          url: store.originalUrl
        })

        if (response.status !== 201) {
          throw new Error(response.data.message)
        }

        await store.setShortenLink(response.data.shorten)
        await store.toggleModal()

        notification["success"]({
          content: 'Success',
          meta: "Link Shortened Successfully",
          keepAliveOnHover: true,
          duration: 2500
        })
      } catch (error) {
        notification["error"]({
          content: 'Error',
          meta: error instanceof Error ? error.message : String(error),
          keepAliveOnHover: true,
          duration: 2500
        })
      }
    };

    return {
      handleShorten,
      urlError,
      store,
    }
  }
})
</script>

<style scoped>
.urlbox {
  margin: 0 auto 20px auto;
  max-width: 758px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
  border-radius: 6px;
  padding: 10px 30px 5px;
  background: #fff;
  text-align: center;
}
</style>