import axios from 'axios';

export const refresh = (handle: any) => {
    axios.interceptors.response.use(
        function (response) {
            return response;
        },
        function (error) {
            console.log(error.response.status);
            if (error.response.status === 401) {
                return handle
            } else {
                return Promise.reject(error);
            }
        }
    );
};
