import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, initialAuthState, RegisterResponse } from '../types'
import LogRocket from "logrocket";


export const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        setToken: (state: AuthState, action: PayloadAction<RegisterResponse>) => {
            state.token = action.payload.token
        },
        logError: (state, action: PayloadAction<string>) => {
            LogRocket.captureMessage(action.payload);
        },
    }
})

export const { setToken } = authSlice.actions

export default authSlice.reducer