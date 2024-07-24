import moment from 'moment';

import moreSvg from './icons/more.svg';

const MessageView = ({ content, isChatbot, chatTime, ...rest }) => {
	console.log('MessageView :: ', rest);

	const textStyles = `message-box ${isChatbot ? 'chatbot' : 'user'}`;
	const msgTimeStyle = `message-time ${isChatbot ? 'chatbot' : 'user'}`;
	const popPlace = isChatbot ? 'leftTop' : 'rightTop';
	// const popMenuStyles = cls(styles['show-popmenu'], {
	// 	[styles.sender]: isChatbot,
	// 	[styles.receiver]: !isChatbot,
	// });

	// const renderPopuMenu = () => {
	// 	return (
	// 		<div className={popMenuStyles}>
	// 			<img src={moreSvg} />
	// 		</div>
	// 	);
	// };

	return (
		<div className={textStyles}>
			<div className="message-wrapper">
				<div className={messageTimeStyle}>{dayjs(chatTime).format('LTS')}</div>
				<div className="message-con">
					<Popover placement={popPlace} content={content} open></Popover>
					{/* {isChatbot && renderPopuMenu()}
					{!isChatbot && renderPopuMenu()} */}
				</div>
			</div>
		</div>
	);
};

export default MessageView;
