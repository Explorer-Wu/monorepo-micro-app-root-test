import React, { useState, useRef, useEffect } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `./pdf.worker.mjs`;

const PdfViewer: React.FC = () => {
	const [selectedText, setSelectedText] = useState<string>('');
	const [explanation, setExplanation] = useState<string>('');
	const [showFloatingBox, setShowFloatingBox] = useState<boolean>(false);
	const [floatingBoxPosition, setFloatingBoxPosition] = useState<{ top: number; left: number }>({
		top: 0,
		left: 0,
	});
	const pdfViewerRef = useRef<HTMLDivElement>(null);
	const floatingBoxRef = useRef<HTMLDivElement>(null);

	// 加载并渲染PDF文件
	const loadPDF = (file: File) => {
		const fileReader = new FileReader();
		fileReader.onload = () => {
			const typedArray = new Uint8Array(fileReader.result as ArrayBuffer);
			renderPDF(typedArray);
		};
		fileReader.readAsArrayBuffer(file);
	};

	// 渲染PDF为HTML
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

			// 创建文本层容器
			const textLayerDiv = document.createElement('div');
			textLayerDiv.className = 'text-layer';
			pageDiv.appendChild(textLayerDiv);

			// 提取文本内容
			const textContent = await page.getTextContent();

			// 渲染文本为HTML元素
			textContent.items.forEach((item: any) => {
				const span = document.createElement('span');
				span.style.position = 'absolute';
				span.style.left = `${item.transform[4]}px`;
				span.style.top = `${item.transform[5]}px`;
				span.style.fontSize = `${item.height}px`;
				span.textContent = item.str;
				textLayerDiv.appendChild(span);
			});

			pdfViewerRef.current.appendChild(pageDiv);
		}
	};

	// 复制选中文本
	const handleCopyText = () => {
		if (selectedText) {
			navigator.clipboard
				.writeText(selectedText)
				.then(() => alert('文本已复制到剪贴板！'))
				.catch(err => console.error('复制失败:', err));
		} else {
			alert('请先选择文本！');
		}
	};

	// AI解释选中文本
	const handleExplainText = async () => {
		if (selectedText) {
			try {
				const response = await fetch('/api/explain', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
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
			const range = selection.getRangeAt(0);
			const rect = range.getBoundingClientRect();

			setFloatingBoxPosition({
				top: rect.bottom + window.scrollY,
				left: rect.left + window.scrollX,
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
		<div>
			<h1 style={{ textAlign: 'center' }}>PDF AI阅读模式 Demo</h1>
			<div style={{ textAlign: 'center', marginTop: '20px' }}>
				<input
					type="file"
					id="pdf-input"
					accept="application/pdf"
					onChange={e => {
						const file = e.target.files?.[0];
						if (file) loadPDF(file);
					}}
				/>
			</div>
			<div
				ref={pdfViewerRef}
				style={{
					width: '80%',
					height: '600px',
					border: '1px solid #ccc',
					margin: '20px auto',
					overflow: 'auto',
					padding: '10px',
					position: 'relative',
				}}
				onMouseUp={handleTextSelection}
			/>
			{showFloatingBox && (
				<div
					ref={floatingBoxRef}
					style={{
						position: 'absolute',
						top: floatingBoxPosition.top,
						left: floatingBoxPosition.left,
						backgroundColor: '#fff',
						border: '1px solid #ccc',
						borderRadius: '4px',
						padding: '8px',
						boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
						zIndex: 1000,
						display: 'flex',
						gap: '8px',
					}}
				>
					<button onClick={handleCopyText}>复制</button>
					<button onClick={handleExplainText}>AI解释</button>
				</div>
			)}
			<div
				style={{
					width: '80%',
					margin: '20px auto',
					padding: '10px',
					border: '1px solid #ccc',
					backgroundColor: '#f9f9f9',
				}}
			>
				<h3>AI解释结果：</h3>
				<p>{explanation}</p>
			</div>
		</div>
	);
};

export default PdfViewer;
