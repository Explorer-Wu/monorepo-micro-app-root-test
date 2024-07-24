import { Avatar, Tooltip } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import MessageView from './MessageView';

const avatarStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };

const UserItem = ({ item }) => {
	return (
		<div className="user-item">
			<div className="avatar-wrap">
				<Avatar size="large" icon={<UserOutlined />} style={avatarStyle}></Avatar>
			</div>
			<MessageView isChatbot={false} {...item} />
		</div>
	);
};

export default UserItem;
