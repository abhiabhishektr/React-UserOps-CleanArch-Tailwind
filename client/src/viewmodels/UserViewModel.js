// src/viewmodels/UserViewModel.js

import api from '../utils/api';
import { loginSuccess, logout } from '../redux/user/userSlice';

export const loginUser = (email, password) => async (dispatch) => {
    try {
        const response = await api.post('/login', { email, password });
        const { user, token } = response.data;
        // Store token in localStorage or cookies
        localStorage.setItem('token', token);
        dispatch(loginSuccess({ user, token }));
    } catch (error) {
        // Handle login failure
    }
};

export const logoutUser = () => async (dispatch) => {
    // Clear token from localStorage or cookies
    localStorage.removeItem('token');
    dispatch(logout());
};
