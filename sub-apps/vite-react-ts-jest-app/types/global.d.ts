/// <reference types="vite-plugin-svgr/client" />

/**
 * @filename global.d.ts
 * @description 全局ts声明
 */

declare global {
  const process: {
    env: {
      NODE_ENV: string
    }
  }

  namespace JSX {
    interface IntrinsicAttributes {
      class?: any
      style?: any
    }
  }

  // 	// 全局变量设置
  // 	const _: typeof lodash;

  // interface Window {
  // }
}

declare interface Window {
  eventCenterForAppNameVite: any
  __MICRO_APP_NAME__: string
  __MICRO_APP_ENVIRONMENT__: string
  __MICRO_APP_BASE_APPLICATION__: string

  ActiveXObject: boolean
  webkitIndexedDB: boolean
  mozIndexedDB: boolean
  scrollHeight: number
  scrollTop: number
  clientHeight: number
}


import 'react';

declare module 'react' {
  interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
    jsx?: boolean;
    global?: boolean;
  }
}

declare module 'slash2';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

//client.d.ts 有声明模块 '*.svg'、'*.css'、'*.scss'、'*.sass'、'*.less'、'*.styl'等;

//  declare const REACT_APP_ENV: 'test' | 'dev' | 'uat' | 'prod' | false;

declare module 'mockjs';

declare module '*.ts';
declare module '*.tsx';