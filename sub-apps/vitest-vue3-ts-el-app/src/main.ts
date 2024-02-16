import { createApp, type App as AppInstance } from 'vue';
import { createPinia } from 'pinia';
import type { RouterHistory, Router } from 'vue-router';
import generateRouter from '@/router';
import { useGlobalPlugins, handleMicroData, fixBugForVueRouter4 } from '@/plugins';
import VApp from './App.vue';

// ----------分割线---umd模式------两种模式任选其一-------------- //
let app: AppInstance | null = null;
let router: Router | null = null;
let history: RouterHistory | null = null;

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
async function mount() {
	const { grouter, ghistory } = await generateRouter();
	const pinia = createPinia();
	app = createApp(VApp);
	router = grouter;
	history = ghistory;

	// if (!!app && !!router)
	useGlobalPlugins(app, pinia, router);

	console.log('微应用child-vite渲染了', app);

	handleMicroData(router);
	// fixBugForVueRouter4(router)
}

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
function ummount() {
	app?.unmount();
	history?.destroy();
	// 卸载所有数据监听函数
	window.eventCenterForAppNameVite?.clearDataListener();
	app = null;
	router = null;
	history = null;
	console.log('微应用child-vite卸载了');
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
	// @ts-ignore
	window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
	// window['micro-app-app-subvue3'] = { mount, unmount };
} else {
	// 非微前端环境直接渲染
	mount();
}
