// import { cookiesFn, storageSessionFn } from 'axios-ajax-ts';
import { asyncModuleApi } from '../index';
import type { ApiFnMap } from '$types/axios';

// const { get: getCookie, set: setCookie, remove: delCookie } = cookiesFn;

const ApiAiOpts = [
	// 生成内容接口
	{
		name: 'generateConApi',
		url: '/ai-ollama/api/generate',
		method: 'post',
		authtoken: true,
		headers: {
			// isFormdata: false,
			'Content-Type': 'application/json',
		},
		isAi: true,
	},
	// 生成聊天问答接口
	{
		name: 'generateChatApi',
		url: '/ai-ollama/api/chat',
		method: 'post',
		// authtoken: true,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},
	// 创建模型接口
	{
		name: 'createModeApi',
		url: `/ai-ollama/api/create`,
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},
	// 核验一个 Blob 文件是否存在 (digest: string)
	{
		name: 'checkBlobApi',
		url: `/ai-ollama/api/blobs/`, // :digest
		method: 'head',
		authtoken: false,
		isAi: true,
	},
	// 创建一个 Blob 文件
	{
		name: 'createBlobApi',
		url: '/ai-ollama/api/blobs/:digest',
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},
	// 获取本地模型列表
	{
		name: 'getLocalModeLisApi',
		url: `/ai-ollama/api/tags`,
		method: 'get',
		authtoken: false,
		isAi: true,
	},
	// 请求显示一个模型信息
	{
		name: 'showModeApi',
		url: '/ai-ollama/api/show',
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},
	// 拷贝一个模型
	{
		name: 'copyModeApi',
		url: '/ai-ollama/api/copy',
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},

	// 删除一个模型
	{
		name: 'delModeApi',
		url: '/ai-ollama/api/delete',
		method: 'DELETE',
		authtoken: false,
		isAi: true,
	},

	// 拉取一个模型
	{
		name: 'pullModeApi',
		url: '/ai-ollama/api/pull',
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},

	// 发布一个模型
	{
		name: 'pushModeApi',
		url: '/ai-ollama/api/push',
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},

	// 生成嵌套模版
	{
		name: 'generateEmbedApi',
		url: '/ai-ollama/api/embed',
		method: 'post',
		authtoken: false,
		headers: {
			'Content-Type': 'application/json',
		},
		isAi: true,
	},
	// 正在运行的模型列表
	{
		name: 'runningModelsApi',
		url: '/ai-ollama/api/ps',
		method: 'get',
		authtoken: false,
		isAi: true,
	},
];

export const ApiAis: ApiFnMap = asyncModuleApi(ApiAiOpts);
