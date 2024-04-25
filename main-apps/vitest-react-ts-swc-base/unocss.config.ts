// uno.config.ts
import {
	defineConfig,
	presetAttributify,
	presetIcons,
	presetTypography,
	presetUno,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup,
} from 'unocss';

export default defineConfig({
	// 组合样式 自定义
	shortcuts: {
		'flex-between': 'flex justify-between items-center',
		'flex-center': 'flex justify-center items-center',
	},
	rules: [
		['flex', { display: 'flex' }],
		// ['green', { color: 'green' }],
		['font28', { 'font-size': '28px' }],
		[/^m-(\d+)$/, ([, d]) => ({ margin: `${Number(d) * 10}px` })],
		[/^w-(\d+)$/, ([, d]: any) => ({ width: `${d / 4}rem` })],
		[/^h-(\d+)$/, ([, d]: any) => ({ height: `${d / 4}rem` })],
	],
	// theme: {
	// 	colors: {
	// 		primary: 'var(--adm-color-primary)',
	// 		text: 'var(--adm-color-text)',
	// 		sed: 'var(--adm-color-text-secondary)',
	// 		light: 'var(--adm-color-light)',
	// 	},
	// },
	presets: [
		presetUno(),
		presetAttributify(),
		// presetIcons(),
		presetIcons({
			scale: 1.2,
			warn: true,
		}),
		presetTypography(),
		presetWebFonts({
			provider: 'google',
			fonts: {
				sans: 'Roboto',
				mono: ['Fira Code', 'Fira Mono:400,700'],
				lobster: 'Lobster',
				lato: [
					{
						name: 'Lato',
						weights: ['400', '700'],
						italic: true,
					},
					{
						name: 'sans-serif',
						provider: 'none',
					},
				],
			},
		}),
	],
	transformers: [transformerDirectives(), transformerVariantGroup()],
});
