import { ApiCommon } from '@/apis/modules/common';
import { useEffect, useState } from 'react';

import ComChart from '@/components/Charts/ComChart';
import { FetchCapacityRule, FetchVisitsRule } from '@/components/Charts/UseFetchsRule';
import VsTypeChart from '@/components/Charts/VsTypeChart';

interface ChartTop5Props {
	title?: string;
}

interface ReqPropsData {
	globalData: unknown;
	weatherData: unknown;
	teamsData: { title: string; data: unknown[] };
	activitiesData: { title: string; data: unknown[] };
}

export default function ChartTop5(_props: ChartTop5Props) {
	const VisitorsOptions = {
		title: '访问量统计',
		field: 'visitors',
		defaultPeriod: 1 * 24 * 60 * 60,
	};

	const CapacityOptions = {
		title: '源码容量占比',
		field: 'capacity',
	};

	const { visitsData } = FetchVisitsRule(VisitorsOptions);
	const { capacityData } = FetchCapacityRule(CapacityOptions);

	const exOptsLine = {
		type: 'line' as const,
		otherChartOpts: {
			isUpdate: true,
			isMerge: false,
			legendEvent: false,
		},
	};

	const exOptsRing = {
		type: 'semiring' as const,
		otherChartOpts: {
			isUpdate: true,
			isMerge: false,
			legendEvent: false,
		},
	};

	const [reqProps, setReqProps] = useState<ReqPropsData | null>(null);

	useEffect(() => {
		loadDataFn();
		return () => {
			// cleanup
		};
	}, []);

	async function loadDataFn() {
		try {
			const globalRes = await ApiCommon.getGlobals<unknown>({});
			const weatherRes = await ApiCommon.getWeathers<unknown>({});
			const teamsRes = await ApiCommon.getTeamsMsg<{ data: unknown[] }>({});
			const activitiesRes = await ApiCommon.getActivities<{ data: unknown[] }>({});

			setReqProps({
				globalData: globalRes,
				weatherData: weatherRes,
				teamsData: {
					title: '社区评论',
					data: (teamsRes as any)?.data || [],
				},
				activitiesData: {
					title: '活跃应用',
					data: (activitiesRes as any)?.data || [],
				},
			});
		} catch (error) {
			console.error('chartTop5 loadDataFn error:', error);
		}
	}

	// 占位引用，避免未使用告警
	void capacityData;
	void exOptsRing;

	return (
		<>
			<VsTypeChart
				render={(chartOpt) => <ComChart propChartOpt={chartOpt as any} />}
				propData={visitsData as any}
				exOption={exOptsLine}
			/>
		</>
	);
}
