// src/redux/user/userSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: false
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
       signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.loading = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        signInFailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        isLoginedIn: (state) => {
            state.log = false;
        },
        isAdminLoginedIn: (state) => {
            state.log = false;
        }

    }
    
});


export const { signInStart, signInSuccess, signInFailure,isLoginedIn } = userSlice.actions;
export default userSlice.reducer;



