import { asyncApi } from '../index';
// import type { ApiFnMap } from '../../typings';

/**
 * 登录接口
 */
export function testListApi() {
	return asyncApi({
		url: '/api/articles',
		method: 'get',
		authtoken: false,
	});
}
