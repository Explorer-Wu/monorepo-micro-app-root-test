import { useRouteError } from 'react-router-dom';

export default function ErrorBoundary() {
	const error = useRouteError();
	//错误信息，可用来错误上报
	console.log('error-page:', error);
	return <>错误页面</>;
}
