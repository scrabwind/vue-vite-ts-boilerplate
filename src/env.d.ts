/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ELEMENTS_PER_PAGE: string
  readonly VITE_API_PAGE_SIZE: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
