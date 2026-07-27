import Loading from '@/components/Loading';
import BarBottom from '@/components/Visualscreen/BarBottom';
import BarTop from '@/components/Visualscreen/BarTop';
import { useScreenAdapter } from '@/hooks/useScreenAdapter';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import '@/assets/styles/components/visualscreen.scss';

export default function LayoutScreen() {
	// 订阅 screen adapter，使 React 树响应适配状态变化
	useScreenAdapter();

	return (
		<div className="visual-screen screen-contain-clip" data-screen-fit="contain-clip">
			<BarTop />
			<BarBottom />
			<div className="view-main" data-screen-fit="contain">
				<Suspense fallback={<Loading isLoad={true} text="加载..." />}>
					<Outlet />
				</Suspense>
			</div>
		</div>
	);
}
