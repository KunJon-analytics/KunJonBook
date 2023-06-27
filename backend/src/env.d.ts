declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    CORS_ORIGIN: string;
    DATABASE_HOST: string;
    DATABASE_USERNAME: string;
    DATABASE_PASSWORD: string;
  }
}
