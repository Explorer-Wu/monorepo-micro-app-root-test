// vite.config.ts
import { defineConfig, loadEnv } from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite@5.2.6_@types+node@20.11.30_less@4.2.0_sass@1.72.0_terser@5.29.2/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@5.2.6_vue@3.4.21/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.1.0_vite@5.2.6_vue@3.4.21/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unplugin-auto-import@0.17.5/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unplugin-vue-components@0.26.0_vue@3.4.21/node_modules/unplugin-vue-components/dist/resolvers.js";
import Icons from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/vite.js";
import IconsResolver from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unplugin-icons@0.18.5_@vue+compiler-sfc@3.4.21/node_modules/unplugin-icons/dist/resolver.js";
import Inspect from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-inspect@0.8.3_vite@5.2.6/node_modules/vite-plugin-inspect/dist/index.mjs";
import legacy from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/@vitejs+plugin-legacy@5.3.2_terser@5.29.2_vite@5.2.6/node_modules/@vitejs/plugin-legacy/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import path from "path";
var __vite_injected_original_dirname = "/Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/sub-apps/side-nav";
var __vite_injected_original_import_meta_url = "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/sub-apps/side-nav/vite.config.ts";
var vite_config_default = defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, path.resolve(__vite_injected_original_dirname, "./env"), ["VITE_", "APP_"]);
  const isProd = ["production", "staging", "testing"].includes(viteEnv.VITE_NODE_ENV);
  console.log("sub-vue3-APP_BASE_ROUTER", viteEnv);
  return {
    base: `${viteEnv.APP_BASE_ROUTER}`,
    // subvue3/
    //静态资源服务的文件夹
    publicDir: "public",
    // 环境变量设置所在文件夹路径
    envDir: "./env",
    envPrefix: ["VITE_", "APP_"],
    // 静态资源处理
    // assetsInclude: '',
    //控制台输出的级别 info 、warn、error、silent
    logLevel: "info",
    // 设为false 可以避免 vite 清屏而错过在终端中打印某些关键信息
    clearScreen: false,
    // 强制预构建插件包
    optimizeDeps: {
      //检测需要预构建的依赖项
      // entries: [],
      //默认情况下，不在 node_modules 中的，链接的包不会预构建
      // include: ['axios'],
      include: [
        "esm-dep > cjs-dep",
        "axios",
        "lodash-es",
        "dayjs",
        "vue",
        "vue-router",
        "vue-i18n"
        // 'async-validator',
      ]
      // exclude: ['your-package-name'] //排除在优化之外
    },
    plugins: [
      vue({
        include: [/\.vue$/, /\.md$/]
      }),
      vueJsx(),
      // vueI18n({
      //   include: resolve('./src/locales/**'),
      //   runtimeOnly: false
      // }),
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // 自动导入图标组件
          // IconsResolver(),
          IconsResolver({
            prefix: "I"
          })
        ],
        include: [
          /\.[tj]sx?$/,
          // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/,
          // .vue
          /\.(s?c|le)ss$/,
          /\.md$/
          // .md
        ],
        // // global imports to register
        imports: [
          // presets
          "vue",
          "vue/macros",
          "@vueuse/core",
          // 'vue-router',
          "pinia",
          "vue-i18n"
          // custom
          // {
          // 	'@vueuse/core': [
          // 		// named imports
          // 		'useMouse', // import { useMouse } from '@vueuse/core',
          // 		// alias
          // 		// ['useFetch', 'useMyFetch'], // import { useFetch as useMyFetch } from '@vueuse/core',
          // 	],
          // 	// axios: [ // 已经封装了库，不使用
          // 	// 	// default imports
          // 	// 	['default', 'axios'], // import { default as axios } from 'axios',
          // 	// ],
          // 	'[package-name]': [
          // 		'[import-names]',
          // 		// alias
          // 		['[from]', '[alias]'],
          // 	],
          // },
          // example type import
          // {
          // 	from: 'vue-router',
          // 	imports: ['RouteLocationRaw'],
          // 	type: true,
          // },
        ],
        // // Array of strings of regexes that contains imports meant to be filtered out.
        // ignore: ['useMouse', 'useFetch'],
        dts: "./types/auto-imports.d.ts"
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.(s?c|le)ss$/, /\.md$/],
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动注册图标组件
          // IconsResolver(),
          IconsResolver({
            // prefix: false, 这样设置不行
            // alias: {
            // 	ep: 'icon-ep',
            // },
            enabledCollections: ["ep"]
          })
        ],
        dts: "./types/components.d.ts"
      }),
      Icons({
        // compiler: 'vue3',
        autoInstall: true
      }),
      legacy({
        // 需要兼容的目标列表
        targets: [
          "defaults",
          // 'not IE 11',
          "Chrome >= 52",
          "Safari >= 10.1",
          "Firefox >= 54",
          "Edge >= 15"
          // 'IOS >= 10.3',
          // 'Android > 39',
        ],
        // 面向IE11时需要此插件
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"]
      }),
      // createSvgIconsPlugin({
      // 	// 指定需要缓存的图标文件夹
      // 	iconDirs: [fileURLToPath(new URL('./src/assets/images/icons', import.meta.url))],
      // 	// 指定symbolId格式
      // 	symbolId: 'icon-[dir]-[name]',
      // }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      // Unocss({
      // 	presets: [
      // 		presetUno(),
      // 		presetAttributify(),
      // 		presetIcons({
      // 			scale: 1.2,
      // 			warn: true,
      // 		}),
      // 	],
      // 	transformers: [transformerDirectives(), transformerVariantGroup()],
      // }),
      Inspect()
    ],
    json: {
      //是否支持从 .json 文件中进行按名导入
      namedExports: true,
      //若设置为 true 导入的json会被转为 export default JSON.parse("..") 会比转译成对象字面量性能更好
      stringify: true
    },
    css: {
      // 指定传递给 css 预处理器的选项
      preprocessorOptions: {
        scss: {
          // prependData: `@import "@/assets/styles/main/normalize.scss"; @import "@/assets/styles/main/function.scss";`,
          //全局引入
          additionalData: `@use "@/assets/styles/theme/element.scss" as *; @use "@/assets/styles/main/normalize.scss" as *; @use "@/assets/styles/main/function.scss" as *;`,
          charset: false,
          outputStyle: "expanded"
          /** 引入var.scss全局预定义变量 */
          // modifyVars: {
          // 	'primary-color': '#1890ff',
          // 	'font-size-base': '14px',
          // },
        },
        sass: {
          charset: false,
          outputStyle: "expanded"
        },
        less: {
          // 支持内联 JavaScript
          javascriptEnabled: true
          //注意，这一句是在less对象中，写在外边不起作用
          // additionalData: 'import "@/assets/styles/base.less"; import "@/assets/styles/function.less";'
          // modifyVars:{ //在这里进行主题的修改，参考官方配置属性 // modifyVars: themeVariables,
          //   '@primary-color': '#1DA57A',
          // },
        }
      },
      // postCss 配置
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      },
      // 配置 css modules 的行为
      modules: {
        localsConvention: "camelCase"
      }
    },
    resolve: {
      // 导入时想要省略的扩展名列表
      extensions: [
        // '.wasm',
        ".mjs",
        ".js",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
        ".css",
        ".scss",
        ".less",
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".svg"
      ],
      // 配置别名
      alias: [
        // {
        // 	find: /^~/,
        // 	replacement: fileURLToPath(new URL('./', import.meta.url)),
        // },
        {
          find: "@/",
          replacement: fileURLToPath(new URL("./src/", __vite_injected_original_import_meta_url))
        },
        {
          find: /^tests/,
          replacement: fileURLToPath(new URL("./tests", __vite_injected_original_import_meta_url))
        }
        // { find: /\/#/, replacement: path.resolve(__dirname, './types') }
      ]
      // 情景导出 package.json 配置中的exports字段
      // conditions: [],
    },
    server: {
      // base: './',
      fs: {
        strict: true
      },
      host: "0.0.0.0",
      // host: true, // 监听所有地址，包括局域网和公网地址 "localhost",
      port: viteEnv.VITE_PORT,
      // 开发服务器端口
      // https: false, //是否启用 http 2
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
    build: {
      // 构建后是否生成 source map 文件
      sourcemap: true,
      //当设置为 true，构建后将会生成 manifest.json 文件
      manifest: false,
      /**
       * 指定使用混淆器: boolean | 'terser' | 'esbuild'
       * 设置为 false 可以禁用最小化混淆
       */
      minify: "esbuild",
      // terser 构建后文件体积更小
      //传递给 Terser 的更多 minify 选项。
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      },
      //浏览器兼容性  "esnext"|"modules"
      target: ["esnext", "edge88", "firefox78", "chrome52", "safari13.1", "ie11"],
      cssTarget: ["esnext", "edge88", "firefox78", "chrome52", "safari13.1", "ie11"],
      //指定输出路径
      outDir: viteEnv.VITE_OUTPUT_DIR,
      // 指定生成静态资源的存放路径
      assetsDir: "static",
      //启用/禁用 CSS 代码拆分
      cssCodeSplit: true,
      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项
      assetsInlineLimit: 4096,
      //自定义底层的 Rollup 打包配置
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: ["vue", "vue-router", "pinia"],
        treeshake: true,
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          exports: "named",
          globals: {
            vue: "Vue"
          }
          // chunkFileNames: 'static/js1/[name]-[hash].js',
          // entryFileNames: 'static/js2/[name]-[hash].js',
          // assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        }
        // target: 'esnext',
        // minify: 'esbuild', // 混淆器，terser构建后文件体积更小
      },
      // @rollup/plugin-commonjs 插件的选项
      commonjsOptions: {
        include: [/node_modules/]
        // /jest_transform/,
      },
      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能
      reportCompressedSize: true,
      //chunk 大小警告的限制
      chunkSizeWarningLimit: 500,
      // 设置为 false 来禁用将构建后的文件写入磁盘
      write: true,
      //默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录。
      emptyOutDir: true,
      /** 构建为库
       * 如果你指定了 build.lib，那么 build.assetsInlineLimit 将被忽略
       * 无论文件大小或是否为 Git LFS 占位符，资源都会被内联。
       * */
      lib: false,
      ssr: false,
      ssrManifest: false,
      watch: null,
      dynamicImportVarsOptions: { warnOnError: true, exclude: [] }
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd3V3ZW5oYW4vV29ya1BsYWNlL21vbm9yZXBvLW1pY3JvLWFwcC1yb290LXRlc3Qvc3ViLWFwcHMvc2lkZS1uYXZcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy93dXdlbmhhbi9Xb3JrUGxhY2UvbW9ub3JlcG8tbWljcm8tYXBwLXJvb3QtdGVzdC9zdWItYXBwcy9zaWRlLW5hdi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvd3V3ZW5oYW4vV29ya1BsYWNlL21vbm9yZXBvLW1pY3JvLWFwcC1yb290LXRlc3Qvc3ViLWFwcHMvc2lkZS1uYXYvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0JztcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5Jztcbi8vIGltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vLyBpbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJztcbi8vIGltcG9ydCB7XG4vLyBcdHByZXNldEF0dHJpYnV0aWZ5LFxuLy8gXHRwcmVzZXRJY29ucyxcbi8vIFx0cHJlc2V0VW5vLFxuLy8gXHR0cmFuc2Zvcm1lckRpcmVjdGl2ZXMsXG4vLyBcdHRyYW5zZm9ybWVyVmFyaWFudEdyb3VwLFxuLy8gfSBmcm9tICd1bm9jc3MnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG5cdGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KG1vZGUsIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL2VudicpLCBbJ1ZJVEVfJywgJ0FQUF8nXSk7XG5cdGNvbnN0IGlzUHJvZCA9IFsncHJvZHVjdGlvbicsICdzdGFnaW5nJywgJ3Rlc3RpbmcnXS5pbmNsdWRlcyh2aXRlRW52LlZJVEVfTk9ERV9FTlYpO1xuXHRjb25zb2xlLmxvZygnc3ViLXZ1ZTMtQVBQX0JBU0VfUk9VVEVSJywgdml0ZUVudik7XG5cdHJldHVybiB7XG5cdFx0YmFzZTogYCR7dml0ZUVudi5BUFBfQkFTRV9ST1VURVJ9YCwgLy8gc3VidnVlMy9cblx0XHQvL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NjcwRFx1NTJBMVx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVxuXHRcdHB1YmxpY0RpcjogJ3B1YmxpYycsXG5cdFx0Ly8gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU4QkJFXHU3RjZFXHU2MjQwXHU1NzI4XHU2NTg3XHU0RUY2XHU1OTM5XHU4REVGXHU1Rjg0XG5cdFx0ZW52RGlyOiAnLi9lbnYnLFxuXHRcdGVudlByZWZpeDogWydWSVRFXycsICdBUFBfJ10sXG5cdFx0Ly8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1OTA0XHU3NDA2XG5cdFx0Ly8gYXNzZXRzSW5jbHVkZTogJycsXG5cdFx0Ly9cdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTc2ODRcdTdFQTdcdTUyMkIgaW5mbyBcdTMwMDF3YXJuXHUzMDAxZXJyb3JcdTMwMDFzaWxlbnRcblx0XHRsb2dMZXZlbDogJ2luZm8nLFxuXHRcdC8vIFx1OEJCRVx1NEUzQWZhbHNlIFx1NTNFRlx1NEVFNVx1OTA3Rlx1NTE0RCB2aXRlIFx1NkUwNVx1NUM0Rlx1ODAwQ1x1OTUxOVx1OEZDN1x1NTcyOFx1N0VDOFx1N0FFRlx1NEUyRFx1NjI1M1x1NTM3MFx1NjdEMFx1NEU5Qlx1NTE3M1x1OTUyRVx1NEZFMVx1NjA2RlxuXHRcdGNsZWFyU2NyZWVuOiBmYWxzZSxcblx0XHQvLyBcdTVGM0FcdTUyMzZcdTk4ODRcdTY3ODRcdTVFRkFcdTYzRDJcdTRFRjZcdTUzMDVcblx0XHRvcHRpbWl6ZURlcHM6IHtcblx0XHRcdC8vXHU2OEMwXHU2RDRCXHU5NzAwXHU4OTgxXHU5ODg0XHU2Nzg0XHU1RUZBXHU3Njg0XHU0RjlEXHU4RDU2XHU5ODc5XG5cdFx0XHQvLyBlbnRyaWVzOiBbXSxcblx0XHRcdC8vXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDXHU0RTBEXHU1NzI4IG5vZGVfbW9kdWxlcyBcdTRFMkRcdTc2ODRcdUZGMENcdTk0RkVcdTYzQTVcdTc2ODRcdTUzMDVcdTRFMERcdTRGMUFcdTk4ODRcdTY3ODRcdTVFRkFcblx0XHRcdC8vIGluY2x1ZGU6IFsnYXhpb3MnXSxcblx0XHRcdGluY2x1ZGU6IFtcblx0XHRcdFx0J2VzbS1kZXAgPiBjanMtZGVwJyxcblx0XHRcdFx0J2F4aW9zJyxcblx0XHRcdFx0J2xvZGFzaC1lcycsXG5cdFx0XHRcdCdkYXlqcycsXG5cdFx0XHRcdCd2dWUnLFxuXHRcdFx0XHQndnVlLXJvdXRlcicsXG5cdFx0XHRcdCd2dWUtaTE4bicsXG5cdFx0XHRcdC8vICdhc3luYy12YWxpZGF0b3InLFxuXHRcdFx0XSxcblx0XHRcdC8vIGV4Y2x1ZGU6IFsneW91ci1wYWNrYWdlLW5hbWUnXSAvL1x1NjM5Mlx1OTY2NFx1NTcyOFx1NEYxOFx1NTMxNlx1NEU0Qlx1NTkxNlxuXHRcdH0sXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0dnVlKHtcblx0XHRcdFx0aW5jbHVkZTogWy9cXC52dWUkLywgL1xcLm1kJC9dLFxuXHRcdFx0fSksXG5cdFx0XHR2dWVKc3goKSxcblx0XHRcdC8vIHZ1ZUkxOG4oe1xuXHRcdFx0Ly8gICBpbmNsdWRlOiByZXNvbHZlKCcuL3NyYy9sb2NhbGVzLyoqJyksXG5cdFx0XHQvLyAgIHJ1bnRpbWVPbmx5OiBmYWxzZVxuXHRcdFx0Ly8gfSksXG5cdFx0XHRBdXRvSW1wb3J0KHtcblx0XHRcdFx0cmVzb2x2ZXJzOiBbXG5cdFx0XHRcdFx0RWxlbWVudFBsdXNSZXNvbHZlcigpLFxuXHRcdFx0XHRcdC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NVx1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuXHRcdFx0XHRcdC8vIEljb25zUmVzb2x2ZXIoKSxcblx0XHRcdFx0XHRJY29uc1Jlc29sdmVyKHtcblx0XHRcdFx0XHRcdHByZWZpeDogJ0knLFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHRpbmNsdWRlOiBbXG5cdFx0XHRcdFx0L1xcLlt0al1zeD8kLywgLy8gLnRzLCAudHN4LCAuanMsIC5qc3hcblx0XHRcdFx0XHQvXFwudnVlJC8sXG5cdFx0XHRcdFx0L1xcLnZ1ZVxcP3Z1ZS8sIC8vIC52dWVcblx0XHRcdFx0XHQvXFwuKHM/Y3xsZSlzcyQvLFxuXHRcdFx0XHRcdC9cXC5tZCQvLCAvLyAubWRcblx0XHRcdFx0XSxcblx0XHRcdFx0Ly8gLy8gZ2xvYmFsIGltcG9ydHMgdG8gcmVnaXN0ZXJcblx0XHRcdFx0aW1wb3J0czogW1xuXHRcdFx0XHRcdC8vIHByZXNldHNcblx0XHRcdFx0XHQndnVlJyxcblx0XHRcdFx0XHQndnVlL21hY3JvcycsXG5cdFx0XHRcdFx0J0B2dWV1c2UvY29yZScsXG5cdFx0XHRcdFx0Ly8gJ3Z1ZS1yb3V0ZXInLFxuXHRcdFx0XHRcdCdwaW5pYScsXG5cdFx0XHRcdFx0J3Z1ZS1pMThuJyxcblx0XHRcdFx0XHQvLyBjdXN0b21cblx0XHRcdFx0XHQvLyB7XG5cdFx0XHRcdFx0Ly8gXHQnQHZ1ZXVzZS9jb3JlJzogW1xuXHRcdFx0XHRcdC8vIFx0XHQvLyBuYW1lZCBpbXBvcnRzXG5cdFx0XHRcdFx0Ly8gXHRcdCd1c2VNb3VzZScsIC8vIGltcG9ydCB7IHVzZU1vdXNlIH0gZnJvbSAnQHZ1ZXVzZS9jb3JlJyxcblx0XHRcdFx0XHQvLyBcdFx0Ly8gYWxpYXNcblx0XHRcdFx0XHQvLyBcdFx0Ly8gWyd1c2VGZXRjaCcsICd1c2VNeUZldGNoJ10sIC8vIGltcG9ydCB7IHVzZUZldGNoIGFzIHVzZU15RmV0Y2ggfSBmcm9tICdAdnVldXNlL2NvcmUnLFxuXHRcdFx0XHRcdC8vIFx0XSxcblx0XHRcdFx0XHQvLyBcdC8vIGF4aW9zOiBbIC8vIFx1NURGMlx1N0VDRlx1NUMwMVx1ODhDNVx1NEU4Nlx1NUU5M1x1RkYwQ1x1NEUwRFx1NEY3Rlx1NzUyOFxuXHRcdFx0XHRcdC8vIFx0Ly8gXHQvLyBkZWZhdWx0IGltcG9ydHNcblx0XHRcdFx0XHQvLyBcdC8vIFx0WydkZWZhdWx0JywgJ2F4aW9zJ10sIC8vIGltcG9ydCB7IGRlZmF1bHQgYXMgYXhpb3MgfSBmcm9tICdheGlvcycsXG5cdFx0XHRcdFx0Ly8gXHQvLyBdLFxuXHRcdFx0XHRcdC8vIFx0J1twYWNrYWdlLW5hbWVdJzogW1xuXHRcdFx0XHRcdC8vIFx0XHQnW2ltcG9ydC1uYW1lc10nLFxuXHRcdFx0XHRcdC8vIFx0XHQvLyBhbGlhc1xuXHRcdFx0XHRcdC8vIFx0XHRbJ1tmcm9tXScsICdbYWxpYXNdJ10sXG5cdFx0XHRcdFx0Ly8gXHRdLFxuXHRcdFx0XHRcdC8vIH0sXG5cdFx0XHRcdFx0Ly8gZXhhbXBsZSB0eXBlIGltcG9ydFxuXHRcdFx0XHRcdC8vIHtcblx0XHRcdFx0XHQvLyBcdGZyb206ICd2dWUtcm91dGVyJyxcblx0XHRcdFx0XHQvLyBcdGltcG9ydHM6IFsnUm91dGVMb2NhdGlvblJhdyddLFxuXHRcdFx0XHRcdC8vIFx0dHlwZTogdHJ1ZSxcblx0XHRcdFx0XHQvLyB9LFxuXHRcdFx0XHRdLFxuXHRcdFx0XHQvLyAvLyBBcnJheSBvZiBzdHJpbmdzIG9mIHJlZ2V4ZXMgdGhhdCBjb250YWlucyBpbXBvcnRzIG1lYW50IHRvIGJlIGZpbHRlcmVkIG91dC5cblx0XHRcdFx0Ly8gaWdub3JlOiBbJ3VzZU1vdXNlJywgJ3VzZUZldGNoJ10sXG5cdFx0XHRcdGR0czogJy4vdHlwZXMvYXV0by1pbXBvcnRzLmQudHMnLFxuXHRcdFx0fSksXG5cdFx0XHRDb21wb25lbnRzKHtcblx0XHRcdFx0Ly8gYWxsb3cgYXV0byBsb2FkIG1hcmtkb3duIGNvbXBvbmVudHMgdW5kZXIgYC4vc3JjL2NvbXBvbmVudHMvYFxuXHRcdFx0XHRleHRlbnNpb25zOiBbJ3Z1ZScsICdtZCddLFxuXHRcdFx0XHQvLyBhbGxvdyBhdXRvIGltcG9ydCBhbmQgcmVnaXN0ZXIgY29tcG9uZW50cyB1c2VkIGluIG1hcmtkb3duXG5cdFx0XHRcdGluY2x1ZGU6IFsvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLCAvXFwuKHM/Y3xsZSlzcyQvLCAvXFwubWQkL10sXG5cdFx0XHRcdHJlc29sdmVyczogW1xuXHRcdFx0XHRcdC8vIFx1ODFFQVx1NTJBOFx1NUJGQ1x1NTE2NSBFbGVtZW50IFBsdXMgXHU3RUM0XHU0RUY2XG5cdFx0XHRcdFx0RWxlbWVudFBsdXNSZXNvbHZlcigpLFxuXHRcdFx0XHRcdC8vIFx1ODFFQVx1NTJBOFx1NkNFOFx1NTE4Q1x1NTZGRVx1NjgwN1x1N0VDNFx1NEVGNlxuXHRcdFx0XHRcdC8vIEljb25zUmVzb2x2ZXIoKSxcblx0XHRcdFx0XHRJY29uc1Jlc29sdmVyKHtcblx0XHRcdFx0XHRcdC8vIHByZWZpeDogZmFsc2UsIFx1OEZEOVx1NjgzN1x1OEJCRVx1N0Y2RVx1NEUwRFx1ODg0Q1xuXHRcdFx0XHRcdFx0Ly8gYWxpYXM6IHtcblx0XHRcdFx0XHRcdC8vIFx0ZXA6ICdpY29uLWVwJyxcblx0XHRcdFx0XHRcdC8vIH0sXG5cdFx0XHRcdFx0XHRlbmFibGVkQ29sbGVjdGlvbnM6IFsnZXAnXSxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XSxcblxuXHRcdFx0XHRkdHM6ICcuL3R5cGVzL2NvbXBvbmVudHMuZC50cycsXG5cdFx0XHR9KSxcblx0XHRcdEljb25zKHtcblx0XHRcdFx0Ly8gY29tcGlsZXI6ICd2dWUzJyxcblx0XHRcdFx0YXV0b0luc3RhbGw6IHRydWUsXG5cdFx0XHR9KSxcblx0XHRcdGxlZ2FjeSh7XG5cdFx0XHRcdC8vIFx1OTcwMFx1ODk4MVx1NTE3Q1x1NUJCOVx1NzY4NFx1NzZFRVx1NjgwN1x1NTIxN1x1ODg2OFxuXHRcdFx0XHR0YXJnZXRzOiBbXG5cdFx0XHRcdFx0J2RlZmF1bHRzJyxcblx0XHRcdFx0XHQvLyAnbm90IElFIDExJyxcblx0XHRcdFx0XHQnQ2hyb21lID49IDUyJyxcblx0XHRcdFx0XHQnU2FmYXJpID49IDEwLjEnLFxuXHRcdFx0XHRcdCdGaXJlZm94ID49IDU0Jyxcblx0XHRcdFx0XHQnRWRnZSA+PSAxNScsXG5cdFx0XHRcdFx0Ly8gJ0lPUyA+PSAxMC4zJyxcblx0XHRcdFx0XHQvLyAnQW5kcm9pZCA+IDM5Jyxcblx0XHRcdFx0XSxcblx0XHRcdFx0Ly8gXHU5NzYyXHU1NDExSUUxMVx1NjVGNlx1OTcwMFx1ODk4MVx1NkI2NFx1NjNEMlx1NEVGNlxuXHRcdFx0XHRhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSddLFxuXHRcdFx0fSksXG5cdFx0XHQvLyBjcmVhdGVTdmdJY29uc1BsdWdpbih7XG5cdFx0XHQvLyBcdC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuXHRcdFx0Ly8gXHRpY29uRGlyczogW2ZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucycsIGltcG9ydC5tZXRhLnVybCkpXSxcblx0XHRcdC8vIFx0Ly8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcblx0XHRcdC8vIFx0c3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG5cdFx0XHQvLyB9KSxcblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3Ncblx0XHRcdC8vIHNlZSB1bm9jc3MuY29uZmlnLnRzIGZvciBjb25maWdcblx0XHRcdC8vIFVub2Nzcyh7XG5cdFx0XHQvLyBcdHByZXNldHM6IFtcblx0XHRcdC8vIFx0XHRwcmVzZXRVbm8oKSxcblx0XHRcdC8vIFx0XHRwcmVzZXRBdHRyaWJ1dGlmeSgpLFxuXHRcdFx0Ly8gXHRcdHByZXNldEljb25zKHtcblx0XHRcdC8vIFx0XHRcdHNjYWxlOiAxLjIsXG5cdFx0XHQvLyBcdFx0XHR3YXJuOiB0cnVlLFxuXHRcdFx0Ly8gXHRcdH0pLFxuXHRcdFx0Ly8gXHRdLFxuXHRcdFx0Ly8gXHR0cmFuc2Zvcm1lcnM6IFt0cmFuc2Zvcm1lckRpcmVjdGl2ZXMoKSwgdHJhbnNmb3JtZXJWYXJpYW50R3JvdXAoKV0sXG5cdFx0XHQvLyB9KSxcblx0XHRcdEluc3BlY3QoKSxcblx0XHRdLFxuXHRcdGpzb246IHtcblx0XHRcdC8vXHU2NjJGXHU1NDI2XHU2NTJGXHU2MzAxXHU0RUNFIC5qc29uIFx1NjU4N1x1NEVGNlx1NEUyRFx1OEZEQlx1ODg0Q1x1NjMwOVx1NTQwRFx1NUJGQ1x1NTE2NVxuXHRcdFx0bmFtZWRFeHBvcnRzOiB0cnVlLFxuXHRcdFx0Ly9cdTgyRTVcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZSBcdTVCRkNcdTUxNjVcdTc2ODRqc29uXHU0RjFBXHU4OEFCXHU4RjZDXHU0RTNBIGV4cG9ydCBkZWZhdWx0IEpTT04ucGFyc2UoXCIuLlwiKSBcdTRGMUFcdTZCRDRcdThGNkNcdThCRDFcdTYyMTBcdTVCRjlcdThDNjFcdTVCNTdcdTk3NjJcdTkxQ0ZcdTYwMjdcdTgwRkRcdTY2RjRcdTU5N0Rcblx0XHRcdHN0cmluZ2lmeTogdHJ1ZSxcblx0XHR9LFxuXHRcdGNzczoge1xuXHRcdFx0Ly8gXHU2MzA3XHU1QjlBXHU0RjIwXHU5MDEyXHU3RUQ5IGNzcyBcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcdTc2ODRcdTkwMDlcdTk4Nzlcblx0XHRcdHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcblx0XHRcdFx0c2Nzczoge1xuXHRcdFx0XHRcdC8vIHByZXBlbmREYXRhOiBgQGltcG9ydCBcIkAvYXNzZXRzL3N0eWxlcy9tYWluL25vcm1hbGl6ZS5zY3NzXCI7IEBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvbWFpbi9mdW5jdGlvbi5zY3NzXCI7YCxcblx0XHRcdFx0XHQvL1x1NTE2OFx1NUM0MFx1NUYxNVx1NTE2NVxuXHRcdFx0XHRcdGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkAvYXNzZXRzL3N0eWxlcy90aGVtZS9lbGVtZW50LnNjc3NcIiBhcyAqOyBAdXNlIFwiQC9hc3NldHMvc3R5bGVzL21haW4vbm9ybWFsaXplLnNjc3NcIiBhcyAqOyBAdXNlIFwiQC9hc3NldHMvc3R5bGVzL21haW4vZnVuY3Rpb24uc2Nzc1wiIGFzICo7YCxcblx0XHRcdFx0XHRjaGFyc2V0OiBmYWxzZSxcblx0XHRcdFx0XHRvdXRwdXRTdHlsZTogJ2V4cGFuZGVkJyxcblx0XHRcdFx0XHQvKiogXHU1RjE1XHU1MTY1dmFyLnNjc3NcdTUxNjhcdTVDNDBcdTk4ODRcdTVCOUFcdTRFNDlcdTUzRDhcdTkxQ0YgKi9cblx0XHRcdFx0XHQvLyBtb2RpZnlWYXJzOiB7XG5cdFx0XHRcdFx0Ly8gXHQncHJpbWFyeS1jb2xvcic6ICcjMTg5MGZmJyxcblx0XHRcdFx0XHQvLyBcdCdmb250LXNpemUtYmFzZSc6ICcxNHB4Jyxcblx0XHRcdFx0XHQvLyB9LFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRzYXNzOiB7XG5cdFx0XHRcdFx0Y2hhcnNldDogZmFsc2UsXG5cdFx0XHRcdFx0b3V0cHV0U3R5bGU6ICdleHBhbmRlZCcsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGxlc3M6IHtcblx0XHRcdFx0XHQvLyBcdTY1MkZcdTYzMDFcdTUxODVcdTgwNTQgSmF2YVNjcmlwdFxuXHRcdFx0XHRcdGphdmFzY3JpcHRFbmFibGVkOiB0cnVlLCAvL1x1NkNFOFx1NjEwRlx1RkYwQ1x1OEZEOVx1NEUwMFx1NTNFNVx1NjYyRlx1NTcyOGxlc3NcdTVCRjlcdThDNjFcdTRFMkRcdUZGMENcdTUxOTlcdTU3MjhcdTU5MTZcdThGQjlcdTRFMERcdThENzdcdTRGNUNcdTc1Mjhcblx0XHRcdFx0XHQvLyBhZGRpdGlvbmFsRGF0YTogJ2ltcG9ydCBcIkAvYXNzZXRzL3N0eWxlcy9iYXNlLmxlc3NcIjsgaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL2Z1bmN0aW9uLmxlc3NcIjsnXG5cdFx0XHRcdFx0Ly8gbW9kaWZ5VmFyczp7IC8vXHU1NzI4XHU4RkQ5XHU5MUNDXHU4RkRCXHU4ODRDXHU0RTNCXHU5ODk4XHU3Njg0XHU0RkVFXHU2NTM5XHVGRjBDXHU1M0MyXHU4MDAzXHU1Qjk4XHU2NUI5XHU5MTREXHU3RjZFXHU1QzVFXHU2MDI3IC8vIG1vZGlmeVZhcnM6IHRoZW1lVmFyaWFibGVzLFxuXHRcdFx0XHRcdC8vICAgJ0BwcmltYXJ5LWNvbG9yJzogJyMxREE1N0EnLFxuXHRcdFx0XHRcdC8vIH0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0Ly8gcG9zdENzcyBcdTkxNERcdTdGNkVcblx0XHRcdHBvc3Rjc3M6IHtcblx0XHRcdFx0cGx1Z2luczogW1xuXHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdHBvc3Rjc3NQbHVnaW46ICdpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWwnLFxuXHRcdFx0XHRcdFx0QXRSdWxlOiB7XG5cdFx0XHRcdFx0XHRcdGNoYXJzZXQ6IGF0UnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGF0UnVsZS5uYW1lID09PSAnY2hhcnNldCcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGF0UnVsZS5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdF0sXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXHU5MTREXHU3RjZFIGNzcyBtb2R1bGVzIFx1NzY4NFx1ODg0Q1x1NEUzQVxuXHRcdFx0bW9kdWxlczoge1xuXHRcdFx0XHRsb2NhbHNDb252ZW50aW9uOiAnY2FtZWxDYXNlJyxcblx0XHRcdH0sXG5cdFx0fSxcblx0XHRyZXNvbHZlOiB7XG5cdFx0XHQvLyBcdTVCRkNcdTUxNjVcdTY1RjZcdTYwRjNcdTg5ODFcdTc3MDFcdTc1NjVcdTc2ODRcdTYyNjlcdTVDNTVcdTU0MERcdTUyMTdcdTg4Njhcblx0XHRcdGV4dGVuc2lvbnM6IFtcblx0XHRcdFx0Ly8gJy53YXNtJyxcblx0XHRcdFx0Jy5tanMnLFxuXHRcdFx0XHQnLmpzJyxcblx0XHRcdFx0Jy50cycsXG5cdFx0XHRcdCcuanN4Jyxcblx0XHRcdFx0Jy50c3gnLFxuXHRcdFx0XHQnLmpzb24nLFxuXHRcdFx0XHQnLmNzcycsXG5cdFx0XHRcdCcuc2NzcycsXG5cdFx0XHRcdCcubGVzcycsXG5cdFx0XHRcdCcucG5nJyxcblx0XHRcdFx0Jy5qcGcnLFxuXHRcdFx0XHQnLmpwZWcnLFxuXHRcdFx0XHQnLmdpZicsXG5cdFx0XHRcdCcuc3ZnJyxcblx0XHRcdF0sXG5cdFx0XHQvLyBcdTkxNERcdTdGNkVcdTUyMkJcdTU0MERcblx0XHRcdGFsaWFzOiBbXG5cdFx0XHRcdC8vIHtcblx0XHRcdFx0Ly8gXHRmaW5kOiAvXn4vLFxuXHRcdFx0XHQvLyBcdHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcdC8vIH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmaW5kOiAnQC8nLFxuXHRcdFx0XHRcdHJlcGxhY2VtZW50OiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjLycsIGltcG9ydC5tZXRhLnVybCkpLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0ZmluZDogL150ZXN0cy8sXG5cdFx0XHRcdFx0cmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi90ZXN0cycsIGltcG9ydC5tZXRhLnVybCkpLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHQvLyB7IGZpbmQ6IC9cXC8jLywgcmVwbGFjZW1lbnQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3R5cGVzJykgfVxuXHRcdFx0XSxcblx0XHRcdC8vIFx1NjBDNVx1NjY2Rlx1NUJGQ1x1NTFGQSBwYWNrYWdlLmpzb24gXHU5MTREXHU3RjZFXHU0RTJEXHU3Njg0ZXhwb3J0c1x1NUI1N1x1NkJCNVxuXHRcdFx0Ly8gY29uZGl0aW9uczogW10sXG5cdFx0fSxcblx0XHRzZXJ2ZXI6IHtcblx0XHRcdC8vIGJhc2U6ICcuLycsXG5cdFx0XHRmczoge1xuXHRcdFx0XHRzdHJpY3Q6IHRydWUsXG5cdFx0XHR9LFxuXHRcdFx0aG9zdDogJzAuMC4wLjAnLFxuXHRcdFx0Ly8gaG9zdDogdHJ1ZSwgLy8gXHU3NkQxXHU1NDJDXHU2MjQwXHU2NzA5XHU1NzMwXHU1NzQwXHVGRjBDXHU1MzA1XHU2MkVDXHU1QzQwXHU1N0RGXHU3RjUxXHU1NDhDXHU1MTZDXHU3RjUxXHU1NzMwXHU1NzQwIFwibG9jYWxob3N0XCIsXG5cdFx0XHRwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCwgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU3QUVGXHU1M0UzXG5cdFx0XHQvLyBodHRwczogZmFsc2UsIC8vXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4IGh0dHAgMlxuXHRcdFx0Ly8gZm9yY2U6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU1RjNBXHU1MjM2XHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXG5cdFx0XHRjb3JzOiB0cnVlLCAvLyBcdTRFM0FcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkUgQ09SUyAsIFx1OUVEOFx1OEJBNFx1NTQyRlx1NzUyOFx1NUU3Nlx1NTE0MVx1OEJCOFx1NEVGQlx1NEY1NVx1NkU5MFxuXHRcdFx0b3BlbjogdHJ1ZSwgLy9cdTY3MERcdTUyQTFcdTU0MkZcdTUyQThcdTY1RjZcdTgxRUFcdTUyQThcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTYyNTNcdTVGMDBcdTVFOTRcdTc1Mjhcblx0XHRcdHN0cmljdFBvcnQ6IGZhbHNlLCAvL1x1N0FFRlx1NTNFM1x1NEUyNVx1NjgzQ1x1NkEyMVx1NUYwRlx1RkYwQyBcdTRFM0F0cnVlXHU2NUY2XHVGRjBDXHU1RjUzXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHVGRjBDXHU0RTBEXHU0RjFBXHU1QzFEXHU4QkQ1XHU0RTBCXHU0RTAwXHU0RTJBXHU1M0VGXHU3NTI4XHU3QUVGXHU1M0UzXG5cdFx0XHQvL0hNUlx1OEZERVx1NjNBNVx1OTE0RFx1N0Y2RXt9LCBmYWxzZS1cdTc5ODFcdTc1Mjhcblx0XHRcdGhtcjoge1xuXHRcdFx0XHQvLyBob3N0OiAnbG9jYWxob3N0J1xuXHRcdFx0XHQvLyBvdmVybGF5OiB0cnVlLCAvLyBcdThCQkVcdTRFM0F0cnVlXHU0RjFBXHU1QkZDXHU4MUY0XHU3MEVEXHU2NkY0XHU2NUIwXHU5MDFGXHU1RUE2XHU2MTYyXG5cdFx0XHRcdHBvcnQ6IHZpdGVFbnYuVklURV9QT1JULFxuXHRcdFx0fSxcblx0XHRcdC8vIFx1NEYyMFx1OTAxMlx1N0VEOSBjaG9ja2lkYXIgXHU3Njg0XHU2NTg3XHU0RUY2XHU3Q0ZCXHU3RURGXHU3NkQxXHU4OUM2XHU1NjY4XHU5MDA5XHU5ODc5XG5cdFx0XHR3YXRjaDoge1xuXHRcdFx0XHQvLyBpZ25vcmVkOltcIiEqKi9ub2RlX21vZHVsZXMveW91ci1wYWNrYWdlLW5hbWUvKipcIl0sXG5cdFx0XHRcdHVzZVBvbGxpbmc6IHRydWUsIC8vIFx1NEZFRVx1NTkwREhNUlx1NzBFRFx1NjZGNFx1NjVCMFx1NTkzMVx1NjU0OFxuXHRcdFx0fSxcblx0XHR9LFxuXG5cdFx0YnVpbGQ6IHtcblx0XHRcdC8vIFx1Njc4NFx1NUVGQVx1NTQwRVx1NjYyRlx1NTQyNlx1NzUxRlx1NjIxMCBzb3VyY2UgbWFwIFx1NjU4N1x1NEVGNlxuXHRcdFx0c291cmNlbWFwOiB0cnVlLFxuXHRcdFx0Ly9cdTVGNTNcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZVx1RkYwQ1x1Njc4NFx1NUVGQVx1NTQwRVx1NUMwNlx1NEYxQVx1NzUxRlx1NjIxMCBtYW5pZmVzdC5qc29uIFx1NjU4N1x1NEVGNlxuXHRcdFx0bWFuaWZlc3Q6IGZhbHNlLFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBcdTYzMDdcdTVCOUFcdTRGN0ZcdTc1MjhcdTZERjdcdTZEQzZcdTU2Njg6IGJvb2xlYW4gfCAndGVyc2VyJyB8ICdlc2J1aWxkJ1xuXHRcdFx0ICogXHU4QkJFXHU3RjZFXHU0RTNBIGZhbHNlIFx1NTNFRlx1NEVFNVx1Nzk4MVx1NzUyOFx1NjcwMFx1NUMwRlx1NTMxNlx1NkRGN1x1NkRDNlxuXHRcdFx0ICovXG5cdFx0XHRtaW5pZnk6ICdlc2J1aWxkJywgLy8gdGVyc2VyIFx1Njc4NFx1NUVGQVx1NTQwRVx1NjU4N1x1NEVGNlx1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRlxuXHRcdFx0Ly9cdTRGMjBcdTkwMTJcdTdFRDkgVGVyc2VyIFx1NzY4NFx1NjZGNFx1NTkxQSBtaW5pZnkgXHU5MDA5XHU5ODc5XHUzMDAyXG5cdFx0XHR0ZXJzZXJPcHRpb25zOiB7XG5cdFx0XHRcdGNvbXByZXNzOiB7XG5cdFx0XHRcdFx0ZHJvcF9jb25zb2xlOiB0cnVlLFxuXHRcdFx0XHRcdGRyb3BfZGVidWdnZXI6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHR9LFxuXHRcdFx0Ly9cdTZENEZcdTg5QzhcdTU2NjhcdTUxN0NcdTVCQjlcdTYwMjcgIFwiZXNuZXh0XCJ8XCJtb2R1bGVzXCJcblx0XHRcdHRhcmdldDogWydlc25leHQnLCAnZWRnZTg4JywgJ2ZpcmVmb3g3OCcsICdjaHJvbWU1MicsICdzYWZhcmkxMy4xJywgJ2llMTEnXSxcblx0XHRcdGNzc1RhcmdldDogWydlc25leHQnLCAnZWRnZTg4JywgJ2ZpcmVmb3g3OCcsICdjaHJvbWU1MicsICdzYWZhcmkxMy4xJywgJ2llMTEnXSxcblx0XHRcdC8vXHU2MzA3XHU1QjlBXHU4RjkzXHU1MUZBXHU4REVGXHU1Rjg0XG5cdFx0XHRvdXREaXI6IHZpdGVFbnYuVklURV9PVVRQVVRfRElSLFxuXHRcdFx0Ly8gXHU2MzA3XHU1QjlBXHU3NTFGXHU2MjEwXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU3Njg0XHU1QjU4XHU2NTNFXHU4REVGXHU1Rjg0XG5cdFx0XHRhc3NldHNEaXI6ICdzdGF0aWMnLFxuXHRcdFx0Ly9cdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IENTUyBcdTRFRTNcdTc4MDFcdTYyQzZcdTUyMDZcblx0XHRcdGNzc0NvZGVTcGxpdDogdHJ1ZSxcblx0XHRcdC8vIFx1NUMwRlx1NEU4RVx1NkI2NFx1OTYwOFx1NTAzQ1x1NzY4NFx1NUJGQ1x1NTE2NVx1NjIxNlx1NUYxNVx1NzUyOFx1OEQ0NFx1NkU5MFx1NUMwNlx1NTE4NVx1ODA1NFx1NEUzQSBiYXNlNjQgXHU3RjE2XHU3ODAxXHVGRjBDXHU0RUU1XHU5MDdGXHU1MTREXHU5ODlEXHU1OTE2XHU3Njg0IGh0dHAgXHU4QkY3XHU2QzQyXHUzMDAyXHU4QkJFXHU3RjZFXHU0RTNBIDAgXHU1M0VGXHU0RUU1XHU1QjhDXHU1MTY4XHU3OTgxXHU3NTI4XHU2QjY0XHU5ODc5XG5cdFx0XHRhc3NldHNJbmxpbmVMaW1pdDogNDA5Nixcblx0XHRcdC8vXHU4MUVBXHU1QjlBXHU0RTQ5XHU1RTk1XHU1QzQyXHU3Njg0IFJvbGx1cCBcdTYyNTNcdTUzMDVcdTkxNERcdTdGNkVcblx0XHRcdHJvbGx1cE9wdGlvbnM6IHtcblx0XHRcdFx0Ly8gbWFrZSBzdXJlIHRvIGV4dGVybmFsaXplIGRlcHMgdGhhdCBzaG91bGRuJ3QgYmUgYnVuZGxlZFxuXHRcdFx0XHQvLyBpbnRvIHlvdXIgbGlicmFyeVxuXHRcdFx0XHRleHRlcm5hbDogWyd2dWUnLCAndnVlLXJvdXRlcicsICdwaW5pYSddLFxuXHRcdFx0XHR0cmVlc2hha2U6IHRydWUsXG5cdFx0XHRcdG91dHB1dDoge1xuXHRcdFx0XHRcdC8vIFByb3ZpZGUgZ2xvYmFsIHZhcmlhYmxlcyB0byB1c2UgaW4gdGhlIFVNRCBidWlsZFxuXHRcdFx0XHRcdC8vIGZvciBleHRlcm5hbGl6ZWQgZGVwc1xuXHRcdFx0XHRcdGV4cG9ydHM6ICduYW1lZCcsXG5cdFx0XHRcdFx0Z2xvYmFsczoge1xuXHRcdFx0XHRcdFx0dnVlOiAnVnVlJyxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdC8vIGNodW5rRmlsZU5hbWVzOiAnc3RhdGljL2pzMS9bbmFtZV0tW2hhc2hdLmpzJyxcblx0XHRcdFx0XHQvLyBlbnRyeUZpbGVOYW1lczogJ3N0YXRpYy9qczIvW25hbWVdLVtoYXNoXS5qcycsXG5cdFx0XHRcdFx0Ly8gYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIHRhcmdldDogJ2VzbmV4dCcsXG5cdFx0XHRcdC8vIG1pbmlmeTogJ2VzYnVpbGQnLCAvLyBcdTZERjdcdTZEQzZcdTU2NjhcdUZGMEN0ZXJzZXJcdTY3ODRcdTVFRkFcdTU0MEVcdTY1ODdcdTRFRjZcdTRGNTNcdTc5RUZcdTY2RjRcdTVDMEZcblx0XHRcdH0sXG5cblx0XHRcdC8vIEByb2xsdXAvcGx1Z2luLWNvbW1vbmpzIFx1NjNEMlx1NEVGNlx1NzY4NFx1OTAwOVx1OTg3OVxuXHRcdFx0Y29tbW9uanNPcHRpb25zOiB7XG5cdFx0XHRcdGluY2x1ZGU6IFsvbm9kZV9tb2R1bGVzL10sIC8vIC9qZXN0X3RyYW5zZm9ybS8sXG5cdFx0XHR9LFxuXHRcdFx0Ly8gXHU1NDJGXHU3NTI4L1x1Nzk4MVx1NzUyOCBnemlwIFx1NTM4Qlx1N0YyOVx1NTkyN1x1NUMwRlx1NjJBNVx1NTQ0QVx1MzAwMlx1NTM4Qlx1N0YyOVx1NTkyN1x1NTc4Qlx1OEY5M1x1NTFGQVx1NjU4N1x1NEVGNlx1NTNFRlx1ODBGRFx1NEYxQVx1NUY4OFx1NjE2Mlx1RkYwQ1x1NTZFMFx1NkI2NFx1Nzk4MVx1NzUyOFx1OEJFNVx1NTI5Rlx1ODBGRFx1NTNFRlx1ODBGRFx1NEYxQVx1NjNEMFx1OUFEOFx1NTkyN1x1NTc4Qlx1OTg3OVx1NzZFRVx1NzY4NFx1Njc4NFx1NUVGQVx1NjAyN1x1ODBGRFxuXHRcdFx0cmVwb3J0Q29tcHJlc3NlZFNpemU6IHRydWUsXG5cdFx0XHQvL2NodW5rIFx1NTkyN1x1NUMwRlx1OEI2Nlx1NTQ0QVx1NzY4NFx1OTY1MFx1NTIzNlxuXHRcdFx0Y2h1bmtTaXplV2FybmluZ0xpbWl0OiA1MDAsXG5cdFx0XHQvLyBcdThCQkVcdTdGNkVcdTRFM0EgZmFsc2UgXHU2NzY1XHU3OTgxXHU3NTI4XHU1QzA2XHU2Nzg0XHU1RUZBXHU1NDBFXHU3Njg0XHU2NTg3XHU0RUY2XHU1MTk5XHU1MTY1XHU3OEMxXHU3NkQ4XG5cdFx0XHR3cml0ZTogdHJ1ZSxcblx0XHRcdC8vXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDXHU4MkU1IG91dERpciBcdTU3Mjggcm9vdCBcdTc2RUVcdTVGNTVcdTRFMEJcdUZGMENcdTUyMTkgVml0ZSBcdTRGMUFcdTU3MjhcdTY3ODRcdTVFRkFcdTY1RjZcdTZFMDVcdTdBN0FcdThCRTVcdTc2RUVcdTVGNTVcdTMwMDJcblx0XHRcdGVtcHR5T3V0RGlyOiB0cnVlLFxuXHRcdFx0LyoqIFx1Njc4NFx1NUVGQVx1NEUzQVx1NUU5M1xuXHRcdFx0ICogXHU1OTgyXHU2NzlDXHU0RjYwXHU2MzA3XHU1QjlBXHU0RTg2IGJ1aWxkLmxpYlx1RkYwQ1x1OTBBM1x1NEU0OCBidWlsZC5hc3NldHNJbmxpbmVMaW1pdCBcdTVDMDZcdTg4QUJcdTVGRkRcdTc1NjVcblx0XHRcdCAqIFx1NjVFMFx1OEJCQVx1NjU4N1x1NEVGNlx1NTkyN1x1NUMwRlx1NjIxNlx1NjYyRlx1NTQyNlx1NEUzQSBHaXQgTEZTIFx1NTM2MFx1NEY0RFx1N0IyNlx1RkYwQ1x1OEQ0NFx1NkU5MFx1OTBGRFx1NEYxQVx1ODhBQlx1NTE4NVx1ODA1NFx1MzAwMlxuXHRcdFx0ICogKi9cblx0XHRcdGxpYjogZmFsc2UsXG5cdFx0XHRzc3I6IGZhbHNlLFxuXHRcdFx0c3NyTWFuaWZlc3Q6IGZhbHNlLFxuXHRcdFx0d2F0Y2g6IG51bGwsXG5cdFx0XHRkeW5hbWljSW1wb3J0VmFyc09wdGlvbnM6IHsgd2Fybk9uRXJyb3I6IHRydWUsIGV4Y2x1ZGU6IFtdIH0sXG5cdFx0fSxcblx0XHRwcmV2aWV3OiB7XG5cdFx0XHRwb3J0OiB2aXRlRW52LlZJVEVfUE9SVCwgLy8gXHU5ODg0XHU4OUM4XHU2NzBEXHU1MkExXHU1NjY4XHU3QUVGXHU1M0UzXG5cdFx0XHRob3N0OiB0cnVlLCAvLyBcdTc2RDFcdTU0MkNcdTYyNDBcdTY3MDlcdTU3MzBcdTU3NDBcdUZGMENcdTUzMDVcdTYyRUNcdTVDNDBcdTU3REZcdTdGNTFcdTU0OENcdTUxNkNcdTdGNTFcdTU3MzBcdTU3NDBcblx0XHRcdHN0cmljdFBvcnQ6IHRydWUsIC8vIFx1N0FFRlx1NTNFM1x1ODhBQlx1NTM2MFx1NzUyOFx1NjVGNlx1RkYwQ1x1NjI5Qlx1NTFGQVx1OTUxOVx1OEJFRlxuXHRcdH0sXG5cdH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFksU0FBUyxjQUFjLGVBQWU7QUFDaGIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFP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
