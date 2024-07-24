import React from 'react'; // , { useState, useEffect, useRef }
import ParentPage from '@/components/PageParent';

const Tables: React.FC<any> = (props: any, context?: any) => {
	const items = [
		{
			path: '/sub-vite-react/tables/',
			title: '表格展示',
		},
		{
			path: '/sub-vite-react/tables',
			title: '信息列表',
		},
	];

	const routeObj = {
		path: window.location.pathname,
		params: window.location.search + window.location.hash,
	};

	return <ParentPage routes={routeObj} items={items} />;
};

export default Tables;
