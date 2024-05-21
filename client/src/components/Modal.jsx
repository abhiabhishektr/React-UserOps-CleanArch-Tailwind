// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const Modal = ({ content, closeModal }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSave = () => {
    // Save the changes (this part should handle the update logic)
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h3 className="text-xl font-semibold mb-4">
          {content === 'image' ? 'Edit Profile Image' : 'Edit Password'}
        </h3>
        <input
          type="text"
          className="border border-gray-300 p-2 rounded w-full mb-4"
          placeholder={content === 'image' ? 'New Image URL' : 'New Password'}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
