import { cloneDeep, merge } from 'lodash-es';

interface RingSeriesItem {
	name: string;
	value: number;
	z?: number;
	data: number[];
	[key: string]: unknown;
}

interface RingChartData {
	title?: string;
	series: RingSeriesItem[];
	[key: string]: unknown;
}

export default function getChartOptions(req: RingChartData, customConfig?: Record<string, unknown>): Record<string, unknown> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const defaultOption: any = {
		title: {
			show: false,
			text: '占比环形图',
			x: 'center',
			y: 'center',
			textStyle: {
				fontFamily: 'normal',
				fontSize: 16,
			},
			left: 'center',
			top: 0,
			padding: 1,
			itemGap: 2,
		},
		tooltip: {
			trigger: 'item',
			formatter: function (params: any) {
				return `<strong>${params.marker}${params.seriesName}：</strong><br/>${params.value}%`;
			},
			position: function (pos: number[], _params: any, _el: any, _elRect: any, size: any) {
				const obj: Record<string, unknown> = { top: '15%' };
				obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 5;
				return obj;
			},
		},
		backgroundColor: '',
		color: ['#2181ec', '#ccc'],
		legend: {
			show: true,
			icon: 'circle',
			textStyle: {
				fontSize: 12,
				color: '#666',
			},
			bottom: 20,
			left: 'center',
			data: [] as any[],
		},
		grid: {
			left: 10,
			right: 10,
			top: 10,
			bottom: 10,
		},
		angleAxis: {
			show: false,
			min: 0,
			max: 130,
			boundaryGap: ['0', '100'],
			startAngle: 226.8,
		},
		radiusAxis: {
			type: 'category',
			show: true,
			axisLabel: { show: false },
			axisLine: { show: false },
			axisTick: { show: false },
			z: 10,
		},
		polar: {
			radius: '150%',
			center: ['50%', '43%'],
		},
		graphic: [
			{
				type: 'group',
				top: '30%',
				left: 'center',
				id: 'data',
				children: [
					{
						type: 'text',
						id: 'current',
						top: 20,
						scale: [1, 1],
						style: {
							text: req.series?.[0]?.value ?? 0,
							font: 'normal 2.3em "Microsoft YaHei", sans-serif',
							fill: '#333',
							textAlign: 'center',
						},
					},
					{
						type: 'text',
						id: 'all',
						top: 68,
						scale: [1, 1],
						style: {
							text: `of ${req.series?.[1]?.value ?? 0}`,
							font: 'normal 1.5em "Microsoft YaHei", sans-serif',
							fill: '#999',
							textAlign: 'center',
						},
					},
				],
			},
		],
		series: [] as any[],
	};

	const ringItem = {
		type: 'bar',
		coordinateSystem: 'polar',
		barMaxWidth: '12%',
		roundCap: true,
		barGap: '-100%',
		label: { show: true },
		cursor: 'pointer',
	};

	const getSeriesFn = (reqp: RingChartData) => {
		return [...reqp.series].map((el) => {
			const obj = cloneDeep(el);
			Reflect.deleteProperty(obj, 'value');
			return {
				...obj,
				...ringItem,
			};
		});
	};

	if (req.title !== undefined && req.title !== '') {
		if (customConfig) {
			merge(defaultOption, customConfig);
		}
		defaultOption.legend.data = [];
		defaultOption.series = [];

		try {
			const newSeries = getSeriesFn(req);
			defaultOption.series = newSeries;
			defaultOption.legend.data = [...defaultOption.series.map((item: any) => item.name)];
		} catch (e) {
			console.log('pie-error:', e);
		}
	} else {
		defaultOption.series = [];
		defaultOption.legend.data = [];
	}

	return defaultOption;
}
