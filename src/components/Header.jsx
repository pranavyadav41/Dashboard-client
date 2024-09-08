import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-black shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <NavLink to="/" className=" text-lg md:text-2xl font-bold text-white hover:text-white">
              Dashboard
            </NavLink>
          </div>
          
          {/* You can add more header items here if needed */}
          
        </div>
      </div>
    </header>
  );
};

export default Header;