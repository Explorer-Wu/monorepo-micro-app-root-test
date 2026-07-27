import type { CSSProperties, ComponentType } from 'react';
import './index.scss';

interface BoxCardProps {
	title: string;
	isLeft?: boolean;
	isSmall?: boolean;
	boxStyle?: CSSProperties;
	SlotTool?: ComponentType;
	SlotCon?: ComponentType;
}

export default function BoxCard(props: BoxCardProps) {
	const { isLeft, isSmall, boxStyle, title, SlotTool, SlotCon } = props;

	return (
		<dl
			className={`box-scroll ${isSmall ? 'box-scroll-s' : 'box-scroll-l'} ${isLeft ? 'box-scroll-left' : ''}`}
			data-screen-fit="contain"
			style={{ height: '100%', marginBottom: 0, ...boxStyle }}
		>
			<dt>
				<h3>{title}</h3>
				{SlotTool ? <SlotTool /> : null}
			</dt>
			<dd>{SlotCon ? <SlotCon /> : null}</dd>
		</dl>
	);
}
