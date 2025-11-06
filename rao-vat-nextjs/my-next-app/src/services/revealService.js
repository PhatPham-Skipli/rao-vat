import axiosClient from '../utils/axiosClient';

export const revealContact = async (deviceId, postId) => {
    const response = await axiosClient.post('/reveal/contact', {
        deviceId,
        postId
    });
    return response?.data;
};

export const getRevealedPosts = async (deviceId) => {
    const response = await axiosClient.get('/reveal/posts', {
        params: { deviceId }
    });
    return response?.data;
};