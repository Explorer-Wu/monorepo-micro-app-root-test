import { AxiosRequestConfig } from 'axios';
import Qs from 'qs';

let toString = Object.prototype.toString;

/**
 * 判断是否是一个字符串
 * @param {Object} val
 * @returns {boolean}
 */
export function isString(val: any): boolean {
	return typeof val === 'string';
}

/**
 * 判断是否是 undefined
 * @param {Object} val
 * @returns {boolean}
 */
function isUndefined(val: any): boolean {
	return typeof val === 'undefined';
}

/**
 * 判断是否是对象
 * @param {Object} val
 * @returns {boolean}
 */
function isObject(val: any): boolean {
	return val !== null && typeof val === 'object';
}

/** 判断值是否为某个类型 */
export function isTypeFn(val: unknown, type: string) {
	return toString.call(val) === `[object ${type}]`;
}

/**
 * 判断是否是一个函数
 * @param {Object} val
 * @returns {boolean}
 */
export function isFunction<T = Function>(val: unknown): val is T {
	// return toString.call(val) === '[object Function]';
	return isTypeFn(val, 'Function');
}

/**
 * 判断对象是否是普通对象
 * @param {Object} val
 * @return {boolean}
 */
export function isPlainObject(val: unknown): val is Object {
	if (!isTypeFn(val, 'Object')) {
		return false;
	}

	var prototype = Object.getPrototypeOf(val);
	return prototype === null || prototype === Object.prototype;
}

/**
 * 判断是否是数组
 * @param {Object} val
 * @returns {boolean}
 */
export function isArray(val: unknown): boolean {
	return isTypeFn(val, 'Array');
}

/**
 * 判断是否可以使用 URLSearchParams, 浏览器和Node环境均可使用, 但低版本浏览器要使用需要安装 npm install --save url-search-params
 * URLSearchParams 能帮助你快速解析URL中的参数请求, 也能帮助你快速拼接URL中需要的参数形式
 * @param {Object} val
 * @returns {boolean}
 */
export function isURLSearchParams(val: any): boolean {
	return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * 判断是否是日期类型
 * @param {Object} val
 * @returns {boolean}
 */
export function isDate(val: any): boolean {
	return isTypeFn(val, 'Date');
}

/**
 * 判断是否是 FormData 对象
 * @param {Object} val
 * @returns {boolean}
 */
export function isFormData(val: any): val is Object {
	// return typeof val !== 'undefined' && val instanceof FormData;
	return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * 判断是否是一个 ArrayBuffer 类型
 * @param {Object} val
 * @returns {boolean}
 */
export function isArrayBuffer(val: any): boolean {
	return isTypeFn(val, 'ArrayBuffer');
}

/**
 * 判断是否是一个 Buffer 类型
 * @param {Object} val
 * @returns {boolean}
 */
export function isBuffer(val: any): boolean {
	return (
		val !== null &&
		!isUndefined(val) &&
		val.constructor !== null &&
		!isUndefined(val.constructor) &&
		typeof val.constructor.isBuffer === 'function' &&
		val.constructor.isBuffer(val)
	);
}

/**
 * 判断是否是一个 Stream 类型
 * @param {Object} val
 * @returns {boolean}
 */
export function isStream(val: any): boolean {
	return isObject(val) && isFunction(val.pipe);
}

/**
 * 判断是否是一个 File 类型
 * @param {Object} val
 * @returns {boolean}
 */
export function isFile(val: any): boolean {
	return isTypeFn(val, 'File');
}

/**
 * 判断是否是一个 Blob 类型
 * @param {Object} val
 * @returns {boolean}
 */
export function isBlob(val: any): boolean {
	return isTypeFn(val, 'Blob');
}

/**
 * 判断是否是一个 isArrayBufferView
 * @param {Object} val
 * @returns {boolean}
 */
export function isArrayBufferView(val: any): boolean {
	var result;
	if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
		result = ArrayBuffer.isView(val);
	} else {
		result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	}
	return result;
}

/**
 * 去除头尾空格
 * @param {String} str
 * @returns {String}
 */
export function trim(str: string): string {
	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

export type IsCacheObj<T> = {
	get(key: string): T | undefined;
	set(key: string, value: T): void;
} & ({ del(key: string): void } | { delete(key: string): void });

export function isCacheObj(cache: any): cache is IsCacheObj<any> {
	return (
		typeof cache.get === 'function' &&
		typeof cache.set === 'function' &&
		(typeof cache.delete === 'function' || typeof cache.del === 'function')
	);
}

/** 序列化请求等待参数 */
export function generateReqUrlKey(config: AxiosRequestConfig) {
	const { method, url, params, data } = config;
	return [method, url, Qs.stringify(params), Qs.stringify(data)].join('&');
}
