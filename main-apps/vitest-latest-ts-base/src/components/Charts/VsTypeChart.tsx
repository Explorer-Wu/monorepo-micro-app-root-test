import { isEmpty, isEqual } from 'lodash-es';
import { useEffect, useRef, type ReactNode } from 'react';
import { useImmer } from 'use-immer';
import getLineChartOptions from './chart.option.line';
import getRingChartOptions from './chart.option.semiringratio';

interface ChartSeriesItem {
	name: string;
	data: (number | string)[][];
	[key: string]: unknown;
}

interface ChartData {
	title?: string;
	series?: ChartSeriesItem[];
	[key: string]: unknown;
}

interface ExOption {
	type: 'line' | 'semiring';
	otherChartOpts?: {
		isUpdate?: boolean;
		isMerge?: boolean;
		legendEvent?: boolean;
		isFullScr?: boolean;
	};
	[key: string]: unknown;
}

interface ChartState {
	chartData: ChartData;
	otherOption: ExOption['otherChartOpts'];
	chartOption: Record<string, unknown> | null;
	toggleloading: boolean;
}

interface VsTypeChartProps {
	propData: ChartData;
	exOption: ExOption;
	render: (state: ChartState) => ReactNode;
}

export default function VsTypeChart({ propData, exOption, render }: VsTypeChartProps) {
	const [state, setState] = useImmer<ChartState>({
		chartData: { ...propData },
		otherOption: exOption.otherChartOpts,
		chartOption: null,
		toggleloading: false,
	});

	const prevPropDataRef = useRef<ChartData>(propData);

	useEffect(() => {
		if (!isEmpty(propData)) {
			doneSelOptions(propData);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (!isEqual(prevPropDataRef.current, propData)) {
			prevPropDataRef.current = propData;
			setState((draft) => {
				draft.chartData = { ...draft.chartData, ...propData };
			});
		}
	}, [propData, setState]);

	useEffect(() => {
		if (!isEmpty(state.chartData)) {
			doneSelOptions(state.chartData);
			setState((draft) => {
				draft.toggleloading = !draft.toggleloading;
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state.chartData]);

	const doneSelOptions = (chartData: ChartData) => {
		setState((draft) => {
			if (exOption.type === 'line') {
				draft.chartOption = getLineChartOptions(chartData);
			} else if (exOption.type === 'semiring') {
				draft.chartOption = getRingChartOptions(chartData as any);
			}
		});
	};

	return (
		<dl className="vs-box">
			<dt className="mar-b10">
				<h3>{state.chartData.title}</h3>
			</dt>
			<dd>{render(state)}</dd>
		</dl>
	);
}
