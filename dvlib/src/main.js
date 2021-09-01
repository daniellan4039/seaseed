import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css'
import dvLib from '../components/index'
import ElementPlus from 'element-plus'

createApp(App).use(ElementPlus).use(dvLib).mount('#app')
