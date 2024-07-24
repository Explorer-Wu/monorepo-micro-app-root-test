import type { VNode, DefineComponent, ComponentOptions, ComponentCustomProperties } from 'vue'
 
declare module 'vue/types/vue' {
  interface Vue {
    $loading: any
  }
}

declare module '*.vue' {
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.md' {
  const Component: ComponentOptions
  export default Component
}