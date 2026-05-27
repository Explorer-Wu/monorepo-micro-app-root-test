// 判断字符串是否是JSON格式
export const isJSON = (str: any) => {
	if (typeof str === 'string') {
		try {
			const obj = JSON.parse(str);
			if (typeof obj === 'object' && obj) {
				return true;
			}
			return false;
		} catch (e) {
			console.log(`error：${str}!${e}`);
			return false;
		}
	}
	return false;
};

export function getStrParams(data: any) {
	let arr = [];
	for (let key in data) {
		if ({}.hasOwnProperty.call(data, key)) {
			let item = data[key];
			arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`);
		}
	}
	return arr.join('&');
}
