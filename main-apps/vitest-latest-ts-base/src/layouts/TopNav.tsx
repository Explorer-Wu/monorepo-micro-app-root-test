import React, { useState, useEffect } from 'react';
import { Link, matchRoutes, useParams } from 'react-router-dom';
import microApp, { getActiveApps } from '@micro-zoe/micro-app';
import { Menu, type MenuProps } from 'antd'; // , type GetProp
import { HomeOutlined, TrademarkCircleOutlined, SendOutlined } from '@ant-design/icons';
import config from '@/config';
import HistoryRule from '@/router/history';
import { routes } from '@/router/routesConfig';

type MenuItem = Required<MenuProps>['items'][number]; // GetProp<MenuProps, 'items'>[number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: 'group',
): MenuItem {
	// link: string,
	return {
		key,
		icon,
		children,
		label,
		type,
	} as MenuItem;
}

const navList: MenuItem[] = [
	getItem('首页', '/home', <HomeOutlined />),
	getItem('React子应用', '/sub-react', <TrademarkCircleOutlined />),
	getItem('Vue3子应用', '/sub-vue3', <SendOutlined />),
];

// function mapPathFn(menus: Array<any>, paths: Array<any> = []) {
// 	for (let menu of menus) {
// 		if (menu.children && menu.children.length) {
// 			mapPathFn(menu.children, paths);
// 		} else {
// 			paths.push(menu.key);
// 		}
// 	}
// 	return paths;
// }

// 使用接口代替 PropTypes 进行类型校验
const NavMenu: React.FC<any> = (props: any, context?: any) => {
	console.log('NavMenu-props:', props);
	const { HistoryNav, Location, HrefTo } = HistoryRule();
	const [selKeys, setSelKeys] = useState<string[]>([]);
	// const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
	const [isInit, setIsInit] = useState<boolean>(false);

	// 控制主应用跳转
	// const linkToNav = (link: any) => {
	// 	console.log('linkTo:', link);
	// 	// 	// history.replace(link.key);
	// 	HrefTo(link!.key);
	// };

	// 通过linkToNavApp控制主应用跳转; hash: string
	const linkToNavApp = (link: any) => {
		console.log('linkTo:', link);
		const path = link!.key;
		let appName: string | null = null;
		let spath = path.replace(/^\/sub-/, '');

		for (let name of Object.keys(config)) {
			if (name.includes(spath)) {
				appName = `app-${name}`;
			}
			// console.log('appName-path:', spath, name);
		}

		/**
		 * 当子应用还未渲染，通过基座控制路由跳转，子应用在初始化时会自己根据url渲染对应的页面
		 * 当子应用已经渲染，则直接控制子应用进行内部跳转
		 *
		 * getActiveApps: 用于获取正在运行的子应用
		 */
		console.log('appName:', appName);
		// if (appName) {
		// 	// child-vite 和 child-react17子应用为hash路由，这里拼接一下hash值
		// 	// hash && (path += `/#${hash}`);

		// 	if (getActiveApps().includes(appName)) {
		// 		// let childPath = null;
		// 		// // child-vite 和 child-react子应用是hash路由，hash值就是它的页面地址，这里单独处理
		// 		// if (hash) {
		// 		// 	childPath = hash;
		// 		// } else {
		// 		// 	// path的值形式如：/app-vue2/page2，这里/app-vue2是子应用的基础路由，/page2才是页面地址，所以我们需要将/app-vue2部分删除
		// 		// 	childPath = path.replace(/^\/app-[^/]+/, '');
		// 		// 	!childPath && (childPath = '/'); // 防止地址为空
		// 		// }

		// 		// 主应用通过下发data数据控制子应用跳转
		// 		microApp.setData(appName, { path }); // : childPath
		// 	}
		// } else {
		// 	// 正常页面跳转
		// 	HistoryNav(path, { replace: true });
		// }
		HistoryNav(path, { replace: true });
	};

	useEffect(() => {
		const routeArrs = matchRoutes(routes, Location.pathname); // 返回匹配到的路由数组对象，每一个对象都是一个路由对象
		const pathArr: string[] = [];
		if (routeArrs && routeArrs.length) {
			for (let item of routeArrs) {
				const path = item.route.path;
				if (path) {
					pathArr.push(path);
				}
			}
		}
		setSelKeys(pathArr);
		// setDefaultOpenKeys(pathArr);
		setIsInit(true);

		// 👇 主应用向sidebar子应用下发一个名为pushState的方法
		// microApp.setData('appname-sidebar', { pushState });
	}, [Location.pathname]);

	if (!isInit) {
		return null;
	}

	return (
		<>
			{/* defaultOpenKeys={['sub1']} */}
			{/* inlineCollapsed={collapsed} */}
			<Menu
				theme="dark"
				mode="horizontal"
				items={navList}
				defaultSelectedKeys={['/home']}
				selectedKeys={selKeys}
				onClick={linkToNavApp}
				style={{ flex: 1, minWidth: 0 }}
			/>
			{/*  defaultOpenKeys={defaultOpenKeys}
      </Menu> */}
		</>
	);
};

export default NavMenu;
