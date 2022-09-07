import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    login: {
        user: null,
        isLoading: false,
        error: false,
    },
};

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.login.isLoading = true;
        },
        loginSuccess: (state, action) => {
            state.login.isLoading = false;
            state.login.user = action.payload;
            state.login.error = false;
        },
        loginError: (state) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
        logoutStart: (state) => {
            state.login.isLoading = true;
        },
        logoutSuccess: (state) => {
            state.login.isLoading = false;
            state.login.user = null;
            state.login.error = false;
        },
        logoutError: (state) => {
            state.login.isLoading = false;
            state.login.error = true;
        },
    },
});

export const {
    loginStart,
    loginSuccess,
    loginError,
    logoutError,
    logoutStart,
    logoutSuccess,
} = loginSlice.actions;
export default loginSlice.reducer;
