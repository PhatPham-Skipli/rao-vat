import axiosClient from '../utils/axiosClient';

export const getPosts = async ({
    category = null,
    page = 1,
    limit = 12,
    query = null,
    source = null,
    sortBy = 'newest',
    state = null
} = {}) => {
    const params = {};
    
    if (category) params.category = category;
    if (query) params.query = query;
    if (source) params.source = source;
    if (sortBy) params.sortBy = sortBy;
    if (state) params.state = state;
    
    params.page = page;
    params.limit = limit;
    
    const response = await axiosClient.get('/posts', { params });
    return response?.data;
};

export const getPostById = async (id) => {
    const response = await axiosClient.get(`/posts/${id}`);
    return response?.data;
};