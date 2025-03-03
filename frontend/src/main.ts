import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";

import Notification from "@kyvg/vue3-notification";
import router from './router';

const app = createApp(App);
app.use(Notification);
app.use(router)
app.mount("#app");


