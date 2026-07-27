import type { ReactNode } from 'react';
import {
	FacebookOutlined,
	DropboxOutlined,
	GooglePlusOutlined,
	MediumOutlined,
	LinkedinOutlined,
	SkypeOutlined,
	TwitterOutlined,
	YoutubeOutlined,
	Html5Outlined,
	YuqueOutlined,
	YahooOutlined,
} from '@ant-design/icons';

interface ActiveItem {
	appid: string;
	activities: string;
	prod: string;
	info: string;
	agotime: string;
	[key: string]: unknown;
}

interface ActiveData {
	title: string;
	data: ActiveItem[];
}

interface ActiveAppsProps {
	propActives: ActiveData;
}

const IconArrs: ReactNode[] = [
	<FacebookOutlined />, <DropboxOutlined />, <GooglePlusOutlined />, <MediumOutlined />,
	<LinkedinOutlined />, <SkypeOutlined />, <TwitterOutlined />, <YoutubeOutlined />,
	<Html5Outlined />, <YuqueOutlined />, <YahooOutlined />,
];

const bgArr = [
	'#368ae5', '#1f50cd', '#6610f2', '#765df6', '#d13d98', '#c03e20',
	'#ff8318', '#fabf30', '#1faf18', '#20c997', '#17a2b8', '#05586d',
];

export default function ActiveApps({ propActives }: ActiveAppsProps) {
	return (
		<dl className="dl-list">
			<dt>
				<h3>{propActives.title}</h3>
			</dt>
			{propActives.data.map((el) => (
				<dd key={el.appid}>
					<figure
						style={{ backgroundColor: bgArr[Math.floor(Math.random() * bgArr.length)] }}
					>
						{IconArrs[Math.floor(Math.random() * IconArrs.length)]}
					</figure>
					<section>
						<h5>
							<em>{el.activities}</em>
							{el.prod}
						</h5>
						<p>{el.info}</p>
					</section>
					<div className="agotime">{el.agotime}h</div>
				</dd>
			))}
		</dl>
	);
}
