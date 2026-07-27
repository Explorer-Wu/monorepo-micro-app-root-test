import { useScreenAdapter } from '@/hooks/useScreenAdapter';
import { AlertOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import './index.scss';

const regionOptions = [
	{ value: 'serv-room-bj', label: '北京机房' },
	{ value: 'serv-room-sh', label: '上海机房' },
	{ value: 'serv-room-nj', label: '南京机房' },
	{ value: 'serv-room-hz', label: '杭州机房' },
];

export default function BarTop() {
	useScreenAdapter();
	const [curTime, setTime] = useState(dayjs().format('HH:mm:ss'));
	const [curWeek, setWeek] = useState(dayjs().format('dddd YYYY.MM.DD'));
	const [curCity] = useState('杭州市');
	const [curNums] = useState(1);

	const handleChange = useCallback((value: string) => {
		console.log(`selected ${value}`);
	}, []);

	useEffect(() => {
		const id = setInterval(() => {
			setTime(dayjs().format('HH:mm:ss'));
			if (curWeek !== dayjs().format('dddd YYYY.MM.DD')) {
				setWeek(dayjs().format('dddd YYYY.MM.DD'));
			}
		}, 1000);
		return () => {
			clearInterval(id);
		};
	}, [curWeek]);

	return (
		<div className="vs-bar-top screen-cover-safe" data-screen-fit="cover-safe">
			<div className="vs-bar-top__bg" />
			<div className="vs-bar-top__inner screen-cover-safe__content" data-screen-fit="contain">
				<div className="bar-left">
					<strong className="time">{curTime}</strong>
					<span className="date-week">{curWeek}</span>
					<div className="location">
						<EnvironmentOutlined className="loc-icon" />
						<span>{curCity}</span>
					</div>
				</div>
				<div className="bar-center">
					<div className="vs-logo" />
					<h1>大屏数据可视化系统</h1>
				</div>
				<div className="bar-right">
					<div className="message">
						<AlertOutlined className="warn-icon" />
						<span>今日告警推送</span>
						<strong>{curNums}</strong>
						<span>条</span>
					</div>
					<Select
						size="small"
						variant="borderless"
						className="region"
						defaultValue="serv-room-hz"
						onChange={handleChange}
						options={regionOptions}
					/>
				</div>
			</div>
		</div>
	);
}
