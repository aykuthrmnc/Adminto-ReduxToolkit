/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
      //types of envs
      REACT_APP_BASE_URL: string;
      REACT_APP_BASE_IMAGE_URL: string;
      REACT_APP_APP_URL: string;
      REACT_APP_AUTH_SESSION_KEY: string;
      REACT_APP_AUTH_SECRET_KEY: string;
      REACT_APP_SOCKET_URL: string;
      REACT_APP_CART_KEY: string;
      REACT_APP_QRCODE_KEY: string;
      REACT_APP_THEME_KEY: string;
      REACT_APP_DEFAULT_IMAGE: string;
      GENERATE_SOURCEMAP: string;
      NODE_ENV: "development" | "production" | "test";
      PUBLIC_URL: string;
    }
  }
