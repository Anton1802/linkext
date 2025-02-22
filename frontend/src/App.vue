<template>
  <div id="app">
    <notifications />
    <HeaderComponent />
    <ContainerComponent>
      <WelcomeComponent />
      <InputLinkComponent
        v-model:urlToShorten="urlToShorten"
        @shorten="handleShortenedLink"
      />
    </ContainerComponent>
    <FooterComponent />
    <ModalLinkComponent
      :shortLink="shortLink"
      :isModalVisible="isModalVisible"
      @close="isModalVisible = false"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import HeaderComponent from './components/HeaderComponent.vue';
import FooterComponent from './components/FooterComponent.vue';
import WelcomeComponent from './components/WelcomeComponent.vue';
import ModalLinkComponent from './components/ModalLinkComponent.vue';
import ContainerComponent from './components/ContainerComponent.vue';
import InputLinkComponent from './components/InputLinkComponent.vue';

export default defineComponent({
  name: 'App',
  components: {
    ModalLinkComponent,
    ContainerComponent,
    HeaderComponent,
    FooterComponent,
    WelcomeComponent,
    InputLinkComponent
  },
  setup() {
    const urlToShorten = ref('');
    const shortLink = ref('');
    const isModalVisible = ref(false);

  const handleShortenedLink = (shortenedUrl: string) => {
      shortLink.value = shortenedUrl;
      isModalVisible.value = true; 
    };

    return {
      urlToShorten,
      shortLink,
      isModalVisible,
      handleShortenedLink
    };
  }
});
</script>
