/**
 * 百度地图 WebGL JS API (BMapGL) 类型声明
 *
 * 百度地图 GL 版通过 CDN <script> 动态加载，挂载在 window.BMapGL 上。
 * 无 npm 包和官方 .d.ts，这里提供最小可用类型声明。
 *
 * 文档: https://lbsyun.baidu.com/index.php?title=jspopularGL
 */

declare namespace BMapGL {
	export interface Point {
		lng: number;
		lat: number;
	}

	export interface MapStyleV2Options {
		styleJson: Record<string, unknown>[];
	}

	export interface MarkerOptions {
		icon?: unknown;
		[key: string]: unknown;
	}

	export interface PolylineOptions {
		[key: string]: unknown;
	}

	export class Map {
		constructor(container: string | HTMLElement, opts?: Record<string, unknown>);
		centerAndZoom(center: Point, zoom: number): void;
		addControl(control: unknown): void;
		enableScrollWheelZoom(enable: boolean): void;
		setMaxZoom(zoom: number): void;
		setMinZoom(zoom: number): void;
		setMapStyleV2(opts: MapStyleV2Options): void;
		addOverlay(overlay: unknown): void;
		setTrafficOff(): void;
		reset(): void;
		[key: string]: unknown;
	}

	export class PointImpl {
		constructor(lng: number, lat: number);
		lng: number;
		lat: number;
	}
	export const Point: typeof PointImpl;

	export class ZoomControl {
		constructor();
		[key: string]: unknown;
	}

	export class NavigationControl {
		constructor();
		[key: string]: unknown;
	}

	export class Marker {
		constructor(point: Point, opts?: MarkerOptions);
		disableMassClear(): void;
		[key: string]: unknown;
	}

	export class Polyline {
		constructor(points: Point[], opts?: PolylineOptions);
		[key: string]: unknown;
	}
}

declare global {
	interface Window {
		BMapGL: typeof BMapGL;
	}
}

export { };

