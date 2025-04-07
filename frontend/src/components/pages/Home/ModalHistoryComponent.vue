<template>
  <n-modal v-model:show="historyStore.showModalHistory" :mask-closable="false">
    <n-card style="width: 600px" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <template #header>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <h3 style="padding: 0; margin: 0;">My History</h3>
          <n-button quaternary circle @click="historyStore.showModalHistory = false">
            <template #icon>
              <n-icon><close-icon /></n-icon>
            </template>
          </n-button>
        </div>
      </template>
      <n-list hoverable clickable>
        <n-scrollbar style="max-height: 300px">
          <n-list-item v-for="(link, index) in historyStore.links">
            <n-thing>
              <template #header>
                <n-text tag="a" type="primary" target="_blank">{{ truncateUrl(link.original) }}</n-text>
              </template>
              <template #description>
                <n-text depth="3">{{ historyStore.api + link.shorten }}</n-text>
              </template>
              <template #footer>
                <n-space>
                  <n-button @click="copyLink(historyStore.api + link.shorten)" color="red" size="small">
                    <template #icon>
                      <n-icon><copy-icon /></n-icon>
                    </template>
                    Copy
                  </n-button>
                </n-space>
              </template>
            </n-thing>
          </n-list-item>
        </n-scrollbar>
      </n-list>
    </n-card>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NModal, NCard, NList, NListItem, NTag, NSpace, NScrollbar, NThing, NButton, NIcon, NText, useNotification } from 'naive-ui';
import { CopyOutline as CopyIcon, CloseOutline as CloseIcon } from '@vicons/ionicons5'
import { useHistoryStore } from '../../../stores/history.store';

export default defineComponent({
    name: "ModalHistoryComponent",
    components: {
        NModal,
        NCard,
        NList,
        NListItem,
        NSpace,
        NTag,
        NScrollbar,
        NThing,
        NButton,
        NIcon,
        CopyIcon,
        CloseIcon,
        NText
    },
    setup() {
        const historyStore = useHistoryStore()
        const notification = useNotification();
        
        const truncateUrl = (url: string, maxLength = 40) => {
          if (url.length <= maxLength) return url;
          return `${url.substring(0, maxLength)}...`;
        };

        const copyLink = async (url: string) => {
        await navigator.clipboard.writeText(url ?? '');

        notification["success"]({
          content: 'Success',
          meta: "Link Copied Successfully",
          keepAliveOnHover: true,
          duration: 2500
        })
        }

        return {
            historyStore,
            truncateUrl,
            copyLink
        }
    }
})
</script>