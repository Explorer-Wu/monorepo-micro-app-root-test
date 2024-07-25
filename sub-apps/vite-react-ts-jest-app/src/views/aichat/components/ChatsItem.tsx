import { Avatar, Tooltip } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
import MessageView from './MessageView';

const userStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };

const chatbotStyle = { backgroundColor: '#f56a00', verticalAlign: 'middle' };

const ChatbotItem = ({ msg, isUser }) => {
	return (
		<div className={`${isUser ? 'user' : 'chatbot'}-item`}>
			<div className="avatar-wrap">
				<Avatar
					size="large"
					icon={isUser ? <UserOutlined /> : <CommentOutlined />}
					style={isUser ? userStyle : chatbotStyle}
				></Avatar>
			</div>
			<MessageView isChatbot={!isUser} content={msg} />
		</div>
	);
};

export default ChatbotItem;
