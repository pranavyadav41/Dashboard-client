import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "react-form-stepper";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { toast } from "../common/toast";
import * as Yup from "yup";
import BasicInfo from "./BasicInfo";
import Employment from "./Employment";
import AdditionalInfo from "./AdditionalInfo";
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import {
  addEmployee,
  getEmployeeById,
  updateEmployee,
} from "../../api/employee";
import { handleError } from "../common/errorHandler";

const AddEmployee = ({ isEditing = false, employeeId = null }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completedSteps, setCompletedSteps] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployeeData() {
      if (isEditing && employeeId) {
        try {
          const response = await getEmployeeById(employeeId);
          const employeeData = response[0];
          formik.setValues({
            name: employeeData.name.trim() || "",
            dob: employeeData.dob
              ? new Date(employeeData.dob).toISOString().split("T")[0]
              : "",
            gender: employeeData.gender || "",
            email: employeeData.email || "",
            phone: employeeData.phone || "",
            employementType: employeeData.employementType || "",
            department: employeeData.department || "",
            jobTitle: employeeData.jobTitle || "",
            salary: employeeData.salary || "",
            address: employeeData.address || "",
            skills: employeeData.skills ? employeeData.skills.join(", ") : "",
            educationLevel: employeeData.educationLevel || "",
          });
        } catch (error) {
          handleError(error);
        }
      }
    }

    fetchEmployeeData();
  }, [isEditing, employeeId]);

  const steps = [
    { label: "Basic Info" },
    { label: "Employment Details" },
    { label: "Additional Info" },
  ];

  const validationSchemas = [
    Yup.object({
      name: Yup.string()
        .trim()
        .matches(/^[a-zA-Z\s]+$/, "Name should not contain special characters")
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be at most 50 characters")
        .required("Name is required"),

      dob: Yup.date()
        .typeError("Invalid date format")
        .required("Date of birth is required"),

      gender: Yup.string()
        .oneOf(["male", "female", "other"], "Invalid gender")
        .required("Gender is required"),

      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),

      phone: Yup.string()
        .trim()
        .matches(
          /^[1-9][0-9]{9}$/,
          "Phone number must be valid and exactly 10 digits"
        )
        .required("Phone number is required"),
    }),

    Yup.object({
      employementType: Yup.string()
        .oneOf(
          ["full-time", "part-time", "contract"],
          "Invalid employment type"
        )
        .required("Employment type is required"),

      department: Yup.string()
        .min(2, "Department must be at least 2 characters")
        .required("Department is required"),

      jobTitle: Yup.string()
        .min(2, "Job title must be at least 2 characters")
        .required("Job title is required"),

      salary: Yup.number()
        .positive("Salary must be a positive number")
        .required("Salary is required"),
    }),

    Yup.object({
      address: Yup.string()
        .trim()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),

      skills: Yup.string()
        .trim()
        .matches(
          /^[a-zA-Z,\s]+$/,
          "Skills should not contain special characters"
        )
        .min(3, "Please list at least one skill")
        .required("Skills are required"),

      educationLevel: Yup.string().required("Education level is required"),
    }),
  ];

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
      educationLevel: "",
    },
    validationSchema: validationSchemas[activeStep],
    onSubmit: (values) => {
      sendFormData(values);
    },
  });

  const sendFormData = async (formData) => {
    setLoading(true);
    try {
      const modifiedFormData = {
        ...formData,
        skills: formData.skills.split(",").map((skill) => skill.trim()),
      };
      let response;
      if (isEditing) {
        response = await updateEmployee(employeeId, modifiedFormData);
        toast.success(response.message);
        navigate(`/employeeDetail/${employeeId}`);
      } else {
        response = await addEmployee(modifiedFormData);
        toast.success(response.message);
        navigate("/listEmployees");
      }
    } catch (error) {}
     finally {
    setLoading(false);
  }
  };

  function getSectionComponent() {
    switch (activeStep) {
      case 0:
        return (
          <BasicInfo
            formData={formik.values}
            handleChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
          />
        );
      case 1:
        return (
          <Employment
            formData={formik.values}
            handleChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
          />
        );
      case 2:
        return (
          <AdditionalInfo
            formData={formik.values}
            handleChange={formik.handleChange}
            errors={formik.errors}
            touched={formik.touched}
          />
        );
      default:
        return null;
    }
  }

  const handleNext = async () => {
    const errors = await formik.validateForm();

    if (Object.keys(errors).length === 0) {
      setActiveStep((prevStep) => {
        const nextStep = prevStep + 1;
        if (!completedSteps.includes(prevStep)) {
          setCompletedSteps((prev) => [...prev, prevStep]);
        }
        return nextStep;
      });
    } else {
      formik.setTouched({
        ...formik.touched,
        ...Object.keys(errors).reduce(
          (acc, field) => ({ ...acc, [field]: true }),
          {}
        ),
      });
    }
  };

  const handlePrevious = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleCancel = () => {
    if (isEditing) {
      navigate(`/employeeDetail/${employeeId}`);
    } else {
      navigate("/listEmployees");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className=" text-2xl md:text-3xl font-extrabold text-gray-900 text-center md:mb-8">
              {isEditing ? "Edit Employee Details" : "Add New Employee"}
            </h2>
            <Stepper
              steps={steps}
              activeStep={activeStep}
              completed={completedSteps}
              connectorStyleConfig={{
                completedColor: "black",
                activeColor: "#60a5fa",
                disabledColor: "#e5e7eb",
              }}
              styleConfig={{
                activeBgColor: "black",
                completedBgColor: "#00c800",
                inactiveBgColor: "#e5e7eb",
                activeTextColor: "#ffffff",
                completedTextColor: "#ffffff",
                inactiveTextColor: "#374151",
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
            <div className="mt-8 flex flex-col space-y-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:justify-between sm:space-y-0">
                <div className="order-last sm:order-first">
                  {activeStep > 0 && (
                    <button
                      onClick={handlePrevious}
                      className="w-full sm:w-auto px-4 py-2 mt-2 flex items-center justify-center gap-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                    >
                      <FaLongArrowAltLeft />
                      Previous
                    </button>
                  )}
                </div>
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-600 bg-transparent hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                  {isEditing && (
                    <button
                      onClick={formik.handleSubmit}
                      className="px-4 h-10  border border-transparent text-sm font-normal rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {loading ? "Submitting..":"Save changes"}
                    </button>
                  )}
                  {activeStep < steps.length - 1 && (
                    <button
                      onClick={handleNext}
                      className="px-4 h-10 flex gap-2 items-center justify-center border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
                    >
                      Next <FaLongArrowAltRight color="white" />
                    </button>
                  )}
                  {!isEditing && activeStep === steps.length - 1 && (
                    <button
                      onClick={formik.handleSubmit}
                      className="px-4 h-10 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      {loading ? "Submitting..." : "Submit"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddEmployee;
