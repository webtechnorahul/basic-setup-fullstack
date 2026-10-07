import {configureStore} from '@reduxjs/toolkit'
import authReducer from "../../features/auth/state/auth.slice"

// Combines authentication, post, and like reducers into the shared Redux store.
export const store=configureStore({
    reducer:{
        auth:authReducer,
    }
})