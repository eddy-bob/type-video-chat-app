import { readonly } from "vue"

interface ImportMetaEnv {
  readonly VITE_MODE: string
  readonly VITE_BASEURL: string
  readonly VITE_PASSPHRASE: string
  readonly VITE_ACCESSTK: string
  readonly VITE_USERDETAILS: string
  readonly VITE_COOKIE_EXPIRE: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}