import { ApiChart } from '@/apis/modules/charts';
import { cloneDeep, map, round, sum } from 'lodash-es';
import { useCallback, useEffect, useState } from 'react';
import './index.scss';

const updateInterval = 3600 * 1000;

interface StatusItem {
	title: string;
	value: number;
	percent: number;
}

const baseVsList: StatusItem[] = [
	{ title: '正常', value: 0, percent: 0 },
	{ title: '异常', value: 0, percent: 0 },
	{ title: '未配置', value: 0, percent: 0 },
	{ title: '告警', value: 0, percent: 0 },
];

const baseRsList: StatusItem[] = [
	{ title: '4层', value: 0, percent: 0 },
	{ title: '7层', value: 0, percent: 0 },
];

interface VsStatistic {
	up: number;
	down: number;
	noconfig: number;
	warning: number;
	unknow: number;
	[key: string]: number;
}

interface StatusData {
	vs_statistic: VsStatistic;
	slb_rs_statistic: VsStatistic;
	nginx_rs_statistic: VsStatistic;
}

export default function ViewStatus() {
	const [vsList, setVsList] = useState<StatusItem[]>(baseVsList);
	const [rsList, setRsList] = useState<StatusItem[]>(baseRsList);

	const update = useCallback(() => {
		const vsItems = ['up', 'down', 'noconfig', 'warning'] as const;
		const rsItems = ['up', 'down', 'unknow', 'warning'] as const;

		ApiChart.getVsStatus({}).then((data: unknown) => {
			const statusData = data as StatusData[];
			if (!Array.isArray(statusData)) return;

			const newVsList = cloneDeep(baseVsList);
			const newRsList = cloneDeep(baseRsList);
			let vsTotal = 0;
			let slbRsTotal = 0;
			let nginxRsTotal = 0;

			statusData.forEach((item) => {
				vsTotal += sum(map(vsItems, (key) => item.vs_statistic[key]));
				slbRsTotal += sum(map(rsItems, (key) => item.slb_rs_statistic[key]));
				nginxRsTotal += sum(map(rsItems, (key) => item.nginx_rs_statistic[key]));

				vsItems.forEach((key, idx) => {
					newVsList[idx].value += item.vs_statistic[key];
				});

				newRsList[0].value += item.slb_rs_statistic.up;
				newRsList[1].value += item.nginx_rs_statistic.up;
			});

			newVsList.forEach((item) => {
				item.percent = round((item.value / vsTotal) * 100, 0);
			});
			newRsList[0].percent = round((newRsList[0].value / slbRsTotal) * 100, 0);
			newRsList[1].percent = round((newRsList[1].value / nginxRsTotal) * 100, 0);

			setVsList(newVsList);
			setRsList(newRsList);
		});
	}, []);

	useEffect(() => {
		update();
		const interval = setInterval(update, updateInterval);
		return () => {
			clearInterval(interval);
		};
	}, [update]);

	const colBar = (item: StatusItem) => (
		<div key={item.title}>
			<div className="status-bar-bg">
				<div className="status-bar-column" style={{ width: `${item.percent}%` }}>
					<div className="pos-angle">{item.value}</div>
				</div>
			</div>
		</div>
	);

	return (
		<div className="vs-box vs-rs-status">
			<h3 className="vs-box-title">VS/RS 状态</h3>

			<div className="vs-box-content">
				<div className="status-title">
					<h3>VS</h3>
					{vsList.map((item) => (
						<p key={item.title}>{item.title}</p>
					))}
					<h3 className="rs-title">RS</h3>
					{rsList.map((item) => (
						<p key={item.title}>{item.title}</p>
					))}
				</div>
				<div className="status-bar">
					<h3>VS</h3>
					{vsList.map((item) => colBar(item))}
					<h3 className="rs-title">RS</h3>
					{rsList.map((item) => colBar(item))}
				</div>
				<div className="status-value">
					<h3>VS</h3>
					{vsList.map((item) => (
						<p key={item.title}>{round(item.percent, 1)} %</p>
					))}
					<h3 className="rs-title">RS</h3>
					{rsList.map((item) => (
						<p key={item.title}>{round(item.percent, 1)} %</p>
					))}
				</div>
			</div>
		</div>
	);
}
