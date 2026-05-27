const isProd = ['production', 'testing', 'staging'].includes(process.env.VITE_NODE_ENV);
const prettierRc = require('./.prettierrc');
const banConstEnum = {
	selector: 'TSEnumDeclaration[const=true]',
	message: 'Please use non-const enums. This project automatically inlines enums.',
};

module.exports = {
	root: true,
	env: {
		node: true,
		commonjs: true,
		esnext: true,
		browser: true,
	},
	// 解析器
	parser: '@typescript-eslint/parser',
	// 配置解析选项
	parserOptions: {
		parser: '@typescript-eslint/parser',
		ecmaVersion: 'latest', // | 2021  Allows for the parsing of modern ECMAScript features
		sourceType: 'module', // Allows for the use of imports
		jsxPragma: 'React',
		ecmaFeatures: {
			jsx: true, // Allows for the parsing of JSX
			tsx: true,
			modules: true,
		},
		project: './tsconfig.json', // path.resolve(__dirname, './tsconfig.json'),
		tsconfigRootDir: __dirname,
		// createDefaultProgram: true,
	},

	// 继承的规则 [扩展]
	extends: [
		'eslint:recommended',
		// 'eslint-config-prettier',
		// Uses the recommended rules from the @typescript-eslint/eslint-plugin
		// "plugin:@typescript-eslint/eslint-recommended",
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier', // === 'prettier/@typescript-eslint' + 'prettier/react'
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'plugin:react/jsx-runtime', // react补充配置
		'plugin:jsx-control-statements/recommended',
		// 'plugin:import/errors',
		// 'plugin:import/warnings',
	],

	// 拓展和支持相关能力的插件库
	plugins: [
		'@typescript-eslint',
		'prettier',
		'import',
		'react',
		'react-refresh',
		'react-hooks',
		'jsx-a11y',
		'jsx-control-statements',
		'testing-library',
	],
	/**
	 * "off" 或 0 - 关闭规则
	 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出),
	 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
	 */

	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/no-unused-vars': 'off', // ['warn'],
		'no-unused-vars': 'off',
		// [
		// 	'off',
		// 	{
		// 		argsIgnorePattern: '^_',
		// 		varsIgnorePattern: '^_',
		// 	},
		// ],
		'@typescript-eslint/ban-types': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		// "@typescript-eslint/interface-name-prefix": "off",
		// "@typescript-eslint/explicit-member-accessibility": "off",
		// "@typescript-eslint/no-triple-slash-reference": "off",
		'@typescript-eslint/ban-ts-ignore': 'off',
		'@typescript-eslint/no-empty-function': 'off',
		'@typescript-eslint/no-use-before-define': 'off',
		// "@typescript-eslint/triple-slash-reference": [
		//   "error",
		//   { path: "always", types: "never", lib: "never" }
		// ],

		// 优先使用 interface 而不是 type
		'@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': ['off'], //允许使用any
		'@typescript-eslint/no-this-alias': [
			'error',
			{
				allowedNames: ['that'], // this可用的局部变量名称
			},
		],
		'@typescript-eslint/ban-ts-comment': 'off', //允许使用@ts-ignore
		'@typescript-eslint/no-non-null-assertion': 'off', //允许使用非空断言

		// This rule enforces the preference for using '@ts-expect-error' comments in TypeScript
		// code to indicate intentional type errors, improving code clarity and maintainability.
		'@typescript-eslint/prefer-ts-expect-error': 'error',
		// Enforce the use of 'import type' for importing types
		'@typescript-eslint/consistent-type-imports': [
			'error',
			{
				fixStyle: 'inline-type-imports',
				disallowTypeAnnotations: false,
			},
		],
		// Enforce the use of top-level import type qualifier when an import only has specifiers with inline type qualifiers
		'@typescript-eslint/no-import-type-side-effects': 'error',

		'import/no-dynamic-require': 'off',
		'import/imports-first': 0,
		'import/newline-after-import': 0,
		'import/no-extraneous-dependencies': 0,
		'import/no-named-as-default': 0,
		// "import/no-unresolved": [2, { caseSensitive: false }], // ts already checks case sensitive imports
		// "import/no-webpack-loader-syntax": 0,
		'import/prefer-default-export': 0,

		//import导入顺序规则
		// 'import/order': 0,
		'import/order': [
			'error',
			{
				//按照分组顺序进行排序
				groups: ['builtin', 'external', 'parent', 'sibling', 'index', 'internal', 'object', 'type'],
				//通过路径自定义分组
				pathGroups: [
					{
						pattern: 'react*', //对含react的包进行匹配
						group: 'builtin', //将其定义为builtin模块
						position: 'before', //定义在builtin模块中的优先级
					},
					{
						pattern: '@/components/**',
						group: 'parent',
						position: 'before',
					},
					{
						pattern: '@/utils/**',
						group: 'parent',
						position: 'after',
					},
					{
						pattern: '@/apis/**',
						group: 'parent',
						position: 'after',
					},
				],
				//将react包不进行排序，并放在前排，可以保证react包放在第一行
				pathGroupsExcludedImportTypes: ['react'],
				'newlines-between': 'always', //每个分组之间换行
				//根据字母顺序对每个组内的顺序进行排序
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'sort-imports': ['error', { ignoreDeclarationSort: true }],
		// "import/no-cycle": 1,
		// These rules don't add much value, are better covered by TypeScript and good definition files

		// React相关校验规则
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
		'react/no-unknown-property': ['error', { ignore: ['css'] }],
		'react/no-unescaped-entities': 'off',
		'react/no-direct-mutation-state': 'off',
		'react/no-deprecated': 'off',
		'react/no-string-refs': 'off',
		'react/require-render-return': 'off',
		'react/jsx-filename-extension': [
			'warn',
			{
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		], // also want to use with ".tsx"
		'react/jsx-key': 2, // "warn", 在数组或迭代器中验证JSX具有key属性
		'react/no-this-in-sfc': 0,
		'react/prop-types': 'off', // "warn", // Is this incompatible with TS props type?
		'react/display-name': 'off',
		// "react/jsx-no-undef": "error", // [2, { allowGlobals: true }],
		'react/jsx-uses-react': 'error',
		// "react/jsx-uses-vars": "error",
		'react/react-in-jsx-scope': 'warn', // 'off',
		// 检查 Hooks 的使用规则
		'react-hooks/rules-of-hooks': 'error',
		// 检查依赖项的声明
		'react-hooks/exhaustive-deps': 'warn',

		// 其他校验规则
		'jsx-control-statements/jsx-use-if-tag': 'off',
		'prettier/prettier': ['error', prettierRc],
		'no-cond-assign': 2,
		'no-console': ['warn', { allow: ['log', 'warn', 'error', 'info'] }], // 提交时不允许有console.log 'off',
		// 禁止 function 定义中出现重名参数
		'no-dupe-args': 2,
		// 禁止对象字面量中出现重复的 key
		'no-dupe-keys': 2,
		// 禁止重复的 case 标签
		'no-duplicate-case': 2,
		// 禁止空语句块
		'no-empty': 0,
		// 禁止对 catch 子句的参数重新赋值
		'no-ex-assign': 1,
		// 禁止不必要的布尔转换
		'no-extra-boolean-cast': 2,
		// 控制逗号前后的空格
		// 'comma-spacing': [
		// 	2,
		// 	{
		// 		before: false,
		// 		after: true,
		// 	},
		// ],
		// "global-require": 0,
		'no-debugger': isProd ? 'error' : 'off', // 'warn' 提交时不允许有debugger
		eqeqeq: ['warn', 'always'], // 对于”==“和”===“的校验
		'prefer-const': ['error', { destructuring: 'all', ignoreReadBeforeAssign: true }],
		semi: ['error', 'always'],
		'comma-dangle': ['error', 'always-multiline'],
		'unsafe-optional-chaining': 'off',
		'no-unsafe-optional-chaining': 'off',
		'no-restricted-syntax': [
			'error',
			banConstEnum,
			// since we target ES2015 for baseline support, we need to forbid object
			// rest spread usage in destructure as it compiles into a verbose helper.
			'ObjectPattern > RestElement',
			// tsc compiles assignment spread into Object.assign() calls, but esbuild
			// still generates verbose helpers, so spread assignment is also prohiboted
			'ObjectExpression > SpreadElement',
			'AwaitExpression',
		],
	},

	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts', '.tsx'],
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`
				// directory: './tsconfig.json',
				project: [
					'./tsconfig.json',
					'./tsconfig.node.json',
					'./tsconfig.app.json',
					'./tsconfig.vitest.json',
					'./tsconfig.prod.json',
				],
			},
			node: {
				extensions: ['.ts', '.tsx', '.js', '.json'],
			},
			alias: [['@', './src']],
		},
		react: {
			version: 'detect',
		},
		// "import/ignore": ["@types"], // Weirdly eslint cannot resolve exports in types folder (try removing this later)
	},

	reportUnusedDisableDirectives: true,
};
