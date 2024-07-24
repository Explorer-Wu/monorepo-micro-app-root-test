import { ReqOpts } from "axios-ajax-ts";

/** 自定义实例化接口配置类型 */
export interface ReqItem {
	name?: string;
	url: string;
	method?: string;
	authtoken?: boolean;
	// isFormdata?: boolean; 存headers里
	headers?: any;
}

export interface ApiFnMap {
	[propName: string]: <G = any>(opts: ReqOpts, sucmsg?: string, errmsg?: string) => Promise<false | G | undefined>;
}

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RequestOptions {
  // Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // Format request parameter time
  formatDate?: boolean;
  // Whether to process the request result
  isTransformResponse?: boolean;
  // Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  apiUrl?: string;
  // 请求拼接路径
  urlPrefix?: string;
  // Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // Whether to add a timestamp
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
  // 是否清空 空数据
  clearNull?: boolean
}

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}

export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  data: T;
}

export interface ResultList<T = any> {
  totalCount: number;
  totalPage: number;
  list: T;
}

// multipart/form-data: upload file
export interface UploadFileParams {
  // Other parameters
  data?: any; // Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
