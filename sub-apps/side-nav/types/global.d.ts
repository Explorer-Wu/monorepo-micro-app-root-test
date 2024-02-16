/**
 * @filename global.d.ts
 * @description 全局ts声明
 */

declare global {
  interface ImportMeta {
    env: Record<string, unknown>
    globEager<T = unknown>(globPath: string): Record<string, T>
  }

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
}

declare interface Window {
  ActiveXObject: boolean
  webkitIndexedDB: boolean
  mozIndexedDB: boolean
  scrollHeight: number
  scrollTop: number
  clientHeight: number
}

declare module 'crypto-js' {
  export class CryptoJS {
    constructor()
    MD5(key: string): Promise<string>
  }
}

declare module 'jsencrypt' {
  export class JSEncrypt {
    constructor()
    setPublickey(pk: string): void
    encrypt(key: string): string
  }
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare module 'lodash-es'

declare module '*.ts'
declare module '*.tsx'
declare module '*.js'
declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}
declare module '*.json' {
  const value: any
  export const version: string
  export default value
}

declare module '*.gif' {
  export const gif: any
}

declare module 'mockjs'
