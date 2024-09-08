import React from "react";
import { Stepper } from 'react-form-stepper';
import { motion } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import BasicInfo from "./BasicInfo";
import Employment from "./Employment";
import AdditionalInfo from "./AdditionalInfo";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";

const AddEmployee = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState([]);

  const steps = [
    { label: "Basic Info" },
    { label: "Employment Details" },
    { label: "Additional Info" },
  ];

  const validationSchemas = [
    Yup.object({
      name: Yup.string().required("Name is required"),
      dob: Yup.string().required("Date of birth is required"),
      gender: Yup.string().required("Gender is required"),
      email: Yup.string().email("Invalid email address").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
    }),
    Yup.object({
      employementType: Yup.string().required("Employement type is required"),
      department: Yup.string().required("Department is required"),
      jobTitle: Yup.string().required("Job title is required"),
      salary: Yup.number().required("Salary is required"),
    }),
    Yup.object({
      address: Yup.string().required("Address is required"),
      skills: Yup.string().required("Skills are required"),
      educationLevel:Yup.string().required("Education level is required")
    })
  ];

  // Using Formik for form management
  const formik = useFormik({
    initialValues: {
      name: "",
      dob: "",
      gender: "",
      email: "",
      phone: "",
      employementType: "",
      department: "",
      jobTitle: "",
      salary: "",
      address: "",
      skills: "",
      educationLevel:""
    },
    validationSchema: validationSchemas[activeStep], // Apply validation based on the active step
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return <BasicInfo formData={formik.values} handleChange={formik.handleChange} errors={formik.errors} touched={formik.touched} />;
      case 1:
        return <Employment formData={formik.values} handleChange={formik.handleChange} errors={formik.errors} touched={formik.touched} />;
      case 2:
        return <AdditionalInfo formData={formik.values} handleChange={formik.handleChange} errors={formik.errors} touched={formik.touched} />;
      default:
        return null;
    }
  }

  const handleNext = async () => {
    // Run validation schema for the current step
    const errors = await formik.validateForm();
  
    // If no errors, move to the next step
    if (Object.keys(errors).length === 0) {
      setActiveStep((prevStep) => {
        const nextStep = prevStep + 1;
        // Mark the step as completed
        if (!completedSteps.includes(prevStep)) {
          setCompletedSteps((prev) => [...prev, prevStep]);
        }
        return nextStep;
      });
    } else {
      // If there are errors, mark the fields as touched
      formik.setTouched({
        ...formik.touched,
        ...Object.keys(errors).reduce((acc, field) => ({ ...acc, [field]: true }), {}),
      });
    }
  };
  

  const handlePrevious = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
              Add New Employee
            </h2>
            <Stepper
              steps={steps}
              activeStep={activeStep}
              completed={completedSteps}
              connectorStyleConfig={{
                completedColor: '#4ade80',
                activeColor: '#60a5fa',
                disabledColor: '#e5e7eb'
              }}
              styleConfig={{
                activeBgColor: '#60a5fa',
                completedBgColor: '#4ade80',
                inactiveBgColor: '#e5e7eb',
                activeTextColor: '#ffffff',
                completedTextColor: '#ffffff',
                inactiveTextColor: '#374151'
              }}
            />
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="mt-8"
            >
              {getSectionComponent()}
            </motion.div>
            <div className="mt-8 flex justify-between">
              {activeStep > 0 && (
                <button
                  onClick={handlePrevious}
                  className="px-4 py-2 flex items-center gap-2 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  <FaLongArrowAltLeft />Previous
                </button>
              )}
              {activeStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-5 py-2 flex gap-2 items-center border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                >
                  Next <FaLongArrowAltRight color="white" />
                </button>
              ) : (
                <button
                  onClick={formik.handleSubmit}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
