import { defineStore } from "pinia";
import { ref } from "vue";

export const useSharedStore = defineStore("shared", () => {
  const originalUrl = ref(""); 
  const shortenLink = ref("");
  const showModal = ref(false);

  const showModalFooterLinks = ref(false);
  const modalFooterLinksKeyText = ref<"privacyPolicy" | "termsOfService" | "helpSupport" | string | undefined >(undefined);

  const setOriginalUrl = (url: string) => {
    originalUrl.value = url;
  };

  const setShortenLink = (link: string) => {
    shortenLink.value = link;
  };

  const toggleModal = () => {
    showModal.value = !showModal.value;
  };

  const toggleModalFooterLinks = () => {
    showModalFooterLinks.value = !showModalFooterLinks.value;
  }

  return {
    originalUrl,
    shortenLink,
    showModal,
    setOriginalUrl,
    setShortenLink,
    toggleModal,
    showModalFooterLinks,
    toggleModalFooterLinks,
    modalFooterLinksKeyText,
  };
});
