import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv, searchForWorkspaceRoot, type ConfigEnv, type UserConfig } from 'vite';
// 浏览器兼容插件
import tailwindcss from '@tailwindcss/vite';
import checker from 'vite-plugin-checker';

import fs from 'node:fs';
// 本地 Dev Server 上开启 HTTP2
import basicSsl from '@vitejs/plugin-basic-ssl';
// import importToCDN from "vite-plugin-cdn-import";

// GZIP 压缩插件
import { compression } from 'vite-plugin-compression2';
// 打包后生成bundle分析报告文件 vite-bundle-analyzer
import { statsPlugin } from 'vite-bundle-explorer/plugin';

// html插入CDN加速
// import { importToCDN, autoComplete } from 'vite-plugin-cdn-import';
// import { cdn as importToCDN } from 'vite-plugin-cdn2';
// import { cdnjs } from 'vite-plugin-cdn2/resolver/cdnjs';

// import Unocss from 'unocss/vite';

// import VitePluginInjectPreload from 'vite-plugin-inject-preload';
// import EnvironmentPlugin from 'vite-plugin-environment';
// import ResizeImage from 'vite-plugin-resize-image/vite'; // 没有下载权限
import webfontDownload from 'vite-plugin-webfont-dl';

import path from 'path';
import { pathRelative, resolve } from './tools';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
	const envDirPath = resolve('./env');
	const envFrom = fs.existsSync(envDirPath) ? envDirPath : process.cwd();
	const viteEnv = loadEnv(mode, envFrom, ['VITE_', 'APP_']);
	const appBaseRouter = viteEnv.APP_BASE_ROUTER || '/';
	const outputDir = viteEnv.VITE_OUTPUT_DIR || 'dist';
	const port = Number(viteEnv.VITE_PORT || 5173);
	const isProd = ['production', 'staging', 'testing'].includes(viteEnv.VITE_NODE_ENV);
	// const isDev = mode !== 'production';
	const isAnalyze = ['testing', 'staging'].includes(mode);
	const shouldAnalyze = isAnalyze || process.env.npm_lifecycle_event === 'analyze';
	console.log('main-react-APP_BASE_ROUTER', viteEnv);

	return {
		base: appBaseRouter, //  './',
		//静态资源服务的文件夹
		publicDir: 'public',
		// 环境变量设置所在文件夹路径（如果存在 ./env 才启用）
		...(fs.existsSync(envDirPath) ? { envDir: './env' } : {}),
		envPrefix: ['VITE_', 'APP_'],
		//静态资源处理
		assetsInclude: '',
		//控制台输出的级别 info 、warn、error、silent
		logLevel: 'info',
		// 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
		clearScreen: false,

		plugins: [
			react(),
			tailwindcss(),
			checker({
				typescript: true,
			}),
			// preload(),
			// 本地开发支持 HTTP/2
			basicSsl(),
			webfontDownload(),

			/** Brotli 几乎可以满足 99% 的需求，但完全替代仍有风险，建议“Brotli 为主，Gzip 兜底”
			 * 无法完全替代的原因：
			 * 老旧环境：极少数过时的企业级浏览器或老旧移动端设备仍只识别 Gzip。
			 * HTTPS 强制要求：Brotli 仅在 HTTPS 连接下生效。如果你的服务存在 HTTP 回退场景，浏览器将无法识别 .br 文件，此时仍需 Gzip。
			 * 动态压缩性能：Brotli 在高压缩等级下的 CPU 开销远大于 Gzip。对于不需要预压缩、而是由服务器实时（On-the-fly）生成的动态内容，Gzip 的响应速度可能更快。
			 * 最佳实践建议：利用插件同时生成 .br 和 .gz 文件。在 Nginx 等服务器配置中开启 brotli_static on; 和 gzip_static on;。服务器会根据客户端请求头中的 Accept-Encoding 优先返回 Brotli 格式，仅在不支持时才降级为 Gzip
			 */
			// 专门针对 Brotli 的配置
			compression({
				algorithms: ['brotliCompress'],
				exclude: [/\.(br)$/, /\.(gz)$/], // 避免循环压缩
				threshold: 1024, // 超过 1KB 才压缩
				deleteOriginalAssets: false, // 建议保留原文件作为兜底
				skipIfLargerOrEqual: true, // 如果压缩后反而变大则跳过
			}),

			// 打包分析
			statsPlugin({
				// emitHtml: true,
				emitJson: true,
				failOnWarning: true,
			}),
		],
		css: {
			devSourcemap: !isProd,
			// 指定传递给 css 预处理器的选项
			preprocessorOptions: {
				less: {
					// 支持内联 JavaScript
					javascriptEnabled: true, //注意，这一句是在less对象中，写在外边不起作用
					// modifyVars: {
					// 	//在这里进行主题的修改，参考官方配置属性
					// 	modifyVars: themeVariables,
					//   // '@primary-color': '#1DA57A',
					// },
				},
				sass: { charset: false },
				scss: {
					charset: false,
					/** 引入var.scss全局预定义变量 */
					additionalData: '@use "@/assets/styles/main/normalize.scss" as *; @use "@/assets/styles/main/function.scss" as *;',
				},
			},
			// modules: 配置 css modules 的行为, 选项将被传递给 postcss-modules
			modules: {
				localsConvention: 'camelCase',
			},
		},
		resolve: {
			alias: [
				// "@micro-zoe/micro-app": path.join(__dirname, '../../../micro-app/lib/index.esm.js'),
				// { find: /^~/, replacement: path.resolve(__dirname, './') },
				{ find: '@', replacement: path.resolve(__dirname, './src') },
				{ find: /^tests/, replacement: path.resolve(__dirname, './tests') },
			],
		},
		optimizeDeps: {
			include: ['react', 'react-dom', 'react-router-dom'], // 加入预编译
			// exclude: [], // 移出预编译项
		},
		esbuild: {
			sourcemap: !isProd,
		},
		build: {
			cssMinify: 'lightningcss',
			sourcemap: shouldAnalyze,
			outDir: pathRelative('../../', outputDir),
			commonjsOptions: {
				include: [/node_modules/],
			},
			//自定义底层的 Rollup 打包配置
			rolldownOptions: {
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
					// 兼容写法：当前最稳
					manualChunks(id) {
						if (id.includes('node_modules')) {
							// 框架层
							// 将 React 全家桶强制合并，减少 HTTP 请求碎片
							if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
								return 'react-core';
							}
							// 将 vue3 全家桶强制合并
							if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
								return 'vue-core';
							}

							// 大型库拆包
							if (id.includes('echarts')) return 'echarts';
							if (id.includes('lodash')) return 'lodash';
							if (id.includes('dayjs')) return 'dayjs';

							// 常见的 UI 库（如 Ant Design 或 MUI）单独分包
							if (id.includes('antd') || id.includes('@ant-design') || id.includes('element-plus')) {
								return 'ui-lib';
							}

							// 其余三方
							return 'vendor';
						}
					},

					// 稳定命名，利于缓存
					chunkFileNames: 'assets/js/[name]-[hash].js',
					entryFileNames: 'assets/js/[name]-[hash].js',
					assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',

					// Rolldown 扩展（分组规则）
					// advancedChunks: {
					//   groups: [
					//     {
					//       name: "framework",
					//       test: /\/react(?:-dom)?|vue/,
					//       priority: 20,
					//       // reuse: true,
					//     },
					//     {
					//       name: "lib",
					//       test: /node_modules/,
					//       minSize: 50000,
					//       priority: 10,
					//     },
					//     {
					//       name: "common",
					//       minModuleSize: 2, // 被至少2个入口复用
					//       priority: 5,
					//     },
					//   ],
					// },
				},
				// brotliSize: false, // 不统计
				// target: 'esnext',
				// minify: 'esbuild', // 混淆器，terser构建后文件体积更小
			},
		},
		server: {
			https: {},
			// https: true,
			fs: {
				strict: true,
				allow: [searchForWorkspaceRoot(process.cwd()), '/mygit/micro-zoe/micro-app/'],
			},
			host: '0.0.0.0',
			// host: true, // 监听所有地址，包括局域网和公网地址 "localhost",
			port, // 开发服务器端口
			// https: true, //是否启用 http 2
			// force: true, //是否强制依赖预构建
			cors: true, // 为开发服务器配置 CORS , 默认启用并允许任何源
			open: true, //服务启动时自动在浏览器中打开应用
			strictPort: false, //端口严格模式， 为true时，当端口被占用则直接退出，不会尝试下一个可用端口
			//HMR连接配置{}, false-禁用
			hmr: {
				// host: 'localhost'
				// overlay: true, // 设为true会导致热更新速度慢
				port,
			},
			// 传递给 chockidar 的文件系统监视器选项
			watch: {
				// ignored:["!**/node_modules/your-package-name/**"],
				usePolling: true, // 修复HMR热更新失效
			},
			proxy: (() => {
				const proxyPath = [
					`/api`,
					`/mock`,
					`/auth`,
					// '/socket.io'
				];
				const proxyConfig = {};
				for (const item of proxyPath) {
					const regExp = new RegExp(`^` + item);
					const envObj = {
						[`/auth`]: viteEnv.APP_API_AURTH_URL,
					};
					proxyConfig[item] = {
						target: envObj[item] ? envObj[item] : viteEnv.APP_API_BASE_URL,
						// logLevel: 'debug', // 查看代理请求的真实地址
						changeOrigin: true,
						rewrite: (requestPath: string) => {
							// console.log('rewrite:', regExp);
							return requestPath.replace(regExp, '');
						},
						// cookieDomainRewrite: '',
						// secure: false,
					};
				}
				// console.log('proxyConfig:', proxyConfig);
				return proxyConfig;
			})(),
		},
		preview: {
			port: +viteEnv.VITE_PORT, // 预览服务器端口
			host: true, // 监听所有地址，包括局域网和公网地址
			strictPort: true, // 端口被占用时，抛出错误
		},
	};
});
