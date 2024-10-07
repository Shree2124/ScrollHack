import { createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios';

const initialState = {
    user: null,
    loading: true,
    error: null,
    courses: null,
    activationCode: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload
        },
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

export const { setUser, setError, setLoading, clearUser, setCourses } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axiosInstance.post('/user/login', credentials);
        console.log(response);

        dispatch(fetchUser());
    } catch (error) {
        dispatch(setError(error.response.data.message));
    }
};

export const fetchUser = () => async (dispatch) => {
    dispatch(setLoading());
    try {
        const response = await axiosInstance.get('/user/current-user');
        dispatch(setUser(response.data.data));
    } catch (error) {
        console.log(error);

        dispatch(setError('Unauthorized'));
    }
};

export default authSlice.reducer;
