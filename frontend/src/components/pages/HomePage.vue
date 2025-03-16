<template>
  <n-layout style="min-height: 100vh; display: flex; flex-direction: column;">

    <n-layout-header style="text-align: center;">
      <div style="padding: 40px 20px 25px;">
        <a href="#"
          style="font: 900 49px asap,arial; color: #e12524; letter-spacing: -1px; text-shadow: 0 2px 2px #ddd; word-wrap: break-word; text-decoration: none;">LinkExt</a>
      </div>
    </n-layout-header>

    <n-layout-content style="flex: 1; padding: 20px; display: flex; justify-content: center;">
      <main>
        <section class="urlbox">
          <h1>Paste the URL to be shortened</h1>
          <n-form :size="'large'">
            <n-form-item>
              <n-input style="text-align: start;" :autofocus="true" placeholder="Enter the link here" v-model:value="originalUrl" :feedback="urlError"/>
              <n-button type="error" :focusable="true" style="background-color: #e12524;" @click="handleShorten">
                Shorten URL
              </n-button>
            </n-form-item>
          </n-form>
          <p style="text-align: center;">LinkExt is a free tool to shorten URLs and generate short links
            URL shortener allows to create a shortened link making it easy to share
          </p>
        </section>

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
      </main>
    </n-layout-content>

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
  </n-layout>

  <n-modal v-model:show="showModal">
    <n-card style="width: 600px" title="Shorten URL" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <p style="font-size: 18px; margin: 0; padding: 0;">Full URL: <a :href="originalUrl ? originalUrl : '#'">{{
          originalUrl }}</a></p>
      <n-form :size="'large'">
        <n-form-item>
          <n-input style="text-align: start;" :autofocus="true" readonly="true" placeholder="" :value="shortenLink" />
          <n-button type="error" :focusable="true" style="background-color: #e12524;" @click="copyLink">
            Copy Link
          </n-button>
        </n-form-item>
      </n-form>
    </n-card>
  </n-modal>

</template>

<script setup lang="ts">
import { NLayout, NLayoutContent, NLayoutFooter, NForm, NFormItem, NButton, NInput, NGrid, NGridItem, NIcon, NModal, NCard, useNotification } from 'naive-ui';
import { LikeOutlined } from '@vicons/antd';
import { AddLinkFilled } from '@vicons/material';
import { WifiSecure, AiStatus } from '@vicons/carbon';
import { Viruses } from '@vicons/fa';
import { DeviceDesktop } from '@vicons/tabler';

import { ref } from "vue";  
import axios from 'axios';

const showModal = ref(false);   
const originalUrl = ref('');
const shortenLink = ref('');
const urlError = ref("");

const notification = useNotification();

const validateUrl = () => {
  const urlPattern = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)(:\d+)?(\/[^\s]*)?$/;
  urlError.value = urlPattern.test(originalUrl.value) ? "" : "Please enter a valid URL.";
};

const copyLink = async() => {
  await navigator.clipboard.writeText(shortenLink.value);

  notification["success"]({
    content: 'Success',
    meta: "Link Copied Successfully",
    keepAliveOnHover: true,
    duration: 2500
  })
}

const handleShorten = async () => {
  try { 
    validateUrl();
    if(urlError.value){
        notification["error"]({
        content: 'Error',
        meta: "Please enter a valid URL.",
        keepAliveOnHover: true,
        duration: 2500
      })

      return
    }

  const response = await axios.post(import.meta.env.VITE_APP_API_URL, {
    url: originalUrl.value
  })

  if(response.status !== 201){
    throw new Error(response.data.message)
  }

  shortenLink.value = response.data.shorten;
  showModal.value = true;

  notification["success"]({
    content: 'Success',
    meta: "Link Shortened Successfully",
    keepAliveOnHover: true,
    duration: 2500
  })
  } catch (error) {
    notification["error"]({
      content: 'Error',
      meta: error instanceof Error ? error.message : String(error),
      keepAliveOnHover: true,
      duration: 2500
    })
  }
};
</script>

<style scoped>
.footer-link:hover {
  text-decoration: underline;
}

.light-green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.12);
}

.green {
  height: 108px;
  background-color: rgba(0, 128, 0, 0.24);
}

.urlbox {
  margin: 0 auto 20px auto;
  max-width: 758px;
  box-shadow: 0 1px 4px #ccc;
  border-radius: 6px;
  padding: 10px 30px 5px;
  background: #fff;
  text-align: center;
}

.content {
  text-align: center;
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