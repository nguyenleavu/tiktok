import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    register: {
        isLoading: false,
        success: false,
        error: false,
    },
};

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart: (state) => {
            state.register.isLoading = true;
        },
        registerSuccess: (state) => {
            state.register.isLoading = false;
            state.register.success = true;
            state.register.error = false;
        },
        registerError: (state) => {
            state.register.isLoading = false;
            state.register.error = true;
            state.register.success = false;
        },
    },
});

export const { registerStart, registerSuccess, registerError } =
    registerSlice.actions;
export default registerSlice.reducer;
