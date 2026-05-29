# React + TypeScript + Vite8

该主应用使用Vite8+React+TypeScript+Zustand 构建

## vite8 的核心应用场景与优势

vite8核心结构：构建工具（Vite）、打包工具（Rolldown）和编译器（Oxc）。

在 Vite 8 + React 技术栈中，Oxc-parser 及相关工具链已被官方深度应用。

- **取代 Babel 进行 React Refresh 转换：** 随着 Vite 8 的发布，官方推出了 @vitejs/plugin-react v6。该插件原生使用 Oxc 处理 React Refresh 转换，默认不再依赖 Babel。
- **原生支持 JSX 与 TypeScript：** Oxc 作为底层编译器组件，能原生且极速地解析和转换 JSX 和 TypeScript，实现更轻量的安装体积。
- **Rolldown 底层依赖：** Vite 8 默认采用 Rolldown 作为打包器，而 Rolldown 底层正是完全构建在 Oxc 生态（包括解析器、模块解析器等）之上的。

## 功能特点

- 主应用通过导航路由切换不同微应用
- 用户注册
- 用户登录
- 基于Token的身份验证
- 受保护的路由
- 持久化的认证状态

## 技术栈

- React 18
- TypeScript
- Zustand (状态管理)
- React Router v6
- Tailwind CSS (样式)

## 代码检查和格式化工具选型

1) **Biome（基于 CST）**
  
  - 优势：
    格式化畸形代码：即使代码有语法错误，也能尝试格式化。
    更精准的代码样式保留：不会丢失原始格式（如括号位置）。
    错误恢复友好：适合 IDE 实时提示（如 VS Code 插件）。
  - 代价：
    解析和存储成本略高。

2) **OXC（基于 AST）**
  - 优势：
    更简单、更快：适合需要高性能的场景（如大规模代码分析）。
    与编译器设计一致：OXC 的目标是成为类似 Rustc 的底层工具链。

  - 限制：
    对畸形代码处理较弱（可能直接报错而非尝试修复）。

### 技术选择小结

**CST** 是“源代码的完整照片”，适合格式化、Lint 等需要保真的场景。
**AST** 是“源代码的简笔画”，适合编译器、静态分析等需要性能的场景。

Biome 的选择（CST）：
  目标是成为“开发者体验优先”的工具，强调错误恢复和格式化保真度。
  适合需要与 IDE 深度集成的场景（如实时 linting）。
  优先一体化、最低心智负担、IDE 内稳定的增量反馈

OXC 的选择（AST）：
  追求极简主义和性能（极快 Lint 与批处理吞吐），类似 Rust 的工具链设计。
  或需要 AST 变换/压缩/codegen 的可编程基础设施，更适合作为底层引擎（如构建工具、编译器前端）。

**混用实践：**
IDE 用 Biome（格式化 + 交互式 Lint），CI 用 Oxlint（全库快速扫描）。务必只保留一个 formatter，避免重复规则。

Biome vs OXC 的选择本质上是 “开发者体验 vs 性能/简洁性” 的权衡。

## 开始使用

### 安装依赖

```bash
cd main-apps/vitest-latest-ts-base
pnpm install
```

### 运行开发服务器

```bash
pnpm dev
```


### 构建生产版本

```bash
pnpm build:prod
```

## 项目结构

```
src/
  ├── components/       # 公共组件
  │   ├── Loading.tsx
  │   └── ProtectedRoute.tsx
  ├── views/            # 页面组件
  │   ├── auths
  │   │   ├── Login.tsx
  │   │   ├── Register.tsx
  │   │   └── Logout.tsx
  │   │ 
  │   ├── home
  │   │   └──index.tsx
  │   ├── subapps
  │   │   ├── subreact.tsx
  │   │   └── subvue3.tsx
  │   └── error
  │       ├── 403.tsx
  │       └── 404.tsx
  │ 
  ├── store/            # Zustand 状态管理
  │   └── authStore.ts
  ├── App.tsx           # 主应用组件和路由配置
  ├── index.tsx         # 应用入口点
  └── index.css         # 全局样式
```

## 认证流程

1. 用户在登录页面输入凭据
2. 应用调用API验证凭据
3. 成功后，API返回JWT令牌和用户信息
4. 应用使用Zustand存储令牌和用户信息
5. 认证状态通过Zustand的persist中间件持久化到localStorage
6. 受保护的路由使用ProtectedRoute组件检查认证状态

## 测试账户

用于测试的模拟账户:
- 邮箱: test@example.com
- 密码: password 