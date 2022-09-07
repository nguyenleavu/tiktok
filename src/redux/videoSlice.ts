import { createSlice } from '@reduxjs/toolkit';

const initialState: any = {
    video: {
        isLoading: false,
        success: false,
        error: false,
    },
};

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        videoStart: (state) => {
            state.video.isLoading = true;
        },
        videoSuccess: (state) => {
            state.video.isLoading = false;
            state.video.success = true;
            state.video.error = false;
        },
        videoError: (state) => {
            state.video.isLoading = false;
            state.video.error = true;
            state.video.success = false;
        },
    },
});

export const { videoStart, videoSuccess, videoError } = videoSlice.actions;
export default videoSlice.reducer;
