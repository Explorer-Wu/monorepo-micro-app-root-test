/**
 * useBMapGL — React 19 百度地图 GL Hook
 *
 * 特性：
 * - 动态加载 SDK（单例 Promise，按需加载）
 * - Ref 驱动容器（支持多实例，不依赖硬编码 ID）
 * - ResizeObserver 容器感知：容器尺寸变化时自动触发地图重绘
 * - 完整清理：组件卸载时销毁地图实例和 Observer
 * - 加载状态与错误暴露给调用方
 */

import { loadBMapGL } from '@/utils/loadBMapGL';
import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BMapGLMap = any;

export interface BMapGLConfig {
	lng: number;
	lat: number;
	zoom: number;
	maxZoom?: number;
	minZoom?: number;
}

export interface UseBMapGLOptions {
	mapStyle?: Record<string, unknown>[];
	enableScrollWheelZoom?: boolean;
	enableControls?: boolean;
}

export interface UseBMapGLResult {
	/** 地图实例（加载完成前为 null） */
	map: React.RefObject<BMapGLMap>;
	/** SDK 是否已加载并完成初始化 */
	loaded: boolean;
	/** 加载错误信息 */
	error: Error | null;
}

export function useBMapGL(
	containerRef: React.RefObject<HTMLElement | null>,
	config: BMapGLConfig,
	options?: UseBMapGLOptions,
): UseBMapGLResult {
	const mapRef = useRef<BMapGLMap>(null);
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState<Error | null>(null);

	// 将最新 config/options 存入 ref，避免重新初始化地图
	const configRef = useRef(config);
	const optionsRef = useRef(options);
	configRef.current = config;
	optionsRef.current = options;

	// 初始化地图（仅挂载时执行一次）
	useEffect(() => {
		let cancelled = false;

		loadBMapGL()
			.then((BMapGL) => {
				if (cancelled || !containerRef.current) return;

				const map = new BMapGL.Map(containerRef.current);
				mapRef.current = map;

				const point = new BMapGL.Point(configRef.current.lng, configRef.current.lat);
				map.centerAndZoom(point, configRef.current.zoom);

				if (configRef.current.maxZoom !== undefined) {
					map.setMaxZoom(configRef.current.maxZoom);
				}
				if (configRef.current.minZoom !== undefined) {
					map.setMinZoom(configRef.current.minZoom);
				}

				if (optionsRef.current?.enableScrollWheelZoom !== false) {
					map.enableScrollWheelZoom(true);
				}

				if (optionsRef.current?.enableControls) {
					map.addControl(new BMapGL.ZoomControl());
					map.addControl(new BMapGL.NavigationControl());
				}

				if (optionsRef.current?.mapStyle) {
					map.setMapStyleV2({ styleJson: optionsRef.current.mapStyle });
				}

				setLoaded(true);
			})
			.catch((err: Error) => {
				if (!cancelled) setError(err);
			});

		return () => {
			cancelled = true;
			if (mapRef.current) {
				try {
					mapRef.current.setTrafficOff?.();
				} catch {
					// 忽略清理错误
				}
				mapRef.current = null;
			}
			setLoaded(false);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// ResizeObserver：容器尺寸变化时通知地图重绘
	useEffect(() => {
		if (!loaded || !containerRef.current) return;

		const observer = new ResizeObserver(() => {
			// 百度地图 GL 内部会自动检测容器变化，
			// 但某些场景（如 contain-clip 裁剪）需要手动触发 reset 强制重绘
			mapRef.current?.reset?.();
		});

		observer.observe(containerRef.current);
		return () => observer.disconnect();
	}, [loaded, containerRef]);

	return { map: mapRef, loaded, error };
}
