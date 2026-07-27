import { handleMicroData, useGlobalPlugins } from '@/plugins';
import generateRouter from '@/router';
import { createPinia } from 'pinia';
import { createApp, type App as AppInstance } from 'vue';
import type { Router, RouterHistory } from 'vue-router';
import VApp from './App.vue';

// ----------分割线---umd模式------两种模式任选其一-------------- //
let app: AppInstance | null;
let router: Router | null;
let history: RouterHistory | null;

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
	// debugger;
	console.log('微应用child-vue3 开始渲染:', window.microApp);

	const { grouter, ghistory } = generateRouter();
	const pinia = createPinia();
	app = createApp(VApp);
	router = grouter;
	history = ghistory;
	// debugger;
	// if (!!app && !!router)
	useGlobalPlugins(app, pinia, router);

	console.log('微应用child-vue3 渲染了', app);

	handleMicroData(router);
	// fixBugForVueRouter4(router);
};

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
	app?.unmount();
	history?.destroy();
	// 卸载所有数据监听函数 window.eventCenterForAppViteVue3新版中获取不到
	// window.eventCenterForAppViteVue3?.clearDataListener();
	app = null;
	router = null;
	history = null;
	console.log('微应用child-vite卸载了');
};

// 如果不在微前端环境，则直接执行mount渲染  __MICRO_APP_BASE_APPLICATION__
if (!window.__MICRO_APP_ENVIRONMENT__) {
	window.mount();
}

// window.mount注册不上，直接执行有效
// window.mount();
