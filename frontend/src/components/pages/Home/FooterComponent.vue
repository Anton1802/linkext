<template>
<n-layout-footer style="background-color: #f5f5f5; padding: 20px; background: #333; border-top: 4px solid #e12524;">
    <div style="display: flex; justify-content: center; align-items: center;">
      <span style="color: #fff">© 2025 LinkExt. All Rights Reserved.</span>
    </div>

    <div style="display: flex; justify-content: center; align-items: center; margin-top: 20px; padding: 20px;">
      <!-- Footer Menu -->
      <div style="display: inline-block; gap:20px;" class="footer-menu">
        <n-button class="footer-link" style="margin-right: 20px; color: #e12524" text>Privacy
          Policy</n-button>

        <n-button class="footer-link" style="margin-right: 20px; color: #e12524" text>Terms of
          Service</n-button>
        <n-button class="footer-link" style="color: #e12524;" text>Help</n-button>
      </div>
    </div>
  </n-layout-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NLayoutFooter } from 'naive-ui';

export default defineComponent({
    name: "FooterComponent",
    components: {
        NLayoutFooter
    }
})
</script>

<style scoped>
.footer-link:hover {
  text-decoration: underline;
}

@media (max-width: 1000px) {
  .footer-menu {
    width: 100%;
    max-height: 24px;
    overflow: hidden;
    margin: 8px 0;
    max-height: 100%;
    padding: 0 7px;
    text-align: center;
    ;
  }
}
</style>