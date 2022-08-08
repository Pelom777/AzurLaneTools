import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { pinia } from '@/store'
import '@/styles/index.scss'

createApp(App).use(router).use(pinia).mount('#app')
