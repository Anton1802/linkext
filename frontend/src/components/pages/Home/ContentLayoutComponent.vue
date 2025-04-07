<template>
    <n-layout-content style="flex: 1; padding: 20px; display: flex; justify-content: center; margin-top:90px">
        <main>
            <slot></slot>
        </main>
    </n-layout-content>
</template>
    
<script lang="ts">
import { defineComponent } from 'vue';
import { NLayoutContent } from 'naive-ui';

export default defineComponent({
    name: "ContentLayoutComponent",
    components: {
        NLayoutContent
    }
})
</script>