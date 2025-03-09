<template>
        <HeaderComponent />
    <ContainerComponent>
      <h2 class="title">Shorten your link</h2>
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
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ModalLinkComponent from '@/components/ModalLinkComponent.vue';
import ContainerComponent from '@/components/ContainerComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import InputLinkComponent from '@/components/InputLinkComponent.vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        ModalLinkComponent,
        ContainerComponent,
        HeaderComponent,
        FooterComponent,
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
})
</script>