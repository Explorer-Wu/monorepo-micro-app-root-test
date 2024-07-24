import React, { useRef, useEffect, useState } from 'react';
import { Card, Tag, Button } from 'antd';
// import { useCounter } from '@/storehooks/useCounter';
// 使用svg as ReactComponent 在d.ts文件加 <reference types="vite-plugin-svgr/client" />
import Konva from 'konva';
import { Stage, Layer, Rect, Circle, Text } from 'react-konva';

type CanvasProps = {
	initNum?: number;
	// title: string;
	// children: React.ReactNode;
};

const SynergyCanvas: React.FC<any> = (props: CanvasProps) => {
	// const { initNum } = props;
	const boardElement = useRef(null);
	const stageElement = useRef(null);

	const [color, setColor] = useState('blue');

	const checkSize = () => {
		// const width = boardElement.current.offsetWidth;
		// this.setState({
		// 	stageWidth: width,
		// });
	};
	useEffect(() => {
		console.log('boardElement:', boardElement.current.offsetWidth);
		// const Timer = setInterval(() => {
		// 	setCount(prev => prev + 1);
		// }, 1000);

		// return () => clearInterval(Timer);
	}, []);

	const getColorFn = () => {
		setColor(Konva.Util.getRandomColor());
	};

	return (
		<Card title="CanvasPage" style={{ height: 600 }}>
			<section>
				<header></header>
				<section ref={boardElement}>
					<Stage ref={stageElement} width={window.innerWidth} height={window.innerHeight}>
						<Layer>
							<Text text="Try click or drag on rect" />
							<Rect
								x={0}
								y={30}
								width={100}
								height={100}
								fill={color}
								shadowBlur={5}
								onClick={getColorFn}
							/>
							<Circle x={200} y={200} radius={50} stroke={color} draggable onDragEnd={getColorFn} />
						</Layer>
					</Stage>
				</section>
				<footer></footer>
			</section>
		</Card>
	);
};

export default SynergyCanvas;
