<script lang="ts">
import { defineComponent, ref } from 'vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ScrollContainer from '@/components/ScrollContainer.vue';
import ScrollComponent from '@/components/ScrollComponent.vue';

export default defineComponent({
    name: 'HistoryPage',
    components: {
        HeaderComponent,
        FooterComponent,
        ScrollContainer,
        ScrollComponent
    },
    setup() {
        const items = ref(Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`));
        return { items };
    }
})

</script>

<template>
    <HeaderComponent />
        <ScrollContainer>
            <ScrollComponent :items="items" />
        </ScrollContainer>   
    <FooterComponent />
</template>


