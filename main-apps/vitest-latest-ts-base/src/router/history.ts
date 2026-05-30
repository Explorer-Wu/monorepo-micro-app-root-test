import { useEffect, useRef, type HTMLAttributeAnchorTarget } from 'react';
import { To, useHref, useLinkClickHandler, useLocation, useNavigate } from 'react-router-dom';

export default function HistoryRule() {
	const HistoryNav = useNavigate();
	const HrefTo = (to: To) => useHref(to);
	let Location = useLocation();

	const LinkNav = ({
		to,
		target,
		replace,
		state,
	}: {
		to: To;
		target?: HTMLAttributeAnchorTarget | undefined;
		replace?: boolean | undefined;
		state?: any;
	}) =>
		useLinkClickHandler(to, {
			target,
			replace,
			state,
		});

	const LinkTo = (to: any, action: any = { replace: true }) => {
		return HistoryNav(to, action); // history 的 replace 模式
	};

	// 组件外，全局使用
	const globalNav = HistoryNav;
	const globalLocation = Location;
	if (!(window as any).__globalRouter) {
		(window as any).__globalRouter = {
			globalNav,
			globalLocation,
		};
	}

	// 组件内使用
	return {
		HistoryNav,
		LinkTo,
		Location,
		HrefTo,
		LinkNav,
	};
}

export function usePrevious(value: any) {
	const ref = useRef<any>(null);

	useEffect(() => {
		ref.current = value;
	}, [value]);

	return ref.current;
}
