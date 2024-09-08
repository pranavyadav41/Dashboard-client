import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, UserPlus, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { getEmployees } from "../../api/employee";

const departments = ["IT", "HR", "Finance", "Marketing"];
const roles = ["Developer", "Manager", "Accountant", "Designer", "Specialist"];

const EmployeeList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();

  function addEmployee() {
    navigate("/addEmployee");
  }

  useEffect(() => {
    async function fetchEmployees() {
      setLoading(true);
      try {
        let response = await getEmployees();
        setEmployees(response);
        console.log(response);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
      setLoading(false);
    }
    fetchEmployees();
  }, []);

  const filteredEmployees = employees
    .filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (selectedDepartments.length === 0 ||
          selectedDepartments.includes(employee.department)) &&
        (selectedRoles.length === 0 || selectedRoles.includes(employee.role))
    )
    .sort((a, b) => {
      if (sortConfig.key) {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
      }
      return 0;
    });

  const handleDepartmentChange = (department) => {
    setSelectedDepartments((prev) =>
      prev.includes(department)
        ? prev.filter((dep) => dep !== department)
        : [...prev, department]
    );
  };

  const handleRoleChange = (role) => {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey) return null;
    return sortConfig.direction === "ascending" ? (
      <ChevronUp size={14} />
    ) : (
      <ChevronDown size={14} />
    );
  };

  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
      <p className="text-xl font-semibold text-gray-600 mb-4">
        No employee data found
      </p>
      <p className="text-gray-500">
        Try adjusting your filters or add new employees.
      </p>
    </div>
  );

  function handleShowDetails(id) {
    console.log(id);
    navigate(`/employeeDetail/${id}`);
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-md p-4 sticky top-0 z-10">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 flex items-center sm:hidden"
            >
              <Filter className="mr-2 h-4 w-4" /> Filters
            </button>
            <button
              onClick={addEmployee}
              className="inline-flex gap-2 md:gap-0 items-center px-3 py-3 md:px-6 md:py-3 border border-transparent text-[#5d6373] text-sm md:text-base font-medium rounded-md bg-[#e5e6eb] hover:bg-gray-100 transition duration-300"
            >
              <UserPlus className="md:mr-2" size={20} />
              Add Employee
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto p-4 flex flex-col sm:flex-row gap-4">
        <div
          className={`sm:w-64 bg-white p-4 rounded-lg shadow-md ${
            isFilterOpen ? "block" : "hidden"
          } sm:block`}
        >
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
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label
                  htmlFor={`department-${department}`}
                  className="ml-2 text-sm"
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
                  className="form-checkbox h-4 w-4 text-blue-600"
                />
                <label htmlFor={`role-${role}`} className="ml-2 text-sm">
                  {role}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Employee List */}
        <div className="flex-1">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading...</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Mobile View */}
              <div className="sm:hidden">
                <div className="grid grid-cols-1 gap-4">
                  {employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="bg-white rounded-lg shadow-md p-4"
                    >
                      <h3 className="font-semibold text-lg">{employee.name}</h3>
                      <p className="text-sm text-gray-600">
                        Employee ID: {employee.employeeId}
                      </p>
                      <p className="text-sm text-gray-600">
                        Department: {employee.department}
                      </p>
                      <p className="text-sm text-gray-600">
                        Role: {employee.jobTitle}
                      </p>
                      <button
                        onClick={() => handleShowDetails(employee.employeeId)}
                        className="mt-1 px-3 py-2 bg-black text-white text-sm rounded hover:bg-gray-700 transition-colors duration-150"
                      >
                        Show Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Desktop View */}
              <div className="hidden sm:block">
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="grid grid-cols-5 gap-4 p-4 font-semibold text-gray-700 border-b">
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => handleSort("name")}
                    >
                      Name <SortIcon columnKey="name" />
                    </div>
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => handleSort("department")}
                    >
                      Emp_id <SortIcon columnKey="department" />
                    </div>
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => handleSort("role")}
                    >
                      Department <SortIcon columnKey="role" />
                    </div>
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={() => handleSort("email")}
                    >
                      Role <SortIcon columnKey="email" />
                    </div>
                    <div>Actions</div>
                  </div>
                  <div className="grid grid-cols-5 gap-4 p-4 font-normal text-gray-700">
                    {filteredEmployees.map((employee) => (
                      <React.Fragment key={employee.id}>
                        <div>{employee.name}</div>
                        <div>{employee.employeeId}</div>
                        <div>{employee.department}</div>
                        <div>{employee.jobTitle}</div>
                        <div>
                          <button
                            onClick={() =>
                              handleShowDetails(employee.employeeId)
                            }
                            className="px-3 py-2 bg-black text-white text-sm rounded hover:bg-gray-700 transition-colors duration-150"
                          >
                            Show Details
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
