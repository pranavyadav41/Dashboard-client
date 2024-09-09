import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import { IoPeople } from "react-icons/io5";
import { motion } from 'framer-motion';

const Hero = () => {
  const navigate = useNavigate();

  const addEmployee = () => {
    navigate('/addEmployee');
  };

  const listEmployee = () => {
    navigate('/listEmployees');
  };

  return (
    <div className="bg-gradient-to-r from-black via-gray-500 to-gray-200 text-white min-h-screen flex items-center">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-3xl font-extrabold text-white sm:text-6xl md:text-6xl mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Employee Management
          </motion.h1>
          <motion.p 
            className="mt-3 max-w-md mx-auto text-xl md:text-2xl md:max-w-3xl text-indigo-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Efficiently manage employee details with our simple system to add, update, and delete records.
          </motion.p>
          <motion.div 
            className="mt-10 gap-5 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.button
              onClick={addEmployee}
              className="inline-flex items-center px-3 py-3 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-full text-white bg-gray-800 hover:bg-gray-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserPlus className="mr-2" size={20} />
              Add Employee
            </motion.button>
            <motion.button
              onClick={listEmployee}
              className="inline-flex items-center px-3   py-3 md:px-6 md:py-3 border border-transparent text-sm md:text-base font-medium rounded-full text-white bg-gray-800 hover:bg-gray-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <IoPeople className='mr-2' size={20} />
              View Employees
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;