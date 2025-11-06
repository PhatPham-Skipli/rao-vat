import axiosClient from '../utils/axiosClient';

export const getCategory = async (query = null) => {
    const params = {};
    if (query) params.query = query;
    
    const response = await axiosClient.get('/categories', { params });
    return response?.data;
};