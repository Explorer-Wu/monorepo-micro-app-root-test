import Vue, { VNode, ComponentCustomProperties } from 'vue'

declare module 'vue/types/vue' {
  interface Vue {
    $loading: any
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// declare module '*.vue' {
//   import { ComponentOptions } from 'vue'
//   const componentOptions: ComponentOptions
//   export default componentOptions
// }


export type Locale = 'en-US' | 'zh-CN' | string;
export type InstallOptions = {
  /**
   * 语言
   * @value en-US 英语(美国)
   * @value zh-CN 简体中文(默认)
   */
  locale?: Locale;
  /**
   * 自定义语言包，可根据中文预发包结构进行翻译
   * 具体类型描述
   */
  messages?: Record<string, any>;
};