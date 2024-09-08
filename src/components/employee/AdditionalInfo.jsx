import React from "react";

const AdditionalInfo = ({ formData, handleChange, errors, touched }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Additional Information</h2>
      <div className="space-y-6">
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
            Address
          </label>
          <input
            id="address"
            name="address"
            placeholder="Enter your full address"
            value={formData.address}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.address && touched.address ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          />
          {errors.address && touched.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        <div>
          <label htmlFor="skills" className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <textarea
            id="skills"
            name="skills"
            placeholder="Enter your skills (comma-separated)"
            value={formData.skills}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.skills && touched.skills ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 h-32 resize-none`}
          />
          {errors.skills && touched.skills && (
            <p className="text-red-500 text-sm mt-1">{errors.skills}</p>
          )}
        </div>

        <div>
          <label htmlFor="educationLevel" className="block text-sm font-medium text-gray-700 mb-1">
            Education Level
          </label>
          <select
            id="educationLevel"
            name="educationLevel"
            value={formData.educationLevel}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${errors.educationLevel && touched.educationLevel ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200`}
          >
            <option value="">Select Education Level</option>
            <option value="highSchool">High School</option>
            <option value="associate">Associate's Degree</option>
            <option value="bachelor">Bachelor's Degree</option>
            <option value="master">Master's Degree</option>
            <option value="doctorate">Doctorate</option>
            <option value="other">Other</option>
          </select>
          {errors.educationLevel && touched.educationLevel && (
            <p className="text-red-500 text-sm mt-1">{errors.educationLevel}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
