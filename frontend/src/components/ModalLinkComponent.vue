<template>
  <div v-if="isModalVisible" class="modal">
    <div class="modal-content">
      <span @click="closeModal" class="close-btn">&times;</span>
      <h2>Shortened URL</h2>
      <div class="url-container">
        <input type="text" :value="localShortLink" readonly />
        <button @click="copyToClipboard" class="copy-btn">Copy Short Link</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { notify } from "@kyvg/vue3-notification";

export default defineComponent({
  name: 'ModalLinkComponent',
  props: {
    shortLink: {
      type: String,
      required: true,
    },
    isModalVisible: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const localShortLink = ref(props.shortLink);

    watch(() => props.shortLink, (newVal) => {
      localShortLink.value = newVal;
    });

    const copyToClipboard = async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(localShortLink.value);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = localShortLink.value;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        notify({
          type: "success",
          title: "Success",
          text: "Copied to clipboard!",
        });
      } catch (err) {
        console.error("Failed to copy:", err);
        notify({
          type: "error",
          title: "Error",
          text: "Failed to copy to clipboard!",
        });
      }
    };

    const closeModal = () => {
      emit('close');
    };

    return {
      localShortLink,
      copyToClipboard,
      closeModal,
    };
  },

  watch: {
  isModalVisible(newVal) {
    console.log("🟢 Modal visibility changed:", newVal);
  }
}
});
</script>

<style scoped>
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 500px;
  text-align: center;
  position: relative;
  transition: width 0.3s ease-in-out;
  margin: 10px;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 2rem;
  cursor: pointer;
  color: #333;
  transition: color 0.3s, transform 0.2s;
}

.close-btn:hover {
  color: #000;
  transform: scale(1.2);
}

.url-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 20px;
}

input {
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 70%;
  box-sizing: border-box;
}

.copy-btn {
  background-color: #764ba2;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.copy-btn:hover {
  background-color: #5a3a82;
}

@media (max-width: 768px) {
  .modal-content {
    width: 90%;
    max-width: 400px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    width: 95%;
  }

  input {
    width: 100%;
  }

  .copy-btn {
    width: 100%;
  }
}
</style>
