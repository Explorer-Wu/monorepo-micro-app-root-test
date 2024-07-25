import React, { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { useImmer } from 'use-immer';
import { Element } from 'react-scroll';
import { Flex, Form, Button, Input, Spin, message, Col, Row } from 'antd';
import Loading from '@/components/Loading';

// import ChatOperatorView from './components/ChatOperatorView';
import ChatsItem from './components/ChatsItem';
import ModalRole from './components/ModalRole';
// import { getDiffChatId } from '@/utils/utils';
// import { initFriendList } from '@/mock/userList';
// import { scrollToBottom } from '@/utils/scroller';

import { sendMsgesApi } from '@/apis/modules/aichat';

// import { CHAT_TYPE_SINGLE, MESSAGE_TYPE_TEXT } from '@/constants';

import './styles/index.scss';

// { chat, dispatch, user, loading }
const ChatList: React.FC<any> = () => {
	// const { content, chatUserInfo } = chat;
	// const { currentUser } = user;
	// const { userId, userName } = currentUser;

	const [isload, setIsload] = useState(false);
	const [isShow, setIsShow] = useState(true);
	const [isDisabled, setIsDisabled] = useState(false);
	const [chatMsgs, setChatMsgs] = useImmer([]);
	const [form] = Form.useForm();
	const formItemLayout = { wrapperCol: { span: 24 } };
	const roleInputs: any = {
		jobName: '',
		name: '',
	};
	// const messageChatList: any[] = [];

	const enterInterViewFn = (inputs: any, open: boolean) => {
		setIsShow(open);
		Reflect.set(roleInputs, 'name', inputs.name);
		Reflect.set(roleInputs, 'jobName', inputs.jobName);
		if (roleInputs.name && roleInputs.jobName) {
			setIsDisabled(true);
			console.log('roleInputs:', roleInputs, isDisabled);
			setChatMsgs(draft => {
				draft.push({
					id: '0',
					isUser: false,
					conversation_id: '',
					content: `你好，${roleInputs.name}。我是你的面试官，Polo。你准备好了吗？`,
				});
			});
		} else {
			setIsDisabled(false);
		}
	};

	// const buttonItemLayout = { wrapperCol: { span: 8, offset: 4 } };

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
	const onSendMessage = useCallback(
		(values: any) => {
			// flushSync(() => {
			// });
			setChatMsgs(draft => {
				draft.push({
					id: String(chatMsgs.length),
					isUser: true,
					conversation_id: chatMsgs[chatMsgs.length - 1].conversation_id,
					content: values.askQuestion,
				});
			});
			console.log('chatMsgs:', chatMsgs, values);
			askQuestionFn(values.askQuestion);
		},
		[chatMsgs],
	);

	const askQuestionFn = useCallback(
		async (query: string) => {
			console.log('chatMsgs-askQuestionFn0:', chatMsgs);
			setIsload(true);
			const { id, answer, conversation_id } = await sendMsgesApi()(
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

			console.log('sendMsgesApi:', id, answer, conversation_id);
			setIsload(false);
			// flushSync(() => {
			// });
			setChatMsgs(draft => {
				draft.push({
					id: id,
					isUser: false,
					conversation_id,
					content: answer,
				});
			});
		},
		[chatMsgs],
	);

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

	useEffect(() => {
		console.log('chatMsgs-all:', chatMsgs);
		// if (!chatbotId) {
		// 	// history.replace({ pathname: '/im' });
		// 	return;
		// }
		// onChatItemScroll();
		// addChatItemScrollListener();
		// eslint-disable-next-line consistent-return
		// return () => {
		// 	removeChatItemScrollListener();
		// };
	}, [chatMsgs]);

	// console.log('onChatItemScroll chat :: ', pageNum, hasMore, loading);

	return (
		<div className="chat-container">
			<Flex gap="middle" justify="flex-end" wrap>
				<Button type="primary" disabled={isDisabled} onClick={() => setIsShow(true)}>
					面试信息
				</Button>
			</Flex>
			<div id="chatList" className="chat-lists">
				<Loading isLoad={isload} text={'加载...'} />
				{!!chatMsgs.length &&
					chatMsgs.map((item, index) => {
						// 判断发送者不是当前用户, Id 就为接受者
						// 显示接受者视图
						return <ChatsItem key={item.id || index} msg={item.content} isUser={item.isUser} />;
					})}
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
						<Col className="gutter-row" span={16}>
							<Form.Item name="askQuestion">
								<Input.TextArea placeholder="请输入消息" autoSize={{ minRows: 3, maxRows: 12 }} />
								{/* value={content} onChange={e => onMessageInputChange(e.target.value)} */}
							</Form.Item>
						</Col>
						<Col className="gutter-row" span={8}>
							<Form.Item shouldUpdate>
								<Button type="primary" htmlType="submit">
									面试回复
								</Button>
							</Form.Item>
						</Col>
					</Row>
				</Form>
			</div>
			<ModalRole isOpen={isShow} goInterView={enterInterViewFn} />
		</div>
	);
};

export default ChatList;
