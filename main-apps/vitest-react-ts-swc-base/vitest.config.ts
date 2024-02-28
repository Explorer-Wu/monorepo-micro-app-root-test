import { fileURLToPath } from 'node:url';
import swc from 'unplugin-swc';
import { mergeConfig, defineConfig } from 'vite';
import type { InlineConfig, UserConfig } from 'vitest';
import { configDefaults } from 'vitest/config'; // { defineConfig }
import viteConfig from './vite.config';

interface VitestConfigExport extends UserConfig {
	test: InlineConfig;
}

/**
 * mergeConfig 只接受对象形式的配置。
 * 如果有一个回调形式的配置，应该在将其传递给 mergeConfig 之前先调用该回调函数，将其转换成对象形式
 */
export default defineConfig(configEnv =>
	mergeConfig(viteConfig(configEnv), {
		test: {
			// 默认情况下，vitest 不显式提供全局 API。如果你更倾向于使用类似 jest 中的全局 API，可以将 --globals 选项传递给 CLI 或在配置中添加 globals: true。
			globals: true,
			root: fileURLToPath(new URL('./', import.meta.url)),
			setupFiles: ['./tests/setup.ts'],
			environment: 'jsdom',
			// 匹配包含测试文件的 glob 规则
			include: ['**/*.{test,spec,e2e-spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
			includeSource: ['tests/*.{js,jsx,ts,tsx}', 'tests/**/*.{js,jsx,ts,tsx}'],

			// 匹配排除测试文件的 glob 规则
			exclude: [
				...configDefaults.exclude,
				'**/node_modules/**',
				'e2e/*',
				'../dist/**',
				'../cypress/**',
				'**/.{idea,git,cache,output,temp}/**',
				'**/{karma,rollup,vite,vitest,jest,ava,swc,nyc,cypress,tsup,build}.config.*',
			],
			alias: [
				{
					find: '@/',
					replacement: fileURLToPath(new URL('./src/', import.meta.url)),
				},
				{
					find: /^tests/,
					replacement: fileURLToPath(new URL('./tests', import.meta.url)),
				},
			],
			coverage: {
				reporter: ['text', 'html'],
			},
			transformMode: {
				web: [/\.[jt]sx$/],
			},
			// you might want to disable it, if you don't have tests that rely on CSS
			// since parsing CSS is slow
			css: true,
		},
		plugins: [
			// This is required to build the test files with SWC
			swc.vite({
				// Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
				module: { type: 'es6' },
			}),
		],
	} as VitestConfigExport),
);
