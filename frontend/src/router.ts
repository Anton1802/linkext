import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'
import HistoryPage from './pages/HistoryPage.vue'

const routers = [
    { path: '/', component: HomePage, name: "home" },
    { path: '/history', component: HistoryPage, name: "history" },
]
    
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routers
})

export default router;
