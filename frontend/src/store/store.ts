import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/slice';
import { authApi } from '@/features/auth/api';
import LogRocket from "logrocket";

// Create LogRocket middleware
const logRocketMiddleware = LogRocket.reduxMiddleware();

export const store = configureStore({
    // add auth reducer
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            logRocketMiddleware,
            authApi.middleware
        ),
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch