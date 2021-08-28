import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import dv from '../components/src'
import '../components/src/index.less'

createApp(App).use(store).use(router).use(dv).mount('#app')
