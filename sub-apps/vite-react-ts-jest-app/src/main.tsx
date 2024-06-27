import React from 'react';
import { createRoot } from 'react-dom/client'; //, unmountComponentAtNode

import App from './App';
import { handleMicroData } from '@/utils/index';

import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/general.scss';
import '@/assets/styles/components/app.scss';

// ----------分割线---umd模式------两种模式任选其一-------------- //

const Root = createRoot(document.getElementById('subreact-app')! as HTMLElement);
// 将渲染操作放入 mount 函数
function mount() {
	console.log('微应用child-react 开始渲染:', window.eventCenterForAppViteReact, window.microApp);

	// React严格模式 micro-app下报错
	// ReactDOM.createRoot(document.getElementById('subreact-app')!).render(
	// 	<React.StrictMode>
	// 	<App />
	// </React.StrictMode>,
	// );
	Root.render(<App />);

	console.log('微应用child-react渲染了');

	handleMicroData();
}

// 将卸载操作放入 unmount 函数
function unmount() {
	// unmountComponentAtNode(document.getElementById('subreact-app')!);
	Root.unmount();
	console.log('微应用child-react卸载了');
}

// 微前端环境下，注册mount和unmount方法 window.__MICRO_APP_BASE_APPLICATION__
if (window.__MICRO_APP_BASE_APPLICATION__) {
	// debugger;
	// @ts-ignore
	window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount };
	// window['micro-app-appname-vite'] = { mount, unmount };
} else {
	// 非微前端环境直接渲染
	mount();
}
