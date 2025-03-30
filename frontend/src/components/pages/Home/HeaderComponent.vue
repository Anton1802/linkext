<template>
  <n-layout-header style="text-align: center;">
    <div style="padding: 40px 20px 25px;">
      <n-flex justify="end">
        <n-avatar v-if="!authStore.isAuth" @click="redirect" class="avatar" :size="32" src="./../../../../public/icons/person-not-auth.png" />
        <n-avatar v-if="authStore.isAuth && authStore.user" class="avatar" :size="32" :src="authStore.user?.avatar" />
      </n-flex>

      <a href="#" style="font: 900 49px asap,arial; color: #e12524; letter-spacing: -1px; text-shadow: 0 2px 2px #ddd; word-wrap: break-word; text-decoration: none;">LinkExt</a>
    </div>
  </n-layout-header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NAvatar, NFlex } from 'naive-ui';
import { useAuthStore } from '../../../stores/auth.store';

export default defineComponent({
  name: "HeaderComponent",
  components: {
    NAvatar,
    NFlex
  },
  setup() {
    const authStore = useAuthStore();

    const redirect = () => {
      window.location.href = `${import.meta.env.VITE_APP_API_URL}/auth/google`;
    }

    return {
      redirect,
      authStore,
    }
  }
})
</script>

<style scoped>
.avatar:hover {
  background-color: red;
}
</style>