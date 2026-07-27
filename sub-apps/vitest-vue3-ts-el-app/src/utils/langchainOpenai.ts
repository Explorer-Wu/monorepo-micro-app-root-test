import { StringOutputParser } from '@langchain/core/output_parsers';
import { ChatOpenAI, OpenAIEmbeddings } from '@langchain/openai';

// 解析器需要对输入流进行操作，并尝试将部分 json“自动完成”为有效状态
import { JsonOutputParser } from '@langchain/core/output_parsers';

/** 提示模板：有助于将用户输入和参数转换为语言模型的指令。这可用于指导模型的响应，帮助其理解上下文并生成相关且连贯的基于语言的输出。
 * 提示模板用于格式化单个字符串、消息数组。
 * 使用 MessagesPlaceholder 的方式将用户传入的一组消息插入到特定位置
 * 这将生成一个包含两个消息的数组，第一个是系统消息，第二个是我们传入的 HumanMessage。
 * 如果我们传入了 5 条消息，那么总共将生成 6 条消息（系统消息加上传入的 5 条消息）。这对于将消息数组插入特定位置非常有用。
 */
import { HumanMessage } from '@langchain/core/messages';
import { ChatPromptTemplate, MessagesPlaceholder } from '@langchain/core/prompts';

const promptTemplate = ChatPromptTemplate.fromMessages([
	['system', 'You are a helpful assistant'],
	new MessagesPlaceholder('msgs'),
	// 不明确使用类来完成相同操作的另一种方法MessagesPlaceholder是：
	// ['placeholder', '{msgs}'],
]);

export const getPromptMsgs: any = (askmsgs: string[]) =>
	promptTemplate.invoke({ msgs: askmsgs.map(content => [new HumanMessage({ content })]) });

const llmGpt = new ChatOpenAI({
	model: 'gpt-4o-mini',
	temperature: 0,
	// maxTokens: 1024,
	timeout: 30000,
	// maxRetries: 2,
	apiKey: import.meta.env.APP_AI_OPENAI_API_KEY,
});

/** 非流式输出 */
const embeddings = new OpenAIEmbeddings({
	apiKey: import.meta.env.APP_AI_OPENAI_API_KEY, // In Node.js defaults to process.env.OPENAI_API_KEY
	batchSize: 512, // Default value if omitted is 512. Max is 2048
	model: 'text-embedding-3-large',
});

// const vectorstore = await MemoryVectorStore.fromTexts(
// 	['mitochondria is the powerhouse of the cell', 'buildings are made of brick'],
// 	[{}, {}], // 设置metadata的数据
// 	embeddings,
// );

// const retriever = vectorstore.asRetriever();

// const chunks = [];

// for await (const chunk of await retriever.stream('What is the powerhouse of the cell?')) {
// 	chunks.push(chunk);
// }

// console.log('MemoryVectorStore:', chunks);

import type { Document } from '@langchain/core/documents';

const formatDocs = (docs: Document[]) => {
	return docs.map(doc => doc.pageContent).join('\n-----\n');
};

const template = `Answer the question based only on the following context:
{context}

Question: {question}
`;

const prompt = ChatPromptTemplate.fromTemplate(template);

// const retrievalChain: any = RunnableSequence.from([
// 	{
// 		context: retriever.pipe(formatDocs),
// 		question: new RunnablePassthrough(),
// 	},
// 	prompt,
// 	llmGpt,
// 	new StringOutputParser(),
// ]);

// const retrievalStream = await retrievalChain.stream('What is the powerhouse of the cell?');

// for await (const chunk of retrievalStream) {
// 	console.log('retrievalStream:', `${chunk}|`);
// }

// 虽然非流式组件可能破坏最终输出的流式传输 stream，但streamEvents仍会从支持流式传输的中间步骤中产生流式传输事件！
const extractCountryNames = (inputs: Record<string, any>) => {
	if (!Array.isArray(inputs.countries)) {
		return '';
	}
	return JSON.stringify(inputs.countries.map(country => country.name));
};
const jsonOutput = new JsonOutputParser();
const chainCountries = llmGpt.pipe(jsonOutput).pipe(extractCountryNames);

const streamCountries = async (askmsg: string) => {
	const streamCountries = await chainCountries.stream(askmsg);
	for await (const chunk of streamCountries) {
		console.log('streamCountries:', chunk);
	}
};

let testCountries = `output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key "name" and "population"`;

// streamCountries(testCountries);

/** 流式输出 */
const stringParser = new StringOutputParser();

// const stream = await chain.stream({
// 	topic: 'parrot',
//  topic: getPromptMsgs(['parrot'])
// });

const chainJson = llmGpt
	.withConfig({ runName: 'model' })
	.pipe(new JsonOutputParser())
	.withConfig({ tags: ['chat_model'] });

const evStreamHandler = async (askmsg: string) => {
	const eventStream = await chainJson.streamEvents(
		askmsg,
		{
			version: 'v2',
			encoding: 'text/event-stream',
		},
		{ includeTypes: ['chat_model'] },
	);
	// const streamCountries = await chainCountries.streamEvents(askmsg, { version: 'v2' });

	return new Response(eventStream, {
		headers: {
			'content-type': 'text/event-stream',
		},
	});
};

let testAskmsg = `output a list of the countries france, spain and japan and their populations in JSON format. Use a dict with an outer key of "countries" which contains a list of countries. Each country should have the key "name" and "population"`;
// const eventStreams: any = await evStreamHandler(testAskmsg);
// const textDecoder = new TextDecoder('utf-8');

// eventStreams.arrayBuffer().then(function (buffer: any) {
// 	const buffer_unit8 = new Uint8Array(buffer);
// 	const buffer_Json = textDecoder.decode(buffer_unit8);
// 	// console.log('evStreamHandler0:', buffer_Json);

// 	let eventCount = 0;
// 	for (const event of buffer_Json) {
// 		// const ev_unit8 = new Uint8Array(event);
// 		// const evJson = textDecoder.decode(ev_unit8);
// 		// console.log('evStreamJson:', event);
// 		// Truncate the output
// 		if (eventCount > 3) {
// 			continue;
// 		}

// 		const eventType = (event as any).event;
// 		if (eventType === 'on_chat_model_stream') {
// 			console.log(`Chat model chunk: ${event.data.chunk.message.content}`);
// 		} else if (eventType === 'on_parser_stream') {
// 			console.log(`Parser chunk: ${JSON.stringify(event.data.chunk)}`);
// 		} else {
// 			console.log('stream type:', eventType);
// 		}

// 		// if (eventType === 'on_llm_stream') {
// 		// 	console.log(`Chat model chunk: ${event.data.chunk.message.content}`);
// 		// } else if (eventType === 'on_parser_stream') {
// 		// 	console.log(`Parser chunk: ${JSON.stringify(event.data.chunk)}`);
// 		// }

// 		eventCount += 1;
// 	}
// });

// 流媒体
import type { AIMessageChunk } from '@langchain/core/messages';
import { concat } from '@langchain/core/utils/stream';

export const handlResStreaming = async (askmsg: string) => {
	const resStreaming = await llmGpt.stream(askmsg, {
		// Pass the stream options
		stream_options: {
			include_usage: true,
		},
	});

	let finalResStreaming: AIMessageChunk | any;
	for await (const chunkstream of resStreaming) {
		finalResStreaming = !finalResStreaming ? chunkstream : concat(finalResStreaming, chunkstream);
	}

	console.log('finalResStreaming:', finalResStreaming, finalResStreaming?.usage_metadata);

	return finalResStreaming;
};

// handlResStreaming('Hello, how are you?');

// 链式调用
const promptChat = ChatPromptTemplate.fromMessages([
	['system', 'You are a helpful assistant that translates {input_language} to {output_language}.'],
	['human', '{input}'],
]);

const chainllmGpt = promptChat.pipe(llmGpt).pipe(stringParser);
// 翻译
export const handleMsgChain: any = async (askmsg: string) => {
	const messageChain = await chainllmGpt.invoke({
		input_language: 'English',
		output_language: 'Chinese',
		input: askmsg,
	});
	console.log('messageChain:', messageChain);

	return messageChain;
};

// handleMsgChain('why do you love programming?');

// 多模式消息（图文）后端开发
import * as fs from 'node:fs/promises';

const llmGptPreview = new ChatOpenAI({
	model: 'gpt-4o', // 'gpt-4-vision-preview',
	maxTokens: 1024,
	apiKey: import.meta.env.APP_AI_OPENAI_API_KEY,
});

export const handlMsgImage: any = async (askmsg: string, imgSrc: any) => {
	const imageData = await fs.readFile(imgSrc);
	const msgImage = new HumanMessage({
		content: [
			{
				type: 'text',
				text: askmsg,
			},
			{
				type: 'image_url',
				image_url: {
					url: `data:image/jpeg;base64,${imageData.toString('base64')}`,
				},
			},
		],
	});
	const messageImage = await llmGptPreview.invoke([msgImage]);
	console.log('messageImage:', messageImage);

	return messageImage;
};

// handlMsgImage("What's in this image?", '@/assets/images/3danangaoyin.jpeg');

// 工具绑定调用

const llmGptWeather = new ChatOpenAI({
	model: 'gpt-4o',
	apiKey: import.meta.env.APP_AI_OPENAI_API_KEY,
	maxTokens: 128,
}).bind({
	tools: [
		{
			type: 'function',
			function: {
				name: 'get_current_weather',
				description: 'Get the current weather in a given location',
				parameters: {
					type: 'object',
					properties: {
						location: {
							type: 'string',
							description: 'The city and state, e.g. Hangzhou, Shanghai',
						},
						unit: { type: 'string', enum: ['celsius', 'fahrenheit'] },
					},
					required: ['location'],
				},
			},
		},
	],
	tool_choice: 'auto',
});

// Ask initial question that requires multiple tool calls
// const resWeather = await llmGptWeather.invoke([
// 	['human', "What's the weather like in Beijing, Shanghai and Hangzhou?"],
// ]);
// console.log('Weather.tool_calls:', resWeather.tool_calls);

// 强制 ChatOpenAI返回结构化输出
import { z } from 'zod';

const calculatorSchema = z.object({
	operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
	number1: z.number(),
	number2: z.number(),
});

const modelWithRawStructuredOutput = llmGpt.withStructuredOutput(calculatorSchema, {
	name: 'calculator',
	includeRaw: true,
});

export const handleCountTool: any = async (askmsg: string) => {
	const promptCount = ChatPromptTemplate.fromMessages([
		['system', 'You are VERY bad at math and must always use a calculator.'],
		['human', askmsg],
	]);
	const chainCount = promptCount.pipe(modelWithRawStructuredOutput);

	const messageCountTool = await await chainCount.invoke({});
	console.log('messageCountTool:', messageCountTool);

	return messageCountTool;
};

// handleCountTool('Please help me!! What is 2.1 + 3.5?');

// 禁用并行工具
import { zodToJsonSchema } from 'zod-to-json-schema';
// Define your tools
const calculatorSchemaDesc = calculatorSchema.describe(
	'A tool to perform basic arithmetic operations',
);
const weatherSchemaDesc = z
	.object({
		city: z.string(),
	})
	.describe('A tool to get the weather in a city');

// Bind tools to the model
const modelWithToolsParallel = llmGpt.bindTools([
	{
		type: 'function',
		function: {
			name: 'calculator',
			description: calculatorSchemaDesc.description,
			parameters: zodToJsonSchema(calculatorSchemaDesc),
		},
	},
	{
		type: 'function',
		function: {
			name: 'weather',
			description: weatherSchemaDesc.description,
			parameters: zodToJsonSchema(weatherSchemaDesc),
		},
	},
]);

// Invoke the model with `parallel_tool_calls` set to `true`
export const handlToolsParallel: any = async (askmsg: string[], isparall: boolean) => {
	const resToolsParallel = await modelWithToolsParallel.invoke(askmsg, {
		parallel_tool_calls: isparall,
	});
	console.log('resToolsParallel:', resToolsParallel.tool_calls);

	return resToolsParallel;
};
// handlToolsParallel(['What is the weather in Hangzhou and what is 23716 - 27342?'], false);

/** 调用微调模型
 *  通过传入相应的 modelName参数来调用经过微调的 OpenAI 模型
 *  通常采用的形式 ft:{OPENAI_MODEL_NAME}:{ORG_NAME}::{MODEL_ID}
 */

const llmGptFineTune = new ChatOpenAI({
	temperature: 0.9,
	model: 'ft:gpt-4o:{ORG_NAME}::{MODEL_ID}',
	apiKey: import.meta.env.APP_AI_OPENAI_API_KEY,
	maxTokens: 1024,
	timeout: 30000,
	maxRetries: 2,
});

export const handlMsgFineTune: any = async (askmsg: string) => {
	const messageFineTune = await llmGptFineTune.invoke(askmsg);
	console.log('messageFineTune:', messageFineTune);

	return messageFineTune;
};

// 生成元数据
const llmGptGen = new ChatOpenAI({
	model: 'gpt-4o',
	apiKey: import.meta.env.APP_AI_OPENAI_API_KEY,
	temperature: 0,
	maxTokens: 1024,
	timeout: 30000,
	maxRetries: 2,
	logprobs: true,
	// topLogprobs: 5,
});

// const resultGen = await llmGptGen.invoke('Hi there!', {
// 	callbacks: [
// 		{
// 			handleLLMEnd(output) {
// 				console.dir(output.generations[0][0].generationInfo.logprobs, {
// 					depth: null,
// 				});
// 			},
// 		},
// 	],
// });

export const handlResGenerate = async (askmsg: string) => {
	const resultGen = await llmGptGen.invoke(askmsg);
	console.log('resultGen:', resultGen);
	console.dir(resultGen.response_metadata.logprobs, { depth: null });

	return resultGen.response_metadata.logprobs;
};

// handlMsgFineTune('Hi there!');
