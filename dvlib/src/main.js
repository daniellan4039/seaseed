import { createApp } from 'vue'
import App from './App.vue'
import dvComponent from '../components/build/dvlib'

createApp(App).use(dvComponent).mount('#app')
