// 与基座的数据交互
function handleMicroData() {
	// 是否是微前端环境, eventCenterForAppViteReact 是基座添加到window的数据通信对象
	if (window.eventCenterForAppViteReact) {
		// 主动获取基座下发的数据
		console.log('child-react getData:', window.eventCenterForAppViteReact.getData());

		// 监听基座下发的数据变化
		window.eventCenterForAppViteReact.addDataListener((data: Record<string, unknown>) => {
			console.log('child-react addDataListener:', data);

			if (data.path && typeof data.path === 'string') {
				// data.path = data.path.replace(/^#/, '');
				// 当基座下发path时进行跳转
				// if (data.path && data.path !== router.currentRoute.value.path) {
				// 	router.push(data.path as string);
				// }
			}
		});

		// 向基座发送数据
		setTimeout(() => {
			window.eventCenterForAppViteReact.dispatch({ myname: 'child-react' });
		}, 3000);
	}
}

export { handleMicroData };
