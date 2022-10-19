/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEMENTS_PER_PAGE: string
  readonly VITE_API_PAGE_SIZE: string
  readonly VITE_API_URL: string
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
