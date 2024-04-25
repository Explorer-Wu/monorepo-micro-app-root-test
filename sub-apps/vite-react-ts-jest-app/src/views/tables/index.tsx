import React from 'react'; // , { useState, useEffect, useRef }
import { Outlet } from 'react-router-dom';
import HistoryRule from '@/router/history';
import { BreadCrumbWraps } from '@/components/BreadCrumbWraps';

const Tables: React.FC<any> = (props: any, context?: any) => {
	const { HrefTo } = HistoryRule();
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

	return (
		<>
			<div className="page-tip-bar">
				<BreadCrumbWraps routes={routeObj} items={items} />
				{/* <Breadcrumb>
					<Breadcrumb.Item>表格展示</Breadcrumb.Item>
					<Breadcrumb.Item onClick={() => HrefTo('/view/tables')}>信息列表</Breadcrumb.Item>
				</Breadcrumb> */}
			</div>
			<Outlet />
		</>
	);
};

export default Tables;
