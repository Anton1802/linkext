import { defineStore } from "pinia";
import { ref } from "vue";

export const useSharedStore = defineStore("shared", () => {
  const originalUrl = ref(""); 
  const shortenLink = ref("");
  const showModal = ref(false);

  const setOriginalUrl = (url: string) => {
    originalUrl.value = url;
  };

  const setShortenLink = (link: string) => {
    shortenLink.value = link;
  };

  const toggleModal = () => {
    showModal.value = !showModal.value;
  };

  return {
    originalUrl,
    shortenLink,
    showModal,
    setOriginalUrl,
    setShortenLink,
    toggleModal,
  };
});
