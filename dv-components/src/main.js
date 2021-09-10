import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import router from './router'

import DvComponent from '@/components/index'
// import DvComponent from '../dist/dv-component.common'

createApp(App).use(Antd).use(DvComponent).use(router).mount('#app')
