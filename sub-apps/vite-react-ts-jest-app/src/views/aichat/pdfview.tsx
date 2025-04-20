import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';
import './styles/pdfview.scss';

pdfjsLib.GlobalWorkerOptions.workerSrc = `./pdf.worker.mjs`;

interface ChatMessage {
	type: 'user' | 'ai' | 'pdf';
	content: string;
	pdfFile?: File;
}

const PdfViewer: React.FC = () => {
	const [messages, setMessages] = useState<ChatMessage[]>([
		{
			type: 'ai',
			content: '我是AI助手，可帮你分析PDF文档，请上传文件或直接提问。',
		},
		{
			type: 'user',
			content: '帮我分析一下这个文件。',
		},
		{
			type: 'pdf',
			content: '我的简历.pdf',
			pdfFile: undefined, // 修改这里，使用 undefined 替代 null
		},
		{
			type: 'ai',
			content: `根据PDF内容分析，这是一份前端开发工程师的简历，主要特点如下：

1. 技术栈：
- 熟练掌握 Vue/React 全家桶
- 熟悉 Event loop、浏览器渲染原理
- 对 React 架构有深入研究，包括 Reconciler、Fiber 等
- 有微信小程序开发经验

2. 工作经历：
- 目前就职于杭州某科技公司
- 负责前端项目开发和性能优化
- 参与多个项目的技术选型和架构设计

3. 项目经验：
- 负责公司核心业务系统的开发
- 实现了复杂的数据可视化需求
- 解决了多个性能优化问题

建议可以进一步了解该候选人的：
1. 具体项目难点攻克经历
2. 团队协作能力
3. 技术深度理解程度`,
		},
		{
			type: 'user',
			content: '帮我总结一下他的主要技术特长',
		},
		{
			type: 'ai',
			content: `该候选人的主要技术特长包括：

1. 前端框架：
- Vue.js 和 React 技术栈深度应用
- 对框架底层原理有研究
- 具备组件库开发经验

2. 性能优化：
- 了解浏览器渲染机制
- 掌握前端性能优化方法
- 有实际的优化案例

3. 工程化能力：
- 熟悉 Webpack 构建流程
- 了解前端工程化最佳实践
- 具备项目架构设计能力

4. 跨平台开发：
- 有小程序开发经验
- 有混合应用开发经验

整体来看，技术栈比较全面，且对技术有一定深度的理解。`,
		},
	]);
	const [inputMessage, setInputMessage] = useState('');
	const [selectedText, setSelectedText] = useState<string>('');
	const [explanation, setExplanation] = useState<string>('');
	const [showFloatingBox, setShowFloatingBox] = useState<boolean>(false);
	const [floatingBoxPosition, setFloatingBoxPosition] = useState<{ top: number; left: number }>({
		top: 0,
		left: 0,
	});
	const [currentPdfFile, setCurrentPdfFile] = useState<File | null>(null);

	const pdfViewerRef = useRef<HTMLDivElement>(null);
	const floatingBoxRef = useRef<HTMLDivElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);

	// 处理消息发送
	const handleSendMessage = async () => {
		if (inputMessage.trim()) {
			// 添加用户消息
			setMessages(prev => [...prev, { type: 'user', content: inputMessage }]);

			try {
				// 调用AI API获取回复
				const response = await fetch('/api/chat', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ message: inputMessage }),
				});
				const data = await response.json();

				// 添加AI回复
				setMessages(prev => [...prev, { type: 'ai', content: data.response }]);
			} catch (error) {
				console.error('发送消息失败:', error);
			}

			setInputMessage('');
		}
	};

	// 处理PDF文件上传
	const handlePdfUpload = (file: File) => {
		setCurrentPdfFile(file);
		setMessages(prev => [
			...prev,
			{
				type: 'pdf',
				content: `已上传PDF文件：${file.name}`,
				pdfFile: file,
			},
		]);
		loadPDF(file);
	};

	// 加载并渲染PDF文件
	const loadPDF = (file: File) => {
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
			renderPDF(typedArray);
		};
		fileReader.readAsArrayBuffer(file);
	};

	// 使用PDF.js渲染PDF为HTML
	const renderPDF = async (data: Uint8Array) => {
		if (!pdfViewerRef.current) return;

		pdfViewerRef.current.innerHTML = ''; // 清空之前的PDF内容
		const pdf = await pdfjsLib.getDocument({ data }).promise;

		for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
			const page = await pdf.getPage(pageNum);
			const scale = 1.5;
			const viewport = page.getViewport({ scale });

			// 创建页面容器
			const pageDiv = document.createElement('div');
			pageDiv.style.position = 'relative';
			pageDiv.style.width = `${viewport.width}px`;
			pageDiv.style.height = `${viewport.height}px`;
			pageDiv.style.margin = '0 auto 20px';
			pageDiv.style.border = '1px solid #ccc';

			// 创建Canvas用于渲染PDF背景
			const canvas = document.createElement('canvas');
			const context = canvas.getContext('2d');
			if (!context) return;
			canvas.height = viewport.height;
			canvas.width = viewport.width;
			canvas.style.position = 'absolute';
			pageDiv.appendChild(canvas);

			// 创建文本层容器
			const textLayerDiv = document.createElement('div');
			textLayerDiv.className = 'textLayer';
			textLayerDiv.style.position = 'absolute';
			textLayerDiv.style.left = '0';
			textLayerDiv.style.top = '0';
			textLayerDiv.style.right = '0';
			textLayerDiv.style.bottom = '0';
			pageDiv.appendChild(textLayerDiv);

			// 渲染PDF页面到Canvas
			const renderContext = {
				canvasContext: context,
				viewport: viewport,
			};
			await page.render(renderContext).promise;

			// 提取并渲染文本层
			const textContent = await page.getTextContent();
			const textLayer = new pdfjsLib.TextLayer({
				textContentSource: textContent,
				container: textLayerDiv,
				viewport: viewport,
			});

			await textLayer.render();

			pdfViewerRef.current.appendChild(pageDiv);
		}
	};

	// 复制选中文本
	const handleCopyText = () => {
		if (selectedText) {
			navigator.clipboard
				.writeText(selectedText)
				.then(() => {
					alert('文本已复制到剪贴板！');
				})
				.catch(err => {
					console.error('复制失败:', err);
				});
		} else {
			alert('请先选择文本！');
		}
	};

	// AI解释选中文本
	const handleExplainText = async () => {
		if (selectedText) {
			try {
				// 调用AI解释API（假设后端API地址为 /api/explain）
				const response = await fetch('/api/explain', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ text: selectedText }),
				});
				const data = await response.json();
				setExplanation(data.explanation);
			} catch (error) {
				console.error('AI解释失败:', error);
				alert('AI解释失败，请稍后重试！');
			}
		} else {
			alert('请先选择文本！');
		}
	};

	// 监听文本选择事件
	const handleTextSelection = () => {
		const selection = window.getSelection();
		if (selection && selection.toString().trim() !== '') {
			setSelectedText(selection.toString());

			// 获取选中文本的位置
			const range = selection.getRangeAt(0);
			const rect = range.getBoundingClientRect();

			// 设置悬浮框的位置，添加一些偏移量使其不会直接贴在文本上
			setFloatingBoxPosition({
				top: rect.bottom + window.scrollY + 10, // 向下偏移10px
				left: Math.max(rect.left + window.scrollX - 50, 10), // 向左偏移50px，但不小于10px
			});
			setShowFloatingBox(true);
		} else {
			setShowFloatingBox(false);
		}
	};

	// 点击页面其他地方时隐藏悬浮框
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (floatingBoxRef.current && !floatingBoxRef.current.contains(event.target as Node)) {
				setShowFloatingBox(false);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className="container">
			{/* 左侧聊天框 */}
			<div className="chat-container">
				<div ref={chatContainerRef} className="chat-messages">
					{messages.map((message, index) => (
						<div key={index} className={`message-wrapper ${message.type}`}>
							<div className={`message-content ${message.type}`}>
								{message.type === 'pdf' ? (
									<div onClick={() => message.pdfFile && loadPDF(message.pdfFile)}>
										<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
											<path d="M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" />
										</svg>
										{message.content}
									</div>
								) : (
									message.content
								)}
							</div>
						</div>
					))}
				</div>

				<div className="input-container">
					<div className="input-wrapper">
						<input
							type="text"
							value={inputMessage}
							onChange={e => setInputMessage(e.target.value)}
							onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
							placeholder="输入消息..."
							className="message-input"
						/>
						<input
							type="file"
							accept="application/pdf"
							style={{ display: 'none' }}
							id="pdf-upload"
							onChange={e => {
								const file = e.target.files?.[0];
								if (file) handlePdfUpload(file);
							}}
						/>
						<label htmlFor="pdf-upload" className="upload-button">
							<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
								<path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM13 9V3.5L18.5 9H13Z" />
							</svg>
						</label>
					</div>
				</div>
			</div>

			{/* 右侧PDF预览 */}
			<div className="pdf-container">
				<div ref={pdfViewerRef} className="pdf-viewer" onMouseUp={handleTextSelection}>
					{showFloatingBox && (
						<div
							ref={floatingBoxRef}
							className="floating-toolbar"
							style={{
								top: floatingBoxPosition.top,
								left: floatingBoxPosition.left,
							}}
						>
							<button onClick={handleCopyText} className="toolbar-button copy">
								复制
							</button>
							<button onClick={handleExplainText} className="toolbar-button explain">
								AI解释
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};
export default PdfViewer;
