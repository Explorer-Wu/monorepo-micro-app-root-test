# React + TypeScript + Vite

该主应用使用Vite+React+TypeScript+Zustand 构建

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

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

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## 开始使用

### 安装依赖

```bash
cd main-apps/vitest-react-ts-swc-base
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