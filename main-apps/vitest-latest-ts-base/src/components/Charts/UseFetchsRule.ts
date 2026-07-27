import { ApiChart } from '@/apis/modules/charts';
import { message } from 'antd';
import { useEffect } from 'react';
import { useImmer } from 'use-immer';

interface ChartData {
	title?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	series?: any[];
	[key: string]: unknown;
}

interface ChartParams {
	title: string;
	field: string;
	defaultPeriod?: number;
}

interface VisitItem {
	weeks: number;
	visits: { name: string; value: number }[];
}

interface CapacityItem {
	name: string;
	value: number;
}

function FetchVisitsRule(chartParams: ChartParams) {
	const [visitsData, setVisitsData] = useImmer<ChartData>({});

	useEffect(() => {
		getDataFn(chartParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getDataFn = async (chartreq: ChartParams) => {
		try {
			const resData = await ApiChart.getVisitsData<VisitItem[]>({});
			if (!resData) return;

			const dealRes = splicingData(resData);
			setVisitsData((draft) => {
				draft.title = chartreq.title;
				draft.series = dealRes;
			});
		} catch (error: any) {
			message.error(`${error.message}, 获取趋势相关数据请求失败！`, 6);
		}
	};

	function splicingData(resObjs: VisitItem[]) {
		const GroupsMap: { name: string; data?: (number | string)[][] }[] = resObjs[0].visits.map(
			(el) => ({ name: el.name }),
		);

		GroupsMap.forEach((gitem) => {
			const groupObj = convertData(resObjs, gitem.name);
			gitem.data = groupObj;
		});

		return GroupsMap;
	}

	function convertData(sortObjs: VisitItem[], selName: string): (number | string)[][] {
		const nameArr: (number | string)[][] = [];
		if (!sortObjs) return nameArr;

		sortObjs.forEach((item) => {
			const arr: (number | string)[] = [];
			arr[0] = item.weeks;
			arr[1] = item.visits.filter((el) => el.name === selName)[0].value;
			nameArr.push(arr);
		});

		return nameArr;
	}

	return { visitsData, setVisitsData };
}

function FetchCapacityRule(chartParams: ChartParams) {
	const [capacityData, setCapacityData] = useImmer<ChartData>({});

	useEffect(() => {
		getDataFn(chartParams);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const getDataFn = async (chartreq: ChartParams) => {
		try {
			const resData = await ApiChart.getCapacityData<CapacityItem[]>({});
			if (!resData) return;

			const dealRes = splicingData(resData);
			setCapacityData((draft) => {
				draft.title = chartreq.title;
				draft.series = dealRes;
			});
		} catch (error: any) {
			message.error(`${error.message}, 获取容量占比相关数据失败！`, 6);
		}
	};

	function splicingData(resObjs: CapacityItem[]) {
		const resSum = resObjs.reduce((prev, cur) => cur.value + prev, 0);

		const GroupsMap = [
			{
				name: resObjs[0].name,
				z: 3,
				value: resObjs[0].value,
				data: [Math.round((resObjs[0].value * 10000) / resSum) / 100.0],
			},
			{
				name: '总容量',
				z: 0,
				value: resSum,
				data: [100],
			},
		];

		return GroupsMap;
	}

	return { capacityData, setCapacityData };
}

export { FetchCapacityRule, FetchVisitsRule };

