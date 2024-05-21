import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpeg'; // Assume you have a logo.png in assets

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8 w-8 rounded-full object-cover" />
          <Link to="/" className="text-white text-lg font-bold">
            UMS
          </Link>
        </div>
        <div className="hidden md:flex space-x-6 items-center">
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/UserProfilePage" className="text-white hover:text-gray-300">
            User Profile
          </Link>
          <Link to="/AdminPage" className="text-white hover:text-gray-300">
            Admin
          </Link>
          {/* <FontAwesomeIcon icon={faSearch} className="text-white hover:text-gray-300" /> */}
          <FontAwesomeIcon icon={faBell} className="text-white hover:text-gray-300" />
          <FontAwesomeIcon icon={faUser} className="text-white hover:text-gray-300" />
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link to="/login" className="block text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/user-profile" className="block text-white hover:text-gray-300">
            User Profile
          </Link>
          <Link to="/admin" className="block text-white hover:text-gray-300">
            Admin
          </Link>
          <div className="flex space-x-6 mt-2">
            {/* <FontAwesomeIcon icon={faSearch} className="text-white hover:text-gray-300" /> */}
            <FontAwesomeIcon icon={faBell} className="text-white hover:text-gray-300" />
            <FontAwesomeIcon icon={faUser} className="text-white hover:text-gray-300" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
