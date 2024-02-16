# monorepo-micro-app-root-test

微前端框架micro-app+pnmp+monorepo搭建测试版应用

本项目使用micro-app实现微前端应用，并使用pnpm和Monorepo管理项目代码。运行环境为 node>=16.8.0, pnpm>=7.32.0。

## 目录结构

.
├── main-app // 主应用 Vite + react (history路由)
├── sub-pps // 子应用
│ ├── vite-react-ts-jest-app
│ ├── vitest-vue3-ts-el-app // Vite + vue3 (history路由)
├── package.json
├── pnpm-workspace.yaml
└── pnpm-lock.yaml

## 工具

"husky": "^7.0.1", // 自动配置 Git hooks 钩子
"lint-staged": "^11.1.2", // 对暂存的 git 文件运行 linter
"commitizen": // git commit 执行规则相关插件
"conventional-changelog-cli":
