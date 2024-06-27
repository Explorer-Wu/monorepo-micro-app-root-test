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
import { createSvgIconsPlugin } from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@5.2.6/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { fileURLToPath, URL } from "node:url";
import path from "path";
import Unocss from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unocss@0.58.6_postcss@8.4.38_rollup@2.79.1_vite@5.2.6/node_modules/unocss/dist/vite.mjs";
import {
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/node_modules/.pnpm/unocss@0.58.6_postcss@8.4.38_rollup@2.79.1_vite@5.2.6/node_modules/unocss/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/sub-apps/vitest-vue3-ts-el-app";
var __vite_injected_original_import_meta_url = "file:///Users/wuwenhan/WorkPlace/monorepo-micro-app-root-test/sub-apps/vitest-vue3-ts-el-app/vite.config.ts";
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
      // vue(),
      vue({
        include: [/\.vue$/, /\.md$/],
        template: {
          compilerOptions: {
            isCustomElement: (tag) => /^micro-app/.test(tag)
          }
        }
      }),
      // vueJsx({
      //   mergeProps: false,
      //   enableObjectSlots: false,
      // }),
      vueJsx(),
      // vueI18n({
      //   include: resolve('./src/locales/**'),
      //   runtimeOnly: false
      // })
      AutoImport({
        resolvers: [
          ElementPlusResolver({
            // 关键：自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage，ElNotification等组件时默认的主题色会覆盖自定义的主题色
            importStyle: "sass"
          }),
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
          // /\.(s?c|le)ss$/,
          /\.md$/
          // .md
        ],
        // // global imports to register
        imports: [
          // presets
          "vue",
          // 'vue/macros',
          "@vueuse/core",
          "vue-router",
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
        ignore: ["useFetch"],
        dts: "./types/auto-imports.d.ts"
      }),
      Components({
        // allow auto load markdown components under `./src/components/`
        extensions: ["vue", "md"],
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        // /\.(s?c|le)ss$/,
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver({
            // 关键：自动引入修改主题色添加这一行，使用预处理样式
            importStyle: "sass"
          }),
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
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [fileURLToPath(new URL("./src/assets/images/icons", __vite_injected_original_import_meta_url))],
        // 指定symbolId格式
        symbolId: "icon-[dir]-[name]"
      }),
      // https://github.com/antfu/unocss
      // see unocss.config.ts for config
      Unocss({
        presets: [
          presetUno(),
          presetAttributify(),
          presetIcons({
            scale: 1.2,
            warn: true
          })
        ],
        transformers: [transformerDirectives(), transformerVariantGroup()]
      }),
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
          // 全局引入
          additionalData: `@use "@/assets/styles/main/normalize.scss" as *;@use "@/assets/styles/main/function.scss" as *;@use "@/assets/styles/theme/index.scss" as *;`
          // charset: false,
          // outputStyle: 'expanded',
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
            /**
             * postcss给含有中文的scss 加了个@charset:UTF-8;
             * element-plus的index.css文件包含@charset:UTF-8
             * 在组合css时@charset的位置并不是在头部(或最前面)，同时本地scss如果有中文也会自动添加@charset:UTF-8
             * 因此build时就会warning提示错误了
             **/
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
      port: +viteEnv.VITE_PORT,
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
        port: +viteEnv.VITE_PORT
      },
      // 传递给 chockidar 的文件系统监视器选项
      watch: {
        // ignored:["!**/node_modules/your-package-name/**"],
        usePolling: true
        // 修复HMR热更新失效
      }
      // 被监听的包必须被排除在优化之外，
      // 以便它能出现在依赖关系图中并触发热更新。
      // optimizeDeps: {
      //   exclude: ['your-package-name'],
      // },
      // 反向代理配置
      // proxy: (() => {
      //   const proxyPath = [
      //     '/api',
      //     '/mock'
      //     // '/socket.io'
      //   ]
      //   const proxyConfig = {}
      //   for (const item of proxyPath) {
      //     const regExp = new RegExp(`^\${item}`) // ,'g'
      //     proxyConfig[item] = {
      //       target: env.APP_API_BASE_URL,
      //       // logLevel: 'debug', // 查看代理请求的真实地址
      //       changeOrigin: true,
      //       rewrite: (path) => path.replace(regExp, '/'),
      //       cookieDomainRewrite: '',
      //       secure: false
      //     }
      //   }
      //   // console.log('proxyConfig:', proxyConfig);
      //   return proxyConfig
      // })()
      // proxy: {
      // Using the proxy instance
      // '/api': {
      //   target: 'http://jsonplaceholder.typicode.com',
      //   changeOrigin: true,
      //   configure: (proxy, options) => {
      //     // proxy will be an instance of 'http-proxy'
      //   }
      // },
      // // Proxying websockets or socket.io
      // '/socket.io': {
      //   target: 'ws://localhost:3000',
      //   ws: true
      // }
      // },
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
      port: +viteEnv.VITE_PORT,
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd3V3ZW5oYW4vV29ya1BsYWNlL21vbm9yZXBvLW1pY3JvLWFwcC1yb290LXRlc3Qvc3ViLWFwcHMvdml0ZXN0LXZ1ZTMtdHMtZWwtYXBwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvd3V3ZW5oYW4vV29ya1BsYWNlL21vbm9yZXBvLW1pY3JvLWFwcC1yb290LXRlc3Qvc3ViLWFwcHMvdml0ZXN0LXZ1ZTMtdHMtZWwtYXBwL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy93dXdlbmhhbi9Xb3JrUGxhY2UvbW9ub3JlcG8tbWljcm8tYXBwLXJvb3QtdGVzdC9zdWItYXBwcy92aXRlc3QtdnVlMy10cy1lbC1hcHAvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyB0eXBlIENvbmZpZ0VudiwgdHlwZSBVc2VyQ29uZmlnLCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJztcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJztcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCc7XG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJztcbmltcG9ydCBDb21wb25lbnRzIGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3ZpdGUnO1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycyc7XG5pbXBvcnQgSWNvbnMgZnJvbSAndW5wbHVnaW4taWNvbnMvdml0ZSc7XG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcic7XG5pbXBvcnQgSW5zcGVjdCBmcm9tICd2aXRlLXBsdWdpbi1pbnNwZWN0JztcbmltcG9ydCBsZWdhY3kgZnJvbSAnQHZpdGVqcy9wbHVnaW4tbGVnYWN5JztcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gJ25vZGU6dXJsJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgVW5vY3NzIGZyb20gJ3Vub2Nzcy92aXRlJztcbmltcG9ydCB7XG5cdHByZXNldEF0dHJpYnV0aWZ5LFxuXHRwcmVzZXRJY29ucyxcblx0cHJlc2V0VW5vLFxuXHR0cmFuc2Zvcm1lckRpcmVjdGl2ZXMsXG5cdHRyYW5zZm9ybWVyVmFyaWFudEdyb3VwLFxufSBmcm9tICd1bm9jc3MnO1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XG5cdGNvbnN0IHZpdGVFbnYgPSBsb2FkRW52KG1vZGUsIHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL2VudicpLCBbJ1ZJVEVfJywgJ0FQUF8nXSk7XG5cdGNvbnN0IGlzUHJvZCA9IFsncHJvZHVjdGlvbicsICdzdGFnaW5nJywgJ3Rlc3RpbmcnXS5pbmNsdWRlcyh2aXRlRW52LlZJVEVfTk9ERV9FTlYpO1xuXHRjb25zb2xlLmxvZygnc3ViLXZ1ZTMtQVBQX0JBU0VfUk9VVEVSJywgdml0ZUVudik7XG5cdHJldHVybiB7XG5cdFx0YmFzZTogYCR7dml0ZUVudi5BUFBfQkFTRV9ST1VURVJ9YCwgLy8gc3VidnVlMy9cblx0XHQvL1x1OTc1OVx1NjAwMVx1OEQ0NFx1NkU5MFx1NjcwRFx1NTJBMVx1NzY4NFx1NjU4N1x1NEVGNlx1NTkzOVxuXHRcdHB1YmxpY0RpcjogJ3B1YmxpYycsXG5cdFx0Ly8gXHU3M0FGXHU1ODgzXHU1M0Q4XHU5MUNGXHU4QkJFXHU3RjZFXHU2MjQwXHU1NzI4XHU2NTg3XHU0RUY2XHU1OTM5XHU4REVGXHU1Rjg0XG5cdFx0ZW52RGlyOiAnLi9lbnYnLFxuXHRcdGVudlByZWZpeDogWydWSVRFXycsICdBUFBfJ10sXG5cdFx0Ly8gXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1OTA0XHU3NDA2XG5cdFx0Ly8gYXNzZXRzSW5jbHVkZTogJycsXG5cdFx0Ly9cdTYzQTdcdTUyMzZcdTUzRjBcdThGOTNcdTUxRkFcdTc2ODRcdTdFQTdcdTUyMkIgaW5mbyBcdTMwMDF3YXJuXHUzMDAxZXJyb3JcdTMwMDFzaWxlbnRcblx0XHRsb2dMZXZlbDogJ2luZm8nLFxuXHRcdC8vIFx1OEJCRVx1NEUzQWZhbHNlIFx1NTNFRlx1NEVFNVx1OTA3Rlx1NTE0RCB2aXRlIFx1NkUwNVx1NUM0Rlx1ODAwQ1x1OTUxOVx1OEZDN1x1NTcyOFx1N0VDOFx1N0FFRlx1NEUyRFx1NjI1M1x1NTM3MFx1NjdEMFx1NEU5Qlx1NTE3M1x1OTUyRVx1NEZFMVx1NjA2RlxuXHRcdGNsZWFyU2NyZWVuOiBmYWxzZSxcblx0XHQvLyBcdTVGM0FcdTUyMzZcdTk4ODRcdTY3ODRcdTVFRkFcdTYzRDJcdTRFRjZcdTUzMDVcblx0XHRvcHRpbWl6ZURlcHM6IHtcblx0XHRcdC8vXHU2OEMwXHU2RDRCXHU5NzAwXHU4OTgxXHU5ODg0XHU2Nzg0XHU1RUZBXHU3Njg0XHU0RjlEXHU4RDU2XHU5ODc5XG5cdFx0XHQvLyBlbnRyaWVzOiBbXSxcblx0XHRcdC8vXHU5RUQ4XHU4QkE0XHU2MEM1XHU1MUI1XHU0RTBCXHVGRjBDXHU0RTBEXHU1NzI4IG5vZGVfbW9kdWxlcyBcdTRFMkRcdTc2ODRcdUZGMENcdTk0RkVcdTYzQTVcdTc2ODRcdTUzMDVcdTRFMERcdTRGMUFcdTk4ODRcdTY3ODRcdTVFRkFcblx0XHRcdC8vIGluY2x1ZGU6IFsnYXhpb3MnXSxcblx0XHRcdGluY2x1ZGU6IFtcblx0XHRcdFx0J2VzbS1kZXAgPiBjanMtZGVwJyxcblx0XHRcdFx0J2F4aW9zJyxcblx0XHRcdFx0J2xvZGFzaC1lcycsXG5cdFx0XHRcdCdkYXlqcycsXG5cdFx0XHRcdCd2dWUnLFxuXHRcdFx0XHQndnVlLXJvdXRlcicsXG5cdFx0XHRcdCd2dWUtaTE4bicsXG5cdFx0XHRcdC8vICdhc3luYy12YWxpZGF0b3InLFxuXHRcdFx0XSxcblx0XHRcdC8vIGV4Y2x1ZGU6IFsneW91ci1wYWNrYWdlLW5hbWUnXSAvL1x1NjM5Mlx1OTY2NFx1NTcyOFx1NEYxOFx1NTMxNlx1NEU0Qlx1NTkxNlxuXHRcdH0sXG5cdFx0cGx1Z2luczogW1xuXHRcdFx0Ly8gdnVlKCksXG5cdFx0XHR2dWUoe1xuXHRcdFx0XHRpbmNsdWRlOiBbL1xcLnZ1ZSQvLCAvXFwubWQkL10sXG5cdFx0XHRcdHRlbXBsYXRlOiB7XG5cdFx0XHRcdFx0Y29tcGlsZXJPcHRpb25zOiB7XG5cdFx0XHRcdFx0XHRpc0N1c3RvbUVsZW1lbnQ6IHRhZyA9PiAvXm1pY3JvLWFwcC8udGVzdCh0YWcpLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0sXG5cdFx0XHR9KSxcblx0XHRcdC8vIHZ1ZUpzeCh7XG5cdFx0XHQvLyAgIG1lcmdlUHJvcHM6IGZhbHNlLFxuXHRcdFx0Ly8gICBlbmFibGVPYmplY3RTbG90czogZmFsc2UsXG5cdFx0XHQvLyB9KSxcblx0XHRcdHZ1ZUpzeCgpLFxuXHRcdFx0Ly8gdnVlSTE4bih7XG5cdFx0XHQvLyAgIGluY2x1ZGU6IHJlc29sdmUoJy4vc3JjL2xvY2FsZXMvKionKSxcblx0XHRcdC8vICAgcnVudGltZU9ubHk6IGZhbHNlXG5cdFx0XHQvLyB9KVxuXHRcdFx0QXV0b0ltcG9ydCh7XG5cdFx0XHRcdHJlc29sdmVyczogW1xuXHRcdFx0XHRcdEVsZW1lbnRQbHVzUmVzb2x2ZXIoe1xuXHRcdFx0XHRcdFx0Ly8gXHU1MTczXHU5NTJFXHVGRjFBXHU4MUVBXHU1MkE4XHU1RjE1XHU1MTY1XHU0RkVFXHU2NTM5XHU0RTNCXHU5ODk4XHU4MjcyXHU2REZCXHU1MkEwXHU4RkQ5XHU0RTAwXHU4ODRDXHVGRjBDXHU0RjdGXHU3NTI4XHU5ODg0XHU1OTA0XHU3NDA2XHU2ODM3XHU1RjBGXHVGRjBDXHU0RTBEXHU2REZCXHU1MkEwXHU1QzA2XHU0RjFBXHU1QkZDXHU4MUY0XHU0RjdGXHU3NTI4RWxNZXNzYWdlXHVGRjBDRWxOb3RpZmljYXRpb25cdTdCNDlcdTdFQzRcdTRFRjZcdTY1RjZcdTlFRDhcdThCQTRcdTc2ODRcdTRFM0JcdTk4OThcdTgyNzJcdTRGMUFcdTg5ODZcdTc2RDZcdTgxRUFcdTVCOUFcdTRFNDlcdTc2ODRcdTRFM0JcdTk4OThcdTgyNzJcblx0XHRcdFx0XHRcdGltcG9ydFN0eWxlOiAnc2FzcycsXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdFx0Ly8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU1NkZFXHU2ODA3XHU3RUM0XHU0RUY2XG5cdFx0XHRcdFx0Ly8gSWNvbnNSZXNvbHZlcigpLFxuXHRcdFx0XHRcdEljb25zUmVzb2x2ZXIoe1xuXHRcdFx0XHRcdFx0cHJlZml4OiAnSScsXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdF0sXG5cdFx0XHRcdGluY2x1ZGU6IFtcblx0XHRcdFx0XHQvXFwuW3RqXXN4PyQvLCAvLyAudHMsIC50c3gsIC5qcywgLmpzeFxuXHRcdFx0XHRcdC9cXC52dWUkLyxcblx0XHRcdFx0XHQvXFwudnVlXFw/dnVlLywgLy8gLnZ1ZVxuXHRcdFx0XHRcdC8vIC9cXC4ocz9jfGxlKXNzJC8sXG5cdFx0XHRcdFx0L1xcLm1kJC8sIC8vIC5tZFxuXHRcdFx0XHRdLFxuXHRcdFx0XHQvLyAvLyBnbG9iYWwgaW1wb3J0cyB0byByZWdpc3RlclxuXHRcdFx0XHRpbXBvcnRzOiBbXG5cdFx0XHRcdFx0Ly8gcHJlc2V0c1xuXHRcdFx0XHRcdCd2dWUnLFxuXHRcdFx0XHRcdC8vICd2dWUvbWFjcm9zJyxcblx0XHRcdFx0XHQnQHZ1ZXVzZS9jb3JlJyxcblx0XHRcdFx0XHQndnVlLXJvdXRlcicsXG5cdFx0XHRcdFx0J3BpbmlhJyxcblx0XHRcdFx0XHQndnVlLWkxOG4nLFxuXHRcdFx0XHRcdC8vIGN1c3RvbVxuXHRcdFx0XHRcdC8vIHtcblx0XHRcdFx0XHQvLyBcdCdAdnVldXNlL2NvcmUnOiBbXG5cdFx0XHRcdFx0Ly8gXHRcdC8vIG5hbWVkIGltcG9ydHNcblx0XHRcdFx0XHQvLyBcdFx0J3VzZU1vdXNlJywgLy8gaW1wb3J0IHsgdXNlTW91c2UgfSBmcm9tICdAdnVldXNlL2NvcmUnLFxuXHRcdFx0XHRcdC8vIFx0XHQvLyBhbGlhc1xuXHRcdFx0XHRcdC8vIFx0XHQvLyBbJ3VzZUZldGNoJywgJ3VzZU15RmV0Y2gnXSwgLy8gaW1wb3J0IHsgdXNlRmV0Y2ggYXMgdXNlTXlGZXRjaCB9IGZyb20gJ0B2dWV1c2UvY29yZScsXG5cdFx0XHRcdFx0Ly8gXHRdLFxuXHRcdFx0XHRcdC8vIFx0Ly8gYXhpb3M6IFsgLy8gXHU1REYyXHU3RUNGXHU1QzAxXHU4OEM1XHU0RTg2XHU1RTkzXHVGRjBDXHU0RTBEXHU0RjdGXHU3NTI4XG5cdFx0XHRcdFx0Ly8gXHQvLyBcdC8vIGRlZmF1bHQgaW1wb3J0c1xuXHRcdFx0XHRcdC8vIFx0Ly8gXHRbJ2RlZmF1bHQnLCAnYXhpb3MnXSwgLy8gaW1wb3J0IHsgZGVmYXVsdCBhcyBheGlvcyB9IGZyb20gJ2F4aW9zJyxcblx0XHRcdFx0XHQvLyBcdC8vIF0sXG5cdFx0XHRcdFx0Ly8gXHQnW3BhY2thZ2UtbmFtZV0nOiBbXG5cdFx0XHRcdFx0Ly8gXHRcdCdbaW1wb3J0LW5hbWVzXScsXG5cdFx0XHRcdFx0Ly8gXHRcdC8vIGFsaWFzXG5cdFx0XHRcdFx0Ly8gXHRcdFsnW2Zyb21dJywgJ1thbGlhc10nXSxcblx0XHRcdFx0XHQvLyBcdF0sXG5cdFx0XHRcdFx0Ly8gfSxcblx0XHRcdFx0XHQvLyBleGFtcGxlIHR5cGUgaW1wb3J0XG5cdFx0XHRcdFx0Ly8ge1xuXHRcdFx0XHRcdC8vIFx0ZnJvbTogJ3Z1ZS1yb3V0ZXInLFxuXHRcdFx0XHRcdC8vIFx0aW1wb3J0czogWydSb3V0ZUxvY2F0aW9uUmF3J10sXG5cdFx0XHRcdFx0Ly8gXHR0eXBlOiB0cnVlLFxuXHRcdFx0XHRcdC8vIH0sXG5cdFx0XHRcdF0sXG5cdFx0XHRcdC8vIC8vIEFycmF5IG9mIHN0cmluZ3Mgb2YgcmVnZXhlcyB0aGF0IGNvbnRhaW5zIGltcG9ydHMgbWVhbnQgdG8gYmUgZmlsdGVyZWQgb3V0LlxuXHRcdFx0XHRpZ25vcmU6IFsndXNlRmV0Y2gnXSxcblx0XHRcdFx0ZHRzOiAnLi90eXBlcy9hdXRvLWltcG9ydHMuZC50cycsXG5cdFx0XHR9KSxcblx0XHRcdENvbXBvbmVudHMoe1xuXHRcdFx0XHQvLyBhbGxvdyBhdXRvIGxvYWQgbWFya2Rvd24gY29tcG9uZW50cyB1bmRlciBgLi9zcmMvY29tcG9uZW50cy9gXG5cdFx0XHRcdGV4dGVuc2lvbnM6IFsndnVlJywgJ21kJ10sXG5cdFx0XHRcdC8vIGFsbG93IGF1dG8gaW1wb3J0IGFuZCByZWdpc3RlciBjb21wb25lbnRzIHVzZWQgaW4gbWFya2Rvd25cblx0XHRcdFx0aW5jbHVkZTogWy9cXC52dWUkLywgL1xcLnZ1ZVxcP3Z1ZS8sIC9cXC5tZCQvXSwgLy8gL1xcLihzP2N8bGUpc3MkLyxcblx0XHRcdFx0cmVzb2x2ZXJzOiBbXG5cdFx0XHRcdFx0Ly8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1IEVsZW1lbnQgUGx1cyBcdTdFQzRcdTRFRjZcblx0XHRcdFx0XHRFbGVtZW50UGx1c1Jlc29sdmVyKHtcblx0XHRcdFx0XHRcdC8vIFx1NTE3M1x1OTUyRVx1RkYxQVx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1NEZFRVx1NjUzOVx1NEUzQlx1OTg5OFx1ODI3Mlx1NkRGQlx1NTJBMFx1OEZEOVx1NEUwMFx1ODg0Q1x1RkYwQ1x1NEY3Rlx1NzUyOFx1OTg4NFx1NTkwNFx1NzQwNlx1NjgzN1x1NUYwRlxuXHRcdFx0XHRcdFx0aW1wb3J0U3R5bGU6ICdzYXNzJyxcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHQvLyBcdTgxRUFcdTUyQThcdTZDRThcdTUxOENcdTU2RkVcdTY4MDdcdTdFQzRcdTRFRjZcblx0XHRcdFx0XHQvLyBJY29uc1Jlc29sdmVyKCksXG5cdFx0XHRcdFx0SWNvbnNSZXNvbHZlcih7XG5cdFx0XHRcdFx0XHQvLyBwcmVmaXg6IGZhbHNlLCBcdThGRDlcdTY4MzdcdThCQkVcdTdGNkVcdTRFMERcdTg4NENcblx0XHRcdFx0XHRcdC8vIGFsaWFzOiB7XG5cdFx0XHRcdFx0XHQvLyBcdGVwOiAnaWNvbi1lcCcsXG5cdFx0XHRcdFx0XHQvLyB9LFxuXHRcdFx0XHRcdFx0ZW5hYmxlZENvbGxlY3Rpb25zOiBbJ2VwJ10sXG5cdFx0XHRcdFx0fSksXG5cdFx0XHRcdF0sXG5cblx0XHRcdFx0ZHRzOiAnLi90eXBlcy9jb21wb25lbnRzLmQudHMnLFxuXHRcdFx0fSksXG5cdFx0XHRJY29ucyh7XG5cdFx0XHRcdC8vIGNvbXBpbGVyOiAndnVlMycsXG5cdFx0XHRcdGF1dG9JbnN0YWxsOiB0cnVlLFxuXHRcdFx0fSksXG5cblx0XHRcdGxlZ2FjeSh7XG5cdFx0XHRcdC8vIFx1OTcwMFx1ODk4MVx1NTE3Q1x1NUJCOVx1NzY4NFx1NzZFRVx1NjgwN1x1NTIxN1x1ODg2OFxuXHRcdFx0XHR0YXJnZXRzOiBbXG5cdFx0XHRcdFx0J2RlZmF1bHRzJyxcblx0XHRcdFx0XHQvLyAnbm90IElFIDExJyxcblx0XHRcdFx0XHQnQ2hyb21lID49IDUyJyxcblx0XHRcdFx0XHQnU2FmYXJpID49IDEwLjEnLFxuXHRcdFx0XHRcdCdGaXJlZm94ID49IDU0Jyxcblx0XHRcdFx0XHQnRWRnZSA+PSAxNScsXG5cdFx0XHRcdFx0Ly8gJ0lPUyA+PSAxMC4zJyxcblx0XHRcdFx0XHQvLyAnQW5kcm9pZCA+IDM5Jyxcblx0XHRcdFx0XSxcblx0XHRcdFx0Ly8gXHU5NzYyXHU1NDExSUUxMVx1NjVGNlx1OTcwMFx1ODk4MVx1NkI2NFx1NjNEMlx1NEVGNlxuXHRcdFx0XHRhZGRpdGlvbmFsTGVnYWN5UG9seWZpbGxzOiBbJ3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZSddLFxuXHRcdFx0fSksXG5cdFx0XHRjcmVhdGVTdmdJY29uc1BsdWdpbih7XG5cdFx0XHRcdC8vIFx1NjMwN1x1NUI5QVx1OTcwMFx1ODk4MVx1N0YxM1x1NUI1OFx1NzY4NFx1NTZGRVx1NjgwN1x1NjU4N1x1NEVGNlx1NTkzOVxuXHRcdFx0XHRpY29uRGlyczogW2ZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvYXNzZXRzL2ltYWdlcy9pY29ucycsIGltcG9ydC5tZXRhLnVybCkpXSxcblx0XHRcdFx0Ly8gXHU2MzA3XHU1QjlBc3ltYm9sSWRcdTY4M0NcdTVGMEZcblx0XHRcdFx0c3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXG5cdFx0XHR9KSxcblx0XHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9hbnRmdS91bm9jc3Ncblx0XHRcdC8vIHNlZSB1bm9jc3MuY29uZmlnLnRzIGZvciBjb25maWdcblx0XHRcdFVub2Nzcyh7XG5cdFx0XHRcdHByZXNldHM6IFtcblx0XHRcdFx0XHRwcmVzZXRVbm8oKSxcblx0XHRcdFx0XHRwcmVzZXRBdHRyaWJ1dGlmeSgpLFxuXHRcdFx0XHRcdHByZXNldEljb25zKHtcblx0XHRcdFx0XHRcdHNjYWxlOiAxLjIsXG5cdFx0XHRcdFx0XHR3YXJuOiB0cnVlLFxuXHRcdFx0XHRcdH0pLFxuXHRcdFx0XHRdLFxuXHRcdFx0XHR0cmFuc2Zvcm1lcnM6IFt0cmFuc2Zvcm1lckRpcmVjdGl2ZXMoKSwgdHJhbnNmb3JtZXJWYXJpYW50R3JvdXAoKV0sXG5cdFx0XHR9KSxcblx0XHRcdEluc3BlY3QoKSxcblx0XHRdLFxuXHRcdGpzb246IHtcblx0XHRcdC8vXHU2NjJGXHU1NDI2XHU2NTJGXHU2MzAxXHU0RUNFIC5qc29uIFx1NjU4N1x1NEVGNlx1NEUyRFx1OEZEQlx1ODg0Q1x1NjMwOVx1NTQwRFx1NUJGQ1x1NTE2NVxuXHRcdFx0bmFtZWRFeHBvcnRzOiB0cnVlLFxuXHRcdFx0Ly9cdTgyRTVcdThCQkVcdTdGNkVcdTRFM0EgdHJ1ZSBcdTVCRkNcdTUxNjVcdTc2ODRqc29uXHU0RjFBXHU4OEFCXHU4RjZDXHU0RTNBIGV4cG9ydCBkZWZhdWx0IEpTT04ucGFyc2UoXCIuLlwiKSBcdTRGMUFcdTZCRDRcdThGNkNcdThCRDFcdTYyMTBcdTVCRjlcdThDNjFcdTVCNTdcdTk3NjJcdTkxQ0ZcdTYwMjdcdTgwRkRcdTY2RjRcdTU5N0Rcblx0XHRcdHN0cmluZ2lmeTogdHJ1ZSxcblx0XHR9LFxuXHRcdGNzczoge1xuXHRcdFx0Ly8gXHU2MzA3XHU1QjlBXHU0RjIwXHU5MDEyXHU3RUQ5IGNzcyBcdTk4ODRcdTU5MDRcdTc0MDZcdTU2NjhcdTc2ODRcdTkwMDlcdTk4Nzlcblx0XHRcdHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcblx0XHRcdFx0c2Nzczoge1xuXHRcdFx0XHRcdC8vIFx1NTE2OFx1NUM0MFx1NUYxNVx1NTE2NVxuXHRcdFx0XHRcdGFkZGl0aW9uYWxEYXRhOiBgQHVzZSBcIkAvYXNzZXRzL3N0eWxlcy9tYWluL25vcm1hbGl6ZS5zY3NzXCIgYXMgKjtAdXNlIFwiQC9hc3NldHMvc3R5bGVzL21haW4vZnVuY3Rpb24uc2Nzc1wiIGFzICo7QHVzZSBcIkAvYXNzZXRzL3N0eWxlcy90aGVtZS9pbmRleC5zY3NzXCIgYXMgKjtgLFxuXHRcdFx0XHRcdC8vIGNoYXJzZXQ6IGZhbHNlLFxuXHRcdFx0XHRcdC8vIG91dHB1dFN0eWxlOiAnZXhwYW5kZWQnLFxuXHRcdFx0XHRcdC8qKiBcdTVGMTVcdTUxNjV2YXIuc2Nzc1x1NTE2OFx1NUM0MFx1OTg4NFx1NUI5QVx1NEU0OVx1NTNEOFx1OTFDRiAqL1xuXHRcdFx0XHRcdC8vIG1vZGlmeVZhcnM6IHtcblx0XHRcdFx0XHQvLyBcdCdwcmltYXJ5LWNvbG9yJzogJyMxODkwZmYnLFxuXHRcdFx0XHRcdC8vIFx0J2ZvbnQtc2l6ZS1iYXNlJzogJzE0cHgnLFxuXHRcdFx0XHRcdC8vIH0sXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHNhc3M6IHtcblx0XHRcdFx0XHRjaGFyc2V0OiBmYWxzZSxcblx0XHRcdFx0XHRvdXRwdXRTdHlsZTogJ2V4cGFuZGVkJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0bGVzczoge1xuXHRcdFx0XHRcdC8vIFx1NjUyRlx1NjMwMVx1NTE4NVx1ODA1NCBKYXZhU2NyaXB0XG5cdFx0XHRcdFx0amF2YXNjcmlwdEVuYWJsZWQ6IHRydWUsIC8vXHU2Q0U4XHU2MTBGXHVGRjBDXHU4RkQ5XHU0RTAwXHU1M0U1XHU2NjJGXHU1NzI4bGVzc1x1NUJGOVx1OEM2MVx1NEUyRFx1RkYwQ1x1NTE5OVx1NTcyOFx1NTkxNlx1OEZCOVx1NEUwRFx1OEQ3N1x1NEY1Q1x1NzUyOFxuXHRcdFx0XHRcdC8vIGFkZGl0aW9uYWxEYXRhOiAnaW1wb3J0IFwiQC9hc3NldHMvc3R5bGVzL2Jhc2UubGVzc1wiOyBpbXBvcnQgXCJAL2Fzc2V0cy9zdHlsZXMvZnVuY3Rpb24ubGVzc1wiOydcblx0XHRcdFx0XHQvLyBtb2RpZnlWYXJzOnsgLy9cdTU3MjhcdThGRDlcdTkxQ0NcdThGREJcdTg4NENcdTRFM0JcdTk4OThcdTc2ODRcdTRGRUVcdTY1MzlcdUZGMENcdTUzQzJcdTgwMDNcdTVCOThcdTY1QjlcdTkxNERcdTdGNkVcdTVDNUVcdTYwMjcgLy8gbW9kaWZ5VmFyczogdGhlbWVWYXJpYWJsZXMsXG5cdFx0XHRcdFx0Ly8gICAnQHByaW1hcnktY29sb3InOiAnIzFEQTU3QScsXG5cdFx0XHRcdFx0Ly8gfSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHQvLyBwb3N0Q3NzIFx1OTE0RFx1N0Y2RVxuXHRcdFx0cG9zdGNzczoge1xuXHRcdFx0XHRwbHVnaW5zOiBbXG5cdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0LyoqXG5cdFx0XHRcdFx0XHQgKiBwb3N0Y3NzXHU3RUQ5XHU1NDJCXHU2NzA5XHU0RTJEXHU2NTg3XHU3Njg0c2NzcyBcdTUyQTBcdTRFODZcdTRFMkFAY2hhcnNldDpVVEYtODtcblx0XHRcdFx0XHRcdCAqIGVsZW1lbnQtcGx1c1x1NzY4NGluZGV4LmNzc1x1NjU4N1x1NEVGNlx1NTMwNVx1NTQyQkBjaGFyc2V0OlVURi04XG5cdFx0XHRcdFx0XHQgKiBcdTU3MjhcdTdFQzRcdTU0MDhjc3NcdTY1RjZAY2hhcnNldFx1NzY4NFx1NEY0RFx1N0Y2RVx1NUU3Nlx1NEUwRFx1NjYyRlx1NTcyOFx1NTkzNFx1OTBFOChcdTYyMTZcdTY3MDBcdTUyNERcdTk3NjIpXHVGRjBDXHU1NDBDXHU2NUY2XHU2NzJDXHU1NzMwc2Nzc1x1NTk4Mlx1Njc5Q1x1NjcwOVx1NEUyRFx1NjU4N1x1NEU1Rlx1NEYxQVx1ODFFQVx1NTJBOFx1NkRGQlx1NTJBMEBjaGFyc2V0OlVURi04XG5cdFx0XHRcdFx0XHQgKiBcdTU2RTBcdTZCNjRidWlsZFx1NjVGNlx1NUMzMVx1NEYxQXdhcm5pbmdcdTYzRDBcdTc5M0FcdTk1MTlcdThCRUZcdTRFODZcblx0XHRcdFx0XHRcdCAqKi9cblx0XHRcdFx0XHRcdHBvc3Rjc3NQbHVnaW46ICdpbnRlcm5hbDpjaGFyc2V0LXJlbW92YWwnLFxuXHRcdFx0XHRcdFx0QXRSdWxlOiB7XG5cdFx0XHRcdFx0XHRcdGNoYXJzZXQ6IGF0UnVsZSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0Ly8gY2hhciBzZXRcdTVCNTdcdTdCMjZcdTk2QzZcdTU5MDRcdTc0MDZcblx0XHRcdFx0XHRcdFx0XHRpZiAoYXRSdWxlLm5hbWUgPT09ICdjaGFyc2V0Jykge1xuXHRcdFx0XHRcdFx0XHRcdFx0YXRSdWxlLnJlbW92ZSgpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XSxcblx0XHRcdH0sXG5cdFx0XHQvLyBcdTkxNERcdTdGNkUgY3NzIG1vZHVsZXMgXHU3Njg0XHU4ODRDXHU0RTNBXG5cdFx0XHRtb2R1bGVzOiB7XG5cdFx0XHRcdGxvY2Fsc0NvbnZlbnRpb246ICdjYW1lbENhc2UnLFxuXHRcdFx0fSxcblx0XHR9LFxuXHRcdHJlc29sdmU6IHtcblx0XHRcdC8vIFx1NUJGQ1x1NTE2NVx1NjVGNlx1NjBGM1x1ODk4MVx1NzcwMVx1NzU2NVx1NzY4NFx1NjI2OVx1NUM1NVx1NTQwRFx1NTIxN1x1ODg2OFxuXHRcdFx0ZXh0ZW5zaW9uczogW1xuXHRcdFx0XHQvLyAnLndhc20nLFxuXHRcdFx0XHQnLm1qcycsXG5cdFx0XHRcdCcuanMnLFxuXHRcdFx0XHQnLnRzJyxcblx0XHRcdFx0Jy5qc3gnLFxuXHRcdFx0XHQnLnRzeCcsXG5cdFx0XHRcdCcuanNvbicsXG5cdFx0XHRcdCcuY3NzJyxcblx0XHRcdFx0Jy5zY3NzJyxcblx0XHRcdFx0Jy5sZXNzJyxcblx0XHRcdFx0Jy5wbmcnLFxuXHRcdFx0XHQnLmpwZycsXG5cdFx0XHRcdCcuanBlZycsXG5cdFx0XHRcdCcuZ2lmJyxcblx0XHRcdFx0Jy5zdmcnLFxuXHRcdFx0XSxcblx0XHRcdC8vIFx1OTE0RFx1N0Y2RVx1NTIyQlx1NTQwRFxuXHRcdFx0YWxpYXM6IFtcblx0XHRcdFx0Ly8ge1xuXHRcdFx0XHQvLyBcdGZpbmQ6IC9efi8sXG5cdFx0XHRcdC8vIFx0cmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi8nLCBpbXBvcnQubWV0YS51cmwpKSxcblx0XHRcdFx0Ly8gfSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGZpbmQ6ICdALycsXG5cdFx0XHRcdFx0cmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMvJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRmaW5kOiAvXnRlc3RzLyxcblx0XHRcdFx0XHRyZXBsYWNlbWVudDogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3Rlc3RzJywgaW1wb3J0Lm1ldGEudXJsKSksXG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIHsgZmluZDogL1xcLyMvLCByZXBsYWNlbWVudDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vdHlwZXMnKSB9XG5cdFx0XHRdLFxuXHRcdFx0Ly8gXHU2MEM1XHU2NjZGXHU1QkZDXHU1MUZBIHBhY2thZ2UuanNvbiBcdTkxNERcdTdGNkVcdTRFMkRcdTc2ODRleHBvcnRzXHU1QjU3XHU2QkI1XG5cdFx0XHQvLyBjb25kaXRpb25zOiBbXSxcblx0XHR9LFxuXHRcdHNlcnZlcjoge1xuXHRcdFx0Ly8gYmFzZTogJy4vJyxcblx0XHRcdGZzOiB7XG5cdFx0XHRcdHN0cmljdDogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0XHRob3N0OiAnMC4wLjAuMCcsXG5cdFx0XHQvLyBob3N0OiB0cnVlLCAvLyBcdTc2RDFcdTU0MkNcdTYyNDBcdTY3MDlcdTU3MzBcdTU3NDBcdUZGMENcdTUzMDVcdTYyRUNcdTVDNDBcdTU3REZcdTdGNTFcdTU0OENcdTUxNkNcdTdGNTFcdTU3MzBcdTU3NDAgXCJsb2NhbGhvc3RcIixcblx0XHRcdHBvcnQ6ICt2aXRlRW52LlZJVEVfUE9SVCwgLy8gXHU1RjAwXHU1M0QxXHU2NzBEXHU1MkExXHU1NjY4XHU3QUVGXHU1M0UzXG5cdFx0XHQvLyBodHRwczogZmFsc2UsIC8vXHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4IGh0dHAgMlxuXHRcdFx0Ly8gZm9yY2U6IHRydWUsIC8vXHU2NjJGXHU1NDI2XHU1RjNBXHU1MjM2XHU0RjlEXHU4RDU2XHU5ODg0XHU2Nzg0XHU1RUZBXG5cdFx0XHRjb3JzOiB0cnVlLCAvLyBcdTRFM0FcdTVGMDBcdTUzRDFcdTY3MERcdTUyQTFcdTU2NjhcdTkxNERcdTdGNkUgQ09SUyAsIFx1OUVEOFx1OEJBNFx1NTQyRlx1NzUyOFx1NUU3Nlx1NTE0MVx1OEJCOFx1NEVGQlx1NEY1NVx1NkU5MFxuXHRcdFx0b3BlbjogdHJ1ZSwgLy9cdTY3MERcdTUyQTFcdTU0MkZcdTUyQThcdTY1RjZcdTgxRUFcdTUyQThcdTU3MjhcdTZENEZcdTg5QzhcdTU2NjhcdTRFMkRcdTYyNTNcdTVGMDBcdTVFOTRcdTc1Mjhcblx0XHRcdHN0cmljdFBvcnQ6IGZhbHNlLCAvL1x1N0FFRlx1NTNFM1x1NEUyNVx1NjgzQ1x1NkEyMVx1NUYwRlx1RkYwQyBcdTRFM0F0cnVlXHU2NUY2XHVGRjBDXHU1RjUzXHU3QUVGXHU1M0UzXHU4OEFCXHU1MzYwXHU3NTI4XHU1MjE5XHU3NkY0XHU2M0E1XHU5MDAwXHU1MUZBXHVGRjBDXHU0RTBEXHU0RjFBXHU1QzFEXHU4QkQ1XHU0RTBCXHU0RTAwXHU0RTJBXHU1M0VGXHU3NTI4XHU3QUVGXHU1M0UzXG5cdFx0XHQvL0hNUlx1OEZERVx1NjNBNVx1OTE0RFx1N0Y2RXt9LCBmYWxzZS1cdTc5ODFcdTc1Mjhcblx0XHRcdGhtcjoge1xuXHRcdFx0XHQvLyBob3N0OiAnbG9jYWxob3N0J1xuXHRcdFx0XHQvLyBvdmVybGF5OiB0cnVlLCAvLyBcdThCQkVcdTRFM0F0cnVlXHU0RjFBXHU1QkZDXHU4MUY0XHU3MEVEXHU2NkY0XHU2NUIwXHU5MDFGXHU1RUE2XHU2MTYyXG5cdFx0XHRcdHBvcnQ6ICt2aXRlRW52LlZJVEVfUE9SVCxcblx0XHRcdH0sXG5cdFx0XHQvLyBcdTRGMjBcdTkwMTJcdTdFRDkgY2hvY2tpZGFyIFx1NzY4NFx1NjU4N1x1NEVGNlx1N0NGQlx1N0VERlx1NzZEMVx1ODlDNlx1NTY2OFx1OTAwOVx1OTg3OVxuXHRcdFx0d2F0Y2g6IHtcblx0XHRcdFx0Ly8gaWdub3JlZDpbXCIhKiovbm9kZV9tb2R1bGVzL3lvdXItcGFja2FnZS1uYW1lLyoqXCJdLFxuXHRcdFx0XHR1c2VQb2xsaW5nOiB0cnVlLCAvLyBcdTRGRUVcdTU5MERITVJcdTcwRURcdTY2RjRcdTY1QjBcdTU5MzFcdTY1NDhcblx0XHRcdH0sXG5cdFx0XHQvLyBcdTg4QUJcdTc2RDFcdTU0MkNcdTc2ODRcdTUzMDVcdTVGQzVcdTk4N0JcdTg4QUJcdTYzOTJcdTk2NjRcdTU3MjhcdTRGMThcdTUzMTZcdTRFNEJcdTU5MTZcdUZGMENcblx0XHRcdC8vIFx1NEVFNVx1NEZCRlx1NUI4M1x1ODBGRFx1NTFGQVx1NzNCMFx1NTcyOFx1NEY5RFx1OEQ1Nlx1NTE3M1x1N0NGQlx1NTZGRVx1NEUyRFx1NUU3Nlx1ODlFNlx1NTNEMVx1NzBFRFx1NjZGNFx1NjVCMFx1MzAwMlxuXHRcdFx0Ly8gb3B0aW1pemVEZXBzOiB7XG5cdFx0XHQvLyAgIGV4Y2x1ZGU6IFsneW91ci1wYWNrYWdlLW5hbWUnXSxcblx0XHRcdC8vIH0sXG5cdFx0XHQvLyBcdTUzQ0RcdTU0MTFcdTRFRTNcdTc0MDZcdTkxNERcdTdGNkVcblx0XHRcdC8vIHByb3h5OiAoKCkgPT4ge1xuXHRcdFx0Ly8gICBjb25zdCBwcm94eVBhdGggPSBbXG5cdFx0XHQvLyAgICAgJy9hcGknLFxuXHRcdFx0Ly8gICAgICcvbW9jaydcblx0XHRcdC8vICAgICAvLyAnL3NvY2tldC5pbydcblx0XHRcdC8vICAgXVxuXHRcdFx0Ly8gICBjb25zdCBwcm94eUNvbmZpZyA9IHt9XG5cdFx0XHQvLyAgIGZvciAoY29uc3QgaXRlbSBvZiBwcm94eVBhdGgpIHtcblx0XHRcdC8vICAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKGBeXFwke2l0ZW19YCkgLy8gLCdnJ1xuXHRcdFx0Ly8gICAgIHByb3h5Q29uZmlnW2l0ZW1dID0ge1xuXHRcdFx0Ly8gICAgICAgdGFyZ2V0OiBlbnYuQVBQX0FQSV9CQVNFX1VSTCxcblx0XHRcdC8vICAgICAgIC8vIGxvZ0xldmVsOiAnZGVidWcnLCAvLyBcdTY3RTVcdTc3MEJcdTRFRTNcdTc0MDZcdThCRjdcdTZDNDJcdTc2ODRcdTc3MUZcdTVCOUVcdTU3MzBcdTU3NDBcblx0XHRcdC8vICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcblx0XHRcdC8vICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UocmVnRXhwLCAnLycpLFxuXHRcdFx0Ly8gICAgICAgY29va2llRG9tYWluUmV3cml0ZTogJycsXG5cdFx0XHQvLyAgICAgICBzZWN1cmU6IGZhbHNlXG5cdFx0XHQvLyAgICAgfVxuXHRcdFx0Ly8gICB9XG5cdFx0XHQvLyAgIC8vIGNvbnNvbGUubG9nKCdwcm94eUNvbmZpZzonLCBwcm94eUNvbmZpZyk7XG5cdFx0XHQvLyAgIHJldHVybiBwcm94eUNvbmZpZ1xuXHRcdFx0Ly8gfSkoKVxuXG5cdFx0XHQvLyBwcm94eToge1xuXHRcdFx0Ly8gVXNpbmcgdGhlIHByb3h5IGluc3RhbmNlXG5cdFx0XHQvLyAnL2FwaSc6IHtcblx0XHRcdC8vICAgdGFyZ2V0OiAnaHR0cDovL2pzb25wbGFjZWhvbGRlci50eXBpY29kZS5jb20nLFxuXHRcdFx0Ly8gICBjaGFuZ2VPcmlnaW46IHRydWUsXG5cdFx0XHQvLyAgIGNvbmZpZ3VyZTogKHByb3h5LCBvcHRpb25zKSA9PiB7XG5cdFx0XHQvLyAgICAgLy8gcHJveHkgd2lsbCBiZSBhbiBpbnN0YW5jZSBvZiAnaHR0cC1wcm94eSdcblx0XHRcdC8vICAgfVxuXHRcdFx0Ly8gfSxcblx0XHRcdC8vIC8vIFByb3h5aW5nIHdlYnNvY2tldHMgb3Igc29ja2V0LmlvXG5cdFx0XHQvLyAnL3NvY2tldC5pbyc6IHtcblx0XHRcdC8vICAgdGFyZ2V0OiAnd3M6Ly9sb2NhbGhvc3Q6MzAwMCcsXG5cdFx0XHQvLyAgIHdzOiB0cnVlXG5cdFx0XHQvLyB9XG5cdFx0XHQvLyB9LFxuXHRcdH0sXG5cblx0XHRidWlsZDoge1xuXHRcdFx0Ly8gXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NjJGXHU1NDI2XHU3NTFGXHU2MjEwIHNvdXJjZSBtYXAgXHU2NTg3XHU0RUY2XG5cdFx0XHRzb3VyY2VtYXA6IHRydWUsXG5cdFx0XHQvL1x1NUY1M1x1OEJCRVx1N0Y2RVx1NEUzQSB0cnVlXHVGRjBDXHU2Nzg0XHU1RUZBXHU1NDBFXHU1QzA2XHU0RjFBXHU3NTFGXHU2MjEwIG1hbmlmZXN0Lmpzb24gXHU2NTg3XHU0RUY2XG5cdFx0XHRtYW5pZmVzdDogZmFsc2UsXG5cdFx0XHQvKipcblx0XHRcdCAqIFx1NjMwN1x1NUI5QVx1NEY3Rlx1NzUyOFx1NkRGN1x1NkRDNlx1NTY2ODogYm9vbGVhbiB8ICd0ZXJzZXInIHwgJ2VzYnVpbGQnXG5cdFx0XHQgKiBcdThCQkVcdTdGNkVcdTRFM0EgZmFsc2UgXHU1M0VGXHU0RUU1XHU3OTgxXHU3NTI4XHU2NzAwXHU1QzBGXHU1MzE2XHU2REY3XHU2REM2XG5cdFx0XHQgKi9cblx0XHRcdG1pbmlmeTogJ2VzYnVpbGQnLCAvLyB0ZXJzZXIgXHU2Nzg0XHU1RUZBXHU1NDBFXHU2NTg3XHU0RUY2XHU0RjUzXHU3OUVGXHU2NkY0XHU1QzBGXG5cdFx0XHQvL1x1NEYyMFx1OTAxMlx1N0VEOSBUZXJzZXIgXHU3Njg0XHU2NkY0XHU1OTFBIG1pbmlmeSBcdTkwMDlcdTk4NzlcdTMwMDJcblx0XHRcdHRlcnNlck9wdGlvbnM6IHtcblx0XHRcdFx0Y29tcHJlc3M6IHtcblx0XHRcdFx0XHRkcm9wX2NvbnNvbGU6IHRydWUsXG5cdFx0XHRcdFx0ZHJvcF9kZWJ1Z2dlcjogdHJ1ZSxcblx0XHRcdFx0fSxcblx0XHRcdH0sXG5cdFx0XHQvL1x1NkQ0Rlx1ODlDOFx1NTY2OFx1NTE3Q1x1NUJCOVx1NjAyNyAgXCJlc25leHRcInxcIm1vZHVsZXNcIlxuXHRcdFx0dGFyZ2V0OiBbJ2VzbmV4dCcsICdlZGdlODgnLCAnZmlyZWZveDc4JywgJ2Nocm9tZTUyJywgJ3NhZmFyaTEzLjEnLCAnaWUxMSddLFxuXHRcdFx0Y3NzVGFyZ2V0OiBbJ2VzbmV4dCcsICdlZGdlODgnLCAnZmlyZWZveDc4JywgJ2Nocm9tZTUyJywgJ3NhZmFyaTEzLjEnLCAnaWUxMSddLFxuXHRcdFx0Ly9cdTYzMDdcdTVCOUFcdThGOTNcdTUxRkFcdThERUZcdTVGODRcblx0XHRcdG91dERpcjogdml0ZUVudi5WSVRFX09VVFBVVF9ESVIsXG5cdFx0XHQvLyBcdTYzMDdcdTVCOUFcdTc1MUZcdTYyMTBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTc2ODRcdTVCNThcdTY1M0VcdThERUZcdTVGODRcblx0XHRcdGFzc2V0c0RpcjogJ3N0YXRpYycsXG5cdFx0XHQvL1x1NTQyRlx1NzUyOC9cdTc5ODFcdTc1MjggQ1NTIFx1NEVFM1x1NzgwMVx1NjJDNlx1NTIwNlxuXHRcdFx0Y3NzQ29kZVNwbGl0OiB0cnVlLFxuXHRcdFx0Ly8gXHU1QzBGXHU0RThFXHU2QjY0XHU5NjA4XHU1MDNDXHU3Njg0XHU1QkZDXHU1MTY1XHU2MjE2XHU1RjE1XHU3NTI4XHU4RDQ0XHU2RTkwXHU1QzA2XHU1MTg1XHU4MDU0XHU0RTNBIGJhc2U2NCBcdTdGMTZcdTc4MDFcdUZGMENcdTRFRTVcdTkwN0ZcdTUxNERcdTk4OURcdTU5MTZcdTc2ODQgaHR0cCBcdThCRjdcdTZDNDJcdTMwMDJcdThCQkVcdTdGNkVcdTRFM0EgMCBcdTUzRUZcdTRFRTVcdTVCOENcdTUxNjhcdTc5ODFcdTc1MjhcdTZCNjRcdTk4Nzlcblx0XHRcdGFzc2V0c0lubGluZUxpbWl0OiA0MDk2LFxuXHRcdFx0Ly9cdTgxRUFcdTVCOUFcdTRFNDlcdTVFOTVcdTVDNDJcdTc2ODQgUm9sbHVwIFx1NjI1M1x1NTMwNVx1OTE0RFx1N0Y2RVxuXHRcdFx0cm9sbHVwT3B0aW9uczoge1xuXHRcdFx0XHQvLyBtYWtlIHN1cmUgdG8gZXh0ZXJuYWxpemUgZGVwcyB0aGF0IHNob3VsZG4ndCBiZSBidW5kbGVkXG5cdFx0XHRcdC8vIGludG8geW91ciBsaWJyYXJ5XG5cdFx0XHRcdGV4dGVybmFsOiBbJ3Z1ZScsICd2dWUtcm91dGVyJywgJ3BpbmlhJ10sXG5cdFx0XHRcdHRyZWVzaGFrZTogdHJ1ZSxcblx0XHRcdFx0b3V0cHV0OiB7XG5cdFx0XHRcdFx0Ly8gUHJvdmlkZSBnbG9iYWwgdmFyaWFibGVzIHRvIHVzZSBpbiB0aGUgVU1EIGJ1aWxkXG5cdFx0XHRcdFx0Ly8gZm9yIGV4dGVybmFsaXplZCBkZXBzXG5cdFx0XHRcdFx0ZXhwb3J0czogJ25hbWVkJyxcblx0XHRcdFx0XHRnbG9iYWxzOiB7XG5cdFx0XHRcdFx0XHR2dWU6ICdWdWUnLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0Ly8gY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMxL1tuYW1lXS1baGFzaF0uanMnLFxuXHRcdFx0XHRcdC8vIGVudHJ5RmlsZU5hbWVzOiAnc3RhdGljL2pzMi9bbmFtZV0tW2hhc2hdLmpzJyxcblx0XHRcdFx0XHQvLyBhc3NldEZpbGVOYW1lczogJ3N0YXRpYy9bZXh0XS9bbmFtZV0tW2hhc2hdLltleHRdJyxcblx0XHRcdFx0fSxcblx0XHRcdFx0Ly8gdGFyZ2V0OiAnZXNuZXh0Jyxcblx0XHRcdFx0Ly8gbWluaWZ5OiAnZXNidWlsZCcsIC8vIFx1NkRGN1x1NkRDNlx1NTY2OFx1RkYwQ3RlcnNlclx1Njc4NFx1NUVGQVx1NTQwRVx1NjU4N1x1NEVGNlx1NEY1M1x1NzlFRlx1NjZGNFx1NUMwRlxuXHRcdFx0fSxcblxuXHRcdFx0Ly8gQHJvbGx1cC9wbHVnaW4tY29tbW9uanMgXHU2M0QyXHU0RUY2XHU3Njg0XHU5MDA5XHU5ODc5XG5cdFx0XHRjb21tb25qc09wdGlvbnM6IHtcblx0XHRcdFx0aW5jbHVkZTogWy9ub2RlX21vZHVsZXMvXSwgLy8gL2plc3RfdHJhbnNmb3JtLyxcblx0XHRcdH0sXG5cdFx0XHQvLyBcdTU0MkZcdTc1MjgvXHU3OTgxXHU3NTI4IGd6aXAgXHU1MzhCXHU3RjI5XHU1OTI3XHU1QzBGXHU2MkE1XHU1NDRBXHUzMDAyXHU1MzhCXHU3RjI5XHU1OTI3XHU1NzhCXHU4RjkzXHU1MUZBXHU2NTg3XHU0RUY2XHU1M0VGXHU4MEZEXHU0RjFBXHU1Rjg4XHU2MTYyXHVGRjBDXHU1NkUwXHU2QjY0XHU3OTgxXHU3NTI4XHU4QkU1XHU1MjlGXHU4MEZEXHU1M0VGXHU4MEZEXHU0RjFBXHU2M0QwXHU5QUQ4XHU1OTI3XHU1NzhCXHU5ODc5XHU3NkVFXHU3Njg0XHU2Nzg0XHU1RUZBXHU2MDI3XHU4MEZEXG5cdFx0XHRyZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcblx0XHRcdC8vY2h1bmsgXHU1OTI3XHU1QzBGXHU4QjY2XHU1NDRBXHU3Njg0XHU5NjUwXHU1MjM2XG5cdFx0XHRjaHVua1NpemVXYXJuaW5nTGltaXQ6IDUwMCxcblx0XHRcdC8vIFx1OEJCRVx1N0Y2RVx1NEUzQSBmYWxzZSBcdTY3NjVcdTc5ODFcdTc1MjhcdTVDMDZcdTY3ODRcdTVFRkFcdTU0MEVcdTc2ODRcdTY1ODdcdTRFRjZcdTUxOTlcdTUxNjVcdTc4QzFcdTc2RDhcblx0XHRcdHdyaXRlOiB0cnVlLFxuXHRcdFx0Ly9cdTlFRDhcdThCQTRcdTYwQzVcdTUxQjVcdTRFMEJcdUZGMENcdTgyRTUgb3V0RGlyIFx1NTcyOCByb290IFx1NzZFRVx1NUY1NVx1NEUwQlx1RkYwQ1x1NTIxOSBWaXRlIFx1NEYxQVx1NTcyOFx1Njc4NFx1NUVGQVx1NjVGNlx1NkUwNVx1N0E3QVx1OEJFNVx1NzZFRVx1NUY1NVx1MzAwMlxuXHRcdFx0ZW1wdHlPdXREaXI6IHRydWUsXG5cdFx0XHQvKiogXHU2Nzg0XHU1RUZBXHU0RTNBXHU1RTkzXG5cdFx0XHQgKiBcdTU5ODJcdTY3OUNcdTRGNjBcdTYzMDdcdTVCOUFcdTRFODYgYnVpbGQubGliXHVGRjBDXHU5MEEzXHU0RTQ4IGJ1aWxkLmFzc2V0c0lubGluZUxpbWl0IFx1NUMwNlx1ODhBQlx1NUZGRFx1NzU2NVxuXHRcdFx0ICogXHU2NUUwXHU4QkJBXHU2NTg3XHU0RUY2XHU1OTI3XHU1QzBGXHU2MjE2XHU2NjJGXHU1NDI2XHU0RTNBIEdpdCBMRlMgXHU1MzYwXHU0RjREXHU3QjI2XHVGRjBDXHU4RDQ0XHU2RTkwXHU5MEZEXHU0RjFBXHU4OEFCXHU1MTg1XHU4MDU0XHUzMDAyXG5cdFx0XHQgKiAqL1xuXHRcdFx0bGliOiBmYWxzZSxcblx0XHRcdHNzcjogZmFsc2UsXG5cdFx0XHRzc3JNYW5pZmVzdDogZmFsc2UsXG5cdFx0XHR3YXRjaDogbnVsbCxcblx0XHRcdGR5bmFtaWNJbXBvcnRWYXJzT3B0aW9uczogeyB3YXJuT25FcnJvcjogdHJ1ZSwgZXhjbHVkZTogW10gfSxcblx0XHR9LFxuXHRcdHByZXZpZXc6IHtcblx0XHRcdHBvcnQ6ICt2aXRlRW52LlZJVEVfUE9SVCwgLy8gXHU5ODg0XHU4OUM4XHU2NzBEXHU1MkExXHU1NjY4XHU3QUVGXHU1M0UzXG5cdFx0XHRob3N0OiB0cnVlLCAvLyBcdTc2RDFcdTU0MkNcdTYyNDBcdTY3MDlcdTU3MzBcdTU3NDBcdUZGMENcdTUzMDVcdTYyRUNcdTVDNDBcdTU3REZcdTdGNTFcdTU0OENcdTUxNkNcdTdGNTFcdTU3MzBcdTU3NDBcblx0XHRcdHN0cmljdFBvcnQ6IHRydWUsIC8vIFx1N0FFRlx1NTNFM1x1ODhBQlx1NTM2MFx1NzUyOFx1NjVGNlx1RkYwQ1x1NjI5Qlx1NTFGQVx1OTUxOVx1OEJFRlxuXHRcdH0sXG5cdH07XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaWIsU0FBMEMsY0FBYyxlQUFlO0FBQ3hmLE9BQU8sU0FBUztBQUNoQixPQUFPLFlBQVk7QUFDbkIsT0FBTyxnQkFBZ0I7QUFDdkIsT0FBTyxnQkFBZ0I7QUFDdkIsU0FBUywyQkFBMkI7QUFDcEMsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sbUJBQW1CO0FBQzFCLE9BQU8sYUFBYTtBQUNwQixPQUFPLFlBQVk7QUFDbkIsU0FBUyw0QkFBNEI7QUFDckMsU0FBUyxlQUFlLFdBQVc7QUFDbkMsT0FBTyxVQUFVO0FBRWpCLE9BQU8sWUFBWTtBQUNuQjtBQUFBLEVBQ0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsT0FDTTtBQXJCUCxJQUFNLG1DQUFtQztBQUF5TyxJQUFNLDJDQUEyQztBQXdCblUsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQTZCO0FBQ2hFLFFBQU0sVUFBVSxRQUFRLE1BQU0sS0FBSyxRQUFRLGtDQUFXLE9BQU8sR0FBRyxDQUFDLFNBQVMsTUFBTSxDQUFDO0FBQ2pGLFFBQU0sU0FBUyxDQUFDLGNBQWMsV0FBVyxTQUFTLEVBQUUsU0FBUyxRQUFRLGFBQWE7QUFDbEYsVUFBUSxJQUFJLDRCQUE0QixPQUFPO0FBQy9DLFNBQU87QUFBQSxJQUNOLE1BQU0sR0FBRyxRQUFRLGVBQWU7QUFBQTtBQUFBO0FBQUEsSUFFaEMsV0FBVztBQUFBO0FBQUEsSUFFWCxRQUFRO0FBQUEsSUFDUixXQUFXLENBQUMsU0FBUyxNQUFNO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJ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
