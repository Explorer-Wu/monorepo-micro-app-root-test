import { debounce } from 'lodash-es';

const docEl: HTMLElement = (document as Document).documentElement;
const docBody: HTMLElement = (document as Document).body;
// 定义可视窗口宽高
let vW = (window as Window & typeof globalThis).innerWidth || docBody.clientWidth || docEl.clientWidth;
let vH = (window as Window & typeof globalThis).innerHeight || docBody.clientHeight || docEl.clientHeight;

let dpr = (window as Window & typeof globalThis).devicePixelRatio || 1;

// 定义基准单位
const baseSize: number = 10; // 19.2;

export function winScale(): any {
	// if (!vW) return;
	try {
		if (!vW) throw new Error(`没有获取到可视窗口的宽度!`);

		if (vW < 1024) vW = 1024;
		if (vH < 600) vH = 600;

		// if (vW / dpr > 1920) {
		//   vW = 1920 * dpr;
		// }

		// 当前页面宽度相对于基准大屏分辨率 1920宽的缩放比例
		let scale = vW / 1920;
		// 基准大屏分辨率1920/1680 标准比例 16 / 9
		const radio = vW / vH;
		// 设置页面根节点字体大小, 字体大小最小值为10
		if (radio > 16 / 9) {
			scale = ((16 / 9) * vH) / 1920;
		}

		return scale;
	} catch (error: any) {
		console.error(error);
		return undefined;
	}
}

// 计算不同分辨率下像素
export function winFontSize(px: number): unknown {
	const scale = winScale();
	if (scale) return px * scale.toFixed(3);
	return undefined;
}

// 设置rem单位函数
function setRemUnit(): unknown {
	const scale = winScale();
	if (scale) return baseSize * scale.toFixed(3);
	return undefined;
}

// 设置 1rem = viewWidth / 10
let rem = setRemUnit();

export function setDocElFontSize() {
	docEl.style.fontSize = `${rem}px`;
}

// adjust body font size
export function setBodyFontSize() {
	if (docBody) {
		docBody.style.fontSize = `${rem}px`; // ${12 * dpr}
	} else {
		document.addEventListener('DOMContentLoaded', setBodyFontSize);
	}
}

setBodyFontSize();
setDocElFontSize();

// 防抖配置
const debounceConfig = {
	maxWait: 600, // 允许被延迟的最大值
	leading: false, // 指定在延迟开始前调用
	trailing: true, // 指定在延迟结束后调用
};

// reset rem unit on page resize
window.addEventListener(
	'resize',
	debounce(
		() => {
			setDocElFontSize();
		},
		300,
		debounceConfig,
	),
);

window.addEventListener(
	'pageshow',
	debounce(
		e => {
			if (e.persisted) {
				setDocElFontSize();
			}
		},
		300,
		debounceConfig,
	),
);
