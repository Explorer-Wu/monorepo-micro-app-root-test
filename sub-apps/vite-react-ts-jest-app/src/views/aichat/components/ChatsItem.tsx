import { Avatar, Popover } from 'antd';
import { CommentOutlined, UserOutlined } from '@ant-design/icons';
// import MessageView from './MessageView';

const userStyle = { backgroundColor: '#005EFF', verticalAlign: 'middle' };

const chatbotStyle = { backgroundColor: '#f56a00', verticalAlign: 'middle' };

const ChatbotItem = ({ msg, isUser }) => {
	const conStyles = `message-con ${isUser ? 'user' : 'chatbot'}`;
	// const msgTimeStyle = `message-time ${isChatbot ? 'chatbot' : 'user'}`;
	const popPlace = isUser ? 'leftTop' : 'rightTop';

	return (
		<div className={`chat-li ${isUser ? 'user' : 'chatbot'}`}>
			{/* <div className="avatar-wrap">
			</div> */}
			<Popover placement={popPlace} content={msg} fresh={true} open={true}>
				<Avatar
					size="large"
					icon={isUser ? <UserOutlined /> : <CommentOutlined />}
					style={isUser ? userStyle : chatbotStyle}
				></Avatar>
			</Popover>
			{/* <MessageView user={isUser} content={msg} /> */}
		</div>
	);
};

export default ChatbotItem;
