import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";

// Lazy load components
const AddEmployee = lazy(() => import('./components/employee/AddEmployee'));
const EmployeeList = lazy(() => import('./components/employee/ListEmployees'));
const EmploymentDetails = lazy(() => import('./components/employee/EmployeeDetails'));
const EditEmployee = lazy(() => import('./components/employee/EditEmployee'));

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={
              <main className="flex-grow">
                <Hero />
              </main>
            } />
            <Route path="/addEmployee" element={<AddEmployee />} />
            <Route path="/listEmployees" element={<EmployeeList />} />
            <Route path="/employeeDetail/:id" element={<EmploymentDetails />} />
            <Route path="/edit-employee/:id" element={<EditEmployee />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
