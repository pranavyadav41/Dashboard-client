import React from "react";

const EmploymentDetails = ({ formData, handleChange, errors, touched }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Employment Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            id="department"
            name="department"
            placeholder="Enter Department"
            value={formData.department}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.department && touched.department ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.department && touched.department && (
            <p className="text-red-500 text-sm mt-1">{errors.department}</p>
          )}
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            id="jobTitle"
            name="jobTitle"
            placeholder="Enter Job Title"
            value={formData.jobTitle}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.jobTitle && touched.jobTitle ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.jobTitle && touched.jobTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.jobTitle}</p>
          )}
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Salary
          </label>
          <input
            id="salary"
            name="salary"
            type="number"
            placeholder="Enter Salary"
            value={formData.salary}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.salary && touched.salary ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.salary && touched.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
          )}
        </div>
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Employement Type
          </label>
          <select
            id="employementType"
            name="employementType"
            value={formData.employementType}
            onChange={handleChange}
            className={`w-full bg-gray-100 px-3 py-2 border ${errors.employementType && touched.employementType ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            <option value="">Select Type</option>
            <option value="male">Full-time</option>
            <option value="female">Part-time</option>
            <option value="other">Contract</option>
          </select>
          {errors.employementType && touched.employementType && (
            <p className="text-red-500 text-sm mt-1">{errors.employementType}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmploymentDetails;
