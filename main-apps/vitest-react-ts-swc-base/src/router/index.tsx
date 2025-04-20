import React, { Suspense, FC, Fragment } from 'react';
import {
	type RouteObject,
	Outlet,
	useRoutes,
	matchRoutes,
	useLocation,
	Navigate,
} from 'react-router-dom';
import type { RouteItem, RouteItemTypes } from '@/typings/index';
import { useAuthStore } from '@/store/authStore';
// import { routes } from './routesConfig';

// import Dashboard from '@/views/Dashboard';

export function WrapRoutes(routes: RouteItemTypes[]) {
	const routerComponents = useRoutes(routes);
	return routerComponents;
}

export function RouterAuth({ routes }: any) {
	const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);
	// const { isLogin } = useAuth();
	const location = useLocation();
	// 匹配当前层级路由树
	const mathchs = matchRoutes(routes, location);
	// 建议打个断点这里调一下，matchs是返回的层级路由
	// 第一个元素为根路由 最后一个元素为当前路由
	// 所以我们从前往后匹配
	const isNeedLogin = mathchs?.some((item: any) => {
		const route: RouteItemTypes = item.route;

		// 没有配置字段的直接返回
		if (!route.isAuth) return false;
		// 返回是否需要登录
		return route.isAuth;
	});

	if (isNeedLogin && !isAuthenticated) {
		// 跳转到登录界面  state保存源路由
		return <Navigate to="/login" state={{ from: location.pathname }} replace />;
	}

	const Element = useRoutes(routes);

	// return <Outlet />;
	// return children as React.ReactElement
	return <Fragment>{Element}</Fragment>;
}

// function WrapProtectedRoutes(routes: RouteItemTypes[], redirectPath = '/login') {
// 	const isAuthenticated = useAuthStore((state: any) => state.isAuthenticated);

// 	// 根据权限过滤路由
// 	const filteredRoutes = routes.filter((route: RouteItem) => {
// 		if (!isAuthenticated) return !route.isAuth;
// 		return route.isAuth;
// 	});

// 	// 使用useRoutes Hook生成路由
// 	let routerComponents = useRoutes(
// 		filteredRoutes.map((route: RouteItem) => ({
// 			...route,
// 			children: route.children
// 				? route.children.map(child => ({
// 						...child,
// 						// 递归应用权限过滤
// 						children: child.children ? WrapProtectedRoutes({ routes: child.children }) : undefined,
// 					}))
// 				: undefined,
// 		})),
// 	);

// 	// 如果没有可访问的路由，重定向到首页或其他页面
// 	// if (!filteredRoutes.length) {
// 	// 	return <Navigate to="/" replace />;
// 	// }

// 	if (!isAuthenticated) {
// 		return <Navigate to={redirectPath} replace />;
// 	}

// 	return <Outlet />;
// }
