import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';

import DvComponent from '@/components/index'

createApp(App).use(Antd).use(DvComponent).mount('#app')
