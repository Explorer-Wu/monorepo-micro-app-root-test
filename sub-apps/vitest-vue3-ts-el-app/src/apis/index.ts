import { HttpAxios, type ReqOpts, type ResDataTypeMode } from 'axios-ajax-ts';
import { useRouter } from 'vue-router';

import type { ReqItem, ApiFnMap } from '$types/axios';
import { refreshToken } from './modules/auth';

const isProd = ['production', 'staging', 'testing'].includes(import.meta.env.MODE);
const envBaseUrlFn = (reqai: boolean) =>
	reqai ? import.meta.env.APP_AI_OLLAMA_API_URL : import.meta.env.APP_API_BASE_URL;

const $router = useRouter();
// export type UserResult = {
//   success: boolean
//   data: {
//     /** 用户名 */
//     username: string
//     /** `token` */
//     accessToken: string
//     /** 用于调用刷新`accessToken`的接口时所需的`token` */
//     refreshToken: string
//     /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
//     expires: Date
//   }
// }

export const httpAxios = (reqai: boolean) => {
	return new HttpAxios({
		isProd,
		envBaseUrl: isProd ? envBaseUrlFn(reqai) : import.meta.env.VITE_BASE_URL,
		// envUploadUrl: '',
		// envTokenKey: 'ai_auth',
		// envRefreshKey?: string,
		// router: any;
		// store: any;
		// loading?: ((target: string) => void);
		// closeLoading?: any | (() => void);
		// message,
		// goToLogin: () => $router.push('/auth/login'), // window.__globalRouter.globalNav('/auth/login'),
		// refreshTokenFn: refreshToken,
	});
};

export function asyncApi(req: ReqItem) {
	const { headers, url, method, authtoken, isAi } = req;
	return async <G = any>(opts: ReqOpts, sucmsg?: string, errmsg?: string): Promise<G | false> => {
		let queryData = JSON.parse(JSON.stringify(opts));
		console.log('api-opts:', opts);

		if (authtoken) {
			queryData = {
				...queryData,
				authtoken,
			};
		}

		try {
			const resData: any = await httpAxios(!!isAi).ajax({
				method: method || 'get',
				// url: (opts && opts.paramId) ? (url + opts.paramId) : url,
				url: opts?.paramId ? url + opts.paramId : url,
				headers: (headers as any) || {},
				...queryData,
			});
			if (!!isAi) {
				const { mode, created_at, message: chatMsg, done, done_reason } = await resData;

				if (mode && chatMsg) {
					if (sucmsg) {
						ElMessage.success(sucmsg);
					}
					return { mode, created_at, chatMsg, done, done_reason } as G;
				}
				throw new Error(errmsg);
			} else {
				const { code, data, message: msg }: ResDataTypeMode<G> = resData;
				if (code === 'success' || code === 0) {
					if (sucmsg) {
						ElMessage.success(sucmsg);
					}
					return data;
				}
				throw new Error(msg);
			}
		} catch (error: any) {
			console.log('ai-asyncApi-err:', error.cause);
			ElMessage.error(`${error.message ? error.message : errmsg}`);
			return false;
		}
	};
}

export function asyncModuleApi(reqs: ReqItem[]) {
	const apiFnMap: ApiFnMap = {};
	// this.reqlis.forEach((req: any) => {
	for (const req of reqs) {
		const { name } = req;

		apiFnMap[name!] = asyncApi(req);
	}

	return apiFnMap;
}
