<template>
    <n-modal v-model:show="store.showModal">
        <n-card style="width: 600px" title="Shorten URL" :bordered="false" size="huge" role="dialog" aria-modal="true">
            <p style="font-size: 18px; margin: 0; padding: 0;">Full URL: <a
                    :href="store.originalUrl ? store.originalUrl : '#'">{{ truncateUrl(store.originalUrl) }}</a></p>
            <n-form :size="'large'">
                <n-form-item>
                    <n-input style="text-align: start; margin-right: 2px;" :autofocus="true" readonly="true"
                        placeholder="" status="error" :value="store.shortenLink" />
                    <n-button type="error" :focusable="true" style="background-color: #e12524;" @click="copyLink">
                        Copy Link
                    </n-button>
                </n-form-item>
            </n-form>
        </n-card>
    </n-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NForm, NFormItem, NButton, NInput, NModal, NCard, useNotification } from 'naive-ui';
import { useSharedStore } from '../../../stores/store';

export default defineComponent({
    name: "ModalComponent",
    components: {
        NForm,
        NFormItem,
        NButton,
        NInput,
        NModal,
        NCard
    },
    setup() {
        const store = useSharedStore()
        const notification = useNotification();

        const truncateUrl = (url: string, maxLength = 40) => {
            if (url.length <= maxLength) return url;
            return `${url.substring(0, maxLength)}...`;
        };

        const copyLink = async () => {
            await navigator.clipboard.writeText(store.shortenLink ?? '');

            notification["success"]({
                content: 'Success',
                meta: "Link Copied Successfully",
                keepAliveOnHover: true,
                duration: 2500
            })
        }

        return {
            copyLink,
            store,
            truncateUrl
        }
    }
})
</script>