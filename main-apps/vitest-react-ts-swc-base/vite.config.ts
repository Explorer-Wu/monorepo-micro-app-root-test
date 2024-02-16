import { defineConfig, searchForWorkspaceRoot, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
// import VitePluginInjectPreload from 'vite-plugin-inject-preload';
// import EnvironmentPlugin from 'vite-plugin-environment';
// import ResizeImage from 'vite-plugin-resize-image/vite'; // 没有下载权限
import webfontDownload from 'vite-plugin-webfont-dl';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
	const viteEnv = loadEnv(mode, path.resolve(__dirname, './env'), ['VITE_', 'APP_']);
	const isProd = ['production', 'staging', 'testing'].includes(viteEnv.VITE_NODE_ENV);
	// const isDev = mode !== 'production';
	const isAnalyze = mode === 'analyze';
	console.log('main-react-APP_BASE_ROUTER', viteEnv);

	return {
		base: viteEnv.APP_BASE_ROUTER, //  './',
		//静态资源服务的文件夹
		publicDir: 'public',
		// 环境变量设置所在文件夹路径
		envDir: './env',
		envPrefix: ['VITE_', 'APP_'],
		//静态资源处理
		assetsInclude: '',
		//控制台输出的级别 info 、warn、error、silent
		logLevel: 'info',
		// 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
		clearScreen: false,

		plugins: [
			react(),
			checker({
				typescript: true,
			}),
			// preload(),
			webfontDownload(),
		],
		css: {
			devSourcemap: !isProd,
		},
		optimizeDeps: {
			include: ['react'],
		},
		build: {
			outDir: 'dist-main-react',
			commonjsOptions: {
				include: [/node_modules/],
			},
			sourcemap: isAnalyze,
		},
		resolve: {
			alias: [
				// "@micro-zoe/micro-app": path.join(__dirname, '../../../micro-app/lib/index.esm.js'),
				{ find: /^~/, replacement: path.resolve(__dirname, './') },
				{ find: '@', replacement: path.resolve(__dirname, './src') },
			],
		},
		esbuild: {
			sourcemap: !isProd,
		},
		server: {
			fs: {
				strict: true,
				allow: [searchForWorkspaceRoot(process.cwd()), '/mygit/micro-zoe/micro-app/'],
			},
			host: '0.0.0.0',
			// host: true, // 监听所有地址，包括局域网和公网地址 "localhost",
			port: viteEnv.VITE_PORT, // 开发服务器端口
			// https: false, //是否启用 http 2
			// force: true, //是否强制依赖预构建
			cors: true, // 为开发服务器配置 CORS , 默认启用并允许任何源
			open: true, //服务启动时自动在浏览器中打开应用
			strictPort: false, //端口严格模式， 为true时，当端口被占用则直接退出，不会尝试下一个可用端口
			//HMR连接配置{}, false-禁用
			hmr: {
				// host: 'localhost'
				// overlay: true, // 设为true会导致热更新速度慢
				port: viteEnv.VITE_PORT,
			},
			// 传递给 chockidar 的文件系统监视器选项
			watch: {
				// ignored:["!**/node_modules/your-package-name/**"],
				usePolling: true, // 修复HMR热更新失效
			},
		},
		preview: {
			port: 8080, // 预览服务器端口
			host: true, // 监听所有地址，包括局域网和公网地址
			strictPort: true, // 端口被占用时，抛出错误
		},
	};
});
