// vite.config.ts
import {
  defineConfig,
  searchForWorkspaceRoot,
  loadEnv
} from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_less@4.2.0_sass@1.72.0_terser@5.29.2/node_modules/vite/dist/node/index.js";
import react from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/@vitejs+plugin-react-swc@3.6.0_vite@5.2.6/node_modules/@vitejs/plugin-react-swc/index.mjs";
import legacy from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-legacy-swc@1.1.0_vite@5.2.6/node_modules/vite-plugin-legacy-swc/dist/index.mjs";
import checker from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-checker@0.6.4_eslint@8.57.0_typescript@5.4.3_vite@5.2.6/node_modules/vite-plugin-checker/dist/esm/main.js";
import basicSsl from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/@vitejs+plugin-basic-ssl@1.1.0_vite@5.2.6/node_modules/@vitejs/plugin-basic-ssl/dist/index.mjs";
import { cdn as importToCDN } from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-cdn2@1.1.0_rollup@2.79.1/node_modules/vite-plugin-cdn2/dist/index.mjs";
import viteCompression from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@5.2.6/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/rollup-plugin-visualizer@5.12.0_rollup@2.79.1/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import webfontDownload from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-webfont-dl@3.9.1_vite@5.2.6/node_modules/vite-plugin-webfont-dl/dist/index.mjs";
import path2 from "path";

// utils.ts
import fs from "fs";
import path from "path";
var appDir = fs.realpathSync(process.cwd());
var pathRelative = (_dir, _path) => path.posix.join(_dir, _path);

// vite.config.ts
var __vite_injected_original_dirname = "/Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/main-apps/vitest-react-ts-swc-base";
var vite_config_default = defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, path2.resolve(__vite_injected_original_dirname, "./env"), ["VITE_", "APP_"]);
  const isProd = ["production", "staging", "testing"].includes(viteEnv.VITE_NODE_ENV);
  const isAnalyze = ["testing", "staging"].includes(mode);
  console.log("main-react-APP_BASE_ROUTER", viteEnv);
  return {
    base: viteEnv.APP_BASE_ROUTER,
    //  './',
    //静态资源服务的文件夹
    publicDir: "public",
    // 环境变量设置所在文件夹路径
    envDir: "./env",
    envPrefix: ["VITE_", "APP_"],
    //静态资源处理
    assetsInclude: "",
    //控制台输出的级别 info 、warn、error、silent
    logLevel: "info",
    // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,
    plugins: [
      react(),
      checker({
        typescript: true
      }),
      // preload(),
      webfontDownload(),
      // http2 开启
      // mkcert({
      // 	// 自定义域名，默认使用 localhost + 本地 ip 列表
      // 	hosts: ['localhost'], // 'example.xxx.com'
      // 	// days: 365,
      // 	force: true, // 是否强制重新生成证书
      // 	autoUpgrade: true, // 是否自动升级 mkcert
      // 	// 指定 mkcert 的下载源，国内用户可以设置成 coding 从 coding.net 镜像下载，也可以提供一个自定义的 BaseSource
      // 	// source: '',
      // 	// 如果网络受限的话，指定一个本地的 mkcert 文件来代替网络下载
      // 	mkcertPath: './certs/rootCA.pem',
      // 	// 保存文件的路径，比如下载的 mkcert 程序以及生成的 CA 文件、私钥跟证书文件等等。默认值是 PLUGIN_DATA_DIR
      // 	savePath: './certs',
      // 	// 私钥的文件名
      // 	keyFileName: 'localhost-key.pem',
      // 	// 证书的文件名
      // 	certFileName: 'localhost-cert.pem',
      // }),
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
            name: "lodash-es",
            // spare: 'https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js',
            relativeModule: "./lodash.min.js",
            global: "_"
          }
        ]
      }),
      viteCompression(),
      // gzip压缩
      visualizer({
        sourcemap: true,
        // "sunburst" | "treemap" | "network" | "flamegraph";
        // template: 'flamegraph',
        // emitFile: true, // 使分析文件出现在打包目录里， 否则在项目目录下
        // 打包完成后自动打开浏览器，显示产物体积报告
        open: true,
        // gzipSize: true,
        // brotliSize: true,
        filename: "analyse.html"
      }),
      legacy({
        // 需要兼容的目标列表
        targets: [
          "defaults",
          "not IE 11",
          "Chrome >= 52",
          "Safari >= 10.1",
          "Firefox >= 54",
          "Edge >= 15"
        ],
        // 面向IE11时需要此插件
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
      })
      // see unocss.config.ts for config
      // Unocss({
      // 	configFile: '../my-uno.config.ts'
      // }),
    ],
    css: {
      devSourcemap: !isProd,
      // 指定传递给 css 预处理器的选项
      preprocessorOptions: {
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
          //注意，这一句是在less对象中，写在外边不起作用
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
          additionalData: '@import "@/assets/styles/main/normalize.scss"; @import "@/assets/styles/main/function.scss";'
        }
      },
      // postcss:内联的 PostCSS 配置（格式同 postcss.config.js），或者一个（默认基于项目根目录的）自定义的 PostCSS 配置路径
      // postcss: {
      // 	plugins: [
      // 		{
      // 			postcssPlugin: 'internal:charset-removal',
      // 			AtRule: {
      // 				charset: atRule => {
      // 					if (atRule.name === 'charset') {
      // 						atRule.remove();
      // 					}
      // 				},
      // 			},
      // 		},
      // 	],
      // },
      // modules: 配置 css modules 的行为, 选项将被传递给 postcss-modules
      modules: {
        localsConvention: "camelCase"
      }
    },
    resolve: {
      alias: [
        // "@micro-zoe/micro-app": path.join(__dirname, '../../../micro-app/lib/index.esm.js'),
        // { find: /^~/, replacement: path.resolve(__dirname, './') },
        { find: "@", replacement: path2.resolve(__vite_injected_original_dirname, "./src") },
        { find: /^tests/, replacement: path2.resolve(__vite_injected_original_dirname, "./tests") }
      ]
    },
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"]
      // 加入预编译
      // exclude: [], // 移出预编译项
    },
    esbuild: {
      sourcemap: !isProd
    },
    build: {
      sourcemap: isAnalyze,
      outDir: pathRelative("../../", viteEnv.VITE_OUTPUT_DIR),
      commonjsOptions: {
        include: [/node_modules/]
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
            "react-vendor": ["react", "react-dom", "react-router-dom"],
            // // 将 Lodash 库的代码单独打包
            // lodash: ['lodash-es'],
            // 将组件库的代码打包
            library: ["antd"]
            // '@arco-design/web-react'
          }
        }
        // brotliSize: false, // 不统计
        // target: 'esnext',
        // minify: 'esbuild', // 混淆器，terser构建后文件体积更小
      }
    },
    server: {
      fs: {
        strict: true,
        allow: [searchForWorkspaceRoot(process.cwd()), "/mygit/micro-zoe/micro-app/"]
      },
      host: "0.0.0.0",
      // host: true, // 监听所有地址，包括局域网和公网地址 "localhost",
      port: viteEnv.VITE_PORT,
      // 开发服务器端口
      https: true,
      //是否启用 http 2
      // force: true, //是否强制依赖预构建
      cors: true,
      // 为开发服务器配置 CORS , 默认启用并允许任何源
      open: true,
      //服务启动时自动在浏览器中打开应用
      strictPort: false,
      //端口严格模式， 为true时，当端口被占用则直接退出，不会尝试下一个可用端口
      //HMR连接配置{}, false-禁用
      hmr: {
        // host: 'localhost'
        // overlay: true, // 设为true会导致热更新速度慢
        port: viteEnv.VITE_PORT
      },
      // 传递给 chockidar 的文件系统监视器选项
      watch: {
        // ignored:["!**/node_modules/your-package-name/**"],
        usePolling: true
        // 修复HMR热更新失效
      }
    },
    preview: {
      port: viteEnv.VITE_PORT,
      // 预览服务器端口
      host: true,
      // 监听所有地址，包括局域网和公网地址
      strictPort: true
      // 端口被占用时，抛出错误
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd3V3ZW5oYW4vV29ya1BsYWNlL21vbm9yZXBvLW1pY3JvLWFwcC1yb290LXRlc3QvbWFpbi1hcHBzL3ZpdGVzdC1yZWFjdC10cy1zd2MtYmFzZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3d1d2VuaGFuL1dvcmtQbGFjZS9tb25vcmVwby1taWNyby1hcHAtcm9vdC10ZXN0L21haW4tYXBwcy92aXRlc3QtcmVhY3QtdHMtc3djLWJhc2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3d1d2VuaGFuL1dvcmtQbGFjZS9tb25vcmVwby1taWNyby1hcHAtcm9vdC10ZXN0L21haW4tYXBwcy92aXRlc3QtcmVhY3QtdHMtc3djLWJhc2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQge1xuXHRkZWZpbmVDb25maWcsXG5cdHNlYXJjaEZvcldvcmtzcGFjZVJvb3QsXG5cdGxvYWRFbnYsXG5cdHR5cGUgQ29uZmlnRW52LFxuXHR0eXBlIFVzZXJDb25maWcsXG59IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3Yyc7XG5pbXBvcnQgbGVnYWN5IGZyb20gJ3ZpdGUtcGx1Z2luLWxlZ2FjeS1zd2MnO1xuaW1wb3J0IGNoZWNrZXIgZnJvbSAndml0ZS1wbHVnaW4tY2hlY2tlcic7XG4vLyBcdTY3MkNcdTU3MzAgRGV2IFNlcnZlciBcdTRFMEFcdTVGMDBcdTU0MkYgSFRUUDJcbi8vIGltcG9ydCBta2NlcnQgZnJvbSAndml0ZS1wbHVnaW4tbWtjZXJ0JzsgXHU0RTBEXHU1OTdEXHU3NTI4XG5pbXBvcnQgYmFzaWNTc2wgZnJvbSAnQHZpdGVqcy9wbHVnaW4tYmFzaWMtc3NsJztcbi8vIGh0bWxcdTYzRDJcdTUxNjVDRE5cdTUyQTBcdTkwMUZcbi8vIGltcG9ydCB7IGltcG9ydFRvQ0ROLCBhdXRvQ29tcGxldGUgfSBmcm9tICd2aXRlLXBsdWdpbi1jZG4taW1wb3J0JztcbmltcG9ydCB7IGNkbiBhcyBpbXBvcnRUb0NETiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWNkbjInO1xuaW1wb3J0IHsgY2RuanMgfSBmcm9tICd2aXRlLXBsdWdpbi1jZG4yL3Jlc29sdmVyL2NkbmpzJztcbi8vIEdaSVAgXHU1MzhCXHU3RjI5XHU2M0QyXHU0RUY2XG5pbXBvcnQgdml0ZUNvbXByZXNzaW9uIGZyb20gJ3ZpdGUtcGx1Z2luLWNvbXByZXNzaW9uJztcbi8vIFx1NjI1M1x1NTMwNVx1NTQwRVx1NzUxRlx1NjIxMGJ1bmRsZVx1NTIwNlx1Njc5MFx1NjJBNVx1NTQ0QVx1NjU4N1x1NEVGNlxuaW1wb3J0IHsgdmlzdWFsaXplciB9IGZyb20gJ3JvbGx1cC1wbHVnaW4tdmlzdWFsaXplcic7XG4vLyBpbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJztcblxuLy8gaW1wb3J0IFZpdGVQbHVnaW5JbmplY3RQcmVsb2FkIGZyb20gJ3ZpdGUtcGx1Z2luLWluamVjdC1wcmVsb2FkJztcbi8vIGltcG9ydCBFbnZpcm9ubWVudFBsdWdpbiBmcm9tICd2aXRlLXBsdWdpbi1lbnZpcm9ubWVudCc7XG4vLyBpbXBvcnQgUmVzaXplSW1hZ2UgZnJvbSAndml0ZS1wbHVnaW4tcmVzaXplLWltYWdlL3ZpdGUnOyAvLyBcdTZDQTFcdTY3MDlcdTRFMEJcdThGN0RcdTY3NDNcdTk2NTBcbmltcG9ydCB3ZWJmb250RG93bmxvYWQgZnJvbSAndml0ZS1wbHVnaW4td2ViZm9udC1kbCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IHJlc29sdmUsIHBhdGhSZWxhdGl2ZSB9IGZyb20gJy4vdXRpbHMnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuXHRjb25zdCB2aXRlRW52ID0gbG9hZEVudihtb2RlLCBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9lbnYnKSwgWydWSVRFXycsICdBUFBfJ10pO1xuXHRjb25zdCBpc1Byb2QgPSBbJ3Byb2R1Y3Rpb24nLCAnc3RhZ2luZycsICd0ZXN0aW5nJ10uaW5jbHVkZXModml0ZUVudi5WSVRFX05PREVfRU5WKTtcblx0Ly8gY29uc3QgaXNEZXYgPSBtb2RlICE9PSAncHJvZHVjdGlvbic7XG5cdGNvbnN0IGlzQW5hbHl6ZSA9IFsndGVzdGluZycsICdzdGFnaW5nJ10uaW5jbHVkZXMobW9kZSk7XG5cdGNvbnNvbGUubG9nKCdtYWluLXJlYWN0LUFQUF9CQVNFX1JPVVRFUicsIHZpdGVFbnYpO1xuXG5cdHJldHVybiB7XG5cdFx0YmFzZTogdml0ZUVudi5BUFBfQkFTRV9ST1VURVIsIC8vICAnLi8nLFxuXHRcdC8vXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU2NzBEXHU1MkExXHU3Njg0XHU2NTg3XHU0RUY2XHU1OTM5XG5cdFx0cHVibGljRGlyOiAncHVibGljJyxcblx0XHQvLyBcdTczQUZcdTU4ODNcdTUzRDhcdTkxQ0ZcdThCQkVcdTdGNkVcdTYyNDBcdTU3MjhcdTY1ODdcdTRFRjZcdTU5MzlcdThERUZcdTVGODRcblx0XHRlbnZEaXI6ICcuL2VudicsXG5cdFx0ZW52UHJlZml4OiBbJ1ZJVEVfJywgJ0FQUF8nXSxcblx0XHQvL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NTkwNFx1NzQwNlxuXHRcdGFzc2V0c0luY2x1ZGU6ICcnLFxuXHRcdC8vXHU2M0E3XHU1MjM2XHU1M0YwXHU4RjkzXHU1MUZBXHU3Njg0XHU3RUE3XHU1MjJCIGluZm8gXHUzMDAxd2Fyblx1MzAwMWVycm9yXHUzMDAxc2lsZW50XG5cdFx0bG9nTGV2ZWw6ICdpbmZvJyxcblx0XHQvLyBcdThCQkVcdTRFM0FmYWxzZSBcdTUzRUZcdTRFRTVcdTkwN0ZcdTUxNEQgdml0ZSBcdTZFMDVcdTVDNEZcdTgwMENcdTk1MTlcdThGQzdcdTU3MjhcdTdFQzhcdTdBRUZcdTRFMkRcdTYyNTNcdTUzNzBcdTY3RDBcdTRFOUJcdTUxNzNcdTk1MkVcdTRGRTFcdTYwNkZcblx0XHRjbGVhclNjcmVlbjogZmFsc2UsXG5cblx0XHRwbHVnaW5zOiBbXG5cdFx0XHRyZWFjdCgpLFxuXHRcdFx0Y2hlY2tlcih7XG5cdFx0XHRcdHR5cGVzY3JpcHQ6IHRydWUsXG5cdFx0XHR9KSxcblx0XHRcdC8vIHByZWxvYWQoKSxcblx0XHRcdHdlYmZvbnREb3dubG9hZCgpLFxuXHRcdFx0Ly8gaHR0cDIgXHU1RjAwXHU1NDJGXG5cdFx0XHQvLyBta2NlcnQoe1xuXHRcdFx0Ly8gXHQvLyBcdTgxRUFcdTVCOUFcdTRFNDlcdTU3REZcdTU0MERcdUZGMENcdTlFRDhcdThCQTRcdTRGN0ZcdTc1MjggbG9jYWxob3N0ICsgXHU2NzJDXHU1NzMwIGlwIFx1NTIxN1x1ODg2OFxuXHRcdFx0Ly8gXHRob3N0czogWydsb2NhbGhvc3QnXSwgLy8gJ2V4YW1wbGUueHh4LmNvbSdcblx0XHRcdC8vIFx0Ly8gZGF5czogMzY1LFxuXHRcdFx0Ly8gXHRmb3JjZTogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU1RjNBXHU1MjM2XHU5MUNEXHU2NUIwXHU3NTFGXHU2MjEwXHU4QkMxXHU0RTY2XG5cdFx0XHQvLyBcdGF1dG9VcGdyYWRlOiB0cnVlLCAvLyBcdTY2MkZcdTU0MjZcdTgxRUFcdTUyQThcdTUzNDdcdTdFQTcgbWtjZXJ0XG5cdFx0XHQvLyBcdC8vIFx1NjMwN1x1NUI5QSBta2NlcnQgXHU3Njg0XHU0RTBCXHU4RjdEXHU2RTkwXHVGRjBDXHU1NkZEXHU1MTg1XHU3NTI4XHU2MjM3XHU1M0VGXHU0RUU1XHU4QkJFXHU3RjZFXHU2MjEwIGNvZGluZyBcdTRFQ0UgY29kaW5nLm5ldCBcdTk1NUNcdTUwQ0ZcdTRFMEJcdThGN0RcdUZGMENcdTRFNUZcdTUzRUZcdTRFRTVcdTYzRDBcdTRGOUJcdTRFMDBcdTRFMkFcdTgxRUFcdTVCOUFcdTRFNDlcdTc2ODQgQmFzZVNvdXJjZVxuXHRcdFx0Ly8gXHQvLyBzb3VyY2U6ICcnLFxuXHRcdFx0Ly8gXHQvLyBcdTU5ODJcdTY3OUNcdTdGNTFcdTdFRENcdTUzRDdcdTk2NTBcdTc2ODRcdThCRERcdUZGMENcdTYzMDdcdTVCOUFcdTRFMDBcdTRFMkFcdTY3MkNcdTU3MzBcdTc2ODQgbWtjZXJ0IFx1NjU4N1x1NEVGNlx1Njc2NVx1NEVFM1x1NjZGRlx1N0Y1MVx1N0VEQ1x1NEUwQlx1OEY3RFxuXHRcdFx0Ly8gXHRta2NlcnRQYXRoOiAnLi9jZXJ0cy9yb290Q0EucGVtJyxcblx0XHRcdC8vIFx0Ly8gXHU0RkREXHU1QjU4XHU2NTg3XHU0RUY2XHU3Njg0XHU4REVGXHU1Rjg0XHVGRjBDXHU2QkQ0XHU1OTgyXHU0RTBCXHU4RjdEXHU3Njg0IG1rY2VydCBcdTdBMEJcdTVFOEZcdTRFRTVcdTUzQ0FcdTc1MUZcdTYyMTBcdTc2ODQgQ0EgXHU2NTg3XHU0RUY2XHUzMDAxXHU3OUMxXHU5NEE1XHU4RERGXHU4QkMxXHU0RTY2XHU2NTg3XHU0RUY2XHU3QjQ5XHU3QjQ5XHUzMDAyXHU5RUQ4XHU4QkE0XHU1MDNDXHU2NjJGIFBMVUdJTl9EQVRBX0RJUlxuXHRcdFx0Ly8gXHRzYXZlUGF0aDogJy4vY2VydHMnLFxuXHRcdFx0Ly8gXHQvLyBcdTc5QzFcdTk0QTVcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcblx0XHRcdC8vIFx0a2V5RmlsZU5hbWU6ICdsb2NhbGhvc3Qta2V5LnBlbScsXG5cdFx0XHQvLyBcdC8vIFx1OEJDMVx1NEU2Nlx1NzY4NFx1NjU4N1x1NEVGNlx1NTQwRFxuXHRcdFx0Ly8gXHRjZXJ0RmlsZU5hbWU6ICdsb2NhbGhvc3QtY2VydC5wZW0nLFxuXHRcdFx0Ly8gfSksXG5cdFx0XHRiYXNpY1NzbCgpLFxuXHRcdFx0Ly8geyBiYXNpY1NzbFx1OTE0RFx1N0Y2RVx1OTg3OVxuXHRcdFx0Ly8gXHQvKiogXHU1NDdEXHU1NDBEXHU4QkMxXHU0RTY2ICovXG5cdFx0XHQvLyBcdG5hbWU6ICd0ZXN0Jyxcblx0XHRcdC8vIFx0LyoqIFx1ODFFQVx1NUI5QVx1NEU0OVx1NzcxRlx1NUI5RVx1NTdERlx1NTQwRCBkb21haW5zICovXG5cdFx0XHQvLyBcdGRvbWFpbnM6IFsnKi5jdXN0b20uY29tJ10sXG5cdFx0XHQvLyBcdC8qKiBcdTgxRUFcdTVCOUFcdTRFNDlcdThCQzFcdTRFNjZcdTVCNThcdTY1M0VcdTc2RUVcdTVGNTUgKi9cblx0XHRcdC8vIFx0Y2VydERpcjogJy9Vc2Vycy8uLi4vLmRldlNlcnZlci9jZXJ0Jyxcblx0XHRcdC8vIH1cblx0XHRcdGltcG9ydFRvQ0ROKHtcblx0XHRcdFx0bW9kdWxlczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdG5hbWU6ICdsb2Rhc2gtZXMnLFxuXHRcdFx0XHRcdFx0Ly8gc3BhcmU6ICdodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL2xvZGFzaC1lc0A0LjE3LjIxL2xvZGFzaC5taW4uanMnLFxuXHRcdFx0XHRcdFx0cmVsYXRpdmVNb2R1bGU6ICcuL2xvZGFzaC5taW4uanMnLFxuXHRcdFx0XHRcdFx0Z2xvYmFsOiAnXycsXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0pLFxuXHRcdFx0dml0ZUNvbXByZXNzaW9uKCksIC8vIGd6aXBcdTUzOEJcdTdGMjlcblx0XHRcdHZpc3VhbGl6ZXIoe1xuXHRcdFx0XHRzb3VyY2VtYXA6IHRydWUsXG5cdFx0XHRcdC8vIFwic3VuYnVyc3RcIiB8IFwidHJlZW1hcFwiIHwgXCJuZXR3b3JrXCIgfCBcImZsYW1lZ3JhcGhcIjtcblx0XHRcdFx0Ly8gdGVtcGxhdGU6ICdmbGFtZWdyYXBoJyxcblx0XHRcdFx0Ly8gZW1pdEZpbGU6IHRydWUsIC8vIFx1NEY3Rlx1NTIwNlx1Njc5MFx1NjU4N1x1NEVGNlx1NTFGQVx1NzNCMFx1NTcyOFx1NjI1M1x1NTMwNVx1NzZFRVx1NUY1NVx1OTFDQ1x1RkYwQyBcdTU0MjZcdTUyMTlcdTU3MjhcdTk4NzlcdTc2RUVcdTc2RUVcdTVGNTVcdTRFMEJcblx0XHRcdFx0Ly8gXHU2MjUzXHU1MzA1XHU1QjhDXHU2MjEwXHU1NDBFXHU4MUVBXHU1MkE4XHU2MjUzXHU1RjAwXHU2RDRGXHU4OUM4XHU1NjY4XHVGRjBDXHU2NjNFXHU3OTNBXHU0RUE3XHU3MjY5XHU0RjUzXHU3OUVGXHU2MkE1XHU1NDRBXG5cdFx0XHRcdG9wZW46IHRydWUsXG5cdFx0XHRcdC8vIGd6aXBTaXplOiB0cnVlLFxuXHRcdFx0XHQvLyBicm90bGlTaXplOiB0cnVlLFxuXHRcdFx0XHRmaWxlbmFtZTogJ2FuYWx5c2UuaHRtbCcsXG5cdFx0XHR9KSxcblx0XHRcdGxlZ2FjeSh7XG5cdFx0XHRcdC8vIFx1OTcwMFx1ODk4MVx1NTE3Q1x1NUJCOVx1NzY4NFx1NzZFRVx1NjgwN1x1NTIxN1x1ODg2OFxuXHRcdFx0XHR0YXJnZXRzOiBbXG5cdFx0XHRcdFx0J2RlZmF1bHRzJyxcblx0XHRcdFx0XHQnbm90IElFIDExJyxcblx0XHRcdFx0XHQnQ2hyb21lID49IDUyJyxcblx0XHRcdFx0XHQnU2FmYXJpID49IDEwLjEnLFxuXHRcdFx0XHRcdCdGaXJlZm94ID49IDU0Jyxcblx0XHRcdFx0XHQnRWRnZSA+PSAxNScsXG5cdFx0XHRcdF0sXG5cdFx0XHRcdC8vIFx1OTc2Mlx1NTQxMUlFMTFcdTY1RjZcdTk3MDBcdTg5ODFcdTZCNjRcdTYzRDJcdTRFRjZcblx0XHRcdFx0YWRkaXRpb25hbExlZ2FjeVBvbHlmaWxsczogWydyZWdlbmVyYXRvci1ydW50aW1lL3J1bnRpbWUnXSxcblx0XHRcdH0pLFxuXHRcdFx0Ly8gc2VlIHVub2Nzcy5jb25maWcudHMgZm9yIGNvbmZpZ1xuXHRcdFx0Ly8gVW5vY3NzKHtcblx0XHRcdC8vIFx0Y29uZmlnRmlsZTogJy4uL215LXVuby5jb25maWcudHMnXG5cdFx0XHQvLyB9KSxcblx0XHRdLFxuXHRcdGNzczoge1xuXHRcdFx0ZGV2U291cmNlbWFwOiAhaXNQcm9kLFxuXHRcdFx0Ly8gXHU2MzA3XHU1QjlBXHU0RjIwXHU5MDEyXHU3RUQ5IGNzcyBcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcdTc2ODRcdTkwMDlcdTk4Nzlcblx0XHRcdHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcblx0XHRcdFx0bGVzczoge1xuXHRcdFx0XHRcdC8vIFx1NjUyRlx1NjMwMVx1NTE4NVx1ODA1NCBKYXZhU2NyaXB0XG5cdFx0XHRcdFx0amF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsIC8vXHU2Q0U4XHU2MTBGXHVGRjBDXHU4RkQ5XHU0RTAwXHU1M0U1XHU2NjJGXHU1NzI4bGVzc1x1NUJGOVx1OEM2MVx1NEUyRFx1RkYwQ1x1NTE5OVx1NTcyOFx1NTkxNlx1OEZCOVx1NEUwRFx1OEQ3N1x1NEY1Q1x1NzUyOFxuXHRcdFx0XHRcdC8vIG1vZGlmeVZhcnM6IHtcblx0XHRcdFx0XHQvLyBcdC8vXHU1NzI4XHU4RkQ5XHU5MUNDXHU4RkRCXHU4ODRDXHU0RTNCXHU5ODk4XHU3Njg0XHU0RkVFXHU2NTM5XHVGRjBDXHU1M0MyXHU4MDAzXHU1Qjk4XHU2NUI5XHU5MTREXHU3RjZFXHU1QzVFXHU2MDI3XG5cdFx0XHRcdFx0Ly8gXHRtb2RpZnlWYXJzOiB0aGVtZVZhcmlhYmxlcyxcblx0XHRcdFx0XHQvLyAgIC8vICdAcHJpbWFyeS1jb2xvcic6ICcjMURBNTdBJyxcblx0XHRcdFx0XHQvLyB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzYXNzOiB7IGNoYXJzZXQ6IGZhbHNlIH0sXG5cdFx0XHRcdHNjc3M6IHtcblx0XHRcdFx0XHRjaGFyc2V0OiBmYWxzZSxcblx0XHRcdFx0XHQvKiogXHU1RjE1XHU1MTY1dmFyLnNjc3NcdTUxNjhcdTVDNDBcdTk4ODRcdTVCOUFcdTRFNDlcdTUzRDhcdTkxQ0YgKi9cblx0XHRcdFx0XHRhZGRpdGlvbmFsRGF0YTpcblx0XHRcdFx0XHRcdCdAaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL21haW4vbm9ybWFsaXplLnNjc3NcIjsgQGltcG9ydCBcIkAvYXNzZXRzL3N0eWxlcy9tYWluL2Z1bmN0aW9uLnNjc3NcIjsnLFxuXHRcdFx0XHR9LFxuXHRcdFx0fSxcblx0XHRcdC8vIHBvc3Rjc3M6XHU1MTg1XHU4MDU0XHU3Njg0IFBvc3RDU1MgXHU5MTREXHU3RjZFXHVGRjA4XHU2ODNDXHU1RjBGXHU1NDBDIHBvc3Rjc3MuY29uZmlnLmpzXHVGRjA5XHVGRjBDXHU2MjE2XHU4MDA1XHU0RTAwXHU0RTJBXHVGRjA4XHU5RUQ4XHU4QkE0XHU1N0ZBXHU0RThFXHU5ODc5XHU3NkVFXHU2ODM5XHU3NkVFXHU1RjU1XHU3Njg0XHVGRjA5XHU4MUVBXHU1QjlBXHU0RTQ5XHU3Njg0IFBvc3RDU1MgXHU5MTREXHU3RjZFXHU4REVGXHU1Rjg0XG5cdFx0XHQvLyBwb3N0Y3NzOiB7XG5cdFx0XHQvLyBcdHBsdWdpbnM6IFtcblx0XHRcdC8vIFx0XHR7XG5cdFx0XHQvLyBcdFx0XHRwb3N0Y3NzUGx1Z2luOiAnaW50ZXJuYWw6Y2hhcnNldC1yZW1vdmFsJyxcblx0XHRcdC8vIFx0XHRcdEF0UnVsZToge1xuXHRcdFx0Ly8gXHRcdFx0XHRjaGFyc2V0OiBhdFJ1bGUgPT4ge1xuXHRcdFx0Ly8gXHRcdFx0XHRcdGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XG5cdFx0XHQvLyBcdFx0XHRcdFx0XHRhdFJ1bGUucmVtb3ZlKCk7XG5cdFx0XHQvLyBcdFx0XHRcdFx0fVxuXHRcdFx0Ly8gXHRcdFx0XHR9LFxuXHRcdFx0Ly8gXHRcdFx0fSxcblx0XHRcdC8vIFx0XHR9LFxuXHRcdFx0Ly8gXHRdLFxuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIG1vZHVsZXM6IFx1OTE0RFx1N0Y2RSBjc3MgbW9kdWxlcyBcdTc2ODRcdTg4NENcdTRFM0EsIFx1OTAwOVx1OTg3OVx1NUMwNlx1ODhBQlx1NEYyMFx1OTAxMlx1N0VEOSBwb3N0Y3NzLW1vZHVsZXNcblx0XHRcdG1vZHVsZXM6IHtcblx0XHRcdFx0bG9jYWxzQ29udmVudGlvbjogJ2NhbWVsQ2FzZScsXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0cmVzb2x2ZToge1xuXHRcdFx0YWxpYXM6IFtcblx0XHRcdFx0Ly8gXCJAbWljcm8tem9lL21pY3JvLWFwcFwiOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vbWljcm8tYXBwL2xpYi9pbmRleC5lc20uanMnKSxcblx0XHRcdFx0Ly8geyBmaW5kOiAvXn4vLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJykgfSxcblx0XHRcdFx0eyBmaW5kOiAnQCcsIHJlcGxhY2VtZW50OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSB9LFxuXHRcdFx0XHR7IGZpbmQ6IC9edGVzdHMvLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vdGVzdHMnKSB9LFxuXHRcdFx0XSxcblx0XHR9LFxuXHRcdG9wdGltaXplRGVwczoge1xuXHRcdFx0aW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLCAvLyBcdTUyQTBcdTUxNjVcdTk4ODRcdTdGMTZcdThCRDFcblx0XHRcdC8vIGV4Y2x1ZGU6IFtdLCAvLyBcdTc5RkJcdTUxRkFcdTk4ODRcdTdGMTZcdThCRDFcdTk4Nzlcblx0XHR9LFxuXHRcdGVzYnVpbGQ6IHtcblx0XHRcdHNvdXJjZW1hcDogIWlzUHJvZCxcblx0XHR9LFxuXHRcdGJ1aWxkOiB7XG5cdFx0XHRzb3VyY2VtYXA6IGlzQW5hbHl6ZSxcblx0XHRcdG91dERpcjogcGF0aFJlbGF0aXZlKCcuLi8uLi8nLCB2aXRlRW52LlZJVEVfT1VUUFVUX0RJUiksXG5cdFx0XHRjb21tb25qc09wdGlvbnM6IHtcblx0XHRcdFx0aW5jbHVkZTogWy9ub2RlX21vZHVsZXMvXSxcblx0XHRcdH0sXG5cdFx0XHQvL1x1ODFFQVx1NUI5QVx1NEU0OVx1NUU5NVx1NUM0Mlx1NzY4NCBSb2xsdXAgXHU2MjUzXHU1MzA1XHU5MTREXHU3RjZFXG5cdFx0XHRyb2xsdXBPcHRpb25zOiB7XG5cdFx0XHRcdC8vIFx1NEUwMFx1ODIyQ1x1NzUyOFx1NEU4RVx1NUU5M1x1NkEyMVx1NUYwRlx1RkYwQyBcdTc4NkVcdTRGRERcdTU5MTZcdTkwRThcdTUzMTZcdTU5MDRcdTc0MDZcdTkwQTNcdTRFOUJcdTRFMERcdTYwRjNcdTYyNTNcdTUzMDVcdThGREJcdTVFOTNcdTc2ODRcdTRGOURcdThENTZcblx0XHRcdFx0Ly8gZXh0ZXJuYWw6IFsncmVhY3QnLCAncmVhY3QtZG9tJywgJ3JlYWN0LXJvdXRlci1kb20nXSxcblx0XHRcdFx0dHJlZXNoYWtlOiB0cnVlLFxuXHRcdFx0XHRvdXRwdXQ6IHtcblx0XHRcdFx0XHQvLyBcdTU3MjggVU1EIFx1Njc4NFx1NUVGQVx1NkEyMVx1NUYwRlx1NEUwQlx1NEUzQVx1OEZEOVx1NEU5Qlx1NTkxNlx1OTBFOFx1NTMxNlx1NzY4NFx1NEY5RFx1OEQ1Nlx1NjNEMFx1NEY5Qlx1NEUwMFx1NEUyQVx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxuXHRcdFx0XHRcdC8vIGV4cG9ydHM6ICduYW1lZCcsXG5cdFx0XHRcdFx0Ly8gZ2xvYmFsczoge1xuXHRcdFx0XHRcdC8vIFx0cmVhY3Q6ICdSZWFjdCcsXG5cdFx0XHRcdFx0Ly8gfSxcblx0XHRcdFx0XHQvKiogXHU1MjA2XHU1MzA1XHU3QjU2XHU3NTY1ICoqL1xuXHRcdFx0XHRcdG1hbnVhbENodW5rczoge1xuXHRcdFx0XHRcdFx0Ly8gXHU1QzA2IFJlYWN0IFx1NzZGOFx1NTE3M1x1NUU5M1x1NjI1M1x1NTMwNVx1NjIxMFx1NTM1NVx1NzJFQ1x1NzY4NCBjaHVuayBcdTRFMkRcblx0XHRcdFx0XHRcdCdyZWFjdC12ZW5kb3InOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbScsICdyZWFjdC1yb3V0ZXItZG9tJ10sXG5cdFx0XHRcdFx0XHQvLyAvLyBcdTVDMDYgTG9kYXNoIFx1NUU5M1x1NzY4NFx1NEVFM1x1NzgwMVx1NTM1NVx1NzJFQ1x1NjI1M1x1NTMwNVxuXHRcdFx0XHRcdFx0Ly8gbG9kYXNoOiBbJ2xvZGFzaC1lcyddLFxuXHRcdFx0XHRcdFx0Ly8gXHU1QzA2XHU3RUM0XHU0RUY2XHU1RTkzXHU3Njg0XHU0RUUzXHU3ODAxXHU2MjUzXHU1MzA1XG5cdFx0XHRcdFx0XHRsaWJyYXJ5OiBbJ2FudGQnXSwgLy8gJ0BhcmNvLWRlc2lnbi93ZWItcmVhY3QnXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0fSxcblx0XHRcdFx0Ly8gYnJvdGxpU2l6ZTogZmFsc2UsIC8vIFx1NEUwRFx1N0VERlx1OEJBMVxuXHRcdFx0XHQvLyB0YXJnZXQ6ICdlc25leHQnLFxuXHRcdFx0XHQvLyBtaW5pZnk6ICdlc2J1aWxkJywgLy8gXHU2REY3XHU2REM2XHU1NjY4XHVGRjBDdGVyc2VyXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NTg3XHU0RUY2XHU0RjUzXHU3OUVGXHU2NkY0XHU1QzBGXG5cdFx0XHR9LFxuXHRcdH0sXG5cdFx0c2VydmVyOiB7XG5cdFx0XHRmczoge1xuXHRcdFx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0XHRcdGFsbG93OiBbc2VhcmNoRm9yV29ya3NwYWNlUm9vdChwcm9jZXNzLmN3ZCgpKSwgJy9teWdpdC9taWNyby16b2UvbWljcm8tYXBwLyddLFxuXHRcdFx0fSxcblx0XHRcdGhvc3Q6ICcwLjAuMC4wJyxcblx0XHRcdC8vIGhvc3Q6IHRydWUsIC8vIFx1NzZEMVx1NTQyQ1x1NjI0MFx1NjcwOVx1NTczMFx1NTc0MFx1RkYwQ1x1NTMwNVx1NjJFQ1x1NUM0MFx1NTdERlx1N0Y1MVx1NTQ4Q1x1NTE2Q1x1N0Y1MVx1NTczMFx1NTc0MCBcImxvY2FsaG9zdFwiLFxuXHRcdFx0cG9ydDogdml0ZUVudi5WSVRFX1BPUlQsIC8vIFx1NUYwMFx1NTNEMVx1NjcwRFx1NTJBMVx1NTY2OFx1N0FFRlx1NTNFM1xuXHRcdFx0aHR0cHM6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4IGh0dHAgMlxuXHRcdFx0Ly8gZm9yY2U6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU1RjNBXHU1MjM2XHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXG5cdFx0XHRjb3JzOiB0cnVlLCAvLyBcdTRFM0FcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkUgQ09SUyAsIFx1OUVEOFx1OEJBNFx1NTQyRlx1NzUyOFx1NUU3Nlx1NTE0MVx1OEJCOFx1NEVGQlx1NEY1NVx1NkU5MFxuXHRcdFx0b3BlbjogdHJ1ZSwgLy9cdTY3MERcdTUyQTFcdTU0MkZcdTUyQThcdTY1RjZcdTgxRUFcdTUyQThcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTYyNTNcdTVGMDBcdTVFOTRcdTc1Mjhcblx0XHRcdHN0cmljdFBvcnQ6IGZhbHNlLCAvL1x1N0FFRlx1NTNFM1x1NEUyNVx1NjgzQ1x1NkEyMVx1NUYwRlx1RkYwQyBcdTRFM0F0cnVlXHU2NUY2XHVGRjBDXHU1RjUzXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHVGRjBDXHU0RTBEXHU0RjFBXHU1QzFEXHU4QkQ1XHU0RTBCXHU0RTAwXHU0RTJBXHU1M0VGXHU3NTI4XHU3QUVGXHU1M0UzXG5cdFx0XHQvL0hNUlx1OEZERVx1NjNBNVx1OTE0RFx1N0Y2RXt9LCBmYWxzZS1cdTc5ODFcdTc1Mjhcblx0XHRcdGhtcjoge1xuXHRcdFx0XHQvLyBob3N0OiAnbG9jYWxob3N0J1xuXHRcdFx0XHQvLyBvdmVybGF5OiB0cnVlLCAvLyBcdThCQkVcdTRFM0F0cnVlXHU0RjFBXHU1QkZDXHU4MUY0XHU3MEVEXHU2NkY0XHU2NUIwXHU5MDFGXHU1RUE2XHU2MTYyXG5cdFx0XHRcdHBvcnQ6IHZpdGVFbnYuVklURV9QT1JULFxuXHRcdFx0fSxcblx0XHRcdC8vIFx1NEYyMFx1OTAxMlx1N0VEOSBjaG9ja2lkYXIgXHU3Njg0XHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHU3NkQxXHU4OUM2XHU1NjY4XHU5MDA5XHU5ODc5XG5cdFx0XHR3YXRjaDoge1xuXHRcdFx0XHQvLyBpZ25vcmVkOltcIiEqKi9ub2RlX21vZHVsZXMveW91ci1wYWNrYWdlLW5hbWUvKipcIl0sXG5cdFx0XHRcdHVzZVBvbGxpbmc6IHRydWUsIC8vIFx1NEZFRVx1NTkwREhNUlx1NzBFRFx1NjZGNFx1NjVCMFx1NTkzMVx1NjU0OFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHByZXZpZXc6IHtcblx0XHRcdHBvcnQ6IHZpdGVFbnYuVklURV9QT1JULCAvLyBcdTk4ODRcdTg5QzhcdTY3MERcdTUyQTFcdTU2NjhcdTdBRUZcdTUzRTNcblx0XHRcdGhvc3Q6IHRydWUsIC8vIFx1NzZEMVx1NTQyQ1x1NjI0MFx1NjcwOVx1NTczMFx1NTc0MFx1RkYwQ1x1NTMwNVx1NjJFQ1x1NUM0MFx1NTdERlx1N0Y1MVx1NTQ4Q1x1NTE2Q1x1N0Y1MVx1NTczMFx1NTc0MFxuXHRcdFx0c3RyaWN0UG9ydDogdHJ1ZSwgLy8gXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU2NUY2XHVGRjBDXHU2MjlCXHU1MUZBXHU5NTE5XHU4QkVGXG5cdFx0fSxcblx0fTtcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd3V3ZW5oYW4vV29ya1BsYWNlL21vbm9yZXBvLW1pY3JvLWFwcC1yb290LXRlc3QvbWFpbi1hcHBzL3ZpdGVzdC1yZWFjdC10cy1zd2MtYmFzZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3d1d2VuaGFuL1dvcmtQbGFjZS9tb25vcmVwby1taWNyby1hcHAtcm9vdC10ZXN0L21haW4tYXBwcy92aXRlc3QtcmVhY3QtdHMtc3djLWJhc2UvdXRpbHMudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3d1d2VuaGFuL1dvcmtQbGFjZS9tb25vcmVwby1taWNyby1hcHAtcm9vdC10ZXN0L21haW4tYXBwcy92aXRlc3QtcmVhY3QtdHMtc3djLWJhc2UvdXRpbHMudHNcIjtpbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG4vLyBpbXBvcnQgcGFja2FnZUNvbmZpZyBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG4vLyBwcm9jZXNzLmN3ZCgpIFx1NjVCOVx1NkNENVx1OEZENFx1NTZERVx1NzY4NFx1NjYyRiBOb2RlLmpzIFx1OEZEQlx1N0EwQlx1NzY4NFx1NUY1M1x1NTI0RFx1NURFNVx1NEY1Q1x1NzZFRVx1NUY1NShcdTUzNzNcdUZGMENcdTVGNTNcdTUyNERcdTgxMUFcdTY3MkNcdTc2ODRcdTVERTVcdTRGNUNcdTc2RUVcdTVGNTVcdTc2ODRcdThERUZcdTVGODQpXHVGRjBDXHU5MDFBXHU1RTM4XHU2NjJGcGFja2FnZS5qc29uIFx1NjU4N1x1NEVGNlx1NjI0MFx1NTcyOFx1NzZFRVx1NUY1NVx1RkYwQ1x1NTZFMFx1NEUzQVx1NTMwNVx1NTQyQiBwcm9jZXNzLmN3ZCgpIFx1NzY4NFx1ODExQVx1NjcyQ1x1NjYyRlx1NTcyOCBwYWNrYWdlLmpzb24gXHU0RTJEXHU4QkZCXHU1M0Q2XHU2MjY3XHU4ODRDXHU3Njg0XG5jb25zdCBhcHBEaXIgPSBmcy5yZWFscGF0aFN5bmMocHJvY2Vzcy5jd2QoKSk7XG5cbmNvbnN0IHJlc29sdmUgPSAoX3BhdGg6IHN0cmluZykgPT4gcGF0aC5yZXNvbHZlKGFwcERpciwgX3BhdGgpOyAvLyBcdTgzQjdcdTUzRDZcdTdFRERcdTVCRjlcdThERUZcdTVGODRcbi8qKl9fZGlybmFtZSBcdThGRDRcdTU2REVcdTc2ODRcdTY2MkZcdTVGNTNcdTUyNERcdTZBMjFcdTU3NTdcdTc2ODRcdTc2RUVcdTVGNTVcdTU0MERcdTc5RjBcdUZGMENcdTUzNzNcdUZGMUFcdTg4QUJcdTYyNjdcdTg4NENcdTc2ODQgSmF2YVNjcmlwdCBcdTY1ODdcdTRFRjZcdTYyNDBcdTU3MjhcdTc2RUVcdTVGNTVcdThERUZcdTVGODRcbiAqIF9fZGlybmFtZSBcdTY2MkZcdTVCOThcdTY1QjlcdTY1ODdcdTY4NjNcdTU3MjggR2xvYmFscyBcdTkxQ0NcdTc2ODRcdTUxNjhcdTVDNDBcdTUzRDhcdTkxQ0ZcdUZGMENcdTRGNDZcdTVCOUVcdTk2NDVcdTRFMEEgX19kaXJuYW1lIFx1NjYyRlx1NkJDRlx1NEUyQVx1NkEyMVx1NTc1N1x1NTE4NVx1OTBFOFx1NzY4NFx1RkYwQ1x1NUU3Nlx1NEUwRFx1NjYyRlx1NzcxRlx1NkI2M1x1NjEwRlx1NEU0OVx1NEUwQVx1NzY4NFx1NTE2OFx1NUM0MFx1NTNEOFx1OTFDRlxuICoqL1xuY29uc3Qgam9pbiA9IChkaXI6IGFueSwgdGllcjogc3RyaW5nID0gJy4uJykgPT4gcGF0aC5qb2luKF9fZGlybmFtZSwgdGllciwgZGlyKTsgLy8gXHU4RkRFXHU2M0E1XHU4REVGXHU1Rjg0XG5jb25zdCBwYXRoUmVsYXRpdmUgPSAoX2RpcjogYW55LCBfcGF0aDogc3RyaW5nKSA9PiBwYXRoLnBvc2l4LmpvaW4oX2RpciwgX3BhdGgpOyAvLyBcdTUxN0NcdTVCQjlcdTYwMjdcdTc2RjhcdTVCRjlcdThERUZcdTVGODRcblxuY29uc3QgcGF0aFJld3JpdGUgPSAobG9jYWxQYXRoOiBzdHJpbmcsIHJlZ1VybDogc3RyaW5nLCByZW1vdGVVcmw6IHN0cmluZykgPT5cblx0cmVzb2x2ZShsb2NhbFBhdGgucmVwbGFjZShuZXcgUmVnRXhwKHJlZ1VybC5yZXBsYWNlKCcvJywgJ1xcXFwvJyksICdnJyksIHJlbW90ZVVybCkpO1xuLy8ge1xuLy8gICBjb25zdCBhc3NldHNTdWJEaXJlY3RvcnkgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nXG4vLyAgICAgPyBlbnZDb25maWcuYnVpbGQuYXNzZXRzU3ViRGlyZWN0b3J5XG4vLyAgICAgOiBlbnZDb25maWcuZGV2LmFzc2V0c1N1YkRpcmVjdG9yeVxuLy8gICBjb25zb2xlLmxvZyhcInBhdGhSZWxhdGl2ZTpcIiwgX3BhdGgsIGVudkNvbmZpZy5idWlsZC5hc3NldHNTdWJEaXJlY3RvcnkpXG4vLyAgIHJldHVybiBwYXRoLnBvc2l4LmpvaW4oYXNzZXRzU3ViRGlyZWN0b3J5LCBfcGF0aClcbi8vIH1cblxuLy8gcm9vdERpcjogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uLy4uLycpLFxuY29uc3QgYXJyRmlsdGVyRW1wdHkgPSAoYXJyOiBhbnlbXSkgPT4gYXJyLmZpbHRlcih4ID0+ICEheCk7XG4vLyBzYXNzUmVzb3VyY2VJdGVtczogW10sXG5cbmV4cG9ydCB7IHJlc29sdmUsIGpvaW4sIHBhdGhSZWxhdGl2ZSwgcGF0aFJld3JpdGUsIGFyckZpbHRlckVtcHR5IH07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTZiO0FBQUEsRUFDNWI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE9BR007QUFDUCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sYUFBYTtBQUdwQixPQUFPLGNBQWM7QUFHckIsU0FBUyxPQUFPLG1CQUFtQjtBQUduQyxPQUFPLHFCQUFxQjtBQUU1QixTQUFTLGtCQUFrQjtBQU0zQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPQSxXQUFVOzs7QUMzQmdhLE9BQU8sUUFBUTtBQUNoYyxPQUFPLFVBQVU7QUFJakIsSUFBTSxTQUFTLEdBQUcsYUFBYSxRQUFRLElBQUksQ0FBQztBQU81QyxJQUFNLGVBQWUsQ0FBQyxNQUFXLFVBQWtCLEtBQUssTUFBTSxLQUFLLE1BQU0sS0FBSzs7O0FEWjlFLElBQU0sbUNBQW1DO0FBK0J6QyxJQUFPLHNCQUFRLGFBQWEsQ0FBQyxFQUFFLEtBQUssTUFBTTtBQUN6QyxRQUFNLFVBQVUsUUFBUSxNQUFNQyxNQUFLLFFBQVEsa0NBQVcsT0FBTyxHQUFHLENBQUMsU0FBUyxNQUFNLENBQUM7QUFDakYsUUFBTSxTQUFTLENBQUMsY0FBYyxXQUFXLFNBQVMsRUFBRSxTQUFTLFFBQVEsYUFBYTtBQUVsRixRQUFNLFlBQVksQ0FBQyxXQUFXLFNBQVMsRUFBRSxTQUFTLElBQUk7QUFDdEQsVUFBUSxJQUFJLDhCQUE4QixPQUFPO0FBRWpELFNBQU87QUFBQSxJ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
