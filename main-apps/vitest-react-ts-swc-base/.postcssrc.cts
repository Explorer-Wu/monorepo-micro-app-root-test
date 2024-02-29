import type { Config, ConfigContext } from 'postcss-load-config';
// import autoprefixer from 'autoprefixer';
// import postcssPresetEnv from 'postcss-preset-env';
// import postCssPxToRem from 'postcss-pxtorem';
// import cssnano from 'cssnano';

// postcss 为 CSS 规则添加特定厂商的前缀。 Autoprefixer 自动获取浏览器的流行度和能够支持的属性，并根据这些数据帮你自动为 CSS 规则添加前缀
module.exports = (ctx: ConfigContext): Config => ({
	parser: ctx.parser ? 'sugarss' : false, // 解析器
	map: ctx.env === 'development' ? ctx.map : false, // map文件
	// 配置插件
	plugins: {
		// 自动添加 CSS3 前缀
		autoprefixer: {
			overrideBrowserslist: ['> 1%', 'last 10 versions', 'Chrome > 31', 'ff > 31', 'not ie <= 10'],
			grid: true,
		},
		// 使用最新的 CSS 语法，自动添加前缀，为浏览器按需加载 polyfill
		'postcss-preset-env': {
			// autoprefixer: {
			//   flexbox: 'no-2009',
			// },
			stage: 3, // 这个阶段稳定变化不大，可能成为标准
			browsers: 'last 10 versions',
		},

		'postcss-pxtorem': {
			/** 换算的基数 **/
			// rootValue({ file }) {
			// 基准分辨率宽度/100
			//   return file.indexOf('visualscreen') !== -1 ? 12.8 : 19.2;
			// },
			rootValue: 19.2,
			// 保留rem小数点位数
			unitPrecision: 6,
			// 这里设置为['*']全部，需要被转换的属性 ['!border*', 'font', 'font-size', 'line-height', 'letter-spacing', 'word-spacing']
			propList: ['*'],
			// 不进行px转换的选择器, 忽略转换正则匹配项, 支持正则和字符串写法
			selectorBlackList: [/^html$/],
			// 替换包含rem的规则
			replace: true,
			// 允许在媒体查询中转换px（布尔值）
			mediaQuery: false,
			minPixelValue: 3, // 设置要替换的最小像素值(3px会被转rem)。 默认 0
			// 默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/node_modules/i,
			exclude(file) {
				if (file.indexOf('screen') !== -1) console.log('pxtorem-file:', file);
				// 排除不需要px转换rem的文件
				return file.indexOf('screen') === -1;
			},
		},

		// // 允许使用 import
		// 'postcss-import': {},
		// // css 嵌套
		// 'postcss-nested': {},
		// 一个模块化的 CSS 压缩器
		cssnano: ctx.env === 'production' ? {} : false,
		'postcss-plugin': 'internal:charset-removal',
		'at-rule': {
			charset: atRule => {
				if (atRule.name === 'charset') {
					atRule.remove();
				}
			},
		},
	},
});
