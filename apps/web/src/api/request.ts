import axios from 'axios';

export const axiosRequest = axios.create({ baseURL: import.meta.env.VITE_API_URL });
