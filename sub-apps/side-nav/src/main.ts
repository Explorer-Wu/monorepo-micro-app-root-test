import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import 'dayjs/locale/zh-cn';
// import '@/assets/styles/theme/element.scss';
// import 'element-plus/dist/index.css'; // 全局引入样式
import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/app.scss';
// import 'uno.css';

const vapp = createApp(App);
const store = createPinia();

vapp.use(store).mount('#sidemenu-app');
