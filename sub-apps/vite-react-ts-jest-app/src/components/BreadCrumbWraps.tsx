import React, { useEffect } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

function itemRender(currentRoute, params, items, paths) {
	const isLast = currentRoute?.path === items[items.length - 1]?.path;

	return isLast ? (
		<span>{currentRoute.title}</span>
	) : (
		<Link to={`/${paths.join('/')}`}>{currentRoute.title}</Link>
	);
}

export const BreadCrumbWraps: React.FC<any> = ({ routes, items }) => {
	// useEffect(() => {
	// });
	const { path, params } = routes;
	const curroute = path;
	const paths = path.split('/');
	console.log('BreadCrumbWraps:', routes, items);
	return (
		<Breadcrumb
			itemRender={(curroute, params, items, paths) => itemRender(curroute, params, items, paths)}
			items={items}
		/>
	);
};
