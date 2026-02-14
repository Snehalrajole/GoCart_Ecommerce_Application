import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        userData: null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userData = null;
        },
        updateUser: (state, action) => {
            state.userData = { ...state.userData, ...action.payload };
        }
    }
})

export const { login, logout, updateUser } = UserSlice.actions; 