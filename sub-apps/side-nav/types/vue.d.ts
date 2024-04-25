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

declare module '*.md' {
  import { ComponentOptions } from 'vue'
  const Component: ComponentOptions
  export default Component
}