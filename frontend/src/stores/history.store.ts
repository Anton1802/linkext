import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios"
import { useAuthStore } from "./auth.store";

interface ShortenedLink {
    original: string;
    shorten: string;
}

export const useHistoryStore = defineStore("history", () => {
    const showModalHistory = ref(false)
    const authStore = useAuthStore()
    const links = ref<ShortenedLink[]>([]);
    const api = ref(`${import.meta.env.VITE_APP_API_URL}/`)

    const getLinks = async() => {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/user-history/${authStore.user.email}`)

        if(response.data){
            links.value = response.data;
        }
    }

    const getTimeExecuteScheduler = async() => {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/execution-time-clear-link`)
    }

    return {
        showModalHistory,
        getLinks,
        getTimeExecuteScheduler,
        api,
        links
    }
});
