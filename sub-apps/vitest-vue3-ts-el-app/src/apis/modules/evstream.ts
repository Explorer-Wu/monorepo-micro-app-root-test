const eventSource = new EventSource('/messages');

eventSource.onmessage = function (event) {
	console.log(event.data); // 在控制台中打印生成的内容
};
