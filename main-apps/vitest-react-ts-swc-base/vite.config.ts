import { defineConfig, searchForWorkspaceRoot, loadEnv, type ConfigEnv, type UserConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import checker from 'vite-plugin-checker';
// 本地 Dev Server 上开启 HTTP2
// import mkcert from 'vite-plugin-mkcert'; 不好用
import basicSsl from '@vitejs/plugin-basic-ssl';
// html插入CDN加速
// import { importToCDN, autoComplete } from 'vite-plugin-cdn-import';
import { cdn as importToCDN } from 'vite-plugin-cdn2';
import { cdnjs } from 'vite-plugin-cdn2/resolver/cdnjs';
// GZIP 压缩插件
import viteCompression from 'vite-plugin-compression';
// 打包后生成bundle分析报告文件
import { visualizer } from 'rollup-plugin-visualizer';

// import VitePluginInjectPreload from 'vite-plugin-inject-preload';
// import EnvironmentPlugin from 'vite-plugin-environment';
// import ResizeImage from 'vite-plugin-resize-image/vite'; // 没有下载权限
import webfontDownload from 'vite-plugin-webfont-dl';
import path from 'path';
import { resolve, pathRelative } from './utils';

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
			// http2 开启
			// mkcert(),
			basicSsl(),
			// { basicSsl配置项
			// 	/** 命名证书 */
			// 	name: 'test',
			// 	/** 自定义真实域名 domains */
			// 	domains: ['*.custom.com'],
			// 	/** 自定义证书存放目录 */
			// 	certDir: '/Users/.../.devServer/cert',
			// }
			importToCDN({
				modules: [
					{
						name: 'lodash-es',
						// spare: 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js',
						relativeModule: './lodash.min.js',
						global: '_',
					},
				],
			}),
			viteCompression(), // gzip压缩
			visualizer({
				// 打包完成后自动打开浏览器，显示产物体积报告
				open: true,
			}),
		],
		css: {
			devSourcemap: !isProd,
		},
		optimizeDeps: {
			include: ['react'],
		},
		build: {
			sourcemap: isAnalyze,
			outDir: pathRelative('../../', viteEnv.VITE_OUTPUT_DIR),
			commonjsOptions: {
				include: [/node_modules/],
			},
			minify: 'terser',
			terserOptions: {
				compress: {
					drop_debugger: true,
					drop_console: true,
					pure_funcs: ['console.error', 'console.warn'],
				},
			},
			//自定义底层的 Rollup 打包配置
			rollupOptions: {
				// 一般用于库模式， 确保外部化处理那些不想打包进库的依赖
				// external: ['react', 'react-dom', 'react-router-dom'],
				treeshake: true,
				output: {
					// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
					// exports: 'named',
					// globals: {
					// 	react: 'React',
					// },
					/** 分包策略 **/
					manualChunks: {
						// 将 React 相关库打包成单独的 chunk 中
						'react-vendor': ['react', 'react-dom', 'react-router-dom'],
						// // 将 Lodash 库的代码单独打包
						// lodash: ['lodash-es'],
						// 将组件库的代码打包
						library: ['antd'], // '@arco-design/web-react'
					},
				},
				// brotliSize: false, // 不统计
				// target: 'esnext',
				// minify: 'esbuild', // 混淆器，terser构建后文件体积更小
			},
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
			https: true, //是否启用 http 2
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
			port: viteEnv.VITE_PORT, // 预览服务器端口
			host: true, // 监听所有地址，包括局域网和公网地址
			strictPort: true, // 端口被占用时，抛出错误
		},
	};
});
