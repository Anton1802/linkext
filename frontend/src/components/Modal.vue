<template>
  <div>
    <!-- Модалка -->
    <div v-if="isModalVisible" class="modal">
      <div class="modal-content">
        <span @click="closeModal" class="close-btn">&times;</span>
        <h2>Shortened URL</h2>
        <div class="url-container">
          <input type="text" :value="shortLink" readonly ref="shortLinkInput" id="shortLink" />
          <button @click="copyToClipboard" class="copy-btn">Copy Short Link</button>
        </div>
      </div>
    </div>

    <!-- Кнопка для открытия модалки
    <button @click="openModal">Open Modal</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Modal',
  setup() {
    // Данные и методы для управления модалкой
    const shortLink = ref('https://short.link/abc123'); // Это ваш сокращенный URL
    const isModalVisible = ref(false);

    // Открытие модалки
    const openModal = () => {
      isModalVisible.value = true;
    };

    // Закрытие модалки
    const closeModal = () => {
      isModalVisible.value = false;
    };

    // Копирование в буфер обмена
    const copyToClipboard = () => {
      const input = <HTMLInputElement>document.querySelector('#shortLink');
      input?.select();
      document.execCommand('copy');
      alert('Copied to clipboard: ' + shortLink.value);
    };

    return {
      shortLink,
      isModalVisible,
      openModal,
      closeModal,
      copyToClipboard,
    };
  },
});
</script>

<style scoped>
/* Стиль для модалки */
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
  font-size: 1.5rem;
  cursor: pointer;
  color: #aaa;
}

.close-btn:hover {
  color: #333;
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

/* Адаптивные стили */
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
