import { Button, DatePicker, Form, Select } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

const { RangePicker } = DatePicker;

interface PeriodOpt {
	name: string;
	value: number;
}

interface ExOption {
	periodOpts: PeriodOpt[];
	[key: string]: unknown;
}

interface ComChartFormProps {
	exOption: ExOption;
}

interface ChartParams {
	period: number;
	start: number | null;
	end: number | null;
}

export default function ComChartForm({ exOption }: ComChartFormProps) {
	const [chartParams, setChartParams] = useState<ChartParams>({
		period: 1 * 24 * 60 * 60,
		start: null,
		end: null,
	});

	const periodSelectChange = (value: number) => {
		setChartParams((prev) => ({ ...prev, period: value }));
	};

	const changeDateTime = (dates: [Dayjs | null, Dayjs | null] | null) => {
		if (dates && dates[0] && dates[1]) {
			setChartParams((prev) => ({
				...prev,
				start: dates[0]!.valueOf(),
				end: dates[1]!.valueOf(),
			}));
		} else {
			setChartParams((prev) => ({ ...prev, start: null, end: null }));
		}
	};

	const disabledDate = (current: Dayjs) => {
		return current && current > dayjs().endOf('day');
	};

	return (
		<Form layout="inline" className="chart-form fr">
			<Form.Item className="fr mar-r0">
				<Button size="small">历史</Button>
			</Form.Item>
			<Form.Item className="fr">
				<Select
					size="small"
					defaultValue={chartParams.period}
					onChange={periodSelectChange}
					style={{ width: 60 }}
					options={exOption.periodOpts.map((period) => ({
						key: period.value,
						value: period.value,
						label: period.name,
					}))}
				/>
			</Form.Item>
			<Form.Item className="fr">
				<RangePicker
					size="small"
					disabledDate={disabledDate}
					showTime
					format="YYYY-MM-DD HH:mm:ss"
					onOk={changeDateTime}
					style={{ width: 220 }}
				/>
			</Form.Item>
		</Form>
	);
}
