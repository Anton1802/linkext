<template>
  <section class="content">
    <h2>Simple and fast URL shortener!</h2>
    <p>ShortURL allows to shorten long links from Instagram, Facebook, YouTube, Twitter, Linked In, WhatsApp,
      TikTok, blogs and sites. Just paste the long URL and click the Shorten URL button. On the next page, copy
      the shortened URL and share it on sites, chat and emails. After shortening the URL, check how many clicks it
      received.</p>

    <h2>Shorten, share and track</h2>
    <p>Your shortened URLs can be used in publications, documents, advertisements, blogs, forums, instant
      messages, and other locations. Track statistics for your business and projects by monitoring the number of
      hits from your URL with our click counter.</p>

    <n-grid :x-gap="12" :y-gap="8" :cols="3">

      <n-grid-item>
        <div>
          <h3>Easy</h3>
          <n-icon size="80">
            <LikeOutlined />
          </n-icon>
          <p>ShortURL is easy and fast, enter the long link to get your shortened link</p>
        </div>
      </n-grid-item>

      <n-grid-item>
        <div>
          <h3>Shortened</h3>
          <n-icon size="80">
            <AddLinkFilled />
          </n-icon>
          <p>Use any link, no matter what size, ShortURL always shortens</p>
        </div>
      </n-grid-item>

      <n-grid-item>
        <div>
          <h3>Secure</h3>
          <n-icon size="80">
            <WifiSecure />
          </n-icon>
          <p>It is fast and secure, our service has HTTPS protocol and data encryption</p>
        </div>
      </n-grid-item>

      <n-grid-item>
        <div>
          <h3>Statistics</h3>
          <n-icon size="80">
            <AiStatus />
          </n-icon>
          <p>Check the number of clicks that your shortened URL received</p>
        </div>
      </n-grid-item>

      <n-grid-item>
        <div>
          <h3>Reliable</h3>
          <n-icon size="80">
            <Viruses />
          </n-icon>
          <p>All links that try to disseminate spam, viruses and malware are deleted</p>
        </div>
      </n-grid-item>

      <n-grid-item>
        <div>
          <h3>Devices</h3>
          <n-icon size="80">
            <DeviceDesktop />
          </n-icon>
          <p>Compatible with smartphones, tablets and desktop</p>
        </div>
      </n-grid-item>

    </n-grid>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { LikeOutlined } from '@vicons/antd';
import { AddLinkFilled } from '@vicons/material';
import { WifiSecure, AiStatus } from '@vicons/carbon';
import { Viruses } from '@vicons/fa';
import { DeviceDesktop } from '@vicons/tabler';
import { NGrid, NGridItem, NIcon } from 'naive-ui';

export default defineComponent({
  name: "ContentComponent",
  components: {
    NGrid,
    NGridItem,
    NIcon,
    LikeOutlined,
    AddLinkFilled,
    WifiSecure,
    AiStatus,
    Viruses,
    DeviceDesktop
  }
})
</script>

<style scoped>
.content {
  text-align: center;
}

.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}

.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}
</style>