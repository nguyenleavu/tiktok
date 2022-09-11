import { getSuggestedQuery } from '@testing-library/react';
import * as request from '~/utils/request';
import {
    loginStart,
    loginSuccess,
    loginError,
    logoutStart,
    logoutError,
    logoutSuccess,
} from './loginSlice';
import { modalLogin } from './modalLoginSlice';
import { registerError, registerStart, registerSuccess } from './registerSlice';
import { videoError, videoStart, videoSuccess } from './videoSlice';

export const loginUser = async (
    user: any,
    dispatch: any,
    navigate: any,
    onClose: any
) => {
    dispatch(loginStart());
    try {
        const res = await request.post('auth/login', user);
        dispatch(loginSuccess(res));
        navigate('/');
        onClose();
    } catch (error) {
        dispatch(loginError());
    }
};

export const registerUser = async (user: any, dispatch: any) => {
    dispatch(registerStart());
    try {
        await request.post('auth/register', user);
        dispatch(registerSuccess());
    } catch (error) {
        dispatch(registerError());
    }
};

export const logOutUser = async (
    id: number,
    dispatch: any,
    token: any,
    navigate: any
) => {
    dispatch(logoutStart());

    try {
        await request.post('auth/logout', id, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(logoutSuccess());
        navigate('/');
        window.location.reload();
    } catch (error) {
        dispatch(logoutError());
    }
};

export const postVideo = async (
    video: any,
    dispatch: any,
    token: any,
    navigate: any
) => {
    dispatch(videoStart());
    try {
        await request.post('videos', video, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        dispatch(videoSuccess());
        navigate('/');
    } catch (error) {
        dispatch(videoError());
        console.log(error);
    }
};
export const follow = async (id: any, token: any) => {
    try {
        await request.post(`users/${id}/follow`, id, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
export const unFollow = async (id: any, token: any) => {
    try {
        await request.post(`users/${id}/unfollow`, id, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (error) {
        console.log(error);
    }
};
