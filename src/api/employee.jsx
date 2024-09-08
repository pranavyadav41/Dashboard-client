import axios from 'axios';
import {handleError} from '../components/common/errorHandler'

const API_BASE_URL = 'http://localhost:5000/api';

export const addEmployee = async (employeeData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/employee/addEmployee`, employeeData);
      return response.data;
    } catch (error) {
      handleError(error)
    }
  };

export const getEmployees = async() => {
    try {
      const response = await axios.get(`${API_BASE_URL}/employee/getEmployees`,)
      return response.data;
    
    } catch (error) {
      handleError(error)
    }
  };  
export const getEmployeeById = async(id) => {
  try {
    console.log("reached here")
    const response = await axios.get(`${API_BASE_URL}/employee/getEmployee/${id}`)
    return response.data;
  } catch (error) {
    handleError(error)
  }
}
export const deleteEmployeeById = async(id) => {
  try {
    console.log(id,"hmmm")
    const response = await axios.post(`${API_BASE_URL}/employee/deleteEmployee/${id}`)
    return response.data;
    
  } catch (error) {
    handleError(error)
  }
}
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/employee/editEmployee/${id}`,employeeData);
    return response.data;
  } catch (error) {
    handleError(error)
  }
};