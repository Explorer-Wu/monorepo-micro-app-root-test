import React from 'react';
import { createRoot } from 'react-dom/client'; //, unmountComponentAtNode

import App from './App';
import { handleMicroData } from '@/utils/index';

import '@/assets/styles/main/base.scss';
import '@/assets/styles/components/general.scss';
import '@/assets/styles/components/app.scss';

// ----------分割线---umd模式------两种模式任选其一-------------- //

const Root = createRoot(document.getElementById('subreact-app')! as HTMLElement);

// 👇 将渲染操作放入 mount 函数，子应用初始化时会自动执行
window.mount = () => {
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
};

// 👇 将卸载操作放入 unmount 函数，就是上面步骤2中的卸载函数
window.unmount = () => {
	// unmountComponentAtNode(document.getElementById('subreact-app')!);
	Root.unmount();
	console.log('微应用child-react卸载了');
};

// 如果不在微前端环境，则直接执行mount渲染
if (!window.__MICRO_APP_ENVIRONMENT__) {
	window.mount();
}
