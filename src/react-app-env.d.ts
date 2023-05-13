/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      //types of envs
      VITE_BASE_URL: string;
      VITE_BASE_IMAGE_URL: string;
      VITE_APP_URL: string;
      VITE_AUTH_SESSION_KEY: string;
      VITE_AUTH_SECRET_KEY: string;
      VITE_SOCKET_URL: string;
      VITE_CART_KEY: string;
      VITE_QRCODE_KEY: string;
      VITE_THEME_KEY: string;
      VITE_DEFAULT_IMAGE: string;
      GENERATE_SOURCEMAP: string;
      NODE_ENV: "development" | "production" | "test";
      PUBLIC_URL: string;
    }
  }
