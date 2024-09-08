import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";
import AddEmployee from "./components/employee/AddEmployee";
import EmployeeList from './components/employee/ListEmployees';
import EmploymentDetails from './components/employee/EmployeeDetails';
import EditEmployee from './components/employee/EditEmployee';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={
            <main className="flex-grow">
              <Hero />
            </main>
          } />
          <Route path="/addEmployee" element={<AddEmployee />} />
          <Route path="/listEmployees" element={<EmployeeList />} />
          <Route path="/employeeDetail/:id" element={<EmploymentDetails/>} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
        </Routes>
      </div>
    </Router>
    
    
  );
}

export default App;