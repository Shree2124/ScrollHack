import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://localhost:5000/api/v1',
  baseURL:"https://scroll-hack-m1h8.vercel.app/api/v1",
  withCredentials: true,
});

export default axiosInstance;
