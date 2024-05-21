import React, { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import Modal from './Modal';

const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleEdit = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <div className="flex items-center justify-center mb-4 relative">
          <img
            className="w-24 h-24 rounded-full"
            src="https://via.placeholder.com/150"
            alt="User Avatar"
          />
          <button
            className="absolute right-0 bottom-0 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
            onClick={() => handleEdit('image')}
          >
            <FaPen />
          </button>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
          <p className="text-gray-600">johndoe@example.com</p>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Password: ••••••••</span>
            <button
              className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-300"
              onClick={() => handleEdit('password')}
            >
              <FaPen />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal content={modalContent} closeModal={closeModal} />}
    </div>
  );
};

export default UserProfile;
