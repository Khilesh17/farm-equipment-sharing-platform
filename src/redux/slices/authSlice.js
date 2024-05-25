import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        userData: null,
        loading: false,
        token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        }
    }
});

export const { setUserData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;