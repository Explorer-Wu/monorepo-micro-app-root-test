import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { ElLink, ElMain, ElMenu, ElMenuItem, ElMenuItemGroup } from 'element-plus';
import router from '@/router';
import App from './App.vue';

import './assets/main.css';

const vapp = createApp(App);
const store = createPinia();

vapp.use(store).use(router).mount('#sidenav-menu');
