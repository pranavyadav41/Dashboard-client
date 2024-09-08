import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Hero from "./components/Hero";
import AddEmployee from "./components/employee/AddEmployee";

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;