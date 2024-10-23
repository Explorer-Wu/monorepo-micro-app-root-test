// import Vue from 'vue';
import ElMessage from 'element-plus';
import axios from 'axios';
import { getStringParams } from '@/utils/index';
import { exportLoadFile } from '../utils/exportFile';

const isProd = ['production', 'uat', 'preview', 'sit'].includes(process.env.NODE_ENV);
const AppBaseURL = process.env.VUE_APP_BASE_API;

export default function request(options) {
	const instance = axios.create({
		baseURL: isProd ? AppBaseURL : process.env.BASE_URL
		// withCredentials: true,
		// credentials: 'include',
		timeout: 5 * 1000,
	});
	//自定义配置
	let extraOptions = {
		$quiet: options.$quiet || false, //默认弹出message提示
	};

	const errorConfig = {
		400: '错误请求',
		401: '未授权，请重新登录',
		403: '拒绝访问',
		404: '请求错误，未找到资源',
		408: '请求超时',
		500: '服务端出错',
		502: '网络错误',
		503: '服务不可用',
		504: '网络超时',
		505: 'http版本不支持该请求',
	};

	const errorHandle = (error, errorStatus) =>
		errorConfig[errorStatus] || `连接错误${error.response.status}`;
	const handleMessageError = (msg, traceId = '') => {
		ElMessage({
			message: `${msg} ${traceId}` || '系统错误，稍后再试',
			type: 'error',
			duration: 5 * 1000,
		});
	};

	// 拦截器
	const interceptors = {
		request: {
			config: config => {
				if (config.responseType === 'arraybuffer') {
					config.timeout = 300 * 1000;
				}
				// const token = Vue.ls.get(ACCESS_TOKEN);
				// if (token) {
				//   config.headers[ 'X-Access-Token' ] = token; // 让每个请求携带自定义 token 请根据实际情况自行修改
				// }

				// let tenantid = Vue.ls.get(TENANT_ID);
				// if (!tenantid) {
				//   tenantid = 0;
				// }
				// config.headers[ 'tenant-id' ] = tenantid;
				config.headers['Access-Control-Allow-Credentials'] = true;
				return config;
			},
			error: error => Promise.reject(error),
		},
		response: {
			response: response => {
				const { code, data, msg } = response.data || {};

				if (
					response.headers &&
					response.headers['content-type'].indexOf('application/octet-stream') !== -1
				) {
					exportLoadFile(response);
				}
				// if the custom code is not 200, it is judged as an error.
				if (code && code !== 200) {
					!extraOptions.$quiet && handleMessageError(msg);

					return Promise.reject(new Error(msg || '系统错误，稍后再试'));
				}

				return data;
			},
			error: error => {
				// eslint-disable-next-line
				if (error && error.response.status) {
					error.message = errorHandle(error, error.response.status);
				}
				if (error.message.includes('timeout')) error.message = '网络请求超时！';
				!extraOptions.$quiet && handleMessageError(error.message);

				return Promise.reject(error);
			},
		},
	};

	// request interceptor
	instance.interceptors.request.use(interceptors.request.config, interceptors.request.error);

	// response interceptor
	instance.interceptors.response.use(interceptors.response.response, interceptors.response.error);
	// return instance(options);
	return instance(options);
}
