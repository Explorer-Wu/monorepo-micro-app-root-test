import { cookiesFn, storageSessionFn } from 'axios-ajax-ts';

import { asyncApi } from '../index';
// import type { ApiFnMap } from '$types/axios';

// const { get: getCookie, set: setCookie, remove: delCookie } = cookiesFn;
const {
	// get: getSession,
	set: setSession,
	// remove: delSession,
	// clear: clearSession,
} = storageSessionFn;

setSession('ai_auth', import.meta.env.APP_AI_DIFY_APP_KEY);

export function sendMsgesApi() {
	return asyncApi(
		{
			url: '/ai-dify/chat-messages',
			method: 'post',
			authtoken: true,
			headers: {
				// isFormdata: false,
				'Content-Type': 'application/json',
			},
		},
		true,
	);
}

export function stopMsgesApi(taskid: string | number) {
	return asyncApi(
		{
			url: `/ai-dify/chat-messages/:${taskid}/stop`,
			method: 'post',
			authtoken: false,
			headers: {
				'Content-Type': 'application/json',
				// isFormdata: false,
			},
		},
		true,
	);
}

/**
 * 消息反馈（点赞）
 * 消息终端用户反馈、点赞，方便应用开发者优化输出预期。
 * @returns
 */
export function feedbackMsgesApi(msgid: string) {
	return asyncApi(
		{
			url: `/ai-dify/messages/:${msgid}/feedbacks`,
			method: 'post',
		},
		true,
	);
}

/**
 * 上传文件（目前仅支持图片）并在发送消息时使用，可实现图文多模态理解。
 * 支持 png, jpg, jpeg, webp, gif 格式。
 * 上传的文件仅供当前终端用户使用
 **/
export function uploadAiFileApi() {
	return asyncApi(
		{
			url: '/ai-dify/files/adlopu',
			method: 'post',
		},
		true,
	);
}

// 获取下一轮建议问题列表
export function suggestedListApi(msgid: string) {
	return asyncApi(
		{
			url: `/ai-dify/messages/${msgid}/suggested`,
			method: 'get',
		},
		true,
	);
}
