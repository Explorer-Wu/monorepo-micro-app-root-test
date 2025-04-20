import React, { useState, useEffect } from 'react';
import { Link, matchRoutes, useParams } from 'react-router-dom';
import type { MenuProps } from 'antd';
import HistoryRule from '@/router/history';
import { routes } from '@/router/index';
// import Logo from '@/assets/images/svg/logo.svg';
import ReactLogo from '@/assets/images/svg/react.svg?react';

import subMicroApp, { getActiveApps, EventCenterForMicroApp } from '@micro-zoe/micro-app';

subMicroApp.start({
	tagName: 'micro-app-navreact',
	iframe: true,
});

// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
// window.eventCenterForAppViteSideNav = new EventCenterForMicroApp('app-sidenav-react');
// type MenuItem = Required<MenuProps>['items'][number]; // GetProp<MenuProps, 'items'>[number];

const menuList: any[] = [
	{
		iconTag: 'House',
		title: '概览',
		path: '/home',
	},
	{
		iconTag: 'PieChart',
		title: 'Echart图表',
		children: [
			{
				title: '通用图表',
				path: '/charts/index',
			},
			{
				title: 'D3图表',
				path: '/charts/d3charts',
			},
		],
	},
	{
		iconTag: 'Postcard',
		title: '表单展示',
		path: '/forms',
	},
	{
		iconTag: 'Grid',
		title: '表格展示',
		path: '/tables',
	},
	{
		iconTag: 'ChatLineSquare',
		title: 'Ai问答',
		path: '/aichat',
		children: [
			{
				title: '面试官问答',
				path: '/aichat',
			},
			{
				title: '低码聊天',
				path: '/aichat/aiflowise',
			},
		],
	},
	{
		iconTag: 'EditPen',
		title: '协同画布',
		path: '/syncanvas',
	},
	{
		iconTag: 'Rank',
		title: '拖拽组件',
		path: '/dndpage',
	},
	{
		iconTag: 'MagicStick',
		title: '设计模式',
		path: '/designmodes',
		children: [
			{
				title: '单例模式',
				path: '/designmodes/index',
			},
			{
				title: '策略模式',
				path: '/designmodes/strategy',
			},
			{
				title: '代理模式',
				path: '/designmodes/proxymode',
			},
			{
				title: '发布订阅模式',
				path: '/designmodes/pubsubscribe',
			},
			{
				title: '适配器模式',
				path: '/designmodes/adaptermode',
			},
		],
	},
	{
		iconTag: 'Picture',
		title: '图片展示',
		path: '/pictures',
	},
];

// 使用接口代替 PropTypes 进行类型校验
const NavMenu: React.FC<any> = (props: any, context?: any) => {
	console.log('NavMenu-props:', props);
	const { HistoryNav, Location, HrefTo } = HistoryRule();
	const [selKeys, setSelKeys] = useState<string[]>([]);
	// const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
	const [isInit, setIsInit] = useState<Boolean>(false);

	// 控制主应用跳转
	// const linkToNav = (link: any) => {
	// 	console.log('linkTo:', link);
	// 	// 	// history.replace(link.key);
	// 	HrefTo(link!.key);
	// };

	// 通过linkToNavApp控制主应用跳转; hash: string
	// 子应用sidebar通过pushState控制主应用跳转
	function pushState(path: string, hash: string, appName?: string) {
		console.log('subreact-pushState:', path, hash, appName);
		// let spath = path.replace(/^\/sub-/, '');

		// for (let name of Object.keys(config)) {
		// 	if (name.includes(spath)) {
		// 		appName = `app-${name}`;
		// 	}
		// 	// console.log('appName-path:', spath, name);
		// }
		/**
		 * 当子应用还未渲染，通过基座控制路由跳转，子应用在初始化时会自己根据url渲染对应的页面
		 * 当子应用已经渲染，则直接控制子应用进行内部跳转
		 *
		 * getActiveApps: 用于获取正在运行的子应用
		 */
		// child-vite 和 child-react17子应用为hash路由，这里拼接一下hash值
		hash && (path += `/${hash}`);
		// 主应用跳转
		HistoryNav(path, { replace: true });
	}

	// useEffect(() => {
	// 	const routeArrs = matchRoutes(routes, Location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
	// 	const pathArr: string[] = [];
	// 	if (routeArrs && routeArrs.length) {
	// 		for (let item of routeArrs) {
	// 			const path = item.route.path;
	// 			if (path) {
	// 				pathArr.push(path);
	// 			}
	// 		}
	// 	}
	// 	setSelKeys(pathArr);
	// }, [Location.pathname]);

	useEffect(() => {
		// 👇 主应用向sidebar子应用下发一个名为pushState的方法
		subMicroApp.setData('app-sidenav-react', {
			pushState,
			menuList,
			baseRouter: '/sub-vite-react',
			subName: 'app-subreact',
		});
		setIsInit(true);
	});

	if (!isInit) {
		return null;
	}

	return (
		<>
			<div className="head-logo">
				{/* <img src={Logo} alt="logo" /> */}
				<ReactLogo title="React logo" />
				<span className="title">React App PC</span>
			</div>
			{/* defaultOpenKeys={['sub1']} */}
			{/* inlineCollapsed={collapsed} */}
			{/* <Menu
				mode="inline"
				theme="dark"
				defaultSelectedKeys={['/views/home']}
				selectedKeys={selKeys}
				items={MenusList}
				onClick={linkToNav}
			/> */}
			{/* data只接受对象类型，采用严格对比(===)，当传入新的data对象时会重新发送  /sub-vite-side/subnav/ */}
			<micro-app-navreact
				name="app-sidenav-react"
				url="http://localhost:3606/sub-vite-menu/"
				baseroute="/sub-vite-menu/"
			></micro-app-navreact>
		</>
	);
};

export default NavMenu;
