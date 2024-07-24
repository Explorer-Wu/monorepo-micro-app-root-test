import { BrowserRouter as Router, Routes, Route, useRoutes } from 'react-router-dom';
import { WrapRoutes } from '@/router/index';
import { message } from 'antd';
message.config({
	top: 50,
	duration: 3,
	maxCount: 5,
	rtl: true,
	prefixCls: 'main',
});
const App: React.FC<any> = (): JSX.Element => {
	return (
		// <BrowserRouter forceRefresh={!supportsHistory}>
		<Router basename={import.meta.env.APP_BASE_ROUTER}>
			<WrapRoutes />
		</Router>
		//   <Routes>
		//   <Route path="/screenfull" element={<LayoutScreen />} />
		//   <Route path="/" element={<Navigate to="/home" replace />} />
		//   <Route path="/home" element={<Home />} />
		//   <Route path='/*' element={<Navigate to="/error" replace />} />
		// </Routes>
	);
};

export default App;
