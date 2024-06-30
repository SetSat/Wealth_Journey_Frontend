import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogin: localStorage.getItem('isLogin') === 'true' ? true : false,
    token: localStorage.getItem('token') || "",
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.token = action.payload;
            localStorage.setItem('isLogin', true);
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.isLogin = false;
            state.token = null;
            localStorage.removeItem('isLogin');
            localStorage.removeItem('token');
        },
    },
});

export const { login, logout } = authSlice.actions;
export const loginStatus = (state) => state.auth.isLogin;
export const tokenStatus = (state) => state.auth.token;
export default authSlice.reducer;
