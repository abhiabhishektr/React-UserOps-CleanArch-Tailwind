import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">Oops!</h2>
        <p className="text-lg text-gray-800 mb-6">Something went wrong. Please try logging in again.</p>
        <div className="flex items-center justify-center">
          <svg className="animate-bounce h-6 w-6 text-red-600 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <p className="text-lg text-gray-800">Logging you out...</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
