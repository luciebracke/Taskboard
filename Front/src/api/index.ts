import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3001/api',
});

export const getBoards = async () => {
    const response = await api.get('/board');
    return response.data;
}

export default api