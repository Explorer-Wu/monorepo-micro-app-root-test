/**
 * 百度地图 GL 组件
 *
 * Vite 8 + React 19 最优方案：
 * - 通过 useBMapGL hook 动态加载 SDK（按需、单例）
 * - Ref 驱动容器（支持多实例，不依赖硬编码 ID）
 * - ResizeObserver 容器感知重绘
 * - SDK 容器与 React 管理的内容分离，避免 removeChild 冲突
 * - 保留 id="mapLayer" 供 CSS 选择器兼容
 */

import { useBMapGL } from '@/hooks/useBMapGL';
import { useRef } from 'react';

interface MapParam {
	lng: number;
	lat: number;
	defaultZoom: number;
	maxZoom: number;
	minZoom: number;
}

interface OnlineBdMapProps {
	mapStyle: Record<string, unknown>[];
	mapParam: MapParam;
}

export default function OnlineBdMap({ mapStyle, mapParam }: OnlineBdMapProps) {
	// SDK 容器 ref — 百度地图 SDK 在此 div 内创建 DOM，React 不管理其子元素
	const containerRef = useRef<HTMLDivElement>(null);

	const { loaded, error } = useBMapGL(
		containerRef,
		{
			lng: mapParam.lng,
			lat: mapParam.lat,
			zoom: mapParam.defaultZoom,
			maxZoom: mapParam.maxZoom,
			minZoom: mapParam.minZoom,
		},
		{
			mapStyle,
			enableScrollWheelZoom: true,
			enableControls: false, // 大屏场景默认不显示控件
		},
	);

	return (
		<div
			id="mapLayer"
			data-screen-fit="cover-safe"
			style={{ position: 'relative', width: '100%', height: '100%', zIndex: -1000 }}
		>
			{/* SDK 容器 — React 不管理此 div 的子元素，避免 removeChild 冲突 */}
			<div ref={containerRef} style={{ width: '100%', height: '100%' }} />

			{/* React 管理的加载/错误状态覆盖层 — SDK 容器的兄弟节点，互不干扰 */}
			{!loaded && !error && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#4cdaec',
            pointerEvents: 'none',
            zIndex: -100,
					}}
				>
					地图加载中…
				</div>
			)}
			{error && (
				<div
					style={{
						position: 'absolute',
						inset: 0,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						color: '#ff6b6b',
						fontSize: '0.9rem',
            pointerEvents: 'none',
            zIndex: -100,
					}}
				>
					地图加载失败：{error.message}
				</div>
			)}
		</div>
	);
}
