import { Avatar, Tooltip } from 'antd';
import { CommentOutlined } from '@ant-design/icons';

import MessageView from './MessageView';

const avatarStyle = { backgroundColor: '#f56a00', verticalAlign: 'middle' };

const ChatbotItem = ({ item }) => {
	return (
		<div className="chatbot-item">
			<div className="avatar-wrap">
				<Avatar size="large" icon={<CommentOutlined />} style={avatarStyle}></Avatar>
			</div>
			<MessageView isChatbot={true} {...item} />
		</div>
	);
};

export default ChatbotItem;
