import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';
import { handleMicroData } from '@/utils/index';

import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/general.scss';
import '@/assets/styles/components/app.scss';

// ----------分割线---umd模式------两种模式任选其一-------------- //
// 将渲染操作放入 mount 函数
function mount() {
	ReactDOM.createRoot(document.getElementById('subreact-app')!).render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);

	console.log('微应用child-react渲染了');

	handleMicroData();
}

// 将卸载操作放入 unmount 函数
function unmount() {
	ReactDOM.unmountComponentAtNode(document.getElementById('subreact-app')!);
	console.log('微应用child-react卸载了');
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_BASE_APPLICATION__) {
	// @ts-ignore
	window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
	// window['micro-app-appname-vite'] = { mount, unmount };
} else {
	// 非微前端环境直接渲染
	mount();
}
