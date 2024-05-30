// src/views/components/Modal.jsx
import React from 'react';

const Modal = ({ content, closeModal, handleSave, handleChange, editedData }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit {content}</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          {content === 'name' && (
            <div className="mb-4">
              <label htmlFor="editName" className="block text-gray-700 font-semibold mb-2">Name</label>
              <input
                type="text"
                id="editName"
                name="name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={editedData.name || ''}
                onChange={handleChange}
              />
            </div>
          )}
          {content === 'password' && (
            <div className="mb-4">
              <label htmlFor="editPassword" className="block text-gray-700 font-semibold mb-2">Password</label>
              <input
                type="password"
                id="editPassword"
                name="password"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                value={editedData.password || ''}
                onChange={handleChange}
              />
            </div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
