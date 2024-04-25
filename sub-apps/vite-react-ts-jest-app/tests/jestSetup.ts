import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';

window.matchMedia = query => ({
	matches: false,
	media: query,
	onchange: null,
	addEventListener: jest.fn(),
	removeEventListener: jest.fn(),
	dispatchEvent: jest.fn(),
	addListener: jest.fn(),
	removeListener: jest.fn(),
});

Object.defineProperty(URL, 'createObjectURL', {
	writable: true,
	value: jest.fn(),
});

// linaria 是通过 babel 插件将其预编译为 class 名的, 这里可以 mock 一下 css 函数, 返回一个随机值作为 class 名
// jest.mock('linaria', () => ({
// 	css: jest.fn(() => Math.floor(Math.random() * 10 ** 9).toString(36)),
// }));
