<template>
  <MainLayoutComponent>
    <HeaderComponent />
    <ContentLayoutComponent>
      <UrlBoxComponent />
      <ContentComponent />
    </ContentLayoutComponent>
    <FooterComponent />
  </MainLayoutComponent>
  <ModalComponent />
  <ModalFooterLinksComponent />
  <ModalHistoryComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HeaderComponent from "../../general/HeaderComponent.vue";
import MainLayoutComponent from "./MainLayoutComponent.vue";
import FooterComponent from "../../general/FooterComponent.vue";
import UrlBoxComponent from "./UrlBoxComponent.vue";
import ContentComponent from "./ContentComponent.vue";
import ContentLayoutComponent from "./ContentLayoutComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import ModalFooterLinksComponent from "./ModalFooterLinksComponent.vue";
import ModalHistoryComponent from "./ModalHistoryComponent.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    HeaderComponent,
    MainLayoutComponent,
    FooterComponent,
    UrlBoxComponent,
    ContentComponent,
    ContentLayoutComponent,
    ModalComponent,
    ModalFooterLinksComponent,
    ModalHistoryComponent,
  },
})
</script>