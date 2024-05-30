import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

const UserHomePage = () => {
  const [username, setUsername] = useState('');
  const { currentUser } = useSelector((state) => state.user);
  const userURL = 'http://localhost:4000/api/users';

  useEffect(() => {
    if (currentUser && currentUser.user && currentUser.user.name) {
      setUsername(currentUser.user.name);
    } else {
      setUsername("Login Please : Trial Mode");
    }
  }, [currentUser]);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await axios.post(`${userURL}/logout`, null, {
        withCredentials: true,
      });
      // Clear any user-related data from the frontend state or local storage
      // Optionally, you can display a success message or perform any other necessary cleanup
  
      // Redirect to the login page or any other desired route
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      // Optionally, you can display an error message to the user
    }
  };
  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <h2 className="text-3xl mb-4">Welcome, {username}!</h2>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p className="text-gray-700 mb-4">
          This is your user homepage. You can manage your account and access various features from here.
        </p>
        <div className="flex justify-center">
          <button onClick={() => navigate('/UserProfilePage')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-4">
            Account Settings
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
