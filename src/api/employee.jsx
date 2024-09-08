import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const addEmployee = async (employeeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employee/addEmployee`, employeeData);
      return response.data;
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  };

export const getEmployees = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employee/getEmployees`,)
      return response.data;
    
    } catch (error) {
      console.error('Error adding employee:', error);
      throw error; // Rethrow the error so it can be handled by the caller
    }
  };  