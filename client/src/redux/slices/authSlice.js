import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

const initialState = {
    user: null,
    loading: true,
    error: null,
    activationCode:null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            state.loading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        clearUser: (state) => {
            state.user = null;
            state.loading = false;
        },

    },
});

export const { setUser, setError, setLoading, clearUser } = authSlice.actions;

const getCookieToken = (tokenName) => {
    const token = document.cookie.split('; ').find(row => row.startsWith(`${tokenName}=`));
    return token ? token.split('=')[1] : null;
};

export const fetchUser = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axiosInstance.get('/user/current-user', {
            headers: {
                Authorization: `Bearer ${getCookieToken('accessToken')}`,
            },
        });

        console.log('User fetched successfully:', response.data);

        dispatch(setUser(response.data.data));
    } catch (error) {
        console.error('Error fetching user:', error);

        if (error.response?.status === 401) {
            try {
                const refreshToken = getCookieToken('refreshToken');
                const refreshResponse = await axiosInstance.post('/user/refresh-token', {
                    refreshToken,
                });
                document.cookie = `accessToken=${refreshResponse.data.accessToken}; path=/; secure; SameSite=Lax`;
                console.log(refreshToken);

                dispatch(fetchUser());
            } catch (refreshError) {
                console.error('Error refreshing token:', refreshError);
                dispatch(clearUser());
            }
        } else {
            dispatch(setError(error.message));
        }
    }
};

export default authSlice.reducer;
