// axiosInterceptor.js
import axios from 'axios';
import { toast } from './toast';

const setupInterceptors = () => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
      toast.error(message);
      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;