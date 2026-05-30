import { isJSON } from './index';

export default class Socket {
	websocket: any;
	intervalTimer: any;
	timerCount!: number;
	params: any;
	lockReconnect!: boolean; //避免ws重复连接
	maxReconnectionDelay!: number; //最大重连时间
	minReconnectionDelay!: number; //最小重连时间
	reconnectionDelayGrowFactor!: number; //自动重连失败后重连时间倍数增长
	connectionTimeout!: number; //重连时间 10 * 1000
	timeout!: number; // 超时时间
	timeoutObj: any; // 计时器对象——向后端发送心跳检测
	serverTimeoutObj: any; // 计时器对象——等待后端心跳检测的回复
	connectSetTimeout: any; // 断开 重连倒计时
	isDestroyed!: boolean;

	constructor(params: any) {
		window.WebSocket = window.WebSocket || (window as any).MozWebSocket;
		if (!window.WebSocket) {
			// 检测浏览器支持
			console.error('您的浏览器不支持webscoket');
			return;
		}
		this.websocket = null;
		this.intervalTimer = null;
		this.timerCount = 0;
		this.params = params;
		this.lockReconnect = false;
		this.maxReconnectionDelay = 60 * 1000;
		this.minReconnectionDelay = 5 * 1000;
		this.reconnectionDelayGrowFactor = 1.5;
		this.connectionTimeout = 10 * 1000;
		this.timeout = params.timeout ? params.timeout : 2000;
		this.timeoutObj = null;
		this.serverTimeoutObj = null;
		this.connectSetTimeout = null;
		this.isDestroyed = false;
		// 是否连接成功
		// this.isConnect = false;

		this.createWebSocket();
		// this.socketInit(this.params);
		// clearInterval(this.intervalTimer);
	}

	createWebSocket() {
		try {
			// 初始化websocket连接
			this.socketInit(this.params);
		} catch (e) {
			console.log('尝试创建连接失败', e);
			// 如果无法连接上webSocket 那么重新连接！可能会因为服务器重新部署，或者短暂断网等导致无法创建连接
			this.reconnect();
		}
	}

	/**
	 * 初始化socket
	 * @param {string}   url     WebSocket服务器将响应的URL,必传。
	 * @param {function} onopen  open事件的回调函数
	 * @param {function} onclose close事件的回调函数
	 * @param {function} onerror error事件的回调函数
	 * @param {function} onclose close事件的回调函数
	 */
	socketInit({ url, onopen, onmessage, onerror, onclose }: any) {
		const that = this;
		if (url !== undefined) {
			this.websocket = new WebSocket(url);

			// 用于指定连接成功后的回调函数。
			this.websocket.onopen = (e: any) => {
				that.websocket.send('ping');
				if (typeof onopen === 'function') {
					onopen(e);
					//向服务器发送信息
					// this.websock.send(msg);
					//开启心跳
					that.start();
				}
			};
			// 用于指定当从服务器接受到信息时的回调函数。
			this.websocket.onmessage = (e: any) => {
				if (typeof onmessage === 'function') {
					// console.log('接收信息：', e);
					if (!['连接成功', 'pong'].includes(e.data)) {
						//收到服务器信息，心跳重置
						const res = isJSON(e.data) ? JSON.parse(e.data) : e.data;
						onmessage(res);
						that.reset();
					} else {
						// this.isConnect = true;
						// 开启心跳
						that.start();
					}
				}
			};
			// 用于指定连接关闭后的回调函数。
			this.websocket.onclose = (e: any) => {
				if (typeof onclose === 'function') {
					onclose(e);
				}
				// 重连
				that.reconnect();
			};
			// 用于指定连接失败后的回调函数。
			this.websocket.onerror = (e: any) => {
				if (typeof onerror === 'function') {
					onerror(e);
				} else {
					console.log('websocket连接异常:', e);
				}
				//重连
				that.reconnect();
			};
		}
	}

	// 手动关闭socket
	close(bool?: boolean): void {
		if (!this.websocket) {
			// eslint-disable-next-line
			console.log('websocket 不可用');
			return;
		}
		if (bool) this.isDestroyed = bool;
		// this.isConnect = false;
		// this.timeoutnum && clearTimeout(this.timeoutnum)
		this.timeoutObj && clearTimeout(this.timeoutObj);
		this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
		this.intervalTimer && clearInterval(this.intervalTimer);
		this.websocket.close();
	}

	//重置心跳
	reset() {
		// this.isConnect = false;
		//清除时间
		clearTimeout(this.timeoutObj);
		clearTimeout(this.serverTimeoutObj);
		//重置计数器
		this.timerCount = 0;
		//重启心跳
		this.start();
	}

	// 心跳检测启动
	start() {
		if (this.intervalTimer !== null) {
			clearInterval(this.intervalTimer);
			this.intervalTimer = null;
		}
		this.intervalTimer = setInterval(() => {
			this.sendTimer();
		}, 2000);

		this.timeoutObj && clearTimeout(this.timeoutObj);
		this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
		const that = this;
		this.timeoutObj = setTimeout(() => {
			// 这里向后端发送一个心跳检测，后端收到后，会返回一个心跳回复
			this.sendTimer();
			this.serverTimeoutObj = setTimeout(() => {
				// 如果超过一定时间还没重置计时器，说明websocket与后端断开了
				console.log('未收到心跳检测回复!');
				//超时关闭
				// if (!this.isConnect) that.close();
				if (this.websocket.readyState !== 1) {
					that.close();
				}
			}, this.timeout); // this.params.timeout ? this.timeout : this.connectionTimeout
		}, this.timeout);
	}

	sendTimer() {
		// eslint-disable-next-line no-warning-comments
		this.timerCount++; // 30
		//这里发送一个心跳，后端收到后，返回一个心跳消息，
		if (this.websocket.readyState === 1) {
			//如果连接正常
			this.websocket.send('ping');
			// console.log('发送心跳检测', this.timerCount);
		} else {
			//否则重连
			this.reconnect();
		}
	}

	/**
	 * 重新连接
	 * @param {function} fn回调函数
	 */
	reconnect(fn?: Function): void {
		const that = this;

		if (this.lockReconnect || this.isDestroyed) return; // false
		this.lockReconnect = true;
		//没连接上会一直重连，设置延迟避免请求过多
		that.connectSetTimeout && clearTimeout(that.connectSetTimeout);
		this.connectSetTimeout = setTimeout(() => {
			// 没连接上会一直重连，设置延迟避免请求过多
			if (fn) {
				fn();
			} else {
				that.socketInit(that.params);
			}
			that.lockReconnect = false;
		}, this.connectionTimeout);

		if (
			this.connectionTimeout >= this.minReconnectionDelay &&
			this.connectionTimeout < this.maxReconnectionDelay
		) {
			this.connectionTimeout = this.connectionTimeout * this.reconnectionDelayGrowFactor;
		} else {
			this.connectionTimeout = this.minReconnectionDelay;
		}
	}
}
