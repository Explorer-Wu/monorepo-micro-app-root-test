import type { RouteItemTypes } from '@/typings/index';
import { lazy, ReactNode, Suspense } from 'react';
import { Navigate } from 'react-router-dom';

import Loading from '@/components/Loading';
// import SideBar from '@/components/sidebar';
import ErrorBoundary from '@/components/ErrorBoundary';

// 用懒加载实现优化
const RootLayout = lazy(() => import('@/layouts/LayoutMainTpl.tsx') as any);
const ScreenLayout = lazy(() => import('@/layouts/LayoutScreen') as any);
const DashBoard = lazy(() => import("@/views/overview/index"));
const MapBoard = lazy(() => import('@/views/overview/mapboard') as any);
const Login = lazy(() => import('@/views/auths/Login') as any);
const Register = lazy(() => import('@/views/auths/Register') as any);
const Home = lazy(() => import('@/views/home/index') as any);
const NotFound = lazy(() => import('@/views/error/404') as any);
const NoAccess = lazy(() => import('@/views/error/403') as any);
const SubReact = lazy(() => import('@/views/subapps/subreact') as any);
const SubVue3 = lazy(() => import('@/views/subapps/subvue3') as any);

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: ReactNode): ReactNode => {
	return <Suspense fallback={<Loading isLoad={true} text={'加载...'} />}>{children}</Suspense>;
};

export const routes: RouteItemTypes[] = [
	{
		path: '/', // || '/views'
		element: <Navigate to={'/home'} replace />,
	},
	// {
	// 	path: '/views',
	// 	element: <Navigate to={'/views/home'} replace />,
	// },
	{
		path: '/',
		element: <RootLayout />,
		// loader: protectedLoader,
		errorElement: <ErrorBoundary />,
		children: [
			{
				path: '/home',
				element: lazyLoad(<Home />),
				// roles: ['guest', 'user', 'admin'],
				isAuth: false,
			},
			{
				path: '/sub-react',
				element: lazyLoad(<SubReact />),
				isAuth: true,
			},
			{
				path: '/sub-vue3',
				element: lazyLoad(<SubVue3 />),
				isAuth: true,
			},
			{
				path: '/404',
				errorElement: lazyLoad(<NotFound />),
				isAuth: false,
			},
			{
				path: '/403',
				errorElement: lazyLoad(<NoAccess />),
				isAuth: false,
			},
		],
	},
	{
		path: '/fullscreen',
		element: lazyLoad(<ScreenLayout />),
		isAuth: false,
		children: [
			{
				index: true,
				element: lazyLoad(<DashBoard />),
				isAuth: false,
			},
			{
				path: '/fullscreen/mapview',
				element: lazyLoad(<MapBoard />),
				isAuth: false,
			},
		],
	},
	{
		path: '/login',
		element: lazyLoad(<Login />),
		isAuth: false,
	},
	{
		path: '/register',
		element: lazyLoad(<Register />),
		isAuth: false,
	},
	{
		path: '/*',
		element: <Navigate to={'/404'} replace />,
	},
];
