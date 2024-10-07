import axios from 'axios';

const axiosInstance = axios.create({
  baseURL:'http://localhost:5000/api/v1',
    // baseURL: 'https://scroll-hack-m1h8.vercel.app/api/v1',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

const getCookieToken = (tokenName) => {
    const token = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`));
    return token ? token.split('=')[1] : null;
};
axiosInstance.interceptors.request.use((config) => {
    const accessToken = getCookieToken('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = getCookieToken('refreshToken');
        try {
            const refreshResponse = await axiosInstance.post('/user/refresh-token', { refreshToken });
            document.cookie = `accessToken=${refreshResponse.data.accessToken}; path=/; secure; SameSite=Lax`;
            originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            return axiosInstance(originalRequest);
        } catch (refreshError) {
            console.error('Error refreshing token', refreshError);
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;
