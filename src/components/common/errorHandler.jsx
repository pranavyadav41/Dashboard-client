// errorHandler.js
import { toast } from './toast';

export const handleError = (error) => {
  const message = error.response?.data?.message || error.message || 'An unexpected error occurred';
  toast.error(message);
  console.error('Error:', error);
  return error;
};