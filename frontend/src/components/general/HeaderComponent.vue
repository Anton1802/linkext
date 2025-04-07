<template>
  <n-layout-header bordered
    style="position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background-color: rgb(51, 51, 51); padding: 20px; border-bottom: 4px solid rgb(225, 37, 36);">
    <n-flex justify="space-between" align="center">
      <a href="#"
        style="font: 300 25px asap,arial; color: #e12524; letter-spacing: -1px; word-wrap: break-word; text-decoration: none;">LinkExt</a>
      <n-flex>
        <n-avatar v-if="!authStore.isAuth" @click="redirect" class="avatar" :size="32"
          src="./../../../../src/icons/person-not-auth.png" />
        <n-dropdown v-if="authStore.isAuth && authStore.user" placement="bottom" trigger="click"
          :options="dropdownOptions" @select="handleDropdownSelect">
          <div class="avatar-container">
            <n-avatar v-if="authStore.isAuth && authStore.user" class="avatar cursor-pointer"
              :style="{ transition: 'all 0.3s ease' }" :size="32" :src="authStore.user?.avatar" />
          </div>
        </n-dropdown>
      </n-flex>
    </n-flex>
  </n-layout-header>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { NAvatar, NFlex, NDropdown, DropdownOption, useNotification } from 'naive-ui';
import { useAuthStore } from '../../stores/auth.store';
import { useHistoryStore } from '../../stores/history.store';

export default defineComponent({
  name: "HeaderComponent",
  components: {
    NAvatar,
    NFlex,
    NDropdown
  },
  setup() {
    const authStore = useAuthStore();
    const historyStore = useHistoryStore()
    const notification = useNotification();

    const dropdownOptions = ref<DropdownOption[]>([
      {
        label: 'History',
        key: 'history'
      },
      {
        type: 'divider',
        key: 'divider'
      },
      {
        label: 'Sign out',
        key: 'signout'
      }
    ]);

    const redirect = () => {
      window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/google`;
    }

    const handleDropdownSelect = async(key: string | number) => {
      switch (key) {
        case 'history':
          await historyStore.getLinks()
          if(historyStore.links.length){
            historyStore.showModalHistory = true;
          } else {
            notification["warning"]({
              content: 'Warning',
              meta: "Links in history not found!",
              keepAliveOnHover: true,
              duration: 2500
            })
          }
          break;
        case 'signout':
          authStore.logout();
          break;
      }
    }

    return {
      redirect,
      authStore,
      handleDropdownSelect,
      dropdownOptions,
    }
  }
})
</script>

<style scoped>
.avatar:hover {
  background-color: red;
}

.avatar-container {
  position: relative;
  cursor: pointer;
  margin-left: 12px;
  width: 32px;
  height: 25px;
}

.avatar {
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.avatar-container:hover .avatar {
  transform: scale(1.3);
}

.avatar-container::after .avatar {
  transform: scale(0);
}
</style>