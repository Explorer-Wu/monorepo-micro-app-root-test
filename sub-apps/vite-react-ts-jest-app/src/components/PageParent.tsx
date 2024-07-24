import React, { useRef, useEffect, useState } from 'react';
// import { Card, Tag, Button } from 'antd';
import { Outlet } from 'react-router-dom';
import HistoryRule from '@/router/history';
import { BreadCrumbWraps } from './BreadCrumbWraps';

const ParentPage: React.FC<any> = (props: any, context?: any) => {
	const { HrefTo } = HistoryRule();

	const { items, routes } = props;

	return (
		<>
			<div className="page-tip-bar">
				<BreadCrumbWraps routes={routes} items={items} />
				{/* <Breadcrumb>
					<Breadcrumb.Item>表格展示</Breadcrumb.Item>
					<Breadcrumb.Item onClick={() => HrefTo('/view/tables')}>信息列表</Breadcrumb.Item>
				</Breadcrumb> */}
			</div>
			<Outlet />
		</>
	);
};

export default ParentPage;
