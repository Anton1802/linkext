import './assets/main.css'

import { createApp } from "vue";
import App from "./App.vue";

import Notification from "@kyvg/vue3-notification";

const app = createApp(App);
app.use(Notification);
app.mount("#app");


