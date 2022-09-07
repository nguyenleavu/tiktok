import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    logOut: {
        user: null,
        isLoading: false,
        error: false,
    },
};

const logOutSlice = createSlice({
    name: 'logOut',
    initialState,
    reducers: {
        logOutStart: (state) => {
            state.logOut.isLoading = true;
        },
        logOutSuccess: (state, action) => {
            state.logOut.isLoading = false;
            state.logOut.user = action.payload;
            state.logOut.error = false;
        },
        logOutError: (state) => {
            state.logOut.isLoading = false;
            state.logOut.error = true;
        },
    },
});

export const { logOutStart, logOutSuccess, logOutError } = logOutSlice.actions;
export default logOutSlice.reducer;
