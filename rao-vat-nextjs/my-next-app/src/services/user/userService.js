import axiosClient from '../../utils/axiosClient';

export const getMe = async () => {
    const response = await axiosClient.get('/user/me');
    return response?.data;
};