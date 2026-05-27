import React from 'react';
import { Layout, Menu, theme, type MenuProps, Popconfirm, message, Button } from 'antd';
import MenuUnfoldOutlined from '@ant-design/icons/MenuUnfoldOutlined';
import MenuFoldOutlined from '@ant-design/icons/MenuFoldOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import TopNav from './TopNav';
import viteLogo from '/vite.svg';
// import Logo from '@/assets/images/svg/logo.svg';

export default function HeadTop(props: any, context?: any): React.ReactElement<any, any> {
	const { Header } = Layout;
	const AppTitle = import.meta.env.VITE_APP_TITLE;
	const { user, logout } = useAuthStore();
	const navigate = useNavigate();

	const { propCollapsed, onToggleMenu } = props;

	const handleLogout = () => {
		logout();
		navigate('/login');
		message.info('你已经退出登录！');
	};

	return (
		<Header style={{ display: 'flex', alignItems: 'center' }}>
			<div className="head-logo">
				<img src={viteLogo} alt="logo" />
				<div className="title">{AppTitle}</div>
			</div>
			{React.createElement(propCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
				className: 'trigger',
				onClick: () => onToggleMenu(!propCollapsed),
			})}
			<TopNav />

			<div className="flex items-center">
				<div className="ml-3 relative">
					<div className="flex items-center space-x-4">
						<span className="text-gray-700">欢迎，{user?.username || '管理员'}</span>
						<Popconfirm
							placement="topRight"
							title="确定退出登录?"
							onConfirm={handleLogout}
							okText="确定"
							cancelText="取消"
						>
							<Button className="inline-flex items-center border border-transparent text-white bg-red-600 hover:bg-red-700">
								退出登录
							</Button>
						</Popconfirm>
					</div>
				</div>
			</div>
		</Header>
	);
}
