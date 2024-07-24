import React, { useRef, useEffect, useState } from 'react';
import { Card, Tag, Button } from 'antd';
import { FullPageChat } from 'flowise-embed-react';
// import { useCounter } from '@/storehooks/useCounter';
// 使用svg as ReactComponent 在d.ts文件加 <reference types="vite-plugin-svgr/client" />

const AIChatFlowise: React.FC<any> = () => {
	// const { initNum } = props;

	useEffect(() => {
		// const Timer = setInterval(() => {
		// 	setCount(prev => prev + 1);
		// }, 1000);
		// return () => clearInterval(Timer);
	}, []);

	return (
		<Card title="AIChatFlowise" style={{ height: 520 }}>
			<FullPageChat
				chatflowid="7a317228-6e50-47ea-99e9-20c1d79c9d50"
				apiHost="http://localhost:3000"
				theme={{
					chatWindow: {
						showTitle: true,
						title: 'Flowise Bot',
						titleAvatarSrc:
							'https://raw.githubusercontent.com/walkxcode/dashboard-icons/main/svg/google-messages.svg',
						showAgentMessages: true,
						welcomeMessage: 'Hello! This is custom welcome message',
						errorMessage: 'This is a custom error message',
						backgroundColor: '#ffffff',
						height: 430,
						width: '100%',
						fontSize: 12,
						poweredByTextColor: '#303235',
						botMessage: {
							backgroundColor: '#f7f8ff',
							textColor: '#303235',
							showAvatar: true,
							avatarSrc:
								'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/parroticon.png',
						},
						userMessage: {
							backgroundColor: '#3B81F6',
							textColor: '#ffffff',
							showAvatar: true,
							avatarSrc:
								'https://raw.githubusercontent.com/zahidkhawaja/langchain-chat-nextjs/main/public/usericon.png',
						},
						textInput: {
							placeholder: 'Type your question',
							backgroundColor: '#ffffff',
							textColor: '#303235',
							sendButtonColor: '#3B81F6',
							maxChars: 50,
							maxCharsWarningMessage:
								'You exceeded the characters limit. Please input less than 50 characters.',
							autoFocus: true, // If not used, autofocus is disabled on mobile and enabled on desktop. true enables it on both, false disables it on both.
							sendMessageSound: true,
							// sendSoundLocation: "send_message.mp3", // If this is not used, the default sound effect will be played if sendSoundMessage is true.
							receiveMessageSound: true,
							// receiveSoundLocation: "receive_message.mp3", // If this is not used, the default sound effect will be played if receiveSoundMessage is true.
						},
						feedback: {
							color: '#303235',
						},
						footer: {
							textColor: '#303235',
							text: 'Powered by',
							company: 'Flowise',
							companyLink: 'https://flowiseai.com',
						},
					},
				}}
			/>
		</Card>
	);
};

export default AIChatFlowise;
