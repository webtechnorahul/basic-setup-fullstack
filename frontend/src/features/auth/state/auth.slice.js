import { createSlice } from "@reduxjs/toolkit";

// Holds the signed-in profile, request status, and authentication error state.
const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        error:null,
        loading:false,
    },
    reducers:{
        // Saves a user profile and clears the loading and previous error states.
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false; // Turn off loading when user data arrives
            state.error = null;    // Clear out any old errors
        },
        // Stores an authentication error and marks the request as finished.
        setError: (state, action) => {
            state.error = action.payload; // Store the error string or object
            state.loading = false;        // Turn off loading because an error occurred
        },
        // Updates whether an authentication request is in progress.
        setLoading: (state, action) => {
            state.loading = action.payload; // Typically sets to true when starting an API call
        }
    }
})

export const {setError,setLoading,setUser}=authSlice.actions;
export default authSlice.reducer;
