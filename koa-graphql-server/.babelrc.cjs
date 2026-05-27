module.exports = {
	presets: [
		'@babel/core',
		'@babel/preset-stage-3',
		'@babel/polyfill',
		[
			'latest-node',
			{
				target: 'current',
			},
		],
		'@babel/preset-typescript',
		// '@babel/typescript',
	],
	/**
	 * "@babel/plugin-transform-modules-commonjs" 可以将 ESModule 模块转换为符合 Commonjs 规范的代码
	 * 当遇到 export {} 这样的表达式时，其转译的方案是：「直接忽略」
	 */
	plugins: ['@babel/plugin-transform-modules-commonjs', 'babel-plugin-transform-import-meta'], // , 'babel-plugin-transform-vite-meta-env'
};
