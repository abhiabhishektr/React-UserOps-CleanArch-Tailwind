import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-gray-900 text-white py-20 min-h-screen flex items-center justify-center">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-5xl font-bold mb-4">Welcome to UMS</h1>
          <p className="text-xl mb-8">A Comprehensive User Management System</p>
          <Link to="/login" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4">User Profiles</h3>
                <p className="text-gray-700">Manage detailed user profiles with ease.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4">Admin Dashboard</h3>
                <p className="text-gray-700">Access powerful admin features to manage your system.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 mb-8">
              <div className="bg-white p-6 rounded-lg shadow-lg h-full">
                <h3 className="text-2xl font-bold mb-4">Secure Login</h3>
                <p className="text-gray-700">Ensure your data is safe with secure login methods.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto text-center px-4">
          <div className="flex justify-center space-x-4 mb-4">
            <a href="https://github.com/abhiabhishektr" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={['fab', 'github']} size="2x" />
            </a>
            <a href="https://twitter.com/Abhishek_t_r" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
              <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
            </a>
          </div>
          <p>&copy; 2024 UMS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
