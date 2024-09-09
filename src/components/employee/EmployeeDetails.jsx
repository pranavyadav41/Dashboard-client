import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  IndianRupee,
  User,
  Edit,
  Trash2,
  Loader,
} from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEmployeeById, deleteEmployeeById } from "../../api/employee";
import { toast } from "../common/toast";
import { motion, AnimatePresence } from "framer-motion";

const Spinner = () => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  >
    <Loader className="w-12 h-12 text-black" />
  </motion.div>
);

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEmployee() {
      try {
        if (id) {
          setLoading(true);
          const response = await getEmployeeById(id);
          setEmployee(response[0]);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
        setError("Failed to load employee data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-t-4 border-black border-solid rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold text-red-500"
        >
          {error}
        </motion.div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex justify-center items-center h-screen">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          Employee not found
        </motion.div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatSalary = (salary) => {
    return typeof salary === "number" ? `₹${salary.toLocaleString()}` : "N/A";
  };

  const handleEdit = () => {
    navigate(`/edit-employee/${employee.employeeId}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteEmployeeById(id);
      toast.success(response.message);
      setShowConfirmDelete(false);
      navigate("/listEmployees");
    } catch (error) {}
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen p-4"
    >
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-600 p-6 text-white">
          <Link
            to="/listEmployees"
            className="flex items-center text-white hover:text-gray-300 mb-4 transition-colors duration-300"
          >
            <ArrowLeft className="mr-2" />
            Back to Employees
          </Link>
          <div className="flex justify-between items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h1 className="text-3xl font-bold">{employee.name || "N/A"}</h1>
              <p className="text-xl">{employee.jobTitle || "N/A"}</p>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex space-x-2"
            >
              <button
                onClick={handleEdit}
                className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="p-2 bg-white text-black rounded-full hover:bg-gray-200 transition-colors duration-300"
              >
                <Trash2 size={20} />
              </button>
            </motion.div>
          </div>
        </div>

        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <InfoCard
              icon={<User />}
              label="Employee ID"
              value={employee.employeeId || "N/A"}
            />
            <InfoCard
              icon={<Mail />}
              label="Email"
              value={employee.email || "N/A"}
            />
            <InfoCard
              icon={<Phone />}
              label="Phone"
              value={employee.phone || "N/A"}
            />
            <InfoCard
              icon={<Briefcase />}
              label="Department"
              value={employee.department || "N/A"}
            />
            <InfoCard
              icon={<Calendar />}
              label="Date of Birth"
              value={employee.dob ? formatDate(employee.dob) : "N/A"}
            />
            <InfoCard
              icon={<MapPin />}
              label="Address"
              value={employee.address || "N/A"}
            />
            <InfoCard
              icon={<GraduationCap />}
              label="Education Level"
              value={employee.educationLevel || "N/A"}
            />
            <InfoCard
              icon={<Award />}
              label="Employment Type"
              value={employee.employementType || "N/A"}
            />
            <InfoCard
              icon={<IndianRupee />}
              label="Salary"
              value={formatSalary(employee.salary)}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6"
          >
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {employee.skills && employee.skills.length > 0 ? (
                employee.skills.map((skill, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                    className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                  </motion.span>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {showConfirmDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white p-6 md:p-8 rounded-md shadow-lg max-w-md w-full mx-4"
            >
              <h2 className="text-xl font-semibold text-black mb-4">
                Are you sure you want to delete this employee?
              </h2>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(employee.employeeId)}
                  className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex items-start bg-white p-4 rounded-lg shadow transition-shadow duration-300 hover:shadow-md"
  >
    <div className="bg-gray-500 p-2 rounded-full mr-4">
      {React.cloneElement(icon, { className: "text-white" })}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-base md:text-lg text-black">{value}</p>
    </div>
  </motion.div>
);

export default EmployeeDetailsPage;
