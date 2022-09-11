import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    modalLogin: false,
};

const modalLoginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        modalLogin: (state, action) => {
            state.modalLogin = action.payload;
        },
    },
});

export const { modalLogin } = modalLoginSlice.actions;
export default modalLoginSlice.reducer;
