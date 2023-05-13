import { configureStore } from '@reduxjs/toolkit';
// import * as Sentry from "@sentry/react";
import Auth from './auth';
import Layout from './layout';
import PageTitle from './pageTitle';
// import { apiSlice } from "~/store/api/apiSlice";

// const sentryReduxEnhancer = Sentry.createReduxEnhancer({
//   // Optionally pass options listed below
// });

const store = configureStore(
    {
        reducer: {
            Auth,
            Layout,
            PageTitle,
            // [apiSlice.reducerPath]: apiSlice.reducer,
        },
        // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
        // .concat([apiSlice.middleware]),
        // devTools: process.env.NODE_ENV === "development",
    }
    // sentryReduxEnhancer
);
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
