import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getEmployees } from "../../api/employee";
import debounce from "lodash/debounce";

const departments = ["IT", "HR", "Finance", "Marketing"];
const roles = ["Developer", "Manager", "Accountant", "Designer", "Specialist"];


const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let navigate = useNavigate();

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getEmployees({
        search: searchTerm,
        departments: selectedDepartments.join(","),
        roles: selectedRoles.join(","),
        page,
      });
      setEmployees(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
    setLoading(false);
  }, [searchTerm, selectedDepartments, selectedRoles, page]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchTerm(value);
      setPage(1);
    }, 300),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const handleDepartmentChange = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department]
    );
    setPage(1);
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    setPage(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const addEmployee = () => {
    navigate("/addEmployee");
  };

  const handleShowDetails = (id) => {
    navigate(`/employeeDetail/${id}`);
  };

  const EmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md"
    >
      <p className="text-xl font-semibold text-gray-600 mb-4">
        No employee data found
      </p>
      <p className="text-gray-500 ml-10 md:ml-0">
        Try adjusting your filters or add new employees.
      </p>
    </motion.div>
  );

  const FilterSection = () => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-medium mb-2">Department</h3>
        {departments.map((department) => (
          <div key={department} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`department-${department}`}
              checked={selectedDepartments.includes(department)}
              onChange={() => handleDepartmentChange(department)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor={`department-${department}`}
              className="ml-2 text-sm text-gray-700"
            >
              {department}
            </label>
          </div>
        ))}
      </div>
      <div>
        <h3 className="font-medium mb-2">Role</h3>
        {roles.map((role) => (
          <div key={role} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={`role-${role}`}
              checked={selectedRoles.includes(role)}
              onChange={() => handleRoleChange(role)}
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <label
              htmlFor={`role-${role}`}
              className="ml-2 text-sm text-gray-700"
            >
              {role}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
      <header className="bg-white shadow-lg p-4 sticky top-0 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="search by name or dob"
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center sm:hidden transition-all duration-300"
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addEmployee}
              className="inline-flex gap-2 md:gap-0 items-center px-4 py-2 md:px-6 md:py-3 border border-transparent text-white text-sm md:text-base font-medium rounded-full bg-gray-800 hover:bg-gray-500 transition-all duration-300"
            >
              <UserPlus className="md:mr-2" size={20} />
              Add Employee
            </motion.button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 flex flex-col sm:flex-row gap-4">
        {/* Desktop Filter Section */}
        <div className="hidden sm:block sm:w-64">
          <FilterSection />
        </div>

        {/* Mobile Filter Section */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden"
            >
              <FilterSection />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-t-4 border-black border-solid rounded-full"
              />
            </div>
          ) : !employees || employees.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="hidden sm:grid  grid-cols-6 gap-4 p-4 font-bold md:font-semibold text-gray-700 border-b bg-gray-50">
                  <div>Name</div>
                  <div>Emp_id</div>
                  <div>Dob</div>
                  <div>Department</div>
                  <div>Role</div>
                  <div>Actions</div>
                </div>
                <AnimatePresence>
                  {employees.map((employee, index) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.05 }}
                      className="sm:grid sm:grid-cols-6 gap-4 p-4 font-normal text-gray-700 border-b last:border-b-0 hover:bg-gray-50 transition-colors duration-150"
                    >
                      <div className="sm:hidden items-center mb-2">
                        <span className="font-semibold">Name:</span>
                        <span>{employee.name}</span>
                      </div>
                      <div className="sm:block hidden">{employee.name}</div>

                      <div className="sm:hidden items-center mb-2">
                        <span className="font-semibold">Employee ID:</span>
                        <span>{employee.employeeId}</span>
                      </div>
                      <div className="sm:block hidden">
                        {employee.employeeId}
                      </div>

                      <div className="sm:hidden items-center mb-2">
                        <span className="font-semibold">Date of Birth:</span>
                        <span>
                          {new Date(employee.dob).toLocaleDateString("en-GB")}
                        </span>
                      </div>
                      <div className="sm:block hidden">
                        {new Date(employee.dob).toLocaleDateString("en-GB")}
                      </div>

                      <div className="sm:hidden items-center mb-2">
                        <span className="font-semibold">Department:</span>
                        <span>{employee.department}</span>
                      </div>
                      <div className="sm:block hidden">
                        {employee.department}
                      </div>

                      <div className="sm:hidden items-center mb-2">
                        <span className="font-semibold">Role:</span>
                        <span>{employee.jobTitle}</span>
                      </div>
                      <div className="sm:block hidden">{employee.jobTitle}</div>
                      <div>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleShowDetails(employee.employeeId)}
                          className="px-3 py-1  md:px-4 md:py-2 md:mt-0 mt-1 bg-gray-700 text-white  text-sm rounded-full hover:bg-gray-500 transition-colors duration-150"
                        >
                          Show Details
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>

              <div className="mt-6 flex justify-center items-center">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="mr-4 p-2 bg-white text-black rounded-full shadow-md disabled:opacity-50 transition-all duration-300"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <span className="text-lg font-medium text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className="ml-4 p-2 bg-white text-black rounded-full shadow-md disabled:opacity-50 transition-all duration-300"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
