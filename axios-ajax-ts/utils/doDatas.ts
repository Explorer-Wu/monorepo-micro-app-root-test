import Qs from 'qs';
import {
	isPlainObject,
	isFormData,
	isArrayBuffer,
	isBuffer,
	isStream,
	isFile,
	isBlob,
	isArrayBufferView,
	isURLSearchParams,
} from './tools';
// Header 属性标准化
function normHeaderName(headers: any, headName: string): void {
	if (!headers) return;
	for (let name of Object.keys(headers)) {
		if (name !== headName && name.toLocaleUpperCase() === headName.toLocaleUpperCase()) {
			headers[headName] = headers[name];
			delete headers[name];
		}
	}
}
// 设置请求头
function setContentType(headers: any, value: string): void {
	if (!headers || !headers['Content-Type']) {
		headers['Content-Type'] = value;
	}
}

export function transformReqHeaderData(headers: any, data: any): any {
	normHeaderName(headers, 'Accept');
	normHeaderName(headers, 'Content-Type');

	if (
		isFormData(data) ||
		isArrayBuffer(data) ||
		isBuffer(data) ||
		isStream(data) ||
		isFile(data) ||
		isBlob(data)
	) {
		return data;
	}

	if (isArrayBufferView(data)) return data.buffer;

	if (isURLSearchParams(data)) {
		// 如果请求的参数data是一个 URLSearchParams 对象, 则会自动设置特殊的请求头
		setContentType(headers, 'application/x-www-form-urlencoded;charset=utf-8');
		return data.toString();
	}

	// if (headers['Content-Type'] === 'application/json') {
	// 	headers.post['Content-Type'] = 'application/json';
	// 	headers.put['Content-Type'] = 'application/json';
	// 	headers.patch['Content-Type'] = 'application/json';
	// 	if (isPlainObject(data)) {
	// 		return JSON.stringify(data);
	// 	}
	// 	return data;
	// }

	// 参数序列化
	if (isPlainObject(data) && ((headers && !headers['Content-Type']) || !headers.isFormdata)) {
		headers['Content-Type'] = 'application/json;charset=utf-8';
		return JSON.stringify(data); // Qs.stringify(data);
	}

	return data;
}

export function transformResData(data: any): any {
	if (typeof data === 'string' && !!data) {
		try {
			console.log('transformResData:', data);
			data = JSON.parse(data);
		} catch (e: any) {
			// do nothing
			// throw e;
		}
	}
	return data;
}

// export const MemoryCache = {
// 	data: {} as any,
// 	set(key: string | number, value: any, maxAge: number): void {
// 		// 保存数据
// 		this.data[key] = {
// 			maxAge: maxAge || 0,
// 			value,
// 			now: Date.now(),
// 		};
// 	},
// 	get(key: string | number) {
// 		// 从缓存中获取指定 key 对应的值。
// 		const cachedItem = this.data[key];
// 		if (!cachedItem) return null;
// 		const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge;
// 		isExpired && this.delete(key);
// 		return isExpired ? null : cachedItem.value;
// 	},
// 	delete(key: string | number) {
// 		// 从缓存中删除指定 key 对应的值。
// 		return delete this.data[key];
// 	},
// 	clear() {
// 		// 清空已缓存的数据。
// 		this.data = {};
// 	},
// };
let datacache: any = {};
const proxyhandler = {
	set(target: any, key: string | symbol, value: any, receiver: any): boolean {
		// 保存数据
		// Reflect.set(...arguments);
		Reflect.set(
			target,
			key,
			{
				maxAge: value!.maxAge || 0,
				value: value.value,
				now: Date.now(),
			},
			receiver,
		);
		return true;
	},
	get(target: any, name: string | symbol, receiver: any) {
		console.log('get', target, name);
		// 从缓存中获取指定 name 对应的值。
		const cachedItem = Reflect.get(target, name);
		if (!cachedItem) return null;
		const isExpired = Date.now() - cachedItem.now > cachedItem.maxAge;
		isExpired && Reflect.deleteProperty(target, name);
		return isExpired ? null : cachedItem.value;
	},
	deleteProperty(target: any, name: string | symbol) {
		return Reflect.deleteProperty(target, name);
	},
	ownKeys(target: any) {
		// 清空已缓存的数据。
		// this.data = {};
		for (const key of Reflect.ownKeys(target)) {
			Reflect.deleteProperty(target, key);
		}
		return [];
	},
};
export const MemoryCache = new Proxy(datacache, proxyhandler);
