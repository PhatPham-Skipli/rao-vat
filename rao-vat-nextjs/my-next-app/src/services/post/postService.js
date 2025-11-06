import axiosClient from '../../utils/axiosClient';

export const createRecruitmentPost = async ({
    title,
    description,
    category,
    expireDate,
    location,
    contact,
    phone,
    email,
    secondary_phone_number,
    images = [],
    status = true,
}) => {
    const payload = {
        title,
        description,
        category,
        expireDate,
        location,
        contact,
        phone,
        email,
        secondary_phone_number,
        images,
        status,
    };
    const response = await axiosClient.post('/post/recruitment', payload);
    return response?.data;
};

export const getMyPosts = async ({
    page = 1,
    limit = 10,
    search = '',
    status,
    category,
} = {}) => {
    const params = { page, limit, search };
    if (status !== undefined) params.status = status;
    if (category) params.category = category;

    const response = await axiosClient.get('/post/my-posts', { params });
    return response?.data;
};

export const getPostDetail = async (id) => {
    const response = await axiosClient.get(`/post/detail/${id}`);
    return response?.data;
};