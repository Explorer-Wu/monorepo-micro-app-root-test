import dayjs from 'dayjs';
import { Popover } from 'antd';
import moreSvg from './icons/more.svg';

const MessageView = ({ user, content }) => {
	// chatTime, ...rest
	// console.log('MessageView:', rest);

	const conStyles = `message-con ${user ? 'user' : 'chatbot'}`;
	// const msgTimeStyle = `message-time ${isChatbot ? 'chatbot' : 'user'}`;
	const popPlace = user ? 'leftTop' : 'rightTop';
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
		<div className="message-wrapper">
			{/* <div className={messageTimeStyle}>{dayjs(chatTime).format('LTS')}</div> */}
			<div className={conStyles}>
				<Popover
					placement={popPlace}
					content={content}
					style={{ maxWidth: 600, lineHeight: 30 }}
					open
				></Popover>
				{/* {isChatbot && renderPopuMenu()}
					{!isChatbot && renderPopuMenu()} */}
			</div>
		</div>
	);
};

export default MessageView;
