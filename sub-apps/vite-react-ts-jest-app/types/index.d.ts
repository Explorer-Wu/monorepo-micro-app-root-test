import type { Key, ReactNode } from "react";
import type { Params, RouteObject, PathPattern, PathMatch, To, Path, } from 'react-router-dom';

import type { BasicStatus, PermissionType } from "./enum";


// type RouteItem = RouteObject & {
// 	isAuth?: boolean;
// };

export interface RouteMeta {
	/**
	 * antd menu selectedKeys
	 */
	key: string;
	/**
	 * menu label, i18n
	 */
	label: string;
	/**
	 * menu prefix icon
	 */
	icon?: ReactNode;
	/**
	 * menu suffix icon
	 */
	suffix?: ReactNode;
	/**
	 * hide in menu
	 */
	hideMenu?: boolean;
	/**
	 * hide in multi tab
	 */
	hideTab?: boolean;
	/**
	 * disable in menu
	 */
	disabled?: boolean;
	/**
	 * react router outlet
	 */
	outlet?: ReactNode;
	/**
	 * use to refresh tab
	 */
	timeStamp?: string;
	/**
	 * external link and iframe need
	 */
	frameSrc?: URL;
	/**
	 * dynamic route params
	 *
	 * @example /user/:id
	 */
  params?: Params<string>;
  isAuth?: boolean;
}
export type AppRouteObject = {
	order?: number;
	meta?: RouteMeta;
	children?: AppRouteObject[];
} & Omit<RouteObject, "children">;

// type RouteItemTypes = RouteItem & {
//   children?: (RouteItem | RouteObject)[];
// };

interface NavigateProps {
  to: To;
  replace?: boolean;
  state?: any;
}
interface NavigateFunction {
  (
    to: To,
    options?: { replace?: boolean; state?: any }
  ): void;
  (delta: number): void;
}

declare function Navigate(props: NavigateProps): null;
declare function useNavigate(): NavigateFunction;

declare function useNavigationType(): NavigationType;

type NavigationType = "POP" | "PUSH" | "REPLACE";

declare function useLocation(): Location;

interface Location extends Path {
  state: unknown;
  key: Key;
}

declare function useRoutes(
  routes: RouteObject[],
  location?: Partial<Location> | string
): React.ReactElement | null;

declare function useMatch<ParamKey extends string = string>(
  pattern: PathPattern | string
): PathMatch<ParamKey> | null;

declare function matchRoutes(
  routes: RouteObject[],
  location: Partial<Location> | string,
  basename?: string
): RouteMatch[] | null;

interface RouteMatch<ParamKey extends string = string> {
  params: Params<ParamKey>;
  pathname: string;
  route: RouteObject;
}

declare function useHref(to: To): string;

declare function useLinkClickHandler<
  E extends Element = HTMLAnchorElement
>(
  to: To,
  options?: {
    target?: React.HTMLAttributeAnchorTarget;
    replace?: boolean;
    state?: any;
  }
): (event: React.MouseEvent<E, MouseEvent>) => void;

declare function useOutlet(): React.ReactElement | null;

declare function useOutletContext<
  Context = unknown
>(): Context;

declare function useParams<
  K extends string = string
>(): Readonly<Params<K>>;

declare function useResolvedPath(to: To): Path;


declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}

// declare type RefType<T> = T | null;

// declare type LabelValueOptions = {
//   label: string;
//   value: any;
//   [key: string]: string | number | boolean;
// }[];

// declare type TargetContext = '_self' | '_blank';

// declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
//   $el: T;
// }

// declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null;

// declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>;

// 定义 State 结构类型
// export type StoreState = number;


export interface UserToken {
	accessToken?: string;
	refreshToken?: string;
}

export interface UserInfo {
	id: string;
	email: string;
	username: string;
	password?: string;
	avatar?: string;
	role?: Role;
	status?: BasicStatus;
	permissions?: Permission[];
}

export interface Organization {
	id: string;
	name: string;
	status: "enable" | "disable";
	desc?: string;
	order?: number;
	children?: Organization[];
}

export interface Permission {
	id: string;
	parentId: string;
	name: string;
	label: string;
	type: PermissionType;
	route: string;
	status?: BasicStatus;
	order?: number;
	icon?: string;
	component?: string;
	hide?: boolean;
	hideTab?: boolean;
	frameSrc?: URL;
	newFeature?: boolean;
	children?: Permission[];
}

export interface Role {
	id: string;
	name: string;
	label: string;
	status: BasicStatus;
	order?: number;
	desc?: string;
	permission?: Permission[];
}
