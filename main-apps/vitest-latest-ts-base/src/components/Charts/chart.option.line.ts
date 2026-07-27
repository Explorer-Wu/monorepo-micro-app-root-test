import * as echarts from 'echarts';
import { merge, orderBy, round } from 'lodash-es';

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

export default function getChartOptions(req: ChartData, customConfig?: Record<string, unknown>): Record<string, unknown> {
	const colorArr = ['#0a8099','#0050b4', '#2d880c', '#420075', '#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const defaultOption: any = {
		title: {
			show: false,
			text: '曲线图表',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
			},
			formatter: function (params: any, _ticket: any, _callback: any) {
				const content = orderBy(params, (o: any) => o.value[1], ['desc']);
				return `${content[0].axisValueLabel}<br> ${content
					.map((item: any) => `${item.marker}${item.seriesName}: ${item.value[1]}`)
					.join('<br/>')}`;
			},
		},
		backgroundColor: '',
		color: colorArr,
		legend: {
			icon: 'circle',
			data: [] as any[],
			left: 'center',
			top: 0,
			bottom: 10,
		},
		axisPointer: {
			link: { xAxisIndex: 'all' },
		},
		grid: {
			left: 50,
			right: 30,
			top: 68,
			bottom: 50,
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLine: { onZero: true },
			splitLine: { show: false },
		},
		yAxis: {
			name: '访问量',
			type: 'value',
			splitLine: {
				lineStyle: {
					color: ['#ccc', '#ddd'],
					type: 'dotted',
				},
			},
			axisLabel: {
				formatter: function (val: number) {
					const Aval = Math.abs(val);
					if (Aval >= 1000000) {
						return `${val / 1000000}M`;
					} else if (Aval >= 1000 && Aval < 1000000) {
						return `${val / 1000}K`;
					} else {
						return val;
					}
				},
			},
		},
		series: [] as any[],
	};

	const markData = {
		symbol: 'path://M2,0 L38,0 C39.1045695,-2.02906125e-16 40,0.8954305 40,2 L40,9 C40,10.1045695 39.1045695,11 38,11 L22.5,11 L22.5,11 L20,15 L17.5,11 L2,11 C0.8954305,11 1.3527075e-16,10.1045695 0,9 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z',
		symbolSize: [64, 22],
		symbolOffset: [0, -12],
		label: {
			formatter: (params: any) => {
				const Pval = Math.abs(params.value);
				if (Pval >= 1000000) {
					return `${round(params.value / 1000000, 2)}M`;
				} else if (Pval >= 1000 && Pval < 1000000) {
					return `${round(params.value / 1000, 2)}K`;
				} else {
					return round(params.value, 2);
				}
			},
			offset: [0, -3],
		},
		data: [
			{ type: 'max', name: '最大值' },
			{ type: 'min', name: '最小值' },
		],
	};

	const getSeriesFn = (reqp: ChartData, mark: typeof markData) => {
		const newChartitem = {
			type: 'line',
			smooth: true,
			showSymbol: false,
			markPoint: mark,
		};

		return [...(reqp.series || [])].map((el, i) => {
			const areaItem = {
				areaStyle: {
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
						{
							offset: 0,
							color: colorArr[i],
						},
						{
							offset: 1,
							color: '#fff',
						},
					]),
				},
			};
			return {
				...el,
				...newChartitem,
				...areaItem,
			};
		});
	};

	if (req.title !== undefined && req.title !== '') {
		if (customConfig) {
			merge(defaultOption, customConfig);
		}

		defaultOption.series = [];
		defaultOption.legend.data = [];

		try {
			const newSeries = getSeriesFn(req, markData);
			defaultOption.series = newSeries;
			defaultOption.legend.data = [...defaultOption.series.map((item: any) => item.name)];
		} catch (e) {
			console.log('trend-error:', e);
		}
	} else {
		defaultOption.series = [];
		defaultOption.legend.data = [];
	}

	return defaultOption;
}
