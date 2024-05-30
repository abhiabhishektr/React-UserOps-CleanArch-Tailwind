import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { signInStart, signInSuccess, signInFailure, isAdmi nLoginedIn } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const userURL = 'http://localhost:4000/api/admin';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error1, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();



  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const userData = {
      email: username,
      password: password,
    };
    try {      
      const response = await axios.post(
        `${userURL}/adminlogin`,
        userData,
        {
          withCredentials: true // Ensure this is included
        }
      );
      console.log('Data sent successfully:', response);

      navigate('/AdminPage'); 
    } catch (error) {

      console.error('There was an error sending the data:', error);
      const errorMessage = error.response?.data?.message || 'There was an error sending the data';
      setError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login Page</h2>
        {error1 && <div className="mb-4 text-red-500 text-center">{error1}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">Username</label>
            <input
              type="text"
              id="username"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
