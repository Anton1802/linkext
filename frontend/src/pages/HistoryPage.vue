<script lang="ts">
import { defineComponent, ref } from 'vue';
import FooterComponent from '@/components/FooterComponent.vue';
import HeaderComponent from '@/components/HeaderComponent.vue';
import ScrollContainer from '@/components/ScrollContainer.vue';
import ScrollComponent from '@/components/ScrollComponent.vue';
import { useRouter } from 'vue-router';
import { notify } from '@kyvg/vue3-notification';

export default defineComponent({
    name: 'HistoryPage',
    components: {
        HeaderComponent,
        FooterComponent,
        ScrollContainer,
        ScrollComponent
    },
    setup() {
        const router = useRouter();

        const items = ref<{
            original_url: string,
            shorten_url: string
        }[]>([])

        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith('shortLink')) {
            const data = JSON.parse(localStorage.getItem(key) as string);

            items.value.push({
              original_url: data.original,
              shorten_url: data.shorten
            })
          }
        })

        if(!items.value.length){
            router.push({ name: 'home' })
            notify({
                type: "error",
                title: "Empty history",
                text: "You don't have any history yet!",
            })
        }

        return {
            items
        }
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


