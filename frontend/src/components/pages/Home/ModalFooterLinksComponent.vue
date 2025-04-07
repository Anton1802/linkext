<template>
    <n-modal v-model:show="store.showModalFooterLinks" :key="store.modalFooterLinksKeyText">
        <n-card style="width: 600px" :title="selectedText.title" :bordered="false" size="huge" role="dialog"
            aria-modal="true">
            {{ selectedText.content }}
        </n-card>
    </n-modal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { NModal, NCard } from 'naive-ui';
import { useSharedStore } from '../../../stores/store';

const textInfo = {
    privacyPolicy: {
        title: "Privacy Policy",
        content: "At ShortURL, we value your privacy and are committed to protecting your personal information. We do not track, sell, or share your data with third parties. When you shorten a URL using our service, the original and shortened links are stored securely to provide analytics, but no personally identifiable information is collected. Our system uses encryption to safeguard your data, ensuring that your shortened links remain private and secure.",
    },
    termsOfService: {
        title: "Terms of Service",
        content: "By using ShortURL, you agree to follow our terms and conditions. Our service is designed to shorten URLs quickly and efficiently while ensuring fair and responsible use. You may not use ShortURL to generate links that lead to spam, malware, phishing sites, or any harmful or illegal content. We reserve the right to disable or remove links that violate these terms. ShortURL is provided as-is, and while we strive to maintain high uptime and performance, we are not responsible for any disruptions or third-party service limitations. By using our service, you acknowledge that we may update these terms periodically to improve security and user experience.",
    },
    helpSupport: {
        title: "Help & Support",
        content: "Need assistance? Our support team is here to help you with any issues related to URL shortening, click tracking, or general usage of ShortURL. If you're experiencing difficulties, check out our Help Center, where you’ll find step-by-step guides on how to shorten URLs, troubleshooting solutions for common errors, information on tracking the number of clicks on your shortened links, and answers to frequently asked questions. If you require further support, feel free to reach out to us via our Contact Form, and we’ll get back to you as soon as possible.",
    }
};

export default defineComponent({
    name: "ModalFooterLinksComponent",
    components: {
        NModal,
        NCard
    },
    setup() {
        const store = useSharedStore()

        const selectedText = computed(() => {
            return textInfo[store.modalFooterLinksKeyText as keyof typeof textInfo] ?? { title: "Info", content: "No data available." };
        });

        return {
            textInfo,
            store,
            selectedText
        }
    }
})
</script>