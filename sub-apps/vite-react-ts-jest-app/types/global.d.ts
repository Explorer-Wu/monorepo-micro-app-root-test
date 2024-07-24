/// <reference types="react" />
/// <reference types="react-dom" />
/// <reference types="vite-plugin-svgr/client" />

/**
 * @filename global.d.ts
 * @description 全局ts声明
 */
declare global {
  // const process: { 
  //   // 与 @types/node重复
  //   env: {
  //     NODE_ENV: string
  //   }
  // }
  namespace JSX {
    interface IntrinsicAttributes {
      class?: any
      style?: any,
    }
    interface IntrinsicElements {
      'micro-app-subreact': React.DetailedHTMLProps<
        any, // React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
  // 全局变量设置
  // const beforeAll: typeof import('@jest/globals').beforeAll
  // const beforeEach: typeof import('@jest/globals').beforeEach
  // const afterAll: typeof import('@jest/globals').afterAll
  // const afterEach: typeof import('@jest/globals').afterEach
  // const describe: typeof import('@jest/globals').describe
  // const fdescribe: typeof import('@jest/globals').fdescribe
  // const xdescribe: typeof import('@jest/globals').xdescribe
  // const it: typeof import('@jest/globals').it
  // const fit: typeof import('@jest/globals').fit
  // const xit: typeof import('@jest/globals').xit
  // const test: typeof import('@jest/globals').test
  // const xtest: typeof import('@jest/globals').xtest
  // const expect: typeof import('@jest/globals').expect
  // const jest: typeof import('@jest/globals').jest

  interface Window {
    eventCenterForAppViteReact: any
    microApp: any
    __MICRO_APP_NAME__: string
    __MICRO_APP_ENVIRONMENT__: string
    __MICRO_APP_BASE_APPLICATION__: string
    __MICRO_APP_PUBLIC_PATH__: string
    __MICRO_APP_BASE_ROUTE__: string

    ActiveXObject: boolean
    webkitIndexedDB: boolean
    mozIndexedDB: boolean
    scrollHeight: number
    scrollTop: number
    clientHeight: number,

    __globalRouter: any
  }
}
// declare interface Window {
//   eventCenterForAppViteReact: any
//   microApp: any
//   __MICRO_APP_NAME__: string
//   __MICRO_APP_ENVIRONMENT__: string
//   __MICRO_APP_BASE_APPLICATION__: string
//   __MICRO_APP_PUBLIC_PATH__: string
//   __MICRO_APP_BASE_ROUTE__: string

//   ActiveXObject: boolean
//   webkitIndexedDB: boolean
//   mozIndexedDB: boolean
//   scrollHeight: number
//   scrollTop: number
//   clientHeight: number
//   location: Location
// }

//  declare const REACT_APP_ENV: 'test' | 'dev' | 'uat' | 'prod' | false;
declare module 'mockjs';
declare module '*.ts';
declare module '*.tsx';

declare module 'slash2';
declare module '*.bmp';
declare module '*.tiff';

//client.d.ts 内置了声明模块 '*.svg'、'*.css'、'*.scss'、'*.sass'、'*.less'、'*.styl'等;
// declare module '*.svg' {
//   const content: React.FC<React.SVGProps<SVGElement>>
//   export default content
// }
  
export {};

// import 'react';

// declare module 'react' {
//   interface StyleHTMLAttributes<T> extends React.HTMLAttributes<T> {
//     jsx?: boolean;
//     global?: boolean;
//   }
// }