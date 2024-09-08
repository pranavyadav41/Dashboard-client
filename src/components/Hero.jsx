import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Users, UserPlus, Briefcase } from 'lucide-react';
import { IoPeople } from "react-icons/io5";
import ListEmployees from './employee/ListEmployees';

const Hero = () => {

    const navigate = useNavigate()

    function addEmployee(){
        navigate('/addEmployee')
    }
    function listEmployee(){
      navigate('/listEmployees')
    }
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 h-[670px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-4xl md:text-5xl">
            Employee Management
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base md:text-xl md:max-w-3xl">
          Efficiently manage employee details with our simple system to add, update, and delete records.
          </p>
          <div className="mt-10 gap-5 flex justify-center">
            <button
              onClick={addEmployee}
              className="inline-flex gap-2 md:gap-0 items-center px-3 py-3 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300"
            >
              <UserPlus className="md:mr-2" size={20} />
              Add Employee
            </button>
            <button
              onClick={listEmployee}
              className="inline-flex gap-2 md:gap-0 items-center px-3 py-3 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 transition duration-300"
            >
              <IoPeople className='md:mr-2' size={20} />
              View Employees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;