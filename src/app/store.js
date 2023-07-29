import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/api';
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../features/auth/authSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        autyh: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)