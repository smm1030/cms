import { createApp } from 'vue'
import 'normalize.css'
import './assets/css/index.less'
import App from './App.vue'
import router from './router'
import pinia from './store'
import registerIcons from './global/register-icons'

// import 'element-plus/dist/index.css'
const app = createApp(App)
app.use(registerIcons)
app.use(router)
app.use(pinia)
app.mount('#app')
