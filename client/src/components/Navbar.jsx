import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpeg'; // Assume you have a logo.png in assets

import { useDispatch, useSelector } from 'react-redux';
import { isLoginedIn } from '../redux/user/userSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access the isLoginedIn state
  const log = useSelector((state) => state.user.log);

  const handleLogout = () => {
    dispatch(isLoginedIn(false));
    navigate('/');
  };

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
          {log ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          )}
          <Link to="/UserProfilePage" className="text-white hover:text-gray-300">
            User Profile
          </Link>
          <Link to="/AdminLoginPage" className="text-white hover:text-gray-300">
            Admin
          </Link>
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
          {log ? (
            <button
              onClick={handleLogout}
              className="block text-white hover:text-gray-300"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-white hover:text-gray-300">
              Login
            </Link>
          )}
          <Link to="/UserProfilePage" className="block text-white hover:text-gray-300">
            User Profile
          </Link>
          <Link to="/AdminLoginPage" className="block text-white hover:text-gray-300">
            Admin
          </Link>
          <div className="flex space-x-6 mt-2">
            <FontAwesomeIcon icon={faBell} className="text-white hover:text-gray-300" />
            <FontAwesomeIcon icon={faUser} className="text-white hover:text-gray-300" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
