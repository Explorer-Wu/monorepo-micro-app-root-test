/*
 * https://jestjs.io/docs/configuration
 */
// import type { Config } from 'jest';
// import path from 'path';

const path = require('path');
const { pathsToModuleNameMapper } = require('ts-jest');
const { defaults: tsjPreset } = require('ts-jest/presets');
const { compilerOptions } = require('./tsconfig.test');

module.exports = {
	// 测试根目录
	rootDir: path.resolve(__dirname, './'),
	// Jest 的检索文件的根目录， 类似于webpack的alias配置，可以自行定义多个路径别名
	roots: ['<rootDir>/src/', '<rootDir>/tests/'],
	// globals: {
	// 	'ts-jest': {
	// 		// 指定ts config文件
	// 		tsconfig: '<rootDir>/tsconfig.test.json',
	// 		// 使用esm而非commonjs
	// 		useESM: true,
	// 		// 执行单测时不校验 ts 类型
	// 		// isolatedModules: true,
	// 	},
	// 	__DEV__: true,
	// },
	extensionsToTreatAsEsm: ['.ts', '.tsx'],
	preset: 'ts-jest',
	// preset: 'ts-jest/presets/js-with-ts-esm',
	/**
	 * setupFiles 是在 引入测试环境（比如下面的 jsdom）之后, 测试框架准备好之前就开始执行
	 * 这个选项用于指定在 Jest 启动之前执行的文件。
	 * 它通常用于在测试环境设置之前进行一些全局的配置（一些代码配置，或者环境变量）
	 * 比如引入 polyfills、全局变量或其他初始化操作
	 */
	// setupFiles: ['react-app-polyfill/jsdom'], // '<rootDir>/tests/globalSetup.ts'
	// setupFilesAfterEnv 则是在 测试框架准备好 但还没执行测试文件的阶段开始执行。
	// 可以引入和配置 Jest/ Jasmine（Jest 内部使用了 Jasmine） 插件
	setupFilesAfterEnv: ['<rootDir>/tests/jestSetup.ts'],

	/**
	 * 模块路径， 一个可选的用来设置 NODE_PATH 环境变量的配置
	 * 值为一个用来表示需要模块额外去查找的路径的绝对路径的数组
	 * node默认引入模块是去查找node_modules下的模块，这个配置项可以配置一些别的查找路径
	 **/
	modulePaths: [compilerOptions.baseUrl], // ['<rootDir>/node_modules', '<rootDir>/src', '<rootDir>/tests'],
	moduleDirectories: ['node_modules', 'src', 'tests'],
	// 模块名映射
	moduleNameMapper: {
		// "^react-native$": "react-native-web",

		'^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|png)$': '<rootDir>/tests/__mocks__/fileMock.js',

		'^.+\\.svg$': 'jest-transformer-svg',
		// Used to dedupe `styled-component` when run `npm link` in development
		// '^styled-components$': '<rootDir>/node_modules/styled-components',
		// Support import ~
		// '^~(.*)': '<rootDir>/node_modules/$1',
		// '^@/api': '<rootDir>/src/api/$1',
		'^@/(.*)$': '<rootDir>/src/$1',
		// ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	},
	// 模块文件扩展
	moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'cjs', 'mjs', 'json', 'node'],
	// 测试环境： node/jsdom，可以使用 js 的注释语法指定 @jest 的测试环境
	testEnvironment: 'jsdom',
	testEnvironmentOptions: {
		url: 'http://localhost',
		browsers: ['chrome', 'firefox', 'safari'],
	},
	testMatch: [
		'<rootDir>/tests/?(*.)+(spec|test|unit).ts?(x)',
		'<rootDir>/tests/**/?(*.)+(spec|test|unit).ts?(x)',
		'<rootDir>/tests/**/**/?(*.)+(spec|test|unit).ts?(x)',
		'**/?(*.)+(spec|test|unit).[tj]s?(x)', // 匹配测试文件 [jt]s?(x)
		'<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
		'<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
	],
	testPathIgnorePatterns: ['/node_modules/'],
	// watchPathIgnorePatterns: [ "/node_modules/" ],
	// 自定义使用的监听文件变化的插件数组
	// watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
	// 转换器
	transform: {
		// ...tsjPreset.transform,
		// 将.js后缀的文件使用babel-jest处理
		'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // "@swc/jest",
		// '^.+\\.(ts|tsx)$': 'ts-jest',
		'^.+\\.{ts|tsx}?$': [
			'ts-jest',
			{
				useESM: true,
				babel: true,
				babelConfig: true,
				plugins: ['babel-plugin-transform-import-meta'],
				tsConfig: 'tsconfig.test.json',
			},
		],
		// '.*\\.html$': 'jest-raw-loader',
		// "^.+\\.css$": "<rootDir>/tests/config/cssTransform.ts",
		// '.+\\.(css|styl|less|sass|scss|png|jpg|jpeg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
		'\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/tests/config/fileTransform.js',
	},
	// 转换器要忽略的路径(使用正则匹配)
	// 将不忽略 lodash-es, other-es-lib 这些es库, 从而使babel-jest去处理它们
	transformIgnorePatterns: [
		'<rootDir>/node_modules/',
		'<rootDir>/node_modules/(?!(lodash-es|other-es-lib))',
		// "<rootDir>/node_modules/(?!camelcase)",
		// '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'[/\\\\]node_modules/(?!(antd)/)[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
		'^.+\\.module\\.(css|less|sass|scss)$',
		// 'node_modules/(?!(module-that-needs-to-be-transformed)/)',
	],

	// 是否应该收集测试覆盖率
	collectCoverage: true,
	// Jest 输出覆盖的目录
	coverageDirectory: 'coverage',
	// 收集测试覆盖率报告的文件来源
	collectCoverageFrom: [
		// "src/**/*.{js,jsx,ts,tsx}",
		'tests/**/*.{ts,tsx}',
		'!types/**/*.d.ts',
		'!src/**/*.d.ts',
		'!src/assets/**',
		'!src/mock/**',
	],
	// 正则匹配忽略覆盖收集路径
	coveragePathIgnorePatterns: ['/node_modules/', '/scripts/', '/public/', '/coverage/'],
	coverageReporters: ['html', 'text-summary'], //报告的格式
	// 指定哪种程序确定代码覆盖率
	// coverageProvider: "v8" || "babel",
	resetMocks: true,
	clearMocks: true,
	// Stop running tests after `n` failures
	// bail: true,
	verbose: true,
};

// export default config;
