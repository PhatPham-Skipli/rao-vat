import axiosClient from '../utils/axiosClient';

export const askChatbot = async (question) => {
    const response = await axiosClient.post('/chatbot/ask', { question });
    return response?.data;
};