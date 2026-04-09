import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import TabsWrapper from '@/TabsWrapper.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: TabsWrapper
    }
    // later you can add more routes here
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(App)
    .use(router)
    .mount('#app')
