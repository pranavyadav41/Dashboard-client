import React, { useEffect, useState } from "react";

const BasicInfo = ({ formData, handleChange, errors, touched, setFieldError }) => {
  const [dobError, setDobError] = useState("");

  const handleDobChange = (e) => {
    const { name, value } = e.target;
    const today = new Date();
    const dob = new Date(value);
    const age = today.getFullYear() - dob.getFullYear();
    const isUnder18 = today.setFullYear(today.getFullYear() - 18) < dob;

    if (isUnder18) {
      setDobError("Employee must be at least 18 years old.");
    } else {
      setDobError("");
      handleChange(e);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className=" text-xl md:text-2xl font-bold md:mb-6">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.name && touched.name ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.name && touched.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleDobChange}
            className={`w-full px-3 py-2 border ${errors.dob && touched.dob ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.dob && touched.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
          {dobError && <p className="text-red-500 text-sm mt-1">{dobError}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full bg-gray-100 px-3 py-2 border ${errors.gender && touched.gender ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && touched.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            placeholder="+1 (123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.phone && touched.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
