import { router } from '@/router'
import { createApp } from 'vue'

const app = createApp({})
app.use(router)
app.mount('#app')
