// src/components/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const adminURL = 'http://localhost:4000/api/admin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: '',
    isAdmin: false
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      setFilteredUsers(
        users.filter(user => 
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(adminURL);
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData(user);
    setIsEditing(true);
  };

  const handleBlock = async (id) => {
    try {
      await axios.put(`${adminURL}/${id}/block`);
      fetchUsers();
    } catch (error) {
      console.error('Error blocking user:', error);
    }
  };

  const handleUnblock = async (id) => {
    try {
      await axios.put(`${adminURL}/${id}/unblock`);
      fetchUsers();
    } catch (error) {
      console.error('Error unblocking user:', error);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${adminURL}/${selectedUser.id}`, formData);
      setIsEditing(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-[50%] mx-[25%] p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b border-gray-200">Name</th>
                <th className="py-2 px-4 border-b border-gray-200">Email</th>
                <th className="py-2 px-4 border-b border-gray-200">Status</th>
                <th className="py-2 px-4 border-b border-gray-200">Admin</th>
                <th className="py-2 px-4 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-4 px-4 border-b border-gray-200">{user.name}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{user.status}</td>
                  <td className="py-2 px-4 border-b border-gray-200">{user.isAdmin ? 'Yes' : 'No'}</td>
                  <td className="py-2 px-4 border-b border-gray-200 space-x-2">
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                    {user.status === 'blocked' ? (
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                        onClick={() => handleUnblock(user.id)}
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() => handleBlock(user.id)}
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-4">Edit User</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Status</label>
                <input
                  type="text"
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded"
                  value={formData.status}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-gray-700">Admin</label>
                <input
                  type="checkbox"
                  name="isAdmin"
                  className="mr-2 leading-tight"
                  checked={formData.isAdmin}
                  onChange={handleChange}
                />
                <span className="text-gray-700">Is Admin</span>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
