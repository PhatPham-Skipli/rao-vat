import axiosClient from '../../utils/axiosClient';

export const login = async (identifier, password) => {
    const response = await axiosClient.post('/auth/login', { identifier, password });
    return response?.data;
};