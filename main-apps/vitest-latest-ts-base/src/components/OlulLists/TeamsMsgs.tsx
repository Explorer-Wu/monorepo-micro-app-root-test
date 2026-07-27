import {
	AlipayOutlined,
	AliwangwangOutlined,
	AndroidOutlined,
	AppleOutlined,
	DingdingOutlined,
	GithubOutlined,
	Html5Outlined,
	TaobaoOutlined,
	TwitterOutlined,
	WechatOutlined,
	WeiboOutlined,
	WindowsOutlined,
	ZhihuOutlined,
} from '@ant-design/icons';
import { Avatar, Skeleton } from 'antd';
import type { ReactNode } from 'react';

interface TeamItem {
	name: string;
	title: string;
	context: string;
	agotime: string;
	loading?: boolean;
	[key: string]: unknown;
}

interface TeamsData {
	title: string;
	data: TeamItem[];
}

interface TeamsMsgListProps {
	propTeams: TeamsData;
}

const IconArrs: ReactNode[] = [
	<AndroidOutlined />,
	<AppleOutlined />,
	<WindowsOutlined />,
	<GithubOutlined />,
	<AliwangwangOutlined />,
	<DingdingOutlined />,
	<WeiboOutlined />,
	<TaobaoOutlined />,
	<Html5Outlined />,
	<TwitterOutlined />,
	<WechatOutlined />,
	<AlipayOutlined />,
	<ZhihuOutlined />,
];

const bgArr = [
	'#368ae5', '#1f50cd', '#6610f2', '#765df6', '#d13d98', '#c03e20',
	'#ff8318', '#fabf30', '#1faf18', '#20c997', '#17a2b8', '#05586d',
];

export default function TeamsMsgList({ propTeams }: TeamsMsgListProps) {
	return (
		<dl className="mdl-box">
			<dt>
				<h3>{propTeams.title}</h3>
			</dt>
			<dd>
				<ul className="list-box-index">
					{propTeams.data.map((item, idx) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: 列表项稳定
						<li key={idx} className="list-item">
							<Skeleton avatar title={false} loading={item.loading} active>
								<div className="list-item-meta">
									<div className="list-item-meta-avatar">
										<Avatar
											size="large"
											icon={IconArrs[Math.floor(Math.random() * IconArrs.length)]}
											style={{ backgroundColor: bgArr[Math.floor(Math.random() * bgArr.length)] }}
										/>
									</div>
									<div className="list-item-meta-content">
										<div className="list-item-meta-title">
											<strong>{item.name}</strong>
											<p>{item.title}</p>
										</div>
										<div className="list-item-meta-description">
											<p>{item.context}</p>
										</div>
									</div>
									<div className="time-pad">{item.agotime}h</div>
								</div>
							</Skeleton>
						</li>
					))}
				</ul>
			</dd>
		</dl>
	);
}
