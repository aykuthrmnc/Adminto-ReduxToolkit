import { configureStore } from '@reduxjs/toolkit';
import Auth from './auth';
import Layout from './layout';
// import { apiSlice } from "~/store/api/apiSlice";

const store = configureStore({
    reducer: {
        Auth,
        Layout,
        // [apiSlice.reducerPath]: apiSlice.reducer,
    },
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
    // .concat([apiSlice.middleware]),
    devTools: process.env.NODE_ENV === 'development',
});

// @ts-ignore
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
