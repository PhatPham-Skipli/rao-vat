import axios from 'axios';
import axiosClient from '../utils/axiosClient';

export const getCategory = async (query = null) => {
    const params = {};
    if (query) params.query = query;
    const res = await axiosClient.get('/categories', { params });
    return Array.isArray(res?.data?.data) ? res.data.data : [];
};

export const getCategoryServer = async (baseUrl, query = null) => {
    const params = {};
    if (query) params.query = query;
    const response = await axios.get(`${baseUrl}/categories`, { params });
    return Array.isArray(response?.data?.data) ? response.data.data : [];
};