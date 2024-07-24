import React, { useEffect, useState } from 'react';
import { Element } from 'react-scroll';
import { Form, Button, Input, Spin, message, Col, Row } from 'antd';
import Loading from '@/components/Loading';

// import ChatOperatorView from './components/ChatOperatorView';
import ChatbotItem from './components/ChatbotItem';
import UserItem from './components/UserItem';

// import { getDiffChatId } from '@/utils/utils';
// import { initFriendList } from '@/mock/userList';
// import { scrollToBottom } from '@/utils/scroller';

import { sendMsgesApi } from '@/apis/modules/aichat';

// import { CHAT_TYPE_SINGLE, MESSAGE_TYPE_TEXT } from '@/constants';

import './styles/index.scss';

// { chat, dispatch, user, loading }
const ChatList: React.FC<any> = () => {
	// const { content, chatUserInfo } = chat;

	// const { messageChatList, pageNum, hasMore } = chat;
	// const { currentUser } = user;
	// const { userId, userName } = currentUser;

	const [isload, setIsload] = useState(false);
	const [form] = Form.useForm();
	const formItemLayout = { wrapperCol: { span: 24 } };

	const buttonItemLayout = { wrapperCol: { span: 8, offset: 4 } };

	// const loadingMsg = (function () {
	// 	return function (msg) {
	// 		if (!msg) {
	// 			return setLoading('Loading...');
	// 		}
	// 		return setSrc(msg);
	// 	};
	// })();

	// const proxyMsg = (function () {
	// 	return function (msg) {
	// 		loadingMsg(null);
	// 		setTimeout(function () {
	// 			loadingMsg(msg);
	// 		}, 3000);
	// 	};
	// })();

	// const chatbotId = getDiffChatId(chatUserInfo, userId);

	const askQuestionFn = async (query: string) => {
		setIsload(true);
		const res = await sendMsgesApi()(
			{
				data: {
					// response_mode: 'streaming',
					conversation_id: '',
					query,
					inputs: {
						jobName: '前端架构师',
						name: 'Exploer-Wu',
					},
					user: 'exp',
					files: [],
				},
			},
			'发送信息后获取聊天回复成果',
			'请求失败！',
		);

		console.log('sendMsgesApi:', res);
		setIsload(false);
	};

	// const addChatItemScrollListener = () => {
	// 	const chatList = document.getElementById('chatList');
	// 	// eslint-disable-next-line no-unused-expressions
	// 	chatList && chatList.addEventListener('mousewheel', onChatItemScroll, false);
	// };

	// const removeChatItemScrollListener = () => {
	// 	const chatList = document.getElementById('chatList');
	// 	// eslint-disable-next-line no-unused-expressions
	// 	chatList && chatList.removeEventListener('mousewheel', onChatItemScroll, false);
	// };

	// useEffect(() => {
	// 	if (!chatbotId) {
	// 		// history.replace({ pathname: '/im' });
	// 		return;
	// 	}
	// 	// onChatItemScroll();
	// 	// addChatItemScrollListener();
	// 	// eslint-disable-next-line consistent-return
	// 	return () => {
	// 		removeChatItemScrollListener();
	// 	};
	// }, [pageNum, hasMore, loading]);

	// console.log('onChatItemScroll chat :: ', pageNum, hasMore, loading);

	const onSendMessage = (values: any) => {
		askQuestionFn(values.askQuestion);
	};

	return (
		<div className="chat-container">
			<div id="chatList" className="chat-list">
				<Loading isLoad={isload} text={'加载...'} />
				{/* {Array.isArray(messageChatList) &&
					messageChatList.map((item, index) => {
						// 判断发送者不是当前用户, Id 就为接受者
						// 显示接受者视图
						// item.sendId !== userId
						const [userInfo] = initFriendList.filter(u => u.userId === item.sendId);
						if (!userInfo) return null;
						return userInfo.userId !== userId ? (
							<div className="chat-li" key={item.messageId || index}>
								<ChatbotItem userName={userInfo.userName} item={item} />
							</div>
						) : (
							<div className="chat-li" key={item.messageId || index}>
								<UserItem userName={userName} item={item} />
							</div>
						);
					})} */}

				<Element name="bottomElement"></Element>
			</div>

			<div className="chat-inputer">
				{/* <ChatOperatorView /> */}
				<Form
					{...formItemLayout}
					form={form}
					name="send_messages"
					layout="horizontal"
					onFinish={onSendMessage}
				>
					<Row gutter={16}>
						<Col className="gutter-row" span={18}>
							<Form.Item name="askQuestion">
								<Input.TextArea placeholder="请输入消息" autoSize={{ minRows: 3, maxRows: 12 }} />
								{/* value={content} onChange={e => onMessageInputChange(e.target.value)} */}
							</Form.Item>
						</Col>
						<Col className="gutter-row" span={6}>
							<Form.Item shouldUpdate>
								<Button type="primary" htmlType="submit">
									回复
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
		</div>
	);
};

export default ChatList;
