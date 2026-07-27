/**
 * 百度地图 GL SDK 动态加载器
 *
 * 百度地图 GL 版通过 CDN <script> 加载，挂载在 window.BMapGL 上。
 * 本模块使用单例 Promise 模式，确保 SDK 只加载一次，支持并发调用。
 *
 * SDK 文档: https://lbsyun.baidu.com/index.php?title=jspopularGL
 */

type BMapGLModule = typeof window.BMapGL;

let loadPromise: Promise<BMapGLModule> | null = null;

/**
 * 动态加载百度地图 GL SDK
 * @returns Promise<typeof window.BMapGL>
 */
export function loadBMapGL(): Promise<BMapGLModule> {
	// 已加载：直接返回
	if (typeof window !== 'undefined' && window.BMapGL) {
		return Promise.resolve(window.BMapGL);
	}

	// 正在加载：返回已有 Promise
	if (loadPromise) return loadPromise;

	const ak = import.meta.env.APP_BMAP_AK as string | undefined;
	if (!ak) {
		return Promise.reject(
			new Error(
				'APP_BMAP_AK 未配置。请在 env/.env 文件中设置百度地图 AK，例如：APP_BMAP_AK=your_ak_here',
			),
		);
	}

	loadPromise = new Promise<BMapGLModule>((resolve, reject) => {
		// 生成唯一回调函数名（JSONP 模式）
		const callbackName = `__bmapgl_init_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

		// 设置全局回调，SDK 加载完成后调用
		(window as unknown as Record<string, unknown>)[callbackName] = () => {
			if (window.BMapGL) {
				resolve(window.BMapGL);
			} else {
				reject(new Error('百度地图 GL SDK 加载完成但 window.BMapGL 不可用'));
				loadPromise = null; // 允许重试
			}
			// 清理全局回调
			delete (window as unknown as Record<string, unknown>)[callbackName];
		};

		// 创建 script 标签
		const script = document.createElement('script');
		script.src = `https://api.map.baidu.com/api?type=webgl&v=3.0&ak=${encodeURIComponent(ak)}&callback=${callbackName}`;

		script.async = true;
		script.onerror = () => {
			reject(new Error('百度地图 GL SDK 网络加载失败，请检查网络连接或 AK 是否有效'));
			delete (window as unknown as Record<string, unknown>)[callbackName];
			loadPromise = null; // 允许重试
		};

		document.head.appendChild(script);
	});

	return loadPromise;
}
