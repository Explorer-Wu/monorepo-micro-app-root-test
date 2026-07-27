import { useNavigate } from 'react-router-dom';
import './index.scss';

export default function BarBottom() {
	const navigate = useNavigate();

	const onClick = () => {
		navigate('/home');
	};

	return (
		<div
			className="vs-bottom-bar screen-cover-safe"
			data-screen-fit="cover-safe"
			onClick={onClick}
		>
			<div className="vs-bottom-bar__inner screen-cover-safe__content" data-screen-fit="contain">
				<div className="edges-left" />
				<div className="edges-right" />
				<h3>Enter React App</h3>
			</div>
		</div>
	);
}
