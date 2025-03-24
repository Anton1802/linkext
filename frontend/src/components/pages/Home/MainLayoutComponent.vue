<template>
<n-layout style="min-height: 100vh; display: flex; flex-direction: column;">
    <slot></slot>
</n-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { NLayout } from 'naive-ui';

export default defineComponent({
    name: "MainLayoutComponent",
    components: {
        NLayout,
    }
})
</script>