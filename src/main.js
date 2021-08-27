import { createApp } from 'vue'
import App from './App.vue'
import dv from '../components/src'
import '../components/src/index.less'

createApp(App).use(dv).mount('#app')
