import { ApiCommon } from '@/apis/modules/common';
import BoxCard from '@/components/BoxCard';
import ComChart from '@/components/Charts/ComChart';
import { FetchVisitsRule } from '@/components/Charts/UseFetchsRule';
import VsTypeChart from '@/components/Charts/VsTypeChart';
import ActiveApps from '@/components/OlulLists/ActiveApps';
import TeamsMsgList from '@/components/OlulLists/TeamsMsgs';
import WeatherList from '@/components/OlulLists/WeatherLi';
import ViewStatus from '@/components/Visualscreen/ViewStatus';
import { useEffect, useState } from 'react';
import LocalMap from './maps';

const VisitorsOptions = {
	title: '访问量统计',
	field: 'visitors',
	defaultPeriod: 1 * 24 * 60 * 60,
};

const exOptsLine = {
	type: 'line' as const,
	otherChartOpts: {
		isUpdate: true,
		isMerge: false,
		legendEvent: false,
	},
};

interface BoardData {
	weatherData: unknown[];
	teamsData: { title: string; data: unknown[] };
	activitiesData: { title: string; data: unknown[] };
}

export default function MapBoard() {
	const { visitsData } = FetchVisitsRule(VisitorsOptions);
	const [reqProps, setReqProps] = useState<BoardData | null>(null);

	useEffect(() => {
		const oldClassName = document.body.className;
		document.body.className = 'overview';
		return () => {
			document.body.className = oldClassName;
		};
	}, []);

	useEffect(() => {
		loadDataFn();
	}, []);

	async function loadDataFn() {
		try {
			const weatherRes = await ApiCommon.getWeathers<unknown[]>({});
			const teamsRes = await ApiCommon.getTeamsMsg<{ data: unknown[] }>({});
			const activitiesRes = await ApiCommon.getActivities<{ data: unknown[] }>({});

			setReqProps({
				weatherData: weatherRes || [],
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
			console.error('mapboard loadDataFn error:', error);
		}
	}

	return (
		<div className="view-con">
			<LocalMap />
			<div className="vs-left">
				<VsTypeChart
					render={(chartOpt) => <ComChart propChartOpt={chartOpt as any} />}
					propData={visitsData as any}
					exOption={exOptsLine}
				/>
				<ViewStatus />
			</div>
			<div className="vs-right">
				<div className="db-right-top">
					<BoxCard title="天气预报" SlotCon={() => (reqProps ? <WeatherList propWeather={reqProps.weatherData as any} /> : null)} />
				</div>
				<div className="db-right-bottom">
					<BoxCard
						title={reqProps?.teamsData.title || '社区评论'}
						SlotCon={() => (reqProps ? <TeamsMsgList propTeams={reqProps.teamsData as any} /> : null)}
					/>
					<BoxCard
						title={reqProps?.activitiesData.title || '活跃应用'}
						SlotCon={() => (reqProps ? <ActiveApps propActives={reqProps.activitiesData as any} /> : null)}
					/>
				</div>
			</div>
		</div>
	);
}
