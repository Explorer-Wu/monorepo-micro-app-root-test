import React, { useRef, useEffect, useState } from 'react';
import ParentPage from '@/components/PageParent';

const AiChat: React.FC<any> = (props: any, context?: any) => {
	const items = [
		{
			path: '/sub-vite-react/aichat',
			title: 'AI问答',
		},
		{
			path: '/sub-vite-react/aichat/index',
			title: '在线面试',
		},
		// {
		// 	path: '/sub-vite-react/aichat/aiflowise',
		// 	title: '低代码问答',
		// },
	];
	const routeObj = {
		path: window.location.pathname,
		// params: window.location.search + window.location.hash,
	};

	return <ParentPage routes={routeObj} items={items} />;
};

export default AiChat;
