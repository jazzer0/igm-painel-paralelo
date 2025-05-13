declare module '*.css'
interface ImportMetaEnv {
    readonly VITE_CAPAG_API_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
