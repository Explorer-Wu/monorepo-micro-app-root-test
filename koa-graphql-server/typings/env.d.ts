declare namespace NodeJS {
  interface ProcessEnv {
    /** 环境变量 */
    NODE_ENV: 'production' | 'development' | 'test';

    /** 测试网站域名 */
    WEBSITE_URL: string;
  }
}