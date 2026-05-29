import { fileURLToPath } from 'node:url';
import { type UserConfig, defineConfig, mergeConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import type { InlineConfig } from 'vitest/node';
import viteConfig from './vite.config';

interface VitestConfigExport extends UserConfig {
	test: InlineConfig;
}

export default defineConfig(configEnv =>
	mergeConfig(viteConfig(configEnv), {
		test: {
			globals: true,
			root: fileURLToPath(new URL('./', import.meta.url)),
			setupFiles: ['./tests/setup.ts'],
			environment: 'jsdom',
			include: ['**/*.{test,spec,e2e-spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
			includeSource: ['tests/*.{js,jsx,ts,tsx}', 'tests/**/*.{js,jsx,ts,tsx}'],
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
				provider: 'v8', // 明确指定覆盖率提供者
				reporter: ['text', 'html', 'json'],
				// 排除规则
				exclude: [...configDefaults.exclude, 'tests/**', '**/*.config.*', '**/node_modules/**'],
			},
			transformMode: {
				web: [/\.[jt]sx$/],
			},
			css: true,
			testTimeout: 10000, // 测试超时间
			hookTimeout: 10000, // hook超时间
		},
	}),
);
