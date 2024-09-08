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
} from "lucide-react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getEmployeeById,deleteEmployeeById } from "../../api/employee";
import { toast } from "../common/toast";
import { handleError } from "../common/errorHandler";

const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const navigate = useNavigate();

  console.log(employee)

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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div className="flex justify-center items-center h-screen">Employee not found</div>;
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatSalary = (salary) => {
    return typeof salary === 'number' ? `₹${salary.toLocaleString()}` : 'N/A';
  };

  const handleEdit = () => {
    navigate(`/edit-employee/${employee.employeeId}`);
  };

  const handleDelete = async(id) => {
    try {
        const response = await deleteEmployeeById(id)
        toast.success(response.message)
        setShowConfirmDelete(false)
        navigate('/listEmployees')
        
    } catch (error) {
        handleError(error)
    }
  };

  return (
    <div className="bg-white min-h-screen p-4">
      <div className="max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gray-500 p-6 text-white">
          <Link to="/listEmployees" className="flex items-center text-white hover:text-gray-300 mb-4">
            <ArrowLeft className="mr-2" />
            Back to Employees
          </Link>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">{employee.name || 'N/A'}</h1>
              <p className="text-xl">{employee.jobTitle || 'N/A'}</p>
            </div>
            <div className="flex space-x-2">
              <button onClick={handleEdit} className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                <Edit size={20} />
              </button>
              <button onClick={() => setShowConfirmDelete(true)} className="p-2 bg-white text-black rounded-full hover:bg-gray-200">
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InfoCard icon={<User />} label="Employee ID" value={employee.employeeId || 'N/A'} />
            <InfoCard icon={<Mail />} label="Email" value={employee.email || 'N/A'} />
            <InfoCard icon={<Phone />} label="Phone" value={employee.phone || 'N/A'} />
            <InfoCard icon={<Briefcase />} label="Department" value={employee.department || 'N/A'} />
            <InfoCard icon={<Calendar />} label="Date of Birth" value={employee.dob ? formatDate(employee.dob) : 'N/A'} />
            <InfoCard icon={<MapPin />} label="Address" value={employee.address || 'N/A'} />
            <InfoCard icon={<GraduationCap />} label="Education Level" value={employee.educationLevel || 'N/A'} />
            <InfoCard icon={<Award />} label="Employment Type" value={employee.employementType || 'N/A'} />
            <InfoCard icon={<IndianRupee />} label="Salary" value={formatSalary(employee.salary)} />
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {employee.skills && employee.skills.length > 0 ? (
                employee.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-200 text-black px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">No skills listed</span>
              )}
            </div>
          </div>
        </div>
      </div>
       {/* Delete Confirmation Modal */}
       {showConfirmDelete && (
        <div className="fixed  inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 md:p-8 rounded-md shadow-lg">
            <h2 className="text-base md:text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this employee?</h2>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className=" px-3 py-1 md:px-4 md:py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={()=>handleDelete(employee.employeeId)}
                className="px-3 py-1 md:px-4 md:py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start bg-white p-4 rounded-lg shadow">
    <div className="bg-gray-200 p-2 rounded-full mr-4">
      {React.cloneElement(icon, { className: "text-black" })}
    </div>
    <div>
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-base md:text-lg text-black">{value}</p>
    </div>
  </div>
);

export default EmployeeDetailsPage;