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

"lint-staged": "^11.1.2", // 对暂存的 git 文件运行 linter
"commitizen": 是一个命令行提示工具，它主要用于帮助我们更快地写出规范的commit message
"@commitlint/cli": 用于校验填写的commit message是否符合设定的规范
"@commitlint/config-conventional": 配置指定需要的规范，在.commitlintrc文件中引入
"@commitlint/cz-commitlint": git cz相关插件

`pnpm exec`
在项目范围内执行 shell 命令, pnpm exec 允许执行依赖项的命令。
将 lint-staged 作为项目的依赖项，则无需全局安装lint-staged，只需使用 pnpm exec运行
` pnpm exec lint-staged --concurrent false `
exec 命令的任何选项都应该在 exec 关键字之前列出。 在 exec 关键字之后列出的选项都将被传递给被执行的命令
-p, --concurrent <parallel tasks>  要同时运行的任务数，或者为false则要连续运行任务（默认值：true）

**Git Hooks相关管理工具**

`git config core.hooksPath` 检查git配置信息
`git config core.hooksPath .git/hooks/` 指定core.gitHooks的值为 .git/hooks
"simple-git-hooks": 一个git钩子管理工具，优点是使用简单，缺点是每个钩子只能执行一个命令，如果需要执行多个命令可以选择husky。
package.json中配置simple-git-hooks
`"scripts": {
  "ghooks": "simple-git-hooks",
  "commit-msg": "pnpm commitlint -e $1", 
},
"simple-git-hooks": {
  "pre-commit": "pnpm lint-staged",
  "preserveUnused": [
    "commit-msg"
  ]
}, `


"husky": 自动配置 Git hooks 钩子

`pnpm exec commitlint --config .commitlintrc -e $1`

`
pnpm -F 'main-apps/vitest-react-ts-swc-base' exec lint-staged
pnpm -F 'sub-apps/side-nav' exec lint-staged
pnpm -F 'sub-apps/vite-react-ts-jest-app' exec lint-staged
pnpm -F 'sub-apps/vitest-vue3-ts-el-app' exec lint-staged
`

**使用changesets管理包版本，生成changelog**

"@changesets/cli": changesets 安装包
初始化changeset配置: 
`npx changeset init`
这个命令会在根目录下生成.changeset文件夹，文件夹下包含一个config文件和一个readme文件

`npx changeset`
运行这个命令，会出现一系列确认问题，包括：
  1. 需要为哪些包更新版本
  2. 哪些包更新为major版本
  3. 哪些包更新为minor版本
  4. 修改信息（会添加到最终生成的changelog.md中） 

所有问题回答完成之后，会在.changeset下生成一个Markdown文件，这个文件的内容就是刚才问题的答案集合

`npx changeset version`
这个命令会做以下操作:
  1. 依据上一步生成的md文件和changeset的config文件更新相关包版本
  2. 为版本更新的包生成CHANGELOG.md文件 填入上一步填写的修改信息
  3. 删除上一步生成的Markdown文件，保证只使用一次

建议执行此操作后，pulish之前将改动合并到主分支

**版本发布**
`npx changeset publish`
