import { useScreenAdapter } from '@/hooks/useScreenAdapter';
import ReactEcharts from 'echarts-for-react';
import { cloneDeep, isEmpty } from 'lodash-es';
import { useEffect, useRef, useState } from 'react';

interface OtherOption {
	isUpdate?: boolean;
	isMerge?: boolean;
	legendEvent?: boolean;
	isFullScr?: boolean;
}

interface PropChartOpt {
	chartOption: Record<string, unknown>;
	toggleloading?: boolean;
	otherOption: OtherOption;
	[key: string]: unknown;
}

interface ComChartProps {
	propChartOpt: PropChartOpt;
}

export default function ComChart({ propChartOpt }: ComChartProps) {
	useScreenAdapter();
	const [loading, setLoading] = useState(false);
	const [legendsel, setLegendsel] = useState<Record<string, boolean> | null>(null);
	const [chartOptionNew, setChartOptionNew] = useState<Record<string, unknown>>({});
	const onChartLoadingRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const chartRef = useRef<any>(null);

	const onChartLegendselected = {
		legendselectchanged: (param: { selected: Record<string, boolean> }) => {
			setLegendsel(param.selected);
		},
	};

	useEffect(() => {
		setLoading(true);
	}, [propChartOpt.toggleloading]);

	useEffect(() => {
		if (
			!isEmpty(propChartOpt.chartOption) &&
			!isEmpty((propChartOpt.chartOption as any).series)
		) {
			let newChartOption = cloneDeep(propChartOpt.chartOption);
			if (legendsel !== null) {
				newChartOption = {
					...newChartOption,
					legend: { selected: legendsel },
				};
			}
			setChartOptionNew(newChartOption);
			setLoading(false);
		}

		return () => {
			if (onChartLoadingRef.current) {
				clearTimeout(onChartLoadingRef.current);
			}
		};
	}, [propChartOpt, legendsel]);

	const onChartReadyCallback = (chart: any) => {
		onChartLoadingRef.current = setTimeout(() => {
			chart.hideLoading();
		}, 3000);
	};

	const getLoadingOption = () => {
		return { zlevel: 0 };
	};

	const otherOption = propChartOpt.otherOption || {};

	return (
		<ReactEcharts
			ref={chartRef}
			option={chartOptionNew}
			lazyUpdate={otherOption.isUpdate}
			notMerge={otherOption.isMerge}
			onEvents={otherOption.legendEvent ? onChartLegendselected : undefined}
			showLoading={loading}
			onChartReady={onChartReadyCallback}
			loadingOption={getLoadingOption()}
			className={!otherOption.isFullScr ? 'react_for_echarts chart-box' : 'react_for_echarts'}
			style={{ height: '100%', width: '100%' }}
			data-screen-fit="contain"
		/>
	);
}
