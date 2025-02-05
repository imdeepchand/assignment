import axios from 'axios';
import { API_END_POINT } from '@/config';
const axiosInstance = axios.create({
  baseURL: API_END_POINT, // Backend API URL
});

export default axiosInstance;