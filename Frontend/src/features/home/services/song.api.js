import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api/songs',
    withCredentials: true,
})

export const getSong = async (mood) => {
    const response = await api.get("?mood=" + mood)
    return response.data;
}

