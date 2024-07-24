import { Ollama } from '@langchain/community/llms/ollama';
import MarkdownIt from 'markdown-it';

const ollama = new Ollama({
	baseUrl: import.meta.env.APP_AI_OLLAMA_API_URL,
	model: 'llama3',
});

const txtAnswer = async (question: string) => await ollama.invoke(question);

const md = new MarkdownIt();
// const chatArr = [];

async function replayFnc(props: any) {
	const data = `
  你需要扮演一个智能ai对话助理，你需要用中文来回答用户向你提问的问题,以下就是你需要回答的问题:
  ${props.sendMessage}
  `;
	// const replayMessage = md.render(await ollama.invoke(data));
	const response = await ollama.stream(data); //读取流
	//读取到数据之后，加载完毕
	props.chatArr[props.chatArr.length - 1].loading = false;

	//判断是否进入了代码区域中
	const code = ref(false);
	//记录代码内原始文本
	const codedata = ref('');
	//记录进入code前
	let codeSaveCharContent = '';
	//记录一般情况
	let normalSaveCharContent = '';
	for await (const chunk of response) {
		//因为读下来的respone还是promise数据,所以还需要加await
		console.log(chunk); //此时拿到的chunk就是传输过来的一段段的字符或者字符串
		//处理code
		if (chunk === '```' || code.value) {
			if (!code.value) {
				// 一点点传进列表中，就会动态显示在界面了
				// props.chatArr[props.chatArr.length - 1] = props.chatArr[props.chatArr.length - 1] + chunk;
				//储存刚刚进入code的charArr内容
				codeSaveCharContent = props.chatArr[props.chatArr.length - 1].content;
				//先围起来
				codedata.value = codedata.value + chunk;
				//先搞出代码框
				props.chatArr[props.chatArr.length - 1].content =
					props.chatArr[props.chatArr.length - 1].content + md.render(chunk + ' ' + chunk);
				code.value = true;
				continue;
			} else if (chunk === '```' && code.value) {
				//处理结尾部分
				codedata.value = codedata.value + chunk;
				//记录到一般情况中
				normalSaveCharContent = normalSaveCharContent + codedata.value;
				//替换
				props.chatArr[props.chatArr.length - 1].content =
					codeSaveCharContent + md.render(codedata.value);
				codedata.value = '';
				code.value = false;
				continue;
			} else {
				//处理中间的过程
				codedata.value = codedata.value + chunk;
				//此时的内容 = 初始前+现在的围起来
				props.chatArr[props.chatArr.length - 1].content =
					codeSaveCharContent + md.render(codedata.value + '```');
				continue;
			}
		}
		//正常情况下走一个字加一个字
		normalSaveCharContent = normalSaveCharContent + chunk;
		props.chatArr[props.chatArr.length - 1].content = md.render(normalSaveCharContent);
	}
}
// 然后就能够正常像其他ai助手网页那样了，流式获取数据并markdown格式实时显示了。
